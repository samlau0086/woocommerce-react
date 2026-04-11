import fetch from 'node-fetch';

async function test() {
  const API_URL = process.env.VITE_WP_API_URL;
  const CONSUMER_KEY = process.env.VITE_WC_CONSUMER_KEY;
  const CONSUMER_SECRET = process.env.VITE_WC_CONSUMER_SECRET;

  const url = new URL(API_URL + '/wp-json/wc/v3/products/reviews');
  url.searchParams.append('consumer_key', CONSUMER_KEY || '');
  url.searchParams.append('consumer_secret', CONSUMER_SECRET || '');
  
  const payload = {
    product_id: 677,
    reviewer: 'Test User 3',
    reviewer_email: 'test3@example.com',
    review: 'This is a test review with large meta_data ' + Date.now(),
    rating: 4,
    meta_data: [
      {
        key: 'review_images',
        value: JSON.stringify(['data:image/png;base64,' + 'A'.repeat(3 * 1024 * 1024)])
      }
    ]
  };
  
  const res = await fetch(url.toString(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  
  console.log(res.status);
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}
test();
