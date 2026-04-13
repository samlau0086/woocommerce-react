import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product, ProductReview } from '../types';
import { getProductBySlug, getProductReviews, addProductReview, isApiConfigured, getCoupons } from '../services/api';
import { useCart } from '../context/CartContext';
import { Loader2, ArrowRight, Star, ShieldCheck, Truck, RotateCcw, ThumbsUp, ThumbsDown, Image as ImageIcon, X, Check, Copy, Tag } from 'lucide-react';
import { decodeHtml } from '../utils/html';
import { PriceDisplay } from '../components/PriceDisplay';
import { SEO } from '../components/SEO';

export const LandingPageExample: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
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
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Coupons state
  const [coupons, setCoupons] = useState<any[]>([]);
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);

  // Voting state
  const [votingState, setVotingState] = useState<Record<number, { status: 'idle' | 'loading' | 'voted', vote?: 'up' | 'down' }>>({});

  useEffect(() => {
    const fetchProduct = async () => {
      if (!isApiConfigured || !slug) {
        setLoadingProduct(false);
        setLoadingReviews(false);
        return;
      }

      try {
        const data = await getProductBySlug(slug);
        setProduct(data);
        
        if (data) {
          // Initialize default attributes
          const defaults: Record<string, string> = {};
          data.default_attributes?.forEach(attr => {
            defaults[attr.name] = attr.option;
          });
          setSelectedAttributes(defaults);

          // Fetch reviews and coupons concurrently
          const [reviewsData, couponsData] = await Promise.all([
            getProductReviews(data.id).catch(err => {
              console.error('Error fetching reviews:', err);
              return [];
            }),
            getCoupons().catch(err => {
              console.error('Error fetching coupons:', err);
              return [];
            })
          ]);
          
          setReviews(reviewsData);
          setCoupons(couponsData);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoadingProduct(false);
        setLoadingReviews(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const handleAttributeSelect = (name: string, option: string) => {
    setSelectedAttributes(prev => ({
      ...prev,
      [name]: option
    }));
  };

  const isVariationSelected = () => {
    if (!product || product.type !== 'variable') return true;
    return product.attributes.every(attr => 
      !attr.variation || selectedAttributes[attr.name]
    );
  };

  const handleBuyNow = () => {
    if (!product) return;
    
    if (!isVariationSelected()) {
      alert('Please select all options before purchasing.');
      return;
    }

    setIsAddingToCart(true);
    
    // Add to cart and immediately redirect to checkout
    setTimeout(() => {
      addToCart(product, quantity, selectedAttributes);
      setIsAddingToCart(false);
      navigate('/checkout');
    }, 500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (reviewImages.length + files.length > 10) {
      alert('You can only upload up to 10 images.');
      return;
    }

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReviewImages(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setReviewImages(prev => prev.filter((_, i) => i !== index));
  };

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

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
      
      setReviews([newReview, ...reviews]);
      setNewReviewName('');
      setNewReviewEmail('');
      setNewReviewRating(5);
      setNewReviewContent('');
      setReviewImages([]);
      alert('Review submitted successfully! It may be pending approval.');
    } catch (error: any) {
      console.error('Error adding review:', error);
      alert(error.message || 'Failed to submit review. Please try again.');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleVote = async (reviewId: number, type: 'up' | 'down') => {
    setVotingState(prev => ({
      ...prev,
      [reviewId]: { status: 'loading' }
    }));

    setTimeout(() => {
      setReviews(prevReviews => 
        prevReviews.map(review => {
          if (review.id === reviewId) {
            return {
              ...review,
              up_votes: type === 'up' ? (review.up_votes || 0) + 1 : review.up_votes,
              down_votes: type === 'down' ? (review.down_votes || 0) + 1 : review.down_votes
            };
          }
          return review;
        })
      );
      setVotingState(prev => ({
        ...prev,
        [reviewId]: { status: 'voted', vote: type }
      }));
    }, 600);
  };

  const copyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(null), 2000);
  };

  if (loadingProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-500 mb-6">The product you are looking for does not exist or has been removed.</p>
          <button onClick={() => navigate('/shop')} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
            Return to Shop
          </button>
        </div>
      </div>
    );
  }

  const activeImage = product.images[0]?.src || 'https://placehold.co/600x600?text=No+Image';

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <SEO 
        title={`${decodeHtml(product.name)} - Special Offer`}
        description={product.short_description ? decodeHtml(product.short_description).replace(/<[^>]*>?/gm, '') : `Get the best deal on ${decodeHtml(product.name)}.`}
      />

      {/* Urgency Banner */}
      <div className="bg-red-600 text-white text-center py-2.5 px-4 text-sm font-bold tracking-wider uppercase shadow-md relative z-10">
        <span className="animate-pulse inline-block mr-2">⚡</span> 
        Flash Sale: Limited Stock Available - Order Now! 
        <span className="animate-pulse inline-block ml-2">⚡</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Main Hero Section */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row mb-12">
          
          {/* Left: Product Image */}
          <div className="lg:w-1/2 bg-gray-100 p-8 md:p-12 flex items-center justify-center relative group">
            <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
              Best Seller
            </div>
            <img 
              src={activeImage} 
              alt={product.name} 
              className="max-w-full h-auto object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105 mix-blend-multiply"
              style={{ maxHeight: '500px' }}
            />
          </div>

          {/* Right: Buy Box */}
          <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <a href="#reviews" className="text-sm font-medium text-blue-600 hover:underline">
                ({product.rating_count} customer reviews)
              </a>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              {decodeHtml(product.name)}
            </h1>
            
            <div className="mb-6">
              <PriceDisplay 
                priceHtml={product.price_html} 
                className="text-4xl md:text-5xl font-black text-red-600" 
              />
              {product.regular_price && product.sale_price && (
                <p className="text-sm text-green-600 font-bold mt-2">
                  You save: ${(parseFloat(product.regular_price) - parseFloat(product.sale_price)).toFixed(2)}!
                </p>
              )}
            </div>

            <div 
              className="prose prose-lg text-gray-600 mb-8 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: product.short_description || product.description.substring(0, 150) + '...' }}
            />

            {/* Variations */}
            {product.type === 'variable' && product.attributes && (
              <div className="space-y-5 mb-8 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                {product.attributes.map((attr) => attr.variation && (
                  <div key={attr.id || attr.name}>
                    <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
                      Select {attr.name}:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {attr.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleAttributeSelect(attr.name, option)}
                          className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border-2 ${
                            selectedAttributes[attr.name] === option
                              ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Button */}
            <button
              onClick={handleBuyNow}
              disabled={isAddingToCart || !isVariationSelected()}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-xl md:text-2xl font-black py-5 rounded-2xl shadow-xl transform transition-all hover:-translate-y-1 hover:shadow-2xl flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isAddingToCart ? (
                <Loader2 className="w-8 h-8 animate-spin" />
              ) : (
                <>
                  BUY NOW & CHECKOUT <ArrowRight className="w-8 h-8" />
                </>
              )}
            </button>
            
            {!isVariationSelected() && (
              <p className="text-red-500 text-sm mt-3 text-center font-medium animate-bounce">
                Please select all options above to continue.
              </p>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-100">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-3 rounded-full mb-2 text-blue-600">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-gray-700">Secure Checkout</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-green-100 p-3 rounded-full mb-2 text-green-600">
                  <Truck className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-gray-700">Fast Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-100 p-3 rounded-full mb-2 text-purple-600">
                  <RotateCcw className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-gray-700">30-Day Returns</span>
              </div>
            </div>

          </div>
        </div>

        {/* Coupons Section */}
        {coupons.length > 0 && (
          <div className="mb-12 bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 border border-orange-100 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Tag className="w-6 h-6 text-orange-500" />
              Available Offers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {coupons.map((coupon) => (
                <div key={coupon.id} className="bg-white rounded-2xl p-5 border border-orange-200 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="font-black text-lg text-orange-600 uppercase tracking-wider mb-1">{coupon.code}</div>
                    <div className="text-sm text-gray-600 font-medium">{coupon.description || 'Use this code at checkout'}</div>
                  </div>
                  <button
                    onClick={() => copyCoupon(coupon.code)}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 hover:bg-orange-200 rounded-xl font-bold transition-colors"
                  >
                    {copiedCoupon === coupon.code ? (
                      <><Check className="w-4 h-4" /> Copied</>
                    ) : (
                      <><Copy className="w-4 h-4" /> Copy</>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Full Description */}
        <div className="bg-white rounded-3xl shadow-sm p-8 md:p-12 mb-12 border border-gray-100">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Why You'll Love It</h2>
          <div 
            className="prose prose-lg max-w-4xl mx-auto text-gray-700 prose-img:rounded-2xl prose-img:shadow-md prose-headings:text-gray-900"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>

        {/* Reviews Section */}
        <div id="reviews" className="bg-white rounded-3xl shadow-sm p-8 md:p-12 border border-gray-100 scroll-mt-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-10 text-center">Customer Reviews</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Review Form */}
            <div className="lg:col-span-1 bg-gray-50 p-6 rounded-2xl border border-gray-200 h-fit">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Write a Review</h3>
              <form onSubmit={submitReview} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReviewRating(star)}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star className={`w-8 h-8 ${star <= newReviewRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={newReviewName}
                    onChange={(e) => setNewReviewName(e.target.value)}
                    className="w-full border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-3"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={newReviewEmail}
                    onChange={(e) => setNewReviewEmail(e.target.value)}
                    className="w-full border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-3"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Review</label>
                  <textarea
                    required
                    rows={4}
                    value={newReviewContent}
                    onChange={(e) => setNewReviewContent(e.target.value)}
                    className="w-full border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-3"
                    placeholder="What did you like or dislike?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Photos (Optional)</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {reviewImages.map((img, index) => (
                      <div key={index} className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200 group">
                        <img src={img} alt="Upload preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-6 h-6 text-white" />
                        </button>
                      </div>
                    ))}
                    {reviewImages.length < 10 && (
                      <label className="w-20 h-20 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 hover:border-blue-500 transition-colors">
                        <ImageIcon className="w-6 h-6 text-gray-400" />
                        <span className="text-xs text-gray-500 mt-1">Add</span>
                        <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                      </label>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingReview}
                  className="w-full bg-gray-900 text-white font-bold py-3.5 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  {isSubmittingReview ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit Review'}
                </button>
              </form>
            </div>

            {/* Reviews List */}
            <div className="lg:col-span-2">
              {loadingReviews ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                </div>
              ) : reviews.length > 0 ? (
                <div className="space-y-8">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-lg">
                            {review.author_name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">{review.author_name}</h4>
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                              ))}
                            </div>
                          </div>
                        </div>
                        <time className="text-sm text-gray-500 font-medium">
                          {new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </time>
                      </div>
                      
                      <div className="prose prose-sm text-gray-700 max-w-none mb-4" dangerouslySetInnerHTML={{ __html: review.content }} />
                      
                      {review.images && review.images.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {review.images.map((img, idx) => (
                            <button 
                              key={idx} 
                              onClick={() => setLightboxImage(img)}
                              className="block w-20 h-20 rounded-xl overflow-hidden border border-gray-200 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <img src={img} alt={`Review photo ${idx + 1}`} className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 bg-gray-50 inline-flex px-3 py-1.5 rounded-lg">
                        <span className="font-medium">Helpful?</span>
                        <button 
                          onClick={() => handleVote(review.id, 'up')}
                          disabled={votingState[review.id]?.status === 'loading' || votingState[review.id]?.status === 'voted'}
                          className={`flex items-center gap-1 transition-colors ${votingState[review.id]?.vote === 'up' ? 'text-blue-600' : 'hover:text-blue-600'}`}
                        >
                          <ThumbsUp className={`w-4 h-4 ${votingState[review.id]?.vote === 'up' ? 'fill-current' : ''}`} />
                          <span className="font-bold">{review.up_votes || 0}</span>
                        </button>
                        <button 
                          onClick={() => handleVote(review.id, 'down')}
                          disabled={votingState[review.id]?.status === 'loading' || votingState[review.id]?.status === 'voted'}
                          className={`flex items-center gap-1 transition-colors ${votingState[review.id]?.vote === 'down' ? 'text-red-600' : 'hover:text-red-600'}`}
                        >
                          <ThumbsDown className={`w-4 h-4 ${votingState[review.id]?.vote === 'down' ? 'fill-current' : ''}`} />
                          <span className="font-bold">{review.down_votes || 0}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                  <Star className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <h4 className="text-lg font-bold text-gray-900 mb-1">No reviews yet</h4>
                  <p className="text-gray-500">Be the first to share your experience with this product!</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Sticky Mobile Buy Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] lg:hidden z-40">
        <button
          onClick={handleBuyNow}
          disabled={isAddingToCart || !isVariationSelected()}
          className="w-full bg-green-600 text-white text-lg font-bold py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isAddingToCart ? <Loader2 className="w-6 h-6 animate-spin" /> : 'BUY NOW'}
        </button>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
          onClick={() => setLightboxImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-gray-300 focus:outline-none bg-white/10 rounded-full p-2"
            onClick={() => setLightboxImage(null)}
          >
            <X className="w-6 h-6" />
          </button>
          <img 
            src={lightboxImage} 
            alt="Enlarged review photo" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};
