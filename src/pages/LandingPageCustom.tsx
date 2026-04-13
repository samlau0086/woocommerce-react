import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { getProductBySlug, isApiConfigured } from '../services/api';
import { useCart } from '../context/CartContext';
import { 
  Loader2, ArrowRight, Star, Shield, Zap, Heart, 
  CheckCircle2, ChevronDown, ChevronUp, ChevronLeft, 
  ChevronRight, Play, X as XIcon, Check
} from 'lucide-react';
import { decodeHtml } from '../utils/html';
import { PriceDisplay } from '../components/PriceDisplay';
import { SEO } from '../components/SEO';

// --- Reusable Modules ---

// 1. FAQ Component
const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        className="flex w-full items-center justify-between text-left font-medium text-gray-900 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
      </button>
      {isOpen && <p className="mt-2 text-gray-600 leading-relaxed">{answer}</p>}
    </div>
  );
};

// 2. Image Slider Component
const ImageSlider = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const next = () => setCurrentIndex((i) => (i + 1) % images.length);
  const prev = () => setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  
  if (!images || images.length === 0) return null;
  
  return (
    <div className="relative w-full aspect-square rounded-3xl overflow-hidden group bg-gray-50">
      <img 
        src={images[currentIndex]} 
        alt={`Slide ${currentIndex + 1}`} 
        className="w-full h-full object-contain mix-blend-multiply p-4 transition-opacity duration-300" 
      />
      
      {images.length > 1 && (
        <>
          <button 
            onClick={prev} 
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 shadow-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
          >
            <ChevronLeft className="w-6 h-6 text-gray-900" />
          </button>
          <button 
            onClick={next} 
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 shadow-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
          >
            <ChevronRight className="w-6 h-6 text-gray-900" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${idx === currentIndex ? 'bg-indigo-600' : 'bg-gray-300 hover:bg-gray-400'}`} 
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export const LandingPageCustom: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!isApiConfigured || !slug) {
        setLoading(false);
        return;
      }
      try {
        const data = await getProductBySlug(slug);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  const handleBuyNow = () => {
    if (!product) return;
    setIsAddingToCart(true);
    
    setTimeout(() => {
      addToCart(product, 1);
      setIsAddingToCart(false);
      navigate('/checkout');
    }, 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <button onClick={() => navigate('/shop')} className="text-indigo-600 hover:underline">Return to Shop</button>
        </div>
      </div>
    );
  }

  const productName = decodeHtml(product.name);
  const activeImage = product.images[0]?.src || 'https://placehold.co/800x800?text=Product+Image';
  const sliderImages = product.images?.length > 0 
    ? product.images.map(img => img.src) 
    : ['https://placehold.co/800x800?text=Product+Image', 'https://placehold.co/800x800?text=Angle+2', 'https://placehold.co/800x800?text=Angle+3'];

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
      <SEO title={`${productName} - Official Site`} />

      {/* Minimalist Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="font-black text-xl tracking-tight text-indigo-950">{productName}</div>
          <button 
            onClick={handleBuyNow}
            className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Buy Now
          </button>
        </div>
      </header>

      {/* MODULE 1: Hero Section with Slider */}
      <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Hero Copy */}
            <div className="max-w-2xl order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold mb-6">
                <Star className="w-4 h-4 fill-current" />
                <span>Over 10,000+ Happy Customers</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 leading-[1.1]">
                The only <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">solution</span> you'll ever need.
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Stop struggling with [Common Problem]. Our revolutionary {productName} is designed to make your life easier, faster, and better.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <button
                  onClick={handleBuyNow}
                  disabled={isAddingToCart}
                  className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-bold py-4 px-8 rounded-2xl shadow-lg shadow-indigo-200 transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  {isAddingToCart ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Get Yours Today'}
                  <ArrowRight className="w-5 h-5" />
                </button>
                <div className="text-left sm:ml-4">
                  <PriceDisplay priceHtml={product.price_html} className="text-2xl font-black text-gray-900" />
                  <p className="text-sm text-gray-500 font-medium">Free shipping & 30-day guarantee</p>
                </div>
              </div>
            </div>

            {/* Hero Image Slider */}
            <div className="relative order-1 lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 to-purple-50 rounded-full blur-3xl opacity-70 transform scale-110"></div>
              <div className="relative z-10 shadow-2xl rounded-3xl bg-white p-2 border border-gray-100">
                <ImageSlider images={sliderImages} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 2: Social Proof Logos */}
      <section className="border-y border-gray-100 bg-gray-50 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">As featured in</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale">
            <div className="text-xl font-black font-serif">TechCrunch</div>
            <div className="text-xl font-black font-sans">WIRED</div>
            <div className="text-xl font-black font-serif italic">Forbes</div>
            <div className="text-xl font-black font-sans tracking-tighter">GQ</div>
          </div>
        </div>
      </section>

      {/* MODULE 3: Stats Banner */}
      <section className="py-12 bg-indigo-600 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-indigo-500/50">
            <div>
              <div className="text-4xl font-black mb-1">10k+</div>
              <div className="text-indigo-200 text-xs font-bold uppercase tracking-widest">Units Sold</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-1">4.9/5</div>
              <div className="text-indigo-200 text-xs font-bold uppercase tracking-widest">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-1">30</div>
              <div className="text-indigo-200 text-xs font-bold uppercase tracking-widest">Day Guarantee</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-1">24/7</div>
              <div className="text-indigo-200 text-xs font-bold uppercase tracking-widest">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 4: Video / VSL Placeholder */}
      <section className="py-20 lg:py-32 bg-gray-900 text-white text-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">See it in action</h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">Watch how {productName} can transform your workflow in less than 2 minutes.</p>
          
          <div className="relative w-full aspect-video bg-gray-800 rounded-3xl overflow-hidden flex items-center justify-center cursor-pointer group border border-gray-700 shadow-2xl">
            <img src={activeImage} alt="Video thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-30 transition-opacity mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
            
            <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center z-10 group-hover:scale-110 transition-transform shadow-[0_0_40px_rgba(79,70,229,0.5)]">
              <Play className="w-10 h-10 text-white ml-2" fill="currentColor" />
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 5: Benefits Grid */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Why choose {productName}?</h2>
            <p className="text-xl text-gray-600">We've completely re-engineered the way you approach [Task/Problem]. Here is what makes it special.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Experience unprecedented speed. Our product works 10x faster than traditional alternatives, saving you hours every week.
              </p>
            </div>

            <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center mb-8">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Loved by Everyone</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Designed with extreme care for ergonomics and usability. It feels so natural, you'll wonder how you ever lived without it.
              </p>
            </div>

            <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-8">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Built to Last</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Crafted from aerospace-grade materials. We are so confident in our durability that we include a lifetime warranty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 6: Comparison Table (Us vs Them) */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">The difference is clear</h2>
            <p className="text-xl text-gray-600">See how we stack up against the competition.</p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200 p-6 md:p-8 items-center">
              <div className="font-bold text-gray-400 uppercase tracking-widest text-xs md:text-sm">Feature</div>
              <div className="font-black text-indigo-600 text-center text-lg md:text-2xl">{productName}</div>
              <div className="font-bold text-gray-500 text-center text-sm md:text-lg">Regular Brands</div>
            </div>
            
            {/* Table Rows */}
            {[
              { feature: 'Material Quality', us: 'Aerospace-grade', them: 'Cheap plastic' },
              { feature: 'Setup Time', us: 'Under 60 seconds', them: '30+ minutes' },
              { feature: 'Warranty', us: 'Lifetime Guarantee', them: '1 Year Limited' },
              { feature: 'Customer Support', us: '24/7 Live Agent', them: 'Email only' },
              { feature: 'Design', us: 'Award-winning', them: 'Generic' },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-3 p-6 md:p-8 border-b border-gray-100 last:border-0 items-center hover:bg-gray-50 transition-colors">
                <div className="font-semibold text-gray-900 text-sm md:text-base">{row.feature}</div>
                <div className="text-center font-bold text-gray-900 flex flex-col items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-green-500" />
                  <span className="text-sm md:text-base">{row.us}</span>
                </div>
                <div className="text-center text-gray-500 flex flex-col items-center gap-2">
                  <XIcon className="w-6 h-6 md:w-8 md:h-8 text-red-400 opacity-50" />
                  <span className="text-sm md:text-base">{row.them}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULE 7: How it Works (Image Left, Text Right) */}
      <section className="py-20 lg:py-32 bg-indigo-950 text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-indigo-500 rounded-3xl blur-2xl opacity-20 transform -rotate-6"></div>
              <img 
                src={activeImage} 
                alt="How it works" 
                className="relative w-full rounded-3xl shadow-2xl bg-white/5 backdrop-blur-sm p-8 border border-white/10"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-5xl font-bold mb-12 leading-tight">Incredibly simple to use.</h2>
              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-600/30">1</div>
                  <div>
                    <h4 className="text-2xl font-bold mb-3">Unbox & Setup</h4>
                    <p className="text-indigo-200 text-lg leading-relaxed">Takes less than 60 seconds. No tools required. Just plug it in and you are ready to go.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-600/30">2</div>
                  <div>
                    <h4 className="text-2xl font-bold mb-3">Customize your experience</h4>
                    <p className="text-indigo-200 text-lg leading-relaxed">Adjust the settings to fit your exact needs. It adapts to your lifestyle effortlessly.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-600/30">3</div>
                  <div>
                    <h4 className="text-2xl font-bold mb-3">Enjoy the results</h4>
                    <p className="text-indigo-200 text-lg leading-relaxed">Sit back and watch as it transforms your daily routine. It's really that simple.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 8: Testimonials */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-16">Don't just take our word for it</h2>
          
          <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-xl border border-gray-100 relative">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-1 bg-white px-6 py-3 rounded-full shadow-lg border border-gray-100">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />)}
            </div>
            <p className="text-2xl md:text-3xl text-gray-800 font-medium italic mb-10 leading-relaxed">
              "Honestly, I was skeptical at first. But after using {productName} for just one week, I can't imagine going back to my old routine. It is worth every single penny. Highly recommended!"
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-xl">
                SJ
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-900 text-lg">Sarah Jenkins</p>
                <p className="text-indigo-600 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Verified Buyer
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 9: FAQ */}
      <section className="py-20 lg:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <FaqItem 
              question="How long does shipping take?" 
              answer="We process all orders within 24 hours. Standard shipping takes 3-5 business days within the US, and 7-14 days for international orders." 
            />
            <FaqItem 
              question="What is your return policy?" 
              answer="We offer a 30-day money-back guarantee. If you don't love it, simply return it within 30 days for a full refund, no questions asked." 
            />
            <FaqItem 
              question="Does it come with a warranty?" 
              answer="Yes! Every purchase includes a 1-year limited warranty covering any manufacturing defects." 
            />
            <FaqItem 
              question="Is this suitable for beginners?" 
              answer="Absolutely. We designed it to be incredibly intuitive so anyone can start using it right out of the box." 
            />
          </div>
        </div>
      </section>

      {/* MODULE 10: Final CTA */}
      <section className="py-20 lg:py-32 bg-indigo-50 border-t border-indigo-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">Ready to upgrade?</h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-12">Join thousands of happy customers. Try it risk-free today.</p>
          
          <div className="bg-white p-10 rounded-[3rem] shadow-2xl max-w-lg mx-auto border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            
            <img src={activeImage} alt={productName} className="w-48 h-48 object-contain mx-auto mb-8 mix-blend-multiply" />
            
            <div className="mb-8">
              <PriceDisplay priceHtml={product.price_html} className="text-5xl font-black text-gray-900 justify-center" />
            </div>
            
            <button
              onClick={handleBuyNow}
              disabled={isAddingToCart}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xl font-bold py-5 px-8 rounded-2xl shadow-xl shadow-indigo-200 transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              {isAddingToCart ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Complete Your Order'}
            </button>
            
            <div className="mt-8 pt-8 border-t border-gray-100">
              <ul className="space-y-3 text-sm text-gray-600 text-left max-w-xs mx-auto font-medium">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /> Free Express Shipping</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /> 30-Day Money Back Guarantee</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /> Secure 256-bit Checkout</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Buy Button (Only shows when scrolling past hero) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-gray-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] lg:hidden z-50">
        <button
          onClick={handleBuyNow}
          disabled={isAddingToCart}
          className="w-full bg-indigo-600 text-white text-lg font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2"
        >
          {isAddingToCart ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Buy Now'}
        </button>
      </div>

    </div>
  );
};
