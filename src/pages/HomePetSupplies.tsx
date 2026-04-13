import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Dog, 
  Cat, 
  Heart, 
  ShieldCheck, 
  Package, 
  Truck, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  PhoneCall, 
  Mail, 
  Scissors,
  Home,
  ShoppingBag,
  Tags
} from 'lucide-react';
import { SEO } from '../components/SEO';

// FAQ Component
const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-teal-100 py-5">
      <button 
        className="flex w-full items-center justify-between text-left font-semibold text-slate-900 focus:outline-none text-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp className="h-5 w-5 text-orange-500 flex-shrink-0" /> : <ChevronDown className="h-5 w-5 text-teal-400 flex-shrink-0" />}
      </button>
      {isOpen && <p className="mt-3 text-slate-600 leading-relaxed pr-8">{answer}</p>}
    </div>
  );
};

export const HomePetSupplies: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900 selection:bg-orange-200 selection:text-orange-900">
      <SEO 
        title="Wholesale Pet Supplies | OEM & Dropshipping Partner" 
        description="Premium wholesale pet products for retailers, boutiques, and e-commerce brands. High margins, low MOQs, and Amazon FBA prep services." 
      />

      {/* MODULE 1: Hero Section (Playful & Professional) */}
      <section className="relative bg-teal-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2068&auto=format&fit=crop" 
            alt="Happy Dog with Toys" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-950 via-teal-900/90 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/20 text-orange-300 text-sm font-bold mb-6 border border-orange-500/30 tracking-wide uppercase">
              <Heart className="w-4 h-4 fill-orange-400 text-orange-400" />
              <span>Premium Pet Products B2B</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight text-white">
              Stock Your Shelves with <br/>
              <span className="text-orange-400">Products Pets Love.</span>
            </h1>
            <p className="text-lg md:text-xl text-teal-50 mb-10 leading-relaxed max-w-2xl font-medium">
              Your trusted wholesale partner for innovative, safe, and high-margin pet supplies. From boutique retail to Amazon FBA, we scale with your pet business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/contact" 
                className="inline-flex justify-center items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-orange-500/20"
              >
                Apply for Wholesale <ArrowRight className="w-5 h-5" />
              </Link>
              <button 
                className="inline-flex justify-center items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-xl font-bold text-lg transition-colors"
              >
                Download 2024 Catalog
              </button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-teal-100 font-bold">
              <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-orange-400" /> Low MOQs</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-orange-400" /> Amazon FBA Prep</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-orange-400" /> Blind Dropshipping</span>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 2: Trust Bar */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Supplying over 2,000+ pet businesses globally</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100">
            <div>
              <div className="text-3xl font-black text-teal-900 mb-1">2,000+</div>
              <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Retail Partners</div>
            </div>
            <div>
              <div className="text-3xl font-black text-teal-900 mb-1">500+</div>
              <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">SKUs in Stock</div>
            </div>
            <div>
              <div className="text-3xl font-black text-teal-900 mb-1">48<span className="text-xl">hr</span></div>
              <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Dispatch Time</div>
            </div>
            <div>
              <div className="text-3xl font-black text-teal-900 mb-1">100%</div>
              <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Non-Toxic Materials</div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 3: Core Categories */}
      <section className="py-20 lg:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Shop by Category</h2>
            <p className="text-lg text-slate-600 font-medium">Curated, high-demand products designed for modern pet parents.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Dog Toys', icon: Dog },
              { name: 'Cat Trees & Scratchers', icon: Cat },
              { name: 'Beds & Furniture', icon: Home },
              { name: 'Grooming Tools', icon: Scissors },
              { name: 'Bowls & Feeders', icon: Heart },
              { name: 'Travel & Carriers', icon: ShoppingBag },
            ].map((cat, idx) => (
              <Link key={idx} to="/shop" className="bg-white border border-slate-200 rounded-2xl p-6 text-center hover:border-orange-500 hover:shadow-xl transition-all group">
                <div className="w-16 h-16 mx-auto bg-teal-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-50 transition-colors">
                  <cat.icon className="w-8 h-8 text-teal-600 group-hover:text-orange-500 transition-colors" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MODULE 4: The B2B Advantage (E-commerce & Retail Focus) */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Built for Pet Businesses</h2>
            <p className="text-lg text-slate-600">Whether you run a local boutique or a massive Amazon storefront, we have the infrastructure to support your growth.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-teal-200 transition-colors">
              <div className="w-14 h-14 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center mb-6">
                <Tags className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3">High Retail Margins</h3>
              <p className="text-slate-600 leading-relaxed">
                Enjoy up to 60% margins on our wholesale catalog. We manufacture directly and cut out the middlemen so you can maximize your profits.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-teal-200 transition-colors">
              <div className="w-14 h-14 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center mb-6">
                <Package className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3">Amazon FBA Prep</h3>
              <p className="text-slate-600 leading-relaxed">
                Selling on Amazon? We offer complete FBA prep services including FNSKU labeling, poly-bagging, and direct shipping to Amazon fulfillment centers.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-teal-200 transition-colors">
              <div className="w-14 h-14 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center mb-6">
                <Truck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3">Blind Dropshipping</h3>
              <p className="text-slate-600 leading-relaxed">
                Don't want to hold inventory? Use our blind dropshipping program. We ship directly to your customers with your branding on the packing slip.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 5: Featured Wholesale Products */}
      <section className="py-20 lg:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">Trending Wholesale Items</h2>
              <p className="text-slate-600 font-medium">High-turnover products your customers will love.</p>
            </div>
            <Link to="/shop" className="hidden md:flex items-center gap-2 text-teal-600 font-bold hover:text-teal-700">
              View Full Catalog <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Calming Donut Pet Bed (M)', msrp: '$39.99', wholesale: '$14.50', img: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=2060&auto=format&fit=crop' },
              { name: 'Interactive Smart Cat Toy', msrp: '$24.99', wholesale: '$8.20', img: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80&w=2070&auto=format&fit=crop' },
              { name: 'Heavy Duty Rope Leash', msrp: '$19.99', wholesale: '$6.50', img: 'https://images.unsplash.com/photo-1605001011155-25ef848270f9?q=80&w=2070&auto=format&fit=crop' },
              { name: 'Slow Feeder Dog Bowl', msrp: '$15.99', wholesale: '$4.80', img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2068&auto=format&fit=crop' },
            ].map((product, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow border border-slate-200 group">
                <div className="h-56 bg-slate-100 overflow-hidden relative">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-teal-800 text-xs font-bold px-2 py-1 rounded-lg">
                    Best Seller
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-slate-900 mb-3 line-clamp-2">{product.name}</h3>
                  <div className="flex justify-between items-end mt-4 pt-4 border-t border-slate-100">
                    <div>
                      <div className="text-xs text-slate-500 font-bold mb-1">Wholesale</div>
                      <div className="font-black text-xl text-teal-600">{product.wholesale}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-500 font-bold mb-1">MSRP</div>
                      <div className="font-bold text-slate-400 line-through">{product.msrp}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULE 6: Private Label / OEM Process */}
      <section className="py-20 bg-teal-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-orange-500/20 rounded-3xl transform -translate-x-4 translate-y-4 blur-xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?q=80&w=2070&auto=format&fit=crop" 
                alt="Custom Pet Products" 
                className="relative rounded-3xl shadow-2xl border border-teal-700 z-10"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-800 text-teal-300 text-xs font-bold mb-6 border border-teal-700 uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" />
                <span>OEM & Private Label</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">Start Your Own Pet Brand.</h2>
              <p className="text-lg text-teal-100 mb-8 leading-relaxed">
                Want to stand out? We offer comprehensive private label services. From custom logo printing on existing products to fully custom product development from scratch.
              </p>
              <ul className="space-y-6 mb-8">
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-black flex-shrink-0 mt-1">1</div>
                  <div>
                    <span className="text-white font-bold block mb-1 text-lg">Custom Packaging & Tags</span>
                    <span className="text-teal-200">We design and print custom hang tags, belly bands, and retail boxes with your logo.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-black flex-shrink-0 mt-1">2</div>
                  <div>
                    <span className="text-white font-bold block mb-1 text-lg">Color & Material Variations</span>
                    <span className="text-teal-200">Choose custom pantone colors or specific fabrics to match your brand identity.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-black flex-shrink-0 mt-1">3</div>
                  <div>
                    <span className="text-white font-bold block mb-1 text-lg">Low OEM MOQs</span>
                    <span className="text-teal-200">Start your private label journey with MOQs as low as 500 units on select items.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 7: Testimonials */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Success Stories</h2>
            <p className="text-lg text-slate-600">Hear from the pet businesses scaling with our products.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 relative">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-orange-400 fill-current" />)}
              </div>
              <p className="text-lg text-slate-700 italic mb-8 leading-relaxed font-medium">
                "Switching to them for our boutique's inventory was the best decision. The quality of the dog beds is incredible, and our customers love the modern designs. The fact that I can order in small batches keeps my cash flow healthy."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center font-black text-teal-700">
                  SJ
                </div>
                <div>
                  <h4 className="font-black text-slate-900">Sarah Jenkins</h4>
                  <p className="text-sm text-slate-500 font-bold">Owner, Paws & Co. Boutique</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 relative">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-orange-400 fill-current" />)}
              </div>
              <p className="text-lg text-slate-700 italic mb-8 leading-relaxed font-medium">
                "Their Amazon FBA prep service is flawless. I literally just place the order, send them my FNSKU labels, and they handle the rest. My defect rate is 0%, and the margins are fantastic. A true hands-off partner."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center font-black text-teal-700">
                  MC
                </div>
                <div>
                  <h4 className="font-black text-slate-900">Mark Chen</h4>
                  <p className="text-sm text-slate-500 font-bold">E-commerce Brand Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 8: FAQ Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Wholesale FAQ</h2>
            <p className="text-lg text-slate-600">Common questions about partnering with us.</p>
          </div>

          <div className="space-y-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <FaqItem 
              question="What is your Minimum Order Value (MOV)?" 
              answer="For standard wholesale orders, our minimum order value is just $250. This allows smaller boutiques to test our products without a massive upfront investment." 
            />
            <FaqItem 
              question="Are your pet toys safe and non-toxic?" 
              answer="Safety is our #1 priority. All our toys are made from BPA-free, non-toxic materials. Our plush toys use reinforced stitching and pet-safe dyes, complying with strict US and EU safety standards." 
            />
            <FaqItem 
              question="Do you offer dropshipping?" 
              answer="Yes! We offer a blind dropshipping program for Shopify and WooCommerce store owners. We ship directly to your customer with no pricing or branding from our warehouse." 
            />
            <FaqItem 
              question="Can I sell your products on Amazon?" 
              answer="Yes, you can sell our white-label products on Amazon. We also offer full FBA prep services (poly-bagging, warning labels, FNSKU barcoding) for a small per-unit fee." 
            />
          </div>
        </div>
      </section>

      {/* MODULE 9: Final CTA Section */}
      <section className="py-20 bg-orange-500 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-orange-600/50 rounded-3xl p-8 md:p-16 border border-orange-400/30 text-center shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Grow Your Pet Business Today</h2>
            <p className="text-xl text-orange-100 mb-10 max-w-2xl mx-auto font-medium">
              Create a wholesale account to unlock exclusive pricing, volume discounts, and our full product catalog.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
              <Link 
                to="/contact" 
                className="bg-teal-900 text-white hover:bg-teal-800 px-8 py-4 rounded-xl font-black text-lg transition-colors shadow-xl flex items-center justify-center gap-2"
              >
                Create Wholesale Account
              </Link>
              <a 
                href="mailto:wholesale@petsupplies.com" 
                className="inline-flex justify-center items-center gap-2 bg-transparent hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors border-2 border-orange-300"
              >
                <Mail className="w-5 h-5" /> Contact Sales
              </a>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-orange-100 text-sm font-bold">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Instant Approval</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>No Credit Check Required</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
