import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Star, 
  Leaf, 
  Droplets, 
  ShieldCheck, 
  Instagram,
  ArrowUpRight,
  Recycle,
  Globe,
  Sparkles,
  Play
} from 'lucide-react';
import { SEO } from '../components/SEO';

export const HomeDTC: React.FC = () => {
  return (
    <div className="bg-[#FAF9F6] min-h-screen font-sans text-stone-900 selection:bg-stone-200 selection:text-stone-900">
      <SEO 
        title="AURA | Radically Transparent Bodycare" 
        description="Premium, science-backed bodycare made with clean ingredients. Direct to you, without the retail markup." 
      />

      {/* MODULE 1: Hero Section (Minimalist & Editorial) */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1615397323053-8b7764b8696b?q=80&w=2070&auto=format&fit=crop" 
            alt="Minimalist Skincare" 
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle gradient overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/15"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-white mb-6 drop-shadow-sm">
            Bodycare, <br className="md:hidden" /> stripped back.
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 font-light max-w-xl mx-auto drop-shadow-sm">
            Science-backed formulations. Clean ingredients. No retail markups. Just the essentials your skin actually needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/shop" 
              className="bg-white text-stone-900 hover:bg-stone-100 px-8 py-4 rounded-full font-medium text-sm uppercase tracking-widest transition-colors"
            >
              Shop Best Sellers
            </Link>
            <Link 
              to="/about" 
              className="bg-transparent text-white border border-white hover:bg-white/10 px-8 py-4 rounded-full font-medium text-sm uppercase tracking-widest transition-colors"
            >
              Our Philosophy
            </Link>
          </div>
        </div>
      </section>

      {/* MODULE 2: Press Bar (Social Proof) */}
      <section className="border-b border-stone-200 bg-[#FAF9F6] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-medium text-stone-400 uppercase tracking-widest mb-8">As featured in</p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-24 opacity-60 grayscale">
            <div className="text-2xl font-serif tracking-widest">VOGUE</div>
            <div className="text-xl font-sans font-black tracking-tighter">GQ</div>
            <div className="text-2xl font-serif italic">Vanity Fair</div>
            <div className="text-xl font-sans font-bold tracking-widest">ELLE</div>
            <div className="text-2xl font-serif">Allure</div>
          </div>
        </div>
      </section>

      {/* MODULE 3: Value Props (The DTC Promise) */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center mb-6">
                <Leaf className="w-6 h-6 text-stone-600" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-medium mb-3 tracking-tight">Clean Ingredients</h3>
              <p className="text-stone-500 text-base leading-relaxed max-w-xs">
                Formulated without parabens, sulfates, or synthetic fragrances. 100% vegan and cruelty-free.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-stone-600" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-medium mb-3 tracking-tight">Direct to You</h3>
              <p className="text-stone-500 text-base leading-relaxed max-w-xs">
                We cut out the middlemen. Premium formulations at a fraction of the traditional retail price.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center mb-6">
                <Droplets className="w-6 h-6 text-stone-600" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-medium mb-3 tracking-tight">Clinically Proven</h3>
              <p className="text-stone-500 text-base leading-relaxed max-w-xs">
                Every product undergoes rigorous dermatological testing to ensure efficacy and safety for all skin types.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 4: Bestsellers (Clean Product Grid) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-stone-900 mb-4">The Essentials</h2>
              <p className="text-lg text-stone-500 font-light">Everything you need, nothing you don't.</p>
            </div>
            <Link to="/shop" className="hidden md:flex items-center gap-2 text-sm font-medium uppercase tracking-widest hover:text-stone-500 transition-colors">
              Shop All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'The Daily Cleanser', price: '$18', desc: 'Gentle pH-balanced wash', img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1974&auto=format&fit=crop' },
              { name: 'Hyaluronic Serum', price: '$24', desc: 'Multi-depth hydration', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1974&auto=format&fit=crop' },
              { name: 'Barrier Repair Cream', price: '$28', desc: 'Ceramide-rich moisturizer', img: 'https://images.unsplash.com/photo-1608248593842-8021b61cb9cb?q=80&w=2053&auto=format&fit=crop' },
              { name: 'Mineral Sunscreen SPF 50', price: '$22', desc: 'Invisible broad-spectrum', img: 'https://images.unsplash.com/photo-1556228720-192a6af4e865?q=80&w=1974&auto=format&fit=crop' },
            ].map((product, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="aspect-[4/5] bg-stone-100 overflow-hidden mb-6 relative">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                  {/* Quick Add Button (Appears on Hover) */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <button className="w-full bg-white text-stone-900 py-4 text-sm font-medium uppercase tracking-widest hover:bg-stone-900 hover:text-white transition-colors">
                      Quick Add — {product.price}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-stone-900 mb-1">{product.name}</h3>
                    <p className="text-sm text-stone-500 font-light">{product.desc}</p>
                  </div>
                  <span className="font-medium text-stone-900">{product.price}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest border-b border-stone-900 pb-1">
              Shop All Products
            </Link>
          </div>
        </div>
      </section>

      {/* MODULE 5: The Routine / Bundles (NEW - Upsell Focus) */}
      <section className="py-24 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tighter mb-6">The Core Routine.</h2>
              <p className="text-lg text-stone-400 font-light mb-10 leading-relaxed max-w-md">
                Three steps to balanced, healthy skin. We bundled our best-sellers together so you can save 15% and take the guesswork out of your daily regimen.
              </p>
              
              <div className="space-y-8 mb-12">
                <div className="flex gap-6 items-start border-b border-stone-800 pb-6">
                  <div className="text-stone-500 font-serif text-2xl italic">01</div>
                  <div>
                    <h4 className="text-xl font-medium mb-2">Cleanse</h4>
                    <p className="text-stone-400 font-light text-sm">Melt away impurities without stripping your natural moisture barrier.</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start border-b border-stone-800 pb-6">
                  <div className="text-stone-500 font-serif text-2xl italic">02</div>
                  <div>
                    <h4 className="text-xl font-medium mb-2">Treat</h4>
                    <p className="text-stone-400 font-light text-sm">Deliver concentrated active ingredients deep into the epidermis.</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="text-stone-500 font-serif text-2xl italic">03</div>
                  <div>
                    <h4 className="text-xl font-medium mb-2">Hydrate</h4>
                    <p className="text-stone-400 font-light text-sm">Lock in moisture and protect against environmental stressors.</p>
                  </div>
                </div>
              </div>
              
              <button className="bg-white text-stone-900 px-10 py-4 rounded-full font-medium text-sm uppercase tracking-widest hover:bg-stone-200 transition-colors w-full sm:w-auto text-center">
                Shop The Set — $60 <span className="line-through text-stone-500 ml-2">$70</span>
              </button>
            </div>
            <div className="order-1 lg:order-2">
              <div className="aspect-[4/5] bg-stone-800 rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=2080&auto=format&fit=crop" 
                  alt="The Core Routine Bundle" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 6: Ingredient Spotlight (NEW - Education Focus) */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-stone-900 mb-6">Nothing to hide.</h2>
            <p className="text-lg text-stone-600 font-light leading-relaxed">
              We believe you deserve to know exactly what you're putting on your skin. Our formulas highlight clinically-proven hero ingredients at their optimal concentrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-stone-100 text-center">
              <div className="w-16 h-16 mx-auto bg-stone-50 rounded-full flex items-center justify-center mb-6">
                <Droplets className="w-6 h-6 text-stone-400" />
              </div>
              <h3 className="text-xl font-medium text-stone-900 mb-2">Squalane (Olive-Derived)</h3>
              <p className="text-sm text-stone-500 uppercase tracking-widest mb-4">Hydration</p>
              <p className="text-stone-600 font-light leading-relaxed">
                Mimics your skin's natural oils to lock in weightless moisture and protect the skin barrier without clogging pores.
              </p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-stone-100 text-center">
              <div className="w-16 h-16 mx-auto bg-stone-50 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-stone-400" />
              </div>
              <h3 className="text-xl font-medium text-stone-900 mb-2">Niacinamide (Vitamin B3)</h3>
              <p className="text-sm text-stone-500 uppercase tracking-widest mb-4">Brightening</p>
              <p className="text-stone-600 font-light leading-relaxed">
                A multitasking powerhouse that visibly minimizes enlarged pores, tightens lax pores, and improves uneven skin tone.
              </p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-stone-100 text-center">
              <div className="w-16 h-16 mx-auto bg-stone-50 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-stone-400" />
              </div>
              <h3 className="text-xl font-medium text-stone-900 mb-2">Ceramides (NP, AP, EOP)</h3>
              <p className="text-sm text-stone-500 uppercase tracking-widest mb-4">Barrier Support</p>
              <p className="text-stone-600 font-light leading-relaxed">
                Lipids that help form the skin's barrier and help skin retain moisture, protecting against environmental aggressors.
              </p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Link to="/ingredients" className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest border-b border-stone-900 pb-1 hover:text-stone-500 hover:border-stone-500 transition-colors">
              Explore Our Ingredient Glossary <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* MODULE 7: The Mission (Split Layout) */}
      <section className="bg-white border-y border-stone-200">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="h-[50vh] lg:h-auto relative">
            <img 
              src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2070&auto=format&fit=crop" 
              alt="Brand Mission" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center p-12 lg:p-24 xl:p-32">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-stone-900 mb-8">
              Luxury quality.<br />Honest pricing.
            </h2>
            <p className="text-lg text-stone-600 mb-8 leading-relaxed font-light">
              Traditional beauty brands mark up their products up to 10x the actual cost to cover distributors, retailers, and celebrity marketing. 
            </p>
            <p className="text-lg text-stone-600 mb-12 leading-relaxed font-light">
              We do things differently. By selling directly to you online, we can use the exact same premium ingredients as luxury brands, but offer them at a fraction of the price.
            </p>
            <div>
              <Link to="/about" className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest border-b border-stone-900 pb-1 hover:text-stone-500 hover:border-stone-500 transition-colors">
                Read Our Story <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 8: Sustainability (NEW - Values Focus) */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-stone-900 mb-16">Good for you. Good for the planet.</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="flex flex-col items-center">
              <Recycle className="w-8 h-8 text-stone-400 mb-6" strokeWidth={1.5} />
              <h4 className="text-lg font-medium text-stone-900 mb-3">100% Recyclable</h4>
              <p className="text-stone-500 font-light text-sm leading-relaxed">
                All our bottles and jars are made from post-consumer recycled (PCR) plastic or glass.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Globe className="w-8 h-8 text-stone-400 mb-6" strokeWidth={1.5} />
              <h4 className="text-lg font-medium text-stone-900 mb-3">Carbon Neutral Shipping</h4>
              <p className="text-stone-500 font-light text-sm leading-relaxed">
                We offset 100% of carbon emissions from shipping every single order.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Leaf className="w-8 h-8 text-stone-400 mb-6" strokeWidth={1.5} />
              <h4 className="text-lg font-medium text-stone-900 mb-3">Vegan & Cruelty-Free</h4>
              <p className="text-stone-500 font-light text-sm leading-relaxed">
                Leaping Bunny certified. We never test on animals, and neither do our suppliers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 9: Founder's Note (NEW - Connection Focus) */}
      <section className="py-24 bg-white border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FAF9F6] rounded-3xl p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden flex-shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" 
                alt="Founder" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-medium tracking-tighter text-stone-900 mb-6">"I started AURA because I was tired of choosing between products that worked and products that were safe."</h3>
              <p className="text-stone-600 font-light leading-relaxed mb-8">
                For years, I struggled with sensitive skin. The products that didn't irritate my skin didn't deliver results, and the ones that worked were full of harsh chemicals. I knew there had to be a better way. AURA is the result of three years of research, working with top dermatologists to create the perfect balance of efficacy and gentleness.
              </p>
              <div className="font-serif italic text-2xl text-stone-900">
                Elena Rostova
              </div>
              <div className="text-sm text-stone-500 uppercase tracking-widest mt-2">Founder & CEO</div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 10: Real Results (Reviews Carousel/Grid) */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-stone-900 mb-4">Real skin. Real results.</h2>
            <div className="flex items-center justify-center gap-2 text-stone-900">
              <div className="flex">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <span className="font-medium">4.9/5 based on 10,000+ reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah M.', product: 'The Daily Cleanser', text: 'Finally, a cleanser that doesn\'t leave my skin feeling tight. It removes all my makeup and leaves my face feeling incredibly soft and balanced.' },
              { name: 'Jessica T.', product: 'Hyaluronic Serum', text: 'I\'ve tried serums that cost $150+ and this one outperforms them all. The texture is perfect, absorbs instantly, and my skin looks so plump.' },
              { name: 'Emily R.', product: 'Barrier Repair Cream', text: 'Saved my skin this winter. The redness is completely gone and my skin barrier feels stronger than ever. I\'m on my third jar.' },
            ].map((review, idx) => (
              <div key={idx} className="bg-white p-10 rounded-2xl shadow-sm border border-stone-100">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-stone-900 fill-current" />)}
                </div>
                <h4 className="font-medium text-stone-900 mb-1">{review.name}</h4>
                <p className="text-xs text-stone-500 uppercase tracking-widest mb-6">Verified Buyer • {review.product}</p>
                <p className="text-stone-600 font-light leading-relaxed">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULE 11: Skin Quiz CTA (NEW - Engagement Focus) */}
      <section className="py-24 bg-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-stone-900 mb-6">Not sure where to start?</h2>
          <p className="text-lg text-stone-600 font-light mb-10 max-w-2xl mx-auto">
            Take our 2-minute skin quiz. Tell us about your skin type, concerns, and goals, and we'll build a personalized routine just for you.
          </p>
          <button className="bg-stone-900 text-white px-10 py-4 rounded-full font-medium text-sm uppercase tracking-widest hover:bg-stone-800 transition-colors">
            Take The Skin Quiz
          </button>
        </div>
      </section>

      {/* MODULE 12: UGC / Instagram Feed */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-medium tracking-tighter text-stone-900">Join the community</h2>
            <p className="text-stone-500 mt-2">@aurabodycare</p>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-sm font-medium uppercase tracking-widest hover:text-stone-500 transition-colors">
            Follow Us <Instagram className="w-4 h-4" />
          </a>
        </div>
        
        {/* Horizontal scrollable grid for mobile, static for desktop */}
        <div className="flex overflow-x-auto pb-8 md:pb-0 md:grid md:grid-cols-4 gap-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto snap-x">
          {[
            'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=1974&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=1974&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=2053&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1556228720-192a6af4e865?q=80&w=1974&auto=format&fit=crop'
          ].map((img, idx) => (
            <div key={idx} className="min-w-[280px] md:min-w-0 aspect-square bg-stone-200 relative group cursor-pointer snap-center rounded-xl overflow-hidden">
              <img src={img} alt="UGC" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODULE 13: Newsletter Signup */}
      <section className="py-32 bg-stone-900 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tighter mb-6">Take 10% off your first order.</h2>
          <p className="text-stone-400 mb-12 font-light text-lg">
            Join our newsletter for early access to new launches, exclusive routines, and skincare tips. No spam, ever.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 bg-transparent border border-stone-700 rounded-full px-6 py-4 text-white placeholder:text-stone-500 focus:outline-none focus:border-white transition-colors"
              required
            />
            <button 
              type="submit" 
              className="bg-white text-stone-900 px-10 py-4 rounded-full font-medium uppercase tracking-widest text-sm hover:bg-stone-200 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};
