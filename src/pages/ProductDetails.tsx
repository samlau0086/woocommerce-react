import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product, ProductReview } from '../types';
import { getProductBySlug, getProductReviews, addProductReview, isApiConfigured, getCoupons } from '../services/api';
import { useCart } from '../context/CartContext';
import { Loader2, ArrowLeft, Minus, Plus, ShoppingCart, Star, User, AlertCircle, Tag, Copy, ChevronRight, Image as ImageIcon, X, Check, ThumbsUp, ThumbsDown } from 'lucide-react';
import { decodeHtml } from '../utils/html';
import { PriceDisplay } from '../components/PriceDisplay';

export const ProductDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, cart } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Variations state
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});

  // Review form state
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewEmail, setNewReviewEmail] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewContent, setNewReviewContent] = useState('');
  const [reviewImages, setReviewImages] = useState<string[]>([]);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // Coupons state
  const [coupons, setCoupons] = useState<any[]>([]);
  const [showCouponSuccess, setShowCouponSuccess] = useState(false);
  const [copiedCoupons, setCopiedCoupons] = useState<Record<string, boolean>>({});
  const [showReviewSuccess, setShowReviewSuccess] = useState(false);

  // Voting state
  const [votingState, setVotingState] = useState<Record<number, { status: 'loading' | 'voted', vote?: 'up' | 'down' }>>({});

  // Gallery state
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    // Auto-populate user info if logged in
    const savedUser = localStorage.getItem('woo_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setNewReviewName(user.username || user.first_name || '');
        setNewReviewEmail(user.email || '');
      } catch (e) {
        console.error('Error parsing user data', e);
      }
    }

    const fetchProductAndReviews = async () => {
      if (!slug) return;
      if (!isApiConfigured) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        // Fetch product data (will use cache if available)
        const productData = await getProductBySlug(slug);
        setProduct(productData);
        if (productData) {
          const reviewsData = await getProductReviews(productData.id);
          setReviews(reviewsData);
        }
        
        // Fetch coupons
        const couponsData = await getCoupons();
        setCoupons(couponsData);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndReviews();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!isApiConfigured) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
        </Link>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Configuration Required</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Please configure your WooCommerce API credentials in the AI Studio Secrets panel.
                  You need to set <strong>VITE_WP_API_URL</strong>, <strong>VITE_WC_CONSUMER_KEY</strong>, and <strong>VITE_WC_CONSUMER_SECRET</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
        <Link to="/" className="text-blue-600 hover:text-blue-800 flex items-center justify-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (!product) return;
    
    // Check if variations are selected for variable products
    if (product.type === 'variable') {
      const requiredAttributes = product.attributes.filter(a => a.variation);
      const allSelected = requiredAttributes.every(attr => selectedAttributes[attr.name]);
      if (!allSelected) {
        alert('Please select all product options before adding to cart.');
        return;
      }
    }

    setIsAddingToCart(true);
    try {
      // Fetch fresh product data to check stock and update cache
      const freshProduct = await getProductBySlug(product.slug, true);
      
      if (!freshProduct) {
        alert('Product no longer exists.');
        return;
      }
      
      setProduct(freshProduct); // Update local state with fresh data

      const existingCartItem = cart.find(item => item.product.id === freshProduct.id);
      const existingQuantity = existingCartItem ? existingCartItem.quantity : 0;
      const totalRequested = existingQuantity + quantity;

      // Check stock
      if (freshProduct.manage_stock) {
        const stockAvailable = freshProduct.stock_quantity || 0;
        if (stockAvailable < totalRequested) {
          alert(`Sorry, we only have ${stockAvailable} in stock. You already have ${existingQuantity} in your cart.`);
          return;
        }
      } else if (freshProduct.stock_status === 'outofstock') {
        alert('Sorry, this product is currently out of stock.');
        return;
      }

      addToCart(freshProduct, quantity);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart. Please try again.');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleAttributeSelect = (attributeName: string, value: string) => {
    setSelectedAttributes(prev => ({
      ...prev,
      [attributeName]: value
    }));
  };

  const handleVote = async (commentId: number, vote: 'up' | 'down') => {
    if (!product) return;
    
    // Check if already voted
    if (votingState[commentId]?.status === 'voted') return;
    
    setVotingState(prev => ({
      ...prev,
      [commentId]: { status: 'loading', vote }
    }));

    try {
      const { voteReview } = await import('../services/api');
      const result = await voteReview(commentId, product.id, vote);
      
      // Update the review in the local state
      setReviews(prevReviews => 
        prevReviews.map(r => 
          r.id === commentId 
            ? { ...r, up_votes: result.up, down_votes: result.down }
            : r
        )
      );
      
      setVotingState(prev => ({
        ...prev,
        [commentId]: { status: 'voted', vote }
      }));
    } catch (error) {
      console.error('Failed to vote:', error);
      // Revert state on error
      setVotingState(prev => {
        const newState = { ...prev };
        delete newState[commentId];
        return newState;
      });
      alert('Failed to submit vote. Please try again.');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (reviewImages.length + files.length > 10) {
      alert('You can only upload up to 10 images.');
      return;
    }

    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is 5MB.`);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        // Compress image before saving to avoid localStorage quota issues
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.6); // 60% quality JPEG
            setReviewImages(prev => {
              if (prev.length >= 10) return prev;
              return [...prev, dataUrl];
            });
          }
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const removeReviewImage = (index: number) => {
    setReviewImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !newReviewName.trim() || !newReviewEmail.trim() || !newReviewContent.trim()) {
      alert('Please fill in all fields.');
      return;
    }

    setIsSubmittingReview(true);
    try {
      const newReview = await addProductReview(
        product.id, 
        newReviewName, 
        newReviewEmail, 
        newReviewRating, 
        newReviewContent,
        reviewImages
      );
      setReviews([...reviews, newReview]);
      setNewReviewContent('');
      setNewReviewRating(5);
      setReviewImages([]);
      setShowReviewSuccess(true);
      setTimeout(() => setShowReviewSuccess(false), 5000);
    } catch (error: any) {
      console.error('Error adding review:', error);
      alert(error.message || 'Failed to submit review. Please try again.');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupons(prev => ({ ...prev, [code]: true }));
    setShowCouponSuccess(true);
    setTimeout(() => setShowCouponSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="flex items-center text-sm text-gray-500 mb-8 whitespace-nowrap overflow-x-auto" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0 text-gray-400" />
        <Link to="/shop" className="hover:text-gray-900 transition-colors">Shop</Link>
        {product.categories && product.categories.length > 0 && (
          <>
            <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0 text-gray-400" />
            <Link to={`/shop?category=${product.categories[0].slug}`} className="hover:text-gray-900 transition-colors">
              {decodeHtml(product.categories[0].name)}
            </Link>
          </>
        )}
        <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0 text-gray-400" />
        <span className="text-gray-900 font-medium truncate" aria-current="page">
          {decodeHtml(product.name)}
        </span>
      </nav>

      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 xl:gap-x-12">
        {/* Product Image */}
        <div className="mb-8 lg:mb-0">
          <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4">
            {product.images[activeImageIndex] ? (
              <img
                src={product.images[activeImageIndex].src}
                alt={product.images[activeImageIndex].alt || decodeHtml(product.name)}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : product.images[0] ? (
              <img
                src={product.images[0].src}
                alt={product.images[0].alt || decodeHtml(product.name)}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No Image Available
              </div>
            )}
          </div>
          
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-5 gap-2 sm:gap-4">
              {product.images.map((image, index) => (
                <button
                  key={image.id || index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    activeImageIndex === index ? 'ring-2 ring-blue-500 ring-offset-2' : 'hover:opacity-75 transition-opacity'
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt || `${decodeHtml(product.name)} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-6">
            <div className="text-sm text-gray-500 mb-2">
              {product.categories.map(c => decodeHtml(c.name)).join(', ')}
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-4">
              {decodeHtml(product.name)}
            </h1>
            <PriceDisplay 
              price={product.price}
              regularPrice={product.regular_price}
              salePrice={product.sale_price}
              onSale={product.on_sale}
              className="text-2xl font-bold text-gray-900"
            />
          </div>

          <div 
            className="text-gray-500 mb-6 wp-blocks-content text-sm"
            dangerouslySetInnerHTML={{ __html: product.short_description }}
          />

          {/* Product Rating Link */}
          <a 
            href="#reviews" 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 mb-8 group cursor-pointer hover:opacity-80 transition-opacity w-fit"
          >
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.round(parseFloat(product.average_rating || '0')) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors underline decoration-gray-300 underline-offset-4">
              {product.average_rating || '0.0'} ({product.rating_count || 0} Customer Reviews)
            </span>
          </a>

          {/* Variations */}
          {product.type === 'variable' && product.attributes.filter(a => a.variation).length > 0 && (
            <div className="mb-8 space-y-4">
              {product.attributes.filter(a => a.variation).map(attr => (
                <div key={attr.id}>
                  <label htmlFor={`attr-${attr.name}`} className="block text-sm font-medium text-gray-700 mb-1">
                    {attr.name} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id={`attr-${attr.name}`}
                    value={selectedAttributes[attr.name] || ''}
                    onChange={(e) => handleAttributeSelect(attr.name, e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
                  >
                    <option value="">Choose an option</option>
                    {attr.options.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          )}

          <div className="mt-auto pt-8 border-t border-gray-200">
            {/* Coupons Section */}
            {coupons.length > 0 && (
              <div className="mb-6">
                <div className="flex flex-col gap-3">
                  {coupons.map(coupon => {
                    const discountText = coupon.discount_type === 'percent' ? `${coupon.amount}% OFF` : `$${coupon.amount} OFF`;
                    const description = coupon.description || `${discountText} Discount`;
                    
                    return (
                      <div key={coupon.id} className="flex flex-col gap-2">
                        {/* Coupon Card */}
                        <div className="flex w-full max-w-sm rounded-lg overflow-hidden shadow-sm relative bg-[#FFF5ED] p-1">
                          <div className="flex w-full rounded-md overflow-hidden bg-gradient-to-r from-[#FCA566] to-[#F84B3D]">
                            {/* Left side */}
                            <div className="flex-1 p-4 flex flex-col justify-center text-white">
                              <div className="text-2xl font-bold leading-none mb-1">{discountText}</div>
                              <div className="text-xs font-medium opacity-90">{description}</div>
                              <div className="text-[10px] opacity-80 mt-1">Limited Time Offer</div>
                            </div>
                            
                            {/* Dashed divider */}
                            <div className="w-0 border-l border-dashed border-white/50 my-2 relative">
                              {/* Semi-circles at top and bottom of dashed line */}
                              <div className="absolute -top-3 -left-1.5 w-3 h-3 bg-[#FFF5ED] rounded-full"></div>
                              <div className="absolute -bottom-3 -left-1.5 w-3 h-3 bg-[#FFF5ED] rounded-full"></div>
                            </div>
                            
                            {/* Right side */}
                            <div className="w-24 flex flex-col items-center justify-center p-3">
                              {copiedCoupons[coupon.code] ? (
                                <>
                                  <button
                                    onClick={() => handleCopyCoupon(coupon.code)}
                                    className="w-full py-1.5 bg-[#FFF5ED] text-[#F84B3D] text-xs font-bold rounded-full hover:bg-white transition-colors flex items-center justify-center gap-1"
                                  >
                                    {coupon.code}
                                    <Copy className="w-3 h-3" />
                                  </button>
                                  <div className="text-[10px] text-white mt-1">Copy code</div>
                                </>
                              ) : (
                                <button
                                  onClick={() => handleCopyCoupon(coupon.code)}
                                  className="w-full py-1.5 bg-[#FFF5ED] text-[#F84B3D] text-xs font-bold rounded-full hover:bg-white transition-colors"
                                >
                                  GET
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Bottom text */}
                        <div className="max-w-sm bg-[#FFF5ED] rounded-md py-2 px-3 flex items-center gap-2 text-xs text-[#F84B3D] font-medium">
                          <div className="w-3.5 h-3.5 rounded-full bg-[#F84B3D] text-white flex items-center justify-center">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-2.5 h-2.5">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                          {description}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium text-gray-900">Quantity</span>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-2 hover:bg-gray-100 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="p-2 hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-black hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isAddingToCart ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Checking Stock...
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Full Description Section */}
      {product.description && product.description.trim() !== '' && (
        <div className="mt-16 pt-10 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Description</h2>
          <div 
            className="wp-blocks-content text-gray-600"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      )}

      {/* Reviews Section */}
      <div id="reviews" className="mt-16 pt-10 border-t border-gray-200 scroll-mt-24">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Customer Reviews</h2>
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-4 mb-10 lg:mb-0">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Write a Review</h3>
            
            {showReviewSuccess && (
              <div className="mb-4 bg-green-50 border-l-4 border-green-400 p-4 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-green-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">
                      Review submitted successfully! It may take a moment to appear.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleReviewSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReviewRating(star)}
                      className="focus:outline-none"
                    >
                      <Star className={`w-6 h-6 ${star <= newReviewRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="review-name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="review-name"
                  required
                  value={newReviewName}
                  onChange={(e) => setNewReviewName(e.target.value)}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border"
                />
              </div>
              <div>
                <label htmlFor="review-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="review-email"
                  required
                  value={newReviewEmail}
                  onChange={(e) => setNewReviewEmail(e.target.value)}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border"
                />
              </div>
              <div>
                <label htmlFor="review-content" className="block text-sm font-medium text-gray-700 mb-1">Review</label>
                <textarea
                  id="review-content"
                  required
                  rows={4}
                  value={newReviewContent}
                  onChange={(e) => setNewReviewContent(e.target.value)}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border mb-3"
                />
                
                {/* Image Upload UI */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Photos (Optional, up to 10)</label>
                  <div className="flex flex-wrap gap-3 mb-3">
                    {reviewImages.map((img, index) => (
                      <div key={index} className="relative w-20 h-20 rounded-md overflow-hidden border border-gray-200">
                        <img src={img} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeReviewImage(index)}
                          className="absolute top-1 right-1 bg-white rounded-full p-0.5 shadow-sm hover:bg-gray-100"
                        >
                          <X className="w-3 h-3 text-gray-600" />
                        </button>
                      </div>
                    ))}
                    {reviewImages.length < 10 && (
                      <label className="w-20 h-20 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                        <ImageIcon className="w-6 h-6 text-gray-400 mb-1" />
                        <span className="text-xs text-gray-500">Add Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmittingReview}
                className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isSubmittingReview ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Submit Review'}
              </button>
            </form>
          </div>

          <div className="lg:col-span-8">
            <div className="space-y-8">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-8 last:border-0">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center mr-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <h4 className="text-sm font-bold text-gray-900">{review.author_name}</h4>
                    </div>
                    <div className="text-sm text-gray-500 mb-3">
                      <time dateTime={review.date}>
                        {new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </time>
                    </div>
                    <div className="prose prose-sm text-gray-700 max-w-none mb-4">
                      <p>{review.content}</p>
                    </div>
                    {review.images && review.images.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3 mb-4">
                        {review.images.map((img, idx) => (
                          <a key={idx} href={img} target="_blank" rel="noopener noreferrer" className="block w-24 h-24 rounded-md overflow-hidden border border-gray-200 hover:opacity-90 transition-opacity">
                            <img src={img} alt={`Review photo ${idx + 1}`} className="w-full h-full object-cover" />
                          </a>
                        ))}
                      </div>
                    )}
                    
                    {/* Helpful Voting */}
                    <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                      <span className="font-medium">Helpful?</span>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => handleVote(review.id, 'up')}
                          disabled={votingState[review.id]?.status === 'loading' || votingState[review.id]?.status === 'voted'}
                          className={`flex items-center gap-1.5 transition-colors ${
                            votingState[review.id]?.vote === 'up' ? 'text-blue-600' : 'hover:text-blue-600'
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          <ThumbsUp className={`w-4 h-4 ${votingState[review.id]?.vote === 'up' ? 'fill-current' : ''}`} />
                          <span>{review.up_votes || 0}</span>
                        </button>
                        <button 
                          onClick={() => handleVote(review.id, 'down')}
                          disabled={votingState[review.id]?.status === 'loading' || votingState[review.id]?.status === 'voted'}
                          className={`flex items-center gap-1.5 transition-colors ${
                            votingState[review.id]?.vote === 'down' ? 'text-red-600' : 'hover:text-red-600'
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          <ThumbsDown className={`w-4 h-4 ${votingState[review.id]?.vote === 'down' ? 'fill-current' : ''}`} />
                          <span>{review.down_votes || 0}</span>
                        </button>
                        {votingState[review.id]?.status === 'loading' && (
                          <Loader2 className="w-3 h-3 animate-spin text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">No reviews yet. Be the first to review this product!</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Success Popup */}
      {showCouponSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative w-80 flex flex-col items-center animate-in fade-in zoom-in-95 duration-300">
            
            {/* Sparkles */}
            <div className="absolute -top-12 w-full h-32 pointer-events-none z-10">
              <svg className="w-full h-full" viewBox="0 0 200 100" fill="none">
                <path d="M40 40 L45 30 L50 40 L60 45 L50 50 L45 60 L40 50 L30 45 Z" fill="#FDE047" />
                <path d="M150 50 L153 42 L156 50 L164 53 L156 56 L153 64 L150 56 L142 53 Z" fill="#FDE047" />
                <circle cx="60" cy="30" r="2" fill="white" />
                <circle cx="100" cy="20" r="3" fill="#FDE047" />
                <circle cx="130" cy="35" r="2" fill="white" />
                <circle cx="45" cy="70" r="1.5" fill="white" />
                <circle cx="140" cy="70" r="1.5" fill="white" />
              </svg>
            </div>
            
            {/* Main container */}
            <div className="relative w-full pt-16 pb-6 px-6 bg-[#FFF2D7] rounded-xl shadow-2xl text-center mt-16">
              
              {/* Cloud shape */}
              <div className="absolute -top-8 left-0 right-0 flex justify-center z-0">
                <svg width="260" height="80" viewBox="0 0 260 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M30 80 C10 80 0 60 0 45 C0 30 15 20 30 20 C35 5 60 -5 85 5 C110 -5 140 0 155 15 C175 0 210 5 225 25 C245 20 260 35 260 50 C260 70 240 80 220 80 Z" fill="#FFF2D7" />
                  <path d="M30 80 C10 80 0 60 0 45 C0 30 15 20 30 20 C35 5 60 -5 85 5 C110 -5 140 0 155 15 C175 0 210 5 225 25 C245 20 260 35 260 50 C260 70 240 80 220 80 Z" fill="white" fillOpacity="0.6" transform="translate(0, -6)" />
                </svg>
              </div>

              {/* Ribbon */}
              <div className="absolute -top-4 left-[-20px] right-[-20px] z-10 flex justify-center">
                <svg width="320" height="100" viewBox="0 0 320 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Left Tail */}
                  <path d="M10 40 L40 30 L40 70 L25 55 L10 70 Z" fill="#D93A2C" />
                  {/* Right Tail */}
                  <path d="M310 40 L280 30 L280 70 L295 55 L310 70 Z" fill="#D93A2C" />
                  {/* Main Ribbon curved */}
                  <path d="M30 20 Q 160 0 290 20 L 280 60 Q 160 40 40 60 Z" fill="url(#grad1)" />
                  {/* Inner line */}
                  <path d="M35 25 Q 160 5 285 25 L 275 55 Q 160 35 45 55 Z" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
                  <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FCA566" />
                      <stop offset="100%" stopColor="#F84B3D" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute top-6 left-0 right-0 text-center text-white font-bold text-xl tracking-wide" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
                  Success
                </div>
              </div>

              {/* Yellow Badge */}
              <div className="absolute -top-12 left-0 right-0 flex justify-center z-20">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                    <path d="M50 2 L61 12 L76 9 L82 23 L96 28 L90 42 L100 55 L86 65 L89 80 L75 83 L65 96 L50 88 L35 96 L25 83 L11 80 L14 65 L0 55 L10 42 L4 28 L18 23 L24 9 L39 12 Z" fill="#FDB933" />
                  </svg>
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="absolute w-8 h-8">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </div>
              
              <div className="mt-2 text-[#A04B27] font-medium text-sm">
                Copy successfully, use at checkout
              </div>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};
