import { Product, BlogPost, Comment, ProductReview, PaymentGateway, Coupon, SiteInfo } from '../types';

const API_URL = import.meta.env.VITE_WP_API_URL || '';
const CONSUMER_KEY = import.meta.env.VITE_WC_CONSUMER_KEY || '';
const CONSUMER_SECRET = import.meta.env.VITE_WC_CONSUMER_SECRET || '';

export const isApiConfigured = Boolean(API_URL && CONSUMER_KEY && CONSUMER_SECRET);

// Helper to construct WooCommerce API URLs with authentication
const getWcUrl = (endpoint: string, params: Record<string, string> = {}) => {
  if (!API_URL) throw new Error('VITE_WP_API_URL is not defined');
  
  const url = new URL(`${API_URL}/wp-json/wc/v3/${endpoint}`);
  url.searchParams.append('consumer_key', CONSUMER_KEY);
  url.searchParams.append('consumer_secret', CONSUMER_SECRET);
  
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  
  return url.toString();
};

// Helper to construct WordPress API URLs
const getWpUrl = (endpoint: string, params: Record<string, string> = {}) => {
  if (!API_URL) throw new Error('VITE_WP_API_URL is not defined');
  
  const url = new URL(`${API_URL}/wp-json/wp/v2/${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  
  return url.toString();
};

const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

const getFromCache = <T>(key: string): T | null => {
  try {
    const cached = sessionStorage.getItem(key);
    if (cached) {
      const item = JSON.parse(cached);
      if (Date.now() - item.timestamp < CACHE_TTL) {
        return item.data;
      }
      sessionStorage.removeItem(key);
    }
  } catch (e) {
    console.warn('Error reading from cache', e);
  }
  return null;
};

const setCache = <T>(key: string, data: T): void => {
  try {
    sessionStorage.setItem(key, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  } catch (e) {
    console.warn('Error writing to cache', e);
  }
};

export const getProducts = async (): Promise<Product[]> => {
  try {
    const cacheKey = 'wc_products_cache';
    const cached = getFromCache<Product[]>(cacheKey);
    if (cached) return cached;

    const response = await fetch(getWcUrl('products'));
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    setCache(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getProductBySlug = async (slug: string, forceRefresh = false): Promise<Product | null> => {
  try {
    const cacheKey = `wc_product_cache_${slug}`;
    
    if (!forceRefresh) {
      const cached = getFromCache<Product>(cacheKey);
      if (cached) return cached;
    }

    const response = await fetch(getWcUrl('products', { slug }));
    if (!response.ok) throw new Error('Failed to fetch product');
    const products = await response.json();
    const product = products.length > 0 ? products[0] : null;
    
    if (product) {
      // Try to fetch the rendered content from WP REST API as a fallback for block editor content
      try {
        const wpResponse = await fetch(getWpUrl('product', { slug }));
        if (wpResponse.ok) {
          const wpProducts = await wpResponse.json();
          if (wpProducts.length > 0 && wpProducts[0].content?.rendered) {
            // If WP API has a longer/better rendered content, use it
            if (wpProducts[0].content.rendered.length > (product.description?.length || 0)) {
              product.description = wpProducts[0].content.rendered;
            }
          }
        }
      } catch (e) {
        console.error('Failed to fetch WP product content:', e);
      }
      
      setCache(cacheKey, product);
    }
    return product;
  } catch (error) {
    console.error(`Error fetching product ${slug}:`, error);
    return null;
  }
};

export const getCategories = async () => {
  try {
    const cacheKey = 'wc_categories_cache';
    const cached = getFromCache<any[]>(cacheKey);
    if (cached) return cached;

    const response = await fetch(getWcUrl('products/categories'));
    if (!response.ok) throw new Error('Failed to fetch categories');
    const data = await response.json();
    setCache(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const getPosts = async (): Promise<BlogPost[]> => {
  try {
    const cacheKey = 'wp_posts_cache';
    const cached = getFromCache<BlogPost[]>(cacheKey);
    if (cached) return cached;

    const response = await fetch(getWpUrl('posts', { _embed: '1' }));
    if (!response.ok) throw new Error('Failed to fetch posts');
    const posts = await response.json();
    
    // Map the _embedded featured media to our featured_image_url property
    const mappedPosts = posts.map((post: any) => {
      let featured_image_url = undefined;
      if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
        featured_image_url = post._embedded['wp:featuredmedia'][0].source_url;
      }
      return { ...post, featured_image_url };
    });

    setCache(cacheKey, mappedPosts);
    return mappedPosts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const cacheKey = `wp_post_cache_${slug}`;
    const cached = getFromCache<BlogPost>(cacheKey);
    if (cached) return cached;

    const response = await fetch(getWpUrl('posts', { slug, _embed: '1' }));
    if (!response.ok) throw new Error('Failed to fetch post');
    const posts = await response.json();
    
    if (posts.length === 0) return null;
    
    const post = posts[0];
    let featured_image_url = undefined;
    if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
      featured_image_url = post._embedded['wp:featuredmedia'][0].source_url;
    }
    
    const mappedPost = { ...post, featured_image_url };
    setCache(cacheKey, mappedPost);
    return mappedPost;
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error);
    return null;
  }
};

export const getPageBySlug = async (slug: string): Promise<any | null> => {
  try {
    const cacheKey = `wp_page_cache_${slug}`;
    const cached = getFromCache<any>(cacheKey);
    if (cached) return cached;

    const response = await fetch(getWpUrl('pages', { slug, _embed: '1' }));
    if (!response.ok) throw new Error('Failed to fetch page');
    const pages = await response.json();
    
    if (pages.length === 0) return null;
    
    const page = pages[0];
    let featured_image_url = undefined;
    if (page._embedded && page._embedded['wp:featuredmedia'] && page._embedded['wp:featuredmedia'][0]) {
      featured_image_url = page._embedded['wp:featuredmedia'][0].source_url;
    }
    
    const mappedPage = { ...page, featured_image_url };
    setCache(cacheKey, mappedPage);
    return mappedPage;
  } catch (error) {
    console.error(`Error fetching page ${slug}:`, error);
    return null;
  }
};

export const getCommentsByPostId = async (postId: number): Promise<Comment[]> => {
  try {
    const response = await fetch(getWpUrl('comments', { post: postId.toString() }));
    if (!response.ok) throw new Error('Failed to fetch comments');
    const comments = await response.json();
    
    // Map WP comment structure to our Comment interface
    return comments.map((c: any) => ({
      id: c.id,
      post_id: c.post,
      author_name: c.author_name,
      content: c.content.rendered.replace(/<[^>]+>/g, ''), // Strip HTML tags for simple display
      date: c.date
    }));
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    return [];
  }
};

export const addComment = async (postId: number, author_name: string, author_email: string, content: string): Promise<Comment> => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    const token = localStorage.getItem('woo_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(getWpUrl('comments'), {
      method: 'POST',
      headers,
      body: JSON.stringify({
        post: postId,
        author_name,
        author_email: author_email || 'customer@example.com',
        content
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Failed to add comment');
    }
    const c = await response.json();
    
    return {
      id: c.id,
      post_id: c.post,
      author_name: c.author_name,
      content: c.content.rendered.replace(/<[^>]+>/g, ''),
      date: c.date
    };
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

export const getProductReviews = async (productId: number): Promise<ProductReview[]> => {
  try {
    const cacheKey = `wc_product_reviews_cache_${productId}`;
    const cached = getFromCache<ProductReview[]>(cacheKey);
    if (cached) return cached;

    const response = await fetch(getWcUrl('products/reviews', { product: productId.toString() }));
    if (!response.ok) throw new Error('Failed to fetch product reviews');
    const reviews = await response.json();
    
    // Fetch images from the WooCommerce Photo Reviews plugin via AJAX
    let pluginImages: Record<number, string[]> = {};
    try {
      const params = new URLSearchParams();
      params.append('action', 'wcpr_ajax_load_more_reviews');
      params.append('post_id', productId.toString());
      params.append('cpage', '1');
      
      const ajaxRes = await fetch(`${API_URL}/wp-admin/admin-ajax.php`, {
        method: 'POST',
        body: params
      });
      
      if (ajaxRes.ok) {
        const ajaxData = await ajaxRes.json();
        if (ajaxData && ajaxData.html) {
          // Parse the HTML to extract images for each review
          const html = ajaxData.html;
          const commentBlocks = html.split('id="comment-');
          
          for (let i = 1; i < commentBlocks.length; i++) {
            const block = commentBlocks[i];
            const idMatch = block.match(/^(\d+)/);
            if (idMatch) {
              const commentId = parseInt(idMatch[1], 10);
              const images: string[] = [];
              
              // Find all images in this comment block
              const imgRegex = /<img[^>]*class="[^"]*reviews-images[^"]*"[^>]*>/g;
              let match;
              while ((match = imgRegex.exec(block)) !== null) {
                const imgTag = match[0];
                const srcMatch = imgTag.match(/data-original_src="([^"]+)"/) || imgTag.match(/src="([^"]+)"/);
                if (srcMatch) {
                  images.push(srcMatch[1]);
                }
              }
              
              pluginImages[commentId] = images;
            }
          }
        }
      }
    } catch (e) {
      console.warn('Failed to fetch plugin review images', e);
    }

    // Map WC review structure to our ProductReview interface
    const mappedReviews = reviews.map((r: any) => {
      let images: string[] = pluginImages[r.id] || [];
      
      // Try to load images from local storage (fallback for newly added reviews before they are approved)
      try {
        const localImages = JSON.parse(localStorage.getItem('local_review_images') || '{}');
        if (localImages[r.id] && Array.isArray(localImages[r.id])) {
          // Only use local images if we don't have plugin images (to avoid duplicates)
          if (images.length === 0) {
            images = localImages[r.id];
          }
        }
      } catch (e) {
        console.warn('Failed to load local review images', e);
      }
      
      return {
        id: r.id,
        product_id: r.product_id,
        author_name: r.reviewer,
        rating: r.rating,
        content: r.review.replace(/<[^>]+>/g, ''), // Strip HTML tags
        date: r.date_created,
        images
      };
    });

    setCache(cacheKey, mappedReviews);
    return mappedReviews;
  } catch (error) {
    console.error(`Error fetching reviews for product ${productId}:`, error);
    return [];
  }
};

export const addProductReview = async (productId: number, author_name: string, reviewer_email: string, rating: number, content: string, images: string[] = []): Promise<ProductReview> => {
  try {
    if (images && images.length > 0) {
      // Use our custom backend endpoint to handle multipart form data and proxy to wp-comments-post.php
      const formData = new FormData();
      formData.append('product_id', productId.toString());
      formData.append('reviewer', author_name);
      formData.append('reviewer_email', reviewer_email || 'customer@example.com');
      formData.append('rating', rating.toString());
      formData.append('review', content);

      // Convert base64 data URLs to Blobs
      for (let i = 0; i < images.length; i++) {
        const dataUrl = images[i];
        const arr = dataUrl.split(',');
        const mimeMatch = arr[0].match(/:(.*?);/);
        if (mimeMatch) {
          const mime = mimeMatch[1];
          const bstr = atob(arr[1]);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          const blob = new Blob([u8arr], { type: mime });
          formData.append('images', blob, `image_${i}.${mime.split('/')[1]}`);
        }
      }

      const response = await fetch('/api/reviews', {
        method: 'POST',
        body: formData
      });

      let responseData;
      if (response.ok) {
        responseData = await response.json();
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to add product review with images');
      }

      const newReviewId = responseData.id || Date.now();

      // Store images in local storage so they appear immediately before the backend plugin endpoint returns them
      try {
        const localImages = JSON.parse(localStorage.getItem('local_review_images') || '{}');
        localImages[newReviewId] = images;
        localStorage.setItem('local_review_images', JSON.stringify(localImages));
      } catch (e) {
        console.warn('Failed to save local review images', e);
      }

      // Clear the reviews cache for this product so the new review is fetched next time
      try {
        sessionStorage.removeItem(`wc_product_reviews_cache_${productId}`);
      } catch (e) {
        console.warn('Failed to clear reviews cache', e);
      }

      // The backend doesn't return the full review object, so we construct a temporary one
      return {
        id: newReviewId,
        product_id: productId,
        author_name: author_name,
        rating: rating,
        content: content,
        date: new Date().toISOString(),
        images: images
      };
    } else {
      // Fallback to standard WooCommerce REST API if no images
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      const token = localStorage.getItem('woo_token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const payload: any = {
        product_id: productId,
        reviewer: author_name,
        reviewer_email: reviewer_email || 'customer@example.com',
        review: content,
        rating: rating
      };

      const response = await fetch(getWcUrl('products/reviews'), {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response from WC API:', errorText);
        throw new Error(`Failed to add product review: ${errorText}`);
      }
      const r = await response.json();
      
      // Clear the reviews cache for this product so the new review is fetched next time
      try {
        sessionStorage.removeItem(`wc_product_reviews_cache_${productId}`);
      } catch (e) {
        console.warn('Failed to clear reviews cache', e);
      }

      return {
        id: r.id,
        product_id: r.product_id,
        author_name: r.reviewer,
        rating: r.rating,
        content: r.review.replace(/<[^>]+>/g, ''),
        date: r.date_created,
        images: []
      };
    }
  } catch (error) {
    console.error('Error adding product review:', error);
    throw error;
  }
};

export const getShippingMethods = async (): Promise<any[]> => {
  try {
    // First get all zones
    const zonesResponse = await fetch(getWcUrl('shipping/zones'));
    if (!zonesResponse.ok) throw new Error('Failed to fetch shipping zones');
    const zones = await zonesResponse.json();
    
    let allMethods: any[] = [];
    
    // For each zone, get its methods and locations
    for (const zone of zones) {
      const methodsResponse = await fetch(getWcUrl(`shipping/zones/${zone.id}/methods`));
      
      // Zone 0 (Rest of the World) doesn't have locations endpoint in the same way, 
      // or it might return empty. We handle it by assigning an empty locations array.
      let locations: any[] = [];
      if (zone.id !== 0) {
        try {
          const locationsResponse = await fetch(getWcUrl(`shipping/zones/${zone.id}/locations`));
          if (locationsResponse.ok) {
            locations = await locationsResponse.json();
          }
        } catch (e) {
          console.warn(`Could not fetch locations for zone ${zone.id}`);
        }
      }
      
      if (methodsResponse.ok) {
        const methods = await methodsResponse.json();
        allMethods = [...allMethods, ...methods.map((m: any) => ({ 
          ...m, 
          zone_id: zone.id, 
          zone_name: zone.name,
          locations: locations
        }))];
      }
    }
    
    return allMethods.filter(m => m.enabled);
  } catch (error) {
    console.error('Error fetching shipping methods:', error);
    return [];
  }
};

export const getPaymentGateways = async (): Promise<PaymentGateway[]> => {
  try {
    const response = await fetch(getWcUrl('payment_gateways'));
    if (!response.ok) throw new Error('Failed to fetch payment gateways');
    const gateways = await response.json();
    // Only return enabled gateways
    return gateways.filter((g: any) => g.enabled);
  } catch (error) {
    console.error('Error fetching payment gateways:', error);
    return [];
  }
};

export const getCoupons = async (): Promise<Coupon[]> => {
  try {
    const cacheKey = 'wc_coupons_cache';
    const cached = getFromCache<Coupon[]>(cacheKey);
    if (cached) return cached;

    const response = await fetch(getWcUrl('coupons'));
    if (!response.ok) throw new Error('Failed to fetch coupons');
    const data = await response.json();
    setCache(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Error fetching coupons:', error);
    return [];
  }
};

export const getCouponByCode = async (code: string): Promise<Coupon | null> => {
  try {
    const response = await fetch(getWcUrl('coupons', { code }));
    if (!response.ok) throw new Error('Failed to fetch coupon');
    const coupons = await response.json();
    return coupons.length > 0 ? coupons[0] : null;
  } catch (error) {
    console.error(`Error fetching coupon ${code}:`, error);
    return null;
  }
};

export const getSiteInfo = async (): Promise<SiteInfo | null> => {
  try {
    if (!API_URL) return null;
    const response = await fetch(`${API_URL}/wp-json/`);
    if (!response.ok) throw new Error('Failed to fetch site info');
    const data = await response.json();
    return { name: data.name, description: data.description };
  } catch (error) {
    console.error('Error fetching site info:', error);
    return null;
  }
};

export const createOrder = async (orderData: any): Promise<any> => {
  try {
    const response = await fetch(getWcUrl('orders'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create order');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const getOrder = async (orderId: number): Promise<any> => {
  try {
    const response = await fetch(getWcUrl(`orders/${orderId}`));
    if (!response.ok) {
      throw new Error('Failed to fetch order');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching order ${orderId}:`, error);
    throw error;
  }
};

