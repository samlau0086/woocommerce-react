import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const upload = multer({ storage: multer.memoryStorage() });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route to handle review submission with images
  app.post("/api/reviews", upload.array("images", 10), async (req, res) => {
    try {
      const { product_id, review, reviewer, reviewer_email, rating } = req.body;
      const files = req.files as Express.Multer.File[];

      const wpApiUrl = process.env.VITE_WP_API_URL;
      if (!wpApiUrl) {
        return res.status(500).json({ error: "VITE_WP_API_URL is not set" });
      }

      // 1. Fetch the product page to get the nonce and cookies
      const pageRes = await fetch(`${wpApiUrl}/?p=${product_id}`);
      const html = await pageRes.text();
      const nonceMatch = html.match(/<input type="hidden" id="wcpr_image_upload_nonce" name="wcpr_image_upload_nonce" value="([^"]+)" \/>/);
      const nonce = nonceMatch ? nonceMatch[1] : '';
      const cookies = pageRes.headers.get('set-cookie')?.split(';')[0] || '';

      if (!nonce) {
        console.warn('Could not find wcpr_image_upload_nonce on product page. Image upload might fail.');
      }

      // 2. Construct the multipart form data for wp-comments-post.php
      const form = new FormData();
      form.append('comment', review);
      form.append('author', reviewer);
      form.append('email', reviewer_email);
      form.append('rating', rating);
      form.append('comment_post_ID', product_id);
      
      if (nonce) {
        form.append('wcpr_image_upload_nonce', nonce);
      }

      if (files && files.length > 0) {
        for (const file of files) {
          const blob = new Blob([file.buffer], { type: file.mimetype });
          form.append('wcpr_image_upload[]', blob, file.originalname);
        }
      }

      // 3. Submit to wp-comments-post.php
      const submitRes = await fetch(`${wpApiUrl}/wp-comments-post.php`, {
        method: 'POST',
        headers: {
          'Cookie': cookies,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        body: form,
        redirect: 'manual'
      });

      if (submitRes.status === 302 || submitRes.status === 201) {
        let commentId = null;
        const location = submitRes.headers.get('location');
        if (location) {
          const match = location.match(/#comment-(\d+)/);
          if (match) {
            commentId = parseInt(match[1], 10);
          }
        }
        res.status(201).json({ success: true, message: "Review submitted successfully", id: commentId });
      } else {
        const text = await submitRes.text();
        const errorMatch = text.match(/<p>(.*?)<\/p>/);
        const errorMessage = errorMatch ? errorMatch[1].replace(/<[^>]+>/g, '') : "Failed to submit review";
        res.status(400).json({ error: errorMessage });
      }

    } catch (error) {
      console.error("Error submitting review:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static file serving
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    
    // SPA fallback - redirect all unknown routes to index.html
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
