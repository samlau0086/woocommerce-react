import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Car, 
  Wrench, 
  ShieldCheck, 
  Truck, 
  Settings, 
  Zap, 
  Battery, 
  Disc, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  Star, 
  PhoneCall, 
  MapPin, 
  CheckCircle2,
  Package,
  Clock,
  Award
} from 'lucide-react';
import { SEO } from '../components/SEO';

// FAQ Component
const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-zinc-200 py-5">
      <button 
        className="flex w-full items-center justify-between text-left font-semibold text-zinc-900 focus:outline-none text-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp className="h-5 w-5 text-red-600 flex-shrink-0" /> : <ChevronDown className="h-5 w-5 text-zinc-400 flex-shrink-0" />}
      </button>
      {isOpen && <p className="mt-3 text-zinc-600 leading-relaxed pr-8">{answer}</p>}
    </div>
  );
};

export const HomeAutoParts: React.FC = () => {
  return (
    <div className="bg-zinc-50 min-h-screen font-sans text-zinc-900 selection:bg-red-200 selection:text-red-900">
      <SEO 
        title="Wholesale Auto Parts Supplier | OEM & Aftermarket" 
        description="Your trusted B2B auto parts distributor. Over 500,000 parts in stock, same-day shipping, and exclusive pricing for repair shops." 
      />

      {/* MODULE 1: Hero Section with Vehicle Selector */}
      <section className="relative bg-zinc-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=2074&auto=format&fit=crop" 
            alt="Auto Parts Warehouse" 
            className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/80 via-zinc-900/90 to-zinc-950"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-red-600/20 text-red-400 text-sm font-bold mb-6 border border-red-500/30 uppercase tracking-widest">
                <Wrench className="w-4 h-4" />
                <span>B2B Auto Parts Distributor</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-[1.1] text-white">
                The Right Part. <br/>
                <span className="text-red-500">Right Now.</span>
              </h1>
              <p className="text-lg md:text-xl text-zinc-300 mb-8 leading-relaxed font-medium">
                Over 500,000 OEM and premium aftermarket parts in stock. Exclusive wholesale pricing and same-day dispatch for repair shops and dealerships.
              </p>
              <div className="flex items-center gap-6 text-sm font-bold text-zinc-400 uppercase tracking-wider">
                <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-red-500" /> Exact Fit Guarantee</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-red-500" /> Net 30 Terms</span>
              </div>
            </div>

            {/* Vehicle Selector Widget */}
            <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 border-t-4 border-red-600 relative">
              <div className="absolute -top-4 right-8 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                Pro Search
              </div>
              <h2 className="text-2xl font-black text-zinc-900 mb-6 flex items-center gap-2">
                <Search className="w-6 h-6 text-red-600" /> Find Your Parts
              </h2>
              
              {/* Tabs */}
              <div className="flex border-b border-zinc-200 mb-6">
                <button className="px-4 py-2 border-b-2 border-red-600 text-red-600 font-bold">By Vehicle</button>
                <button className="px-4 py-2 border-b-2 border-transparent text-zinc-500 font-medium hover:text-zinc-700">By VIN / Part #</button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-zinc-700 mb-1">1. Select Year</label>
                  <select className="w-full bg-zinc-50 border border-zinc-300 text-zinc-900 rounded-lg focus:ring-red-500 focus:border-red-500 block p-3 font-medium cursor-pointer">
                    <option>Select Year</option>
                    <option>2024</option>
                    <option>2023</option>
                    <option>2022</option>
                    <option>2021</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-zinc-700 mb-1">2. Select Make</label>
                  <select disabled className="w-full bg-zinc-100 border border-zinc-200 text-zinc-400 rounded-lg block p-3 font-medium cursor-not-allowed">
                    <option>Select Make</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-zinc-700 mb-1">3. Select Model</label>
                  <select disabled className="w-full bg-zinc-100 border border-zinc-200 text-zinc-400 rounded-lg block p-3 font-medium cursor-not-allowed">
                    <option>Select Model</option>
                  </select>
                </div>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-lg py-4 rounded-lg mt-4 transition-colors shadow-lg shadow-red-600/30 flex items-center justify-center gap-2">
                  Show Parts <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 2: Trust Bar */}
      <section className="bg-zinc-950 border-b border-zinc-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale">
            {/* Placeholder Brands */}
            <div className="text-xl font-black font-sans tracking-tighter text-white">BOSCH</div>
            <div className="text-xl font-black font-serif italic text-white">Brembo</div>
            <div className="text-xl font-black font-mono text-white">NGK</div>
            <div className="text-xl font-black font-sans tracking-widest text-white">DENSO</div>
            <div className="text-xl font-black font-sans text-white">ACDelco</div>
            <div className="text-xl font-black font-serif text-white">Castrol</div>
          </div>
        </div>
      </section>

      {/* MODULE 3: Top Categories */}
      <section className="py-20 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-2">Shop by Category</h2>
              <p className="text-zinc-600 font-medium">Everything your shop needs, from routine maintenance to heavy repairs.</p>
            </div>
            <Link to="/shop" className="hidden md:flex items-center gap-2 text-red-600 font-bold hover:text-red-700">
              View All Categories <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Brakes & Rotors', icon: Disc },
              { name: 'Engine Parts', icon: Settings },
              { name: 'Filters & Oil', icon: Filter },
              { name: 'Batteries', icon: Battery },
              { name: 'Electrical', icon: Zap },
              { name: 'Suspension', icon: Car },
            ].map((cat, idx) => (
              <Link key={idx} to="/shop" className="bg-white border border-zinc-200 rounded-xl p-6 text-center hover:border-red-500 hover:shadow-lg transition-all group">
                <div className="w-16 h-16 mx-auto bg-zinc-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-50 transition-colors">
                  <cat.icon className="w-8 h-8 text-zinc-700 group-hover:text-red-600 transition-colors" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-zinc-900 text-sm">{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MODULE 4: The B2B Advantage */}
      <section className="py-20 bg-white border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-4">Built for Auto Professionals</h2>
            <p className="text-lg text-zinc-600">We know that bay time is money. Our wholesale program is designed to keep your mechanics turning wrenches, not waiting on parts.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-50 p-8 rounded-2xl border border-zinc-100">
              <div className="w-14 h-14 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-6">
                <Truck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-zinc-900 mb-3">Hot-Shot Delivery</h3>
              <p className="text-zinc-600 leading-relaxed">
                Local shops get access to our fleet for 2-hour delivery windows. National accounts enjoy guaranteed same-day dispatch on orders placed before 4 PM.
              </p>
            </div>

            <div className="bg-zinc-50 p-8 rounded-2xl border border-zinc-100">
              <div className="w-14 h-14 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-6">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-zinc-900 mb-3">Pro Pricing & Terms</h3>
              <p className="text-zinc-600 leading-relaxed">
                Unlock deep discounts off list price. Approved commercial accounts get Net 30 terms, volume rebates, and simplified monthly billing.
              </p>
            </div>

            <div className="bg-zinc-50 p-8 rounded-2xl border border-zinc-100">
              <div className="w-14 h-14 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-zinc-900 mb-3">Hassle-Free Cores & Returns</h3>
              <p className="text-zinc-600 leading-relaxed">
                We make core charges and warranty claims painless. Our dedicated B2B portal lets you process returns and track core credits instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 5: Featured Products (Quick Order) */}
      <section className="py-20 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-2">High-Volume Consumables</h2>
              <p className="text-zinc-600 font-medium">Stock up on the essentials your shop uses every day.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Premium Ceramic Brake Pads (Front)', sku: 'BP-8472-C', price: '$24.50', img: 'https://images.unsplash.com/photo-1600705722908-bab1e6190b05?q=80&w=2000&auto=format&fit=crop' },
              { name: 'Full Synthetic Motor Oil 5W-30 (55 Gal)', sku: 'OIL-5W30-DRUM', price: '$485.00', img: 'https://images.unsplash.com/photo-1635424710928-0544e8512eae?q=80&w=2000&auto=format&fit=crop' },
              { name: 'Heavy Duty AGM Battery (Group 48)', sku: 'BAT-AGM-48', price: '$115.00', img: 'https://images.unsplash.com/photo-1620055745167-27b231b6441b?q=80&w=2000&auto=format&fit=crop' },
              { name: 'OEM Replacement Alternator (130 Amp)', sku: 'ALT-9932-OEM', price: '$89.00', img: 'https://images.unsplash.com/photo-1486262715619-670810a0708f?q=80&w=2000&auto=format&fit=crop' },
            ].map((product, idx) => (
              <div key={idx} className="bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="h-48 bg-zinc-100 overflow-hidden relative">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 right-2 bg-zinc-900 text-white text-xs font-bold px-2 py-1 rounded">
                    In Stock
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-xs font-mono text-zinc-500 mb-1">SKU: {product.sku}</div>
                  <h3 className="font-bold text-zinc-900 mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex justify-between items-center mt-4">
                    <div className="font-black text-xl text-red-600">{product.price}</div>
                    <button className="bg-zinc-900 hover:bg-red-600 text-white p-2 rounded transition-colors">
                      <Package className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULE 6: Shop Management Integration */}
      <section className="py-20 bg-zinc-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-red-600/20 rounded-2xl transform -translate-x-4 translate-y-4 blur-xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop" 
                alt="Shop Management Software" 
                className="relative rounded-2xl shadow-2xl border border-zinc-700 z-10"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-zinc-800 text-zinc-300 text-xs font-bold mb-6 border border-zinc-700 uppercase tracking-widest">
                <Settings className="w-4 h-4 text-red-500" />
                <span>API & Integrations</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">Connect Directly to Your Shop Management System.</h2>
              <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                Stop double-entering data. Our catalog integrates directly with leading Shop Management Systems (SMS) like Mitchell 1, ShopKey, and Tekmetric.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0" />
                  <span className="text-zinc-300 font-medium">Look up parts and check local inventory directly from your RO.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0" />
                  <span className="text-zinc-300 font-medium">Order parts with one click without leaving your software.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0" />
                  <span className="text-zinc-300 font-medium">Automated invoice syncing to QuickBooks.</span>
                </li>
              </ul>
              <button className="bg-transparent hover:bg-zinc-800 text-white border-2 border-zinc-600 px-6 py-3 rounded-lg font-bold transition-colors">
                View Supported Software
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 7: Testimonials */}
      <section className="py-20 bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-4">Trusted by 5,000+ Repair Shops</h2>
            <p className="text-lg text-zinc-600">See why independent mechanics and dealership service centers rely on us.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-zinc-200 relative">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />)}
              </div>
              <p className="text-lg text-zinc-700 italic mb-8 leading-relaxed font-medium">
                "Their hot-shot delivery is a lifesaver. When I have a car on the lift taking up space, I know I can get the right alternator delivered in under 2 hours. Their catalog accuracy is the best in the business."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-200 rounded-full flex items-center justify-center font-black text-zinc-600">
                  MT
                </div>
                <div>
                  <h4 className="font-black text-zinc-900">Mike Thompson</h4>
                  <p className="text-sm text-zinc-500 font-medium">Owner, Thompson Auto Repair</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-2xl shadow-sm border border-zinc-200 relative">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />)}
              </div>
              <p className="text-lg text-zinc-700 italic mb-8 leading-relaxed font-medium">
                "The B2B pricing structure has significantly improved our margins on brake and suspension jobs. Plus, handling core returns through their online portal saves my service writers hours every week."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-200 rounded-full flex items-center justify-center font-black text-zinc-600">
                  RJ
                </div>
                <div>
                  <h4 className="font-black text-zinc-900">Rick Jenkins</h4>
                  <p className="text-sm text-zinc-500 font-medium">Service Manager, City Ford</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 8: FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-zinc-600">Common questions about our wholesale program.</p>
          </div>

          <div className="space-y-2">
            <FaqItem 
              question="How do I qualify for a wholesale account?" 
              answer="Wholesale accounts are available to registered automotive businesses, including repair shops, dealerships, fleet managers, and mobile mechanics. You will need to provide a valid business license and tax ID during registration." 
            />
            <FaqItem 
              question="How does your core return process work?" 
              answer="Core returns are simple. When you order a part with a core charge, it's billed to your account. Once you return the old part in the original box to our driver or via our prepaid shipping label, the credit is instantly applied to your account." 
            />
            <FaqItem 
              question="What is your warranty policy?" 
              answer="We pass through the full manufacturer warranty on all parts. Many of our premium aftermarket lines include a limited lifetime warranty. We also offer a labor claim program for approved commercial accounts if a defective part causes a comeback." 
            />
            <FaqItem 
              question="Do you deliver to my area?" 
              answer="We offer local hot-shot delivery (1-2 hours) within a 50-mile radius of our distribution centers. For national accounts, we offer guaranteed next-day delivery via UPS/FedEx on orders placed before 4 PM EST." 
            />
          </div>
        </div>
      </section>

      {/* MODULE 9: Final CTA Section */}
      <section className="py-20 bg-red-600 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-700/50 rounded-3xl p-8 md:p-16 border border-red-500/30 text-center shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Open Your Commercial Account Today</h2>
            <p className="text-xl text-red-100 mb-10 max-w-2xl mx-auto font-medium">
              Join the network of professionals who demand the best parts, pricing, and service. Approval takes less than 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
              <Link 
                to="/contact" 
                className="bg-zinc-900 text-white hover:bg-zinc-800 px-8 py-4 rounded-lg font-black text-lg transition-colors shadow-xl flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                Apply for Wholesale
              </Link>
              <a 
                href="tel:+18001234567" 
                className="inline-flex justify-center items-center gap-2 bg-transparent hover:bg-red-800 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors border-2 border-red-400"
              >
                <PhoneCall className="w-5 h-5" /> Call Commercial Sales
              </a>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-red-200 text-sm font-bold">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>No minimum order required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Instant access to catalog pricing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
