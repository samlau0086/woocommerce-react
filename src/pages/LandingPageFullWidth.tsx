import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product, ProductReview } from '../types';
import { getProductBySlug, getProductReviews, addProductReview, isApiConfigured, getCoupons } from '../services/api';
import { useCart } from '../context/CartContext';
import { Loader2, ArrowRight, Star, ShieldCheck, Truck, RotateCcw, ThumbsUp, ThumbsDown, Image as ImageIcon, X, Check, Copy, Tag } from 'lucide-react';
import { decodeHtml } from '../utils/html';
import { PriceDisplay } from '../components/PriceDisplay';
import { SEO } from '../components/SEO';

export const LandingPageFullWidth: React.FC = () => {
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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-12 h-12 animate-spin text-black" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <button onClick={() => navigate('/shop')} className="bg-black text-white px-8 py-3 rounded-none hover:bg-gray-800 tracking-widest uppercase">
            Return to Shop
          </button>
        </div>
      </div>
    );
  }

  const activeImage = product.images[0]?.src || 'https://placehold.co/600x600?text=No+Image';

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-black selection:text-white">
      <SEO 
        title={`${decodeHtml(product.name)} - Exclusive Offer`}
        description={product.short_description ? decodeHtml(product.short_description).replace(/<[^>]*>?/gm, '') : `Discover ${decodeHtml(product.name)}.`}
      />

      {/* Top Announcement Bar */}
      <div className="bg-black text-white text-center py-3 px-4 text-xs md:text-sm font-bold tracking-[0.2em] uppercase w-full">
        Free Worldwide Shipping on all orders today
      </div>

      {/* Hero Section - Edge to Edge Split */}
      <section className="flex flex-col lg:flex-row min-h-[85vh] w-full border-b border-gray-200">
        
        {/* Left: Product Image (Full height/width of its half) */}
        <div className="lg:w-1/2 bg-[#F8F8F8] relative flex items-center justify-center p-8 lg:p-20 min-h-[50vh] lg:min-h-full">
          <div className="absolute top-8 left-8 bg-black text-white text-xs font-bold px-4 py-2 uppercase tracking-widest z-20">
            New Arrival
          </div>
          <img 
            src={activeImage} 
            alt={product.name} 
            className="relative z-10 w-full max-w-2xl h-auto object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-105 mix-blend-multiply"
          />
        </div>

        {/* Right: Content & Buy Box */}
        <div className="lg:w-1/2 flex flex-col justify-center px-8 py-16 lg:px-20 xl:px-32 bg-white">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex text-black">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <a href="#reviews" className="text-sm font-medium text-gray-500 hover:text-black uppercase tracking-wider">
              {product.rating_count} Reviews
            </a>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-black mb-6 leading-[1.1] tracking-tight">
            {decodeHtml(product.name)}
          </h1>
          
          <div className="mb-8 flex items-baseline gap-4">
            <PriceDisplay 
              priceHtml={product.price_html} 
              className="text-3xl md:text-4xl font-medium text-black" 
            />
          </div>

          <div 
            className="prose prose-lg text-gray-600 mb-10 leading-relaxed font-light"
            dangerouslySetInnerHTML={{ __html: product.short_description || product.description.substring(0, 200) + '...' }}
          />

          {/* Variations */}
          {product.type === 'variable' && product.attributes && (
            <div className="space-y-6 mb-10">
              {product.attributes.map((attr) => attr.variation && (
                <div key={attr.id || attr.name}>
                  <label className="block text-xs font-bold text-black mb-3 uppercase tracking-widest">
                    {attr.name}
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {attr.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleAttributeSelect(attr.name, option)}
                        className={`px-6 py-3 text-sm font-medium transition-all duration-200 border ${
                          selectedAttributes[attr.name] === option
                            ? 'border-black bg-black text-white'
                            : 'border-gray-300 bg-white text-gray-900 hover:border-black'
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
            className="w-full bg-black hover:bg-gray-900 text-white text-lg font-bold py-5 px-8 shadow-2xl transition-all hover:shadow-black/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest"
          >
            {isAddingToCart ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                Add to Cart & Checkout <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
          
          {!isVariationSelected() && (
            <p className="text-red-500 text-sm mt-4 text-center font-medium">
              Please select all options above to continue.
            </p>
          )}

          {/* Trust Badges - Minimalist */}
          <div className="grid grid-cols-3 gap-6 mt-12 pt-10 border-t border-gray-200">
            <div className="flex flex-col items-center text-center group">
              <ShieldCheck className="w-8 h-8 text-black mb-3 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Secure<br/>Checkout</span>
            </div>
            <div className="flex flex-col items-center text-center group">
              <Truck className="w-8 h-8 text-black mb-3 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Free<br/>Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center group">
              <RotateCcw className="w-8 h-8 text-black mb-3 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">30-Day<br/>Returns</span>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section - Full Width Dark */}
      <section className="w-full bg-[#111] text-white py-24 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 tracking-tight">Experience Perfection</h2>
          <div 
            className="prose prose-lg md:prose-xl prose-invert mx-auto font-light leading-relaxed text-gray-300"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      </section>

      {/* Coupons Section - Full Width Accent */}
      {coupons.length > 0 && (
        <section className="w-full bg-[#F4F1EA] py-24 px-8 border-y border-gray-200">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Tag className="w-10 h-10 text-black mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-3xl md:text-4xl font-bold text-black tracking-tight">Exclusive Offers</h3>
              <p className="text-gray-600 mt-4 text-lg">Apply these codes at checkout for special discounts.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coupons.map((coupon) => (
                <div key={coupon.id} className="bg-white p-8 border border-gray-200 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="font-black text-2xl text-black uppercase tracking-widest mb-3 border-b-2 border-black pb-2 inline-block">
                    {coupon.code}
                  </div>
                  <div className="text-gray-600 mb-6 flex-grow">{coupon.description || 'Use this code at checkout'}</div>
                  <button
                    onClick={() => copyCoupon(coupon.code)}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-800 font-bold uppercase tracking-widest text-sm transition-colors"
                  >
                    {copiedCoupon === coupon.code ? (
                      <><Check className="w-4 h-4" /> Copied</>
                    ) : (
                      <><Copy className="w-4 h-4" /> Copy Code</>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews Section - Full Width Light */}
      <section id="reviews" className="w-full bg-white py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-16 text-center tracking-tight">Customer Reviews</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Review Form (Left Column) */}
            <div className="lg:col-span-4">
              <div className="sticky top-8 bg-[#F8F8F8] p-8 border border-gray-200">
                <h3 className="text-2xl font-bold text-black mb-8 tracking-tight">Write a Review</h3>
                <form onSubmit={submitReview} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReviewRating(star)}
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star className={`w-8 h-8 ${star <= newReviewRating ? 'text-black fill-current' : 'text-gray-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">Name</label>
                    <input
                      type="text"
                      required
                      value={newReviewName}
                      onChange={(e) => setNewReviewName(e.target.value)}
                      className="w-full border-gray-300 bg-white focus:ring-black focus:border-black px-4 py-3 text-black"
                      placeholder="Your Name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">Email</label>
                    <input
                      type="email"
                      required
                      value={newReviewEmail}
                      onChange={(e) => setNewReviewEmail(e.target.value)}
                      className="w-full border-gray-300 bg-white focus:ring-black focus:border-black px-4 py-3 text-black"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">Review</label>
                    <textarea
                      required
                      rows={4}
                      value={newReviewContent}
                      onChange={(e) => setNewReviewContent(e.target.value)}
                      className="w-full border-gray-300 bg-white focus:ring-black focus:border-black px-4 py-3 text-black resize-none"
                      placeholder="Share your thoughts..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">Photos (Optional)</label>
                    <div className="flex flex-wrap gap-3">
                      {reviewImages.map((img, index) => (
                        <div key={index} className="relative w-20 h-20 overflow-hidden border border-gray-200 group bg-white">
                          <img src={img} alt="Upload preview" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-6 h-6 text-white" />
                          </button>
                        </div>
                      ))}
                      {reviewImages.length < 10 && (
                        <label className="w-20 h-20 flex flex-col items-center justify-center border border-dashed border-gray-400 bg-white cursor-pointer hover:border-black transition-colors">
                          <ImageIcon className="w-6 h-6 text-gray-400 mb-1" />
                          <span className="text-[10px] text-gray-500 uppercase tracking-wider">Add</span>
                          <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                        </label>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingReview}
                    className="w-full bg-black text-white font-bold py-4 uppercase tracking-widest hover:bg-gray-900 transition-colors disabled:opacity-50 flex items-center justify-center"
                  >
                    {isSubmittingReview ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit Review'}
                  </button>
                </form>
              </div>
            </div>

            {/* Reviews List (Right Column) */}
            <div className="lg:col-span-8">
              {loadingReviews ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="w-10 h-10 animate-spin text-black" />
                </div>
              ) : reviews.length > 0 ? (
                <div className="space-y-12">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-12 last:border-0">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <div className="flex text-black mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <h4 className="font-bold text-lg text-black">{review.author_name}</h4>
                        </div>
                        <time className="text-sm text-gray-500 uppercase tracking-wider">
                          {new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </time>
                      </div>
                      
                      <div className="prose prose-lg text-gray-700 max-w-none mb-6 font-light leading-relaxed" dangerouslySetInnerHTML={{ __html: review.content }} />
                      
                      {review.images && review.images.length > 0 && (
                        <div className="flex flex-wrap gap-3 mb-6">
                          {review.images.map((img, idx) => (
                            <button 
                              key={idx} 
                              onClick={() => setLightboxImage(img)}
                              className="block w-24 h-24 overflow-hidden border border-gray-200 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-black bg-gray-50"
                            >
                              <img src={img} alt={`Review photo ${idx + 1}`} className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span className="uppercase tracking-wider text-xs font-bold">Helpful?</span>
                        <div className="flex gap-4">
                          <button 
                            onClick={() => handleVote(review.id, 'up')}
                            disabled={votingState[review.id]?.status === 'loading' || votingState[review.id]?.status === 'voted'}
                            className={`flex items-center gap-2 transition-colors ${votingState[review.id]?.vote === 'up' ? 'text-black' : 'hover:text-black'}`}
                          >
                            <ThumbsUp className={`w-4 h-4 ${votingState[review.id]?.vote === 'up' ? 'fill-current' : ''}`} />
                            <span className="font-bold">{review.up_votes || 0}</span>
                          </button>
                          <button 
                            onClick={() => handleVote(review.id, 'down')}
                            disabled={votingState[review.id]?.status === 'loading' || votingState[review.id]?.status === 'voted'}
                            className={`flex items-center gap-2 transition-colors ${votingState[review.id]?.vote === 'down' ? 'text-black' : 'hover:text-black'}`}
                          >
                            <ThumbsDown className={`w-4 h-4 ${votingState[review.id]?.vote === 'down' ? 'fill-current' : ''}`} />
                            <span className="font-bold">{review.down_votes || 0}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-[#F8F8F8] border border-gray-200">
                  <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-black mb-2 tracking-tight">No reviews yet</h4>
                  <p className="text-gray-500 font-light">Be the first to share your experience with this product.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Mobile Buy Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] lg:hidden z-40">
        <button
          onClick={handleBuyNow}
          disabled={isAddingToCart || !isVariationSelected()}
          className="w-full bg-black text-white text-sm font-bold py-4 uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isAddingToCart ? <Loader2 className="w-5 h-5 animate-spin" /> : 'BUY NOW'}
        </button>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
          onClick={() => setLightboxImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-gray-300 focus:outline-none bg-white/10 rounded-full p-2 transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            <X className="w-6 h-6" />
          </button>
          <img 
            src={lightboxImage} 
            alt="Enlarged review photo" 
            className="max-w-full max-h-[90vh] object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};
