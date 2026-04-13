import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Feather, 
  Palette, 
  Scissors, 
  Leaf, 
  ShieldCheck, 
  Package, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  PhoneCall, 
  Mail, 
  PenTool,
  Droplets,
  Award
} from 'lucide-react';
import { SEO } from '../components/SEO';

// FAQ Component
const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-stone-200 py-5">
      <button 
        className="flex w-full items-center justify-between text-left font-semibold text-stone-900 focus:outline-none text-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp className="h-5 w-5 text-rose-500 flex-shrink-0" /> : <ChevronDown className="h-5 w-5 text-stone-400 flex-shrink-0" />}
      </button>
      {isOpen && <p className="mt-3 text-stone-600 leading-relaxed pr-8">{answer}</p>}
    </div>
  );
};

export const HomeCosmetics: React.FC = () => {
  return (
    <div className="bg-stone-50 min-h-screen font-sans text-stone-900 selection:bg-rose-200 selection:text-rose-900">
      <SEO 
        title="Premium Cosmetic Tools Manufacturer | OEM & Private Label" 
        description="Elevate your beauty brand with our world-class cosmetic brushes, sponges, and tools. Vegan, cruelty-free, and fully customizable." 
      />

      {/* MODULE 1: Hero Section (Elegant & Aesthetic) */}
      <section className="relative bg-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1596462502278-27bf85033e5a?q=80&w=2071&auto=format&fit=crop" 
            alt="Premium Makeup Brushes" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/80 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 text-rose-300 text-sm font-medium mb-6 border border-rose-500/30 tracking-wide">
              <Sparkles className="w-4 h-4" />
              <span>Premium OEM/ODM Manufacturer</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight mb-6 leading-tight text-white">
              Crafting Exceptional <br/>
              <span className="text-rose-400 italic">Beauty Tools.</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-300 mb-10 leading-relaxed max-w-2xl font-light">
              Partner with the industry's leading manufacturer of premium makeup brushes, sponges, and accessories. We bring your beauty brand's vision to life with uncompromising quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/contact" 
                className="inline-flex justify-center items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-full font-medium text-lg transition-colors shadow-lg shadow-rose-500/20 tracking-wide"
              >
                Request Samples <ArrowRight className="w-5 h-5" />
              </Link>
              <button 
                className="inline-flex justify-center items-center gap-2 bg-transparent hover:bg-white/10 text-white border border-white/30 px-8 py-4 rounded-full font-medium text-lg transition-colors tracking-wide"
              >
                Download Catalog
              </button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-stone-300 font-medium">
              <span className="flex items-center gap-2"><Leaf className="w-4 h-4 text-rose-400" /> 100% Vegan Options</span>
              <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-rose-400" /> Cruelty-Free Certified</span>
              <span className="flex items-center gap-2"><Award className="w-4 h-4 text-rose-400" /> ISO 22716 GMP</span>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 2: Trust Bar */}
      <section className="bg-white border-b border-stone-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-stone-400 uppercase tracking-widest mb-8">Trusted manufacturing partner for global beauty brands</p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-40 grayscale">
            {/* Placeholder Brands */}
            <div className="text-2xl font-serif tracking-widest text-stone-900">LUMIÈRE</div>
            <div className="text-xl font-sans font-black tracking-tighter text-stone-900">GLOSS&CO</div>
            <div className="text-2xl font-serif italic text-stone-900">Aura Beauty</div>
            <div className="text-xl font-sans font-bold tracking-widest text-stone-900">MINIMALIST</div>
            <div className="text-2xl font-serif text-stone-900">ÉLÉGANCE</div>
          </div>
        </div>
      </section>

      {/* MODULE 3: Core Categories */}
      <section className="py-20 lg:py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">Masterfully Crafted Categories</h2>
            <p className="text-lg text-stone-600 font-light">From ultra-soft synthetic bristles to precision-engineered metal tools, our catalog covers every step of the makeup routine.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Artisan Brushes', icon: Palette, desc: 'Face, eye, and lip brushes with premium synthetic or natural hair.', img: 'https://images.unsplash.com/photo-1512496115841-545122987811?q=80&w=2070&auto=format&fit=crop' },
              { name: 'Blending Sponges', icon: Droplets, desc: 'Latex-free, ultra-soft hydrophilic polyurethane sponges.', img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=2053&auto=format&fit=crop' },
              { name: 'Precision Tools', icon: Scissors, desc: 'Eyelash curlers, tweezers, and dermaplaning razors.', img: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=2069&auto=format&fit=crop' },
              { name: 'Accessories', icon: Package, desc: 'Luxury cosmetic bags, brush cleaners, and vanity mirrors.', img: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2069&auto=format&fit=crop' },
            ].map((cat, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="relative h-80 rounded-2xl overflow-hidden mb-6">
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-stone-900/10 transition-colors"></div>
                  <div className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-rose-500">
                    <cat.icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="text-xl font-serif text-stone-900 mb-2">{cat.name}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULE 4: Private Label / OEM Process */}
      <section className="py-20 lg:py-32 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-sm font-medium mb-6">
                <PenTool className="w-4 h-4" />
                <span>Your Brand, Our Expertise</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-6 leading-tight">Turnkey Private Label Solutions.</h2>
              <p className="text-lg text-stone-600 mb-8 leading-relaxed font-light">
                We make launching your own beauty tools effortless. From selecting the perfect bristle density to custom handle pantone matching and logo stamping, our team guides you through every step.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold flex-shrink-0 mt-1">1</div>
                  <div>
                    <h4 className="text-lg font-bold text-stone-900 mb-1">Design & Selection</h4>
                    <p className="text-stone-600 text-sm">Choose from our vast white-label catalog or submit your custom 3D designs.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold flex-shrink-0 mt-1">2</div>
                  <div>
                    <h4 className="text-lg font-bold text-stone-900 mb-1">Sampling & Approval</h4>
                    <p className="text-stone-600 text-sm">We produce physical prototypes with your logo and packaging for final sign-off.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold flex-shrink-0 mt-1">3</div>
                  <div>
                    <h4 className="text-lg font-bold text-stone-900 mb-1">Mass Production</h4>
                    <p className="text-stone-600 text-sm">Rigorous QC during manufacturing, followed by global logistics to your warehouse.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 relative">
              <div className="absolute inset-0 bg-rose-100 rounded-[2rem] transform translate-x-4 translate-y-4"></div>
              <img 
                src="https://images.unsplash.com/photo-1526045612212-70caf35c14df?q=80&w=2070&auto=format&fit=crop" 
                alt="Cosmetic Formulation and Tools" 
                className="relative rounded-[2rem] shadow-xl z-10 object-cover h-[600px] w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 5: Material & Quality Focus */}
      <section className="py-20 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Uncompromising Quality</h2>
            <p className="text-lg text-stone-400 font-light">The difference is in the details. We source only the finest raw materials to ensure durability, performance, and skin safety.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-stone-800/50 p-8 rounded-2xl border border-stone-700 hover:border-rose-500/50 transition-colors">
              <Feather className="w-10 h-10 text-rose-400 mb-6" strokeWidth={1.5} />
              <h3 className="text-xl font-serif mb-3">Next-Gen Bristles</h3>
              <p className="text-stone-400 leading-relaxed text-sm">
                Our proprietary nano-synthetic fibers mimic the cuticle structure of natural animal hair, offering superior powder pickup and ultra-soft application without the cruelty.
              </p>
            </div>

            <div className="bg-stone-800/50 p-8 rounded-2xl border border-stone-700 hover:border-rose-500/50 transition-colors">
              <ShieldCheck className="w-10 h-10 text-rose-400 mb-6" strokeWidth={1.5} />
              <h3 className="text-xl font-serif mb-3">Solid Ferrules</h3>
              <p className="text-stone-400 leading-relaxed text-sm">
                We use thickened copper or aluminum ferrules with deep double-crimping technology. This ensures the brush head never detaches and prevents water damage during washing.
              </p>
            </div>

            <div className="bg-stone-800/50 p-8 rounded-2xl border border-stone-700 hover:border-rose-500/50 transition-colors">
              <Leaf className="w-10 h-10 text-rose-400 mb-6" strokeWidth={1.5} />
              <h3 className="text-xl font-serif mb-3">Sustainable Handles</h3>
              <p className="text-stone-400 leading-relaxed text-sm">
                Choose from FSC-certified sustainable wood, recycled plastics, or premium weighted brass. Finished with 7 layers of eco-friendly waterproof paint.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 6: Featured Wholesale Products */}
      <section className="py-20 lg:py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-2">Trending for Private Label</h2>
              <p className="text-stone-600 font-light">High-margin bestsellers ready for your brand's logo.</p>
            </div>
            <Link to="/shop" className="hidden md:flex items-center gap-2 text-rose-600 font-medium hover:text-rose-700">
              View Full Catalog <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: '12-Piece Pro Brush Set', moq: '500 sets', price: '$8.50 - $12.00', img: 'https://images.unsplash.com/photo-1596462502278-27bf85033e5a?q=80&w=2071&auto=format&fit=crop' },
              { name: 'Microfiber Velvet Sponge', moq: '1000 pcs', price: '$0.80 - $1.20', img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=2053&auto=format&fit=crop' },
              { name: 'Rose Gold Eyelash Curler', moq: '1000 pcs', price: '$1.50 - $2.10', img: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=2069&auto=format&fit=crop' },
              { name: 'Kabuki Foundation Brush', moq: '500 pcs', price: '$2.20 - $3.50', img: 'https://images.unsplash.com/photo-1512496115841-545122987811?q=80&w=2070&auto=format&fit=crop' },
            ].map((product, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow border border-stone-100 group">
                <div className="h-64 bg-stone-100 overflow-hidden relative">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-stone-900 mb-2">{product.name}</h3>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-stone-100">
                    <div>
                      <div className="text-xs text-stone-500 uppercase tracking-wider mb-1">Est. Price</div>
                      <div className="font-medium text-rose-600">{product.price}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-stone-500 uppercase tracking-wider mb-1">MOQ</div>
                      <div className="font-medium text-stone-900">{product.moq}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULE 7: Client Testimonials */}
      <section className="py-20 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">Loved by Founders</h2>
            <p className="text-lg text-stone-600 font-light">Hear from the beauty brands that have scaled with our manufacturing support.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-stone-50 p-10 rounded-3xl relative">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-rose-400 fill-current" />)}
              </div>
              <p className="text-lg text-stone-700 italic mb-8 leading-relaxed">
                "Finding a manufacturer that truly understood our commitment to vegan, cruelty-free materials was tough. Their nano-synthetic bristles are softer than natural hair, and our customers are obsessed. The custom rose-gold ferrules turned out perfectly."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-stone-200 rounded-full overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop" alt="Client" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900">Elena Rodriguez</h4>
                  <p className="text-sm text-stone-500">Founder, Glow & Co. Beauty</p>
                </div>
              </div>
            </div>

            <div className="bg-stone-50 p-10 rounded-3xl relative">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-rose-400 fill-current" />)}
              </div>
              <p className="text-lg text-stone-700 italic mb-8 leading-relaxed">
                "As a startup, their low MOQ for custom logo printing was a lifesaver. The communication during the sampling phase was excellent, and the final mass production was delivered two weeks ahead of schedule. Highly recommended partner."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-stone-200 rounded-full overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop" alt="Client" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900">Sarah Jenkins</h4>
                  <p className="text-sm text-stone-500">Purchasing Director, Minimalist Cosmetics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 8: FAQ Section */}
      <section className="py-20 lg:py-32 bg-stone-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-stone-600 font-light">Everything you need to know about starting your OEM project.</p>
          </div>

          <div className="space-y-2">
            <FaqItem 
              question="What is your Minimum Order Quantity (MOQ)?" 
              answer="For in-stock white-label items with your custom logo printed, our MOQ is just 500 pieces. For fully custom designs (custom handle shapes, specific bristle dyeing), the MOQ is typically 3,000 pieces." 
            />
            <FaqItem 
              question="Can I get samples before placing a bulk order?" 
              answer="Yes, absolutely. We can provide pre-production samples with your logo. Sample fees are typically $50-$100 depending on the complexity, which is fully refunded when you place the mass production order." 
            />
            <FaqItem 
              question="Are your products cruelty-free and vegan?" 
              answer="Yes. We offer a wide range of 100% vegan, synthetic bristles that perform exceptionally well. We are a cruelty-free certified facility and do not test on animals." 
            />
            <FaqItem 
              question="Do you offer custom packaging?" 
              answer="Yes, we provide end-to-end solutions. We can manufacture custom retail boxes, PU leather pouches, EVA cases, and biodegradable packaging to match your brand identity." 
            />
            <FaqItem 
              question="What is the lead time for mass production?" 
              answer="Once the pre-production sample is approved, mass production typically takes 25-35 days. Shipping time depends on your location and chosen method (air freight vs. sea freight)." 
            />
          </div>
        </div>
      </section>

      {/* MODULE 9: Final CTA Section */}
      <section className="py-24 bg-rose-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1512496115841-545122987811?q=80&w=2070&auto=format&fit=crop" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <Sparkles className="w-12 h-12 text-rose-300 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Ready to Build Your Beauty Brand?</h2>
          <p className="text-xl text-rose-200 mb-10 font-light max-w-2xl mx-auto">
            Contact our OEM specialists today. Let's discuss your vision, request samples, and get a detailed quotation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/contact" 
              className="bg-white text-rose-900 hover:bg-rose-50 px-10 py-4 rounded-full font-medium text-lg transition-colors shadow-xl flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" /> Contact Sales Team
            </Link>
            <a 
              href="tel:+18001234567" 
              className="inline-flex justify-center items-center gap-2 bg-transparent hover:bg-white/10 text-white px-10 py-4 rounded-full font-medium text-lg transition-colors border border-rose-300/50"
            >
              <PhoneCall className="w-5 h-5" /> Schedule a Call
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