export const registerCustomer = async (email: string, password?: string): Promise<any> => {
  try {
    const response = await fetch(getWcUrl('customers'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        username: email.split('@')[0]
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to register');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error registering customer:', error);
    throw error;
  }
};

export const getCustomerByEmail = async (email: string): Promise<any> => {
  try {
    const response = await fetch(getWcUrl('customers', { email }));
    if (!response.ok) {
      throw new Error('Failed to fetch customer');
    }
    const customers = await response.json();
    return customers.length > 0 ? customers[0] : null;
  } catch (error) {
    console.error('Error fetching customer:', error);
    throw error;
  }
};

export const loginCustomer = async (username: string, password: string): Promise<any> => {
  try {
    if (!API_URL) throw new Error('VITE_WP_API_URL is not defined');
    const response = await fetch(`${API_URL}/wp-json/jwt-auth/v1/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Invalid email or password');
    }

    return await response.json();
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const getCurrentUser = async (token: string): Promise<any> => {
  if (!API_URL) throw new Error('VITE_WP_API_URL is not defined');
  const response = await fetch(`${API_URL}/wp-json/wp/v2/users/me`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch current user');
  }
  return await response.json();
};

export const getCustomerOrders = async (customerId: number): Promise<any[]> => {
  if (!customerId) return [];
  try {
    const response = await fetch(getWcUrl('orders', { customer: customerId.toString() }));
    if (!response.ok) {
      throw new Error('Failed to fetch customer orders');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching orders for customer ${customerId}:`, error);
    throw error;
  }
};

export const getCustomer = async (customerId: number): Promise<any> => {
  if (!customerId) return null;
  try {
    const response = await fetch(getWcUrl(`customers/${customerId}`));
    if (!response.ok) {
      throw new Error('Failed to fetch customer details');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching customer ${customerId}:`, error);
    throw error;
  }
};

export const getCountries = async (): Promise<any[]> => {
  try {
    const cached = getFromCache<any[]>('wc_countries');
    if (cached) return cached;

    const response = await fetch(getWcUrl('data/countries'));
    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }
    const data = await response.json();
    sessionStorage.setItem('wc_countries', JSON.stringify({
      timestamp: Date.now(),
      data
    }));
    return data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
};

export const submitContactForm = async (formId: string, formData: FormData): Promise<any> => {
  if (!API_URL) throw new Error('VITE_WP_API_URL is not defined');
  const response = await fetch(`${API_URL}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`, {
    method: 'POST',
    body: formData
  });
  return await response.json();
};

export const trackOrder = async (orderId: string, email: string): Promise<any> => {
  try {
    const response = await fetch(getWcUrl(`orders/${orderId}`));
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Order not found. Please check your Order ID.');
      }
      throw new Error('Failed to fetch order details.');
    }
    const order = await response.json();
    
    // Verify email
    if (order.billing?.email?.toLowerCase() !== email.toLowerCase()) {
      throw new Error('The email address does not match the order.');
    }
    
    return order;
  } catch (error: any) {
    throw new Error(error.message || 'An error occurred while tracking the order.');
  }
};

export const updateCustomer = async (customerId: number, data: any): Promise<any> => {
  if (!customerId) throw new Error('Invalid customer ID');
  try {
    const response = await fetch(getWcUrl(`customers/${customerId}`), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update customer');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error updating customer ${customerId}:`, error);
    throw error;
  }
};
