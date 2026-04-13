import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Crosshair, 
  Maximize, 
  ShieldAlert, 
  ArrowRight, 
  CheckCircle2, 
  Monitor, 
  Smartphone, 
  Layers, 
  Cpu, 
  Flame, 
  Wind,
  Star,
  ChevronDown,
  ChevronUp,
  Globe,
  Handshake
} from 'lucide-react';
import { SEO } from '../components/SEO';

// FAQ Component
const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-zinc-800 py-5">
      <button 
        className="flex w-full items-center justify-between text-left font-semibold text-zinc-100 focus:outline-none text-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp className="h-5 w-5 text-cyan-500 flex-shrink-0" /> : <ChevronDown className="h-5 w-5 text-zinc-500 flex-shrink-0" />}
      </button>
      {isOpen && <p className="mt-3 text-zinc-400 leading-relaxed pr-8">{answer}</p>}
    </div>
  );
};

export const HomeLaser: React.FC = () => {
  return (
    <div className="bg-zinc-950 min-h-screen font-sans text-zinc-100 selection:bg-cyan-900 selection:text-cyan-50">
      <SEO 
        title="NovaLaser | Professional Desktop Laser Engravers & Cutters" 
        description="High-precision diode and CO2 laser engravers for makers, small businesses, and industrial partners. OEM/ODM services available." 
      />

      {/* MODULE 1: Hero Section (High-Tech & Futuristic) */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden border-b border-zinc-800">
        {/* Glowing Background Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 text-cyan-400 text-sm font-medium mb-8 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Zap className="w-4 h-4" />
            <span>New: Nova X40 Pro with 40W Optical Power</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-tight text-white">
            Precision at the <br className="hidden md:block" />
            Speed of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Light.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
            Empower your creativity and scale your business with our industrial-grade desktop laser engravers. Designed for makers, engineered for production.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/shop" 
              className="inline-flex justify-center items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]"
            >
              Explore Machines <ArrowRight className="w-5 h-5" />
            </Link>
            <a 
              href="#b2b" 
              className="inline-flex justify-center items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
            >
              Become a Distributor
            </a>
          </div>
        </div>

        {/* Hero Product Image */}
        <div className="relative max-w-5xl mx-auto mt-20 px-4">
          <div className="aspect-video bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden relative group">
            <img 
              src="https://images.unsplash.com/photo-1620917670359-994326071d0b?q=80&w=2070&auto=format&fit=crop" 
              alt="Laser Engraver in Action" 
              className="w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700"
            />
            {/* Simulated Laser Beam */}
            <div className="absolute top-0 left-1/2 w-0.5 h-full bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,1)] animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_30px_rgba(6,182,212,1)]"></div>
          </div>
        </div>
      </section>

      {/* MODULE 2: Core Specs Bar */}
      <section className="bg-zinc-900 border-b border-zinc-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-zinc-800">
            <div>
              <div className="flex items-center justify-center gap-2 text-cyan-400 mb-2">
                <Zap className="w-5 h-5" />
              </div>
              <div className="text-2xl font-black text-white mb-1">Up to 40W</div>
              <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Optical Power</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 text-cyan-400 mb-2">
                <Crosshair className="w-5 h-5" />
              </div>
              <div className="text-2xl font-black text-white mb-1">0.01mm</div>
              <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Engraving Accuracy</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 text-cyan-400 mb-2">
                <Wind className="w-5 h-5" />
              </div>
              <div className="text-2xl font-black text-white mb-1">600mm/s</div>
              <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Max Routing Speed</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 text-cyan-400 mb-2">
                <Maximize className="w-5 h-5" />
              </div>
              <div className="text-2xl font-black text-white mb-1">400x400mm</div>
              <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Working Area</div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 3: Flagship Features */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Engineered for Perfection</h2>
            <p className="text-lg text-zinc-400">Our proprietary laser technology cuts deeper, engraves faster, and keeps you safer.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 hover:border-cyan-500/50 transition-colors group">
              <div className="w-14 h-14 bg-zinc-950 text-cyan-400 rounded-xl flex items-center justify-center mb-6 border border-zinc-800 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-shadow">
                <Cpu className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Auto-Focus Technology</h3>
              <p className="text-zinc-400 leading-relaxed">
                Say goodbye to manual Z-axis adjustments. Our smart sensor automatically detects material thickness and adjusts the focal length in seconds.
              </p>
            </div>

            <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 hover:border-cyan-500/50 transition-colors group">
              <div className="w-14 h-14 bg-zinc-950 text-cyan-400 rounded-xl flex items-center justify-center mb-6 border border-zinc-800 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-shadow">
                <Layers className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Quad-Diode Compression</h3>
              <p className="text-zinc-400 leading-relaxed">
                We combine 4 distinct 5W laser beams into a single, ultra-fine 0.08mm spot, delivering 20W of pure cutting power capable of slicing 15mm wood in one pass.
              </p>
            </div>

            <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 hover:border-cyan-500/50 transition-colors group">
              <div className="w-14 h-14 bg-zinc-950 text-cyan-400 rounded-xl flex items-center justify-center mb-6 border border-zinc-800 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-shadow">
                <Flame className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Active Flame Detection</h3>
              <p className="text-zinc-400 leading-relaxed">
                Built-in thermal sensors instantly halt operation and trigger an alarm if a flare-up is detected, ensuring your workshop remains safe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 4: Material Capabilities */}
      <section className="py-24 bg-zinc-900 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Master Any Material</h2>
              <p className="text-lg text-zinc-400">From delicate paper to tough stainless steel, unlock endless manufacturing possibilities.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Wood & Plywood', action: 'Cut & Engrave', img: 'https://images.unsplash.com/photo-1611078816664-972171582b13?q=80&w=2070&auto=format&fit=crop' },
              { name: 'Dark Acrylic', action: 'Cut & Engrave', img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop' },
              { name: 'Leather', action: 'Cut & Engrave', img: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?q=80&w=2073&auto=format&fit=crop' },
              { name: 'Stainless Steel', action: 'Engrave Only', img: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?q=80&w=2136&auto=format&fit=crop' },
            ].map((mat, idx) => (
              <div key={idx} className="group relative aspect-square overflow-hidden rounded-2xl bg-zinc-800">
                <img src={mat.img} alt={mat.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 mix-blend-luminosity group-hover:mix-blend-normal" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent flex flex-col justify-end p-6">
                  <p className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">{mat.action}</p>
                  <p className="text-white font-bold text-lg">{mat.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULE 5: Product Lineup */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Choose Your Power</h2>
            <p className="text-lg text-zinc-400">A machine for every stage of your maker journey.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Entry Level */}
            <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden flex flex-col">
              <div className="h-64 bg-zinc-800 p-8 flex items-center justify-center relative">
                <div className="absolute top-4 left-4 bg-zinc-700 text-white text-xs font-bold px-3 py-1 rounded-full">10W Diode</div>
                <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop" alt="Nova 10W" className="w-full h-full object-cover mix-blend-luminosity rounded-lg" />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-black text-white mb-2">Nova 10W</h3>
                <p className="text-zinc-400 mb-6 flex-1">Perfect for hobbyists and beginners. Excellent for engraving wood, leather, and cutting thin materials.</p>
                <div className="text-3xl font-black text-white mb-6">$399</div>
                <ul className="space-y-3 mb-8 text-sm text-zinc-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-500" /> Cuts 5mm Wood</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-500" /> 400x400mm Area</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-500" /> Fixed Focus</li>
                </ul>
                <button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 rounded-lg transition-colors">
                  View Details
                </button>
              </div>
            </div>

            {/* Pro Level */}
            <div className="bg-zinc-900 rounded-2xl border-2 border-cyan-500 overflow-hidden flex flex-col relative shadow-[0_0_30px_rgba(6,182,212,0.15)] transform md:-translate-y-4">
              <div className="absolute top-0 left-0 w-full bg-cyan-600 text-white text-xs font-bold text-center py-1 uppercase tracking-wider">
                Best Seller
              </div>
              <div className="h-64 bg-zinc-800 p-8 flex items-center justify-center relative mt-6">
                <div className="absolute top-4 left-4 bg-cyan-900 text-cyan-300 text-xs font-bold px-3 py-1 rounded-full border border-cyan-700">20W Diode</div>
                <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" alt="Nova 20W Pro" className="w-full h-full object-cover mix-blend-luminosity rounded-lg" />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-black text-white mb-2">Nova 20W Pro</h3>
                <p className="text-zinc-400 mb-6 flex-1">The sweet spot for small businesses. Fast engraving and powerful cutting capabilities.</p>
                <div className="text-3xl font-black text-white mb-6">$799</div>
                <ul className="space-y-3 mb-8 text-sm text-zinc-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-500" /> Cuts 10mm Wood</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-500" /> Auto-Focus Included</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-500" /> Air Assist Pump Included</li>
                </ul>
                <button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-lg transition-colors shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Industrial Level */}
            <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden flex flex-col">
              <div className="h-64 bg-zinc-800 p-8 flex items-center justify-center relative">
                <div className="absolute top-4 left-4 bg-zinc-700 text-white text-xs font-bold px-3 py-1 rounded-full">40W Diode</div>
                <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop" alt="Nova 40W Max" className="w-full h-full object-cover mix-blend-luminosity rounded-lg" />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-black text-white mb-2">Nova 40W Max</h3>
                <p className="text-zinc-400 mb-6 flex-1">Industrial-grade power on your desktop. Slice through thick materials with ease.</p>
                <div className="text-3xl font-black text-white mb-6">$1,299</div>
                <ul className="space-y-3 mb-8 text-sm text-zinc-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-500" /> Cuts 20mm Wood</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-500" /> Engraves Color on Metal</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-500" /> Flame Detection System</li>
                </ul>
                <button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 rounded-lg transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 6: Software Ecosystem */}
      <section className="py-24 bg-zinc-900 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Seamless Software Integration</h2>
              <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                Hardware is only half the story. Our machines are fully compatible with industry-standard software, giving you complete control over your designs.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center flex-shrink-0 border border-zinc-700">
                    <Monitor className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1">LightBurn Compatible</h4>
                    <p className="text-zinc-400 text-sm">Native support for the world's most popular laser software. Plug and play via USB or Wi-Fi.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center flex-shrink-0 border border-zinc-700">
                    <Smartphone className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1">NovaApp for Mobile</h4>
                    <p className="text-zinc-400 text-sm">Engrave photos directly from your phone. Perfect for quick jobs and market stalls.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/10 rounded-2xl transform translate-x-4 translate-y-4 blur-xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2031&auto=format&fit=crop" 
                alt="Software Interface" 
                className="relative rounded-2xl shadow-2xl border border-zinc-700 z-10 opacity-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 7: B2B / OEM Partner Program (Supplier Focus) */}
      <section id="b2b" className="py-24 bg-zinc-950 relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full"></div>
            
            <div className="relative z-10">
              <Handshake className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Global Partner Program</h2>
              <p className="text-xl text-zinc-400 mb-10 max-w-3xl mx-auto">
                We are a direct manufacturer. Join our network of distributors or leverage our OEM/ODM capabilities to build your own laser brand.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
                <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800">
                  <Globe className="w-8 h-8 text-cyan-500 mb-4" />
                  <h4 className="font-bold text-white mb-2">Wholesale Distribution</h4>
                  <p className="text-zinc-500 text-sm">Tiered pricing, local warehouse support (US/EU), and dedicated account managers.</p>
                </div>
                <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800">
                  <Layers className="w-8 h-8 text-cyan-500 mb-4" />
                  <h4 className="font-bold text-white mb-2">OEM / White Label</h4>
                  <p className="text-zinc-500 text-sm">Custom colors, logo printing, and tailored software interfaces for your brand.</p>
                </div>
                <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800">
                  <ShieldAlert className="w-8 h-8 text-cyan-500 mb-4" />
                  <h4 className="font-bold text-white mb-2">Dropshipping</h4>
                  <p className="text-zinc-500 text-sm">Zero inventory risk. We ship directly to your customers within 48 hours.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  to="/contact" 
                  className="bg-white text-zinc-900 hover:bg-zinc-200 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
                >
                  Apply to be a Partner
                </Link>
                <button className="bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700 px-8 py-4 rounded-lg font-bold text-lg transition-colors">
                  Download B2B Catalog
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 8: FAQ Section */}
      <section className="py-24 bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-zinc-400">Everything you need to know before buying.</p>
          </div>

          <div className="space-y-2">
            <FaqItem 
              question="Can diode lasers cut metal?" 
              answer="Diode lasers cannot cut metal. However, our 20W and 40W models can easily engrave on coated metals, anodized aluminum, and stainless steel (leaving a dark, permanent mark)." 
            />
            <FaqItem 
              question="Does it come assembled?" 
              answer="The machine comes 80% pre-assembled. Final assembly takes about 15-20 minutes and requires only a few screws. All necessary tools and a detailed manual are included." 
            />
            <FaqItem 
              question="Do I need to buy Air Assist separately?" 
              answer="Our Nova 20W Pro and 40W Max models include the Air Assist pump in the box. For the 10W model, it is available as an optional add-on." 
            />
            <FaqItem 
              question="What is the warranty period?" 
              answer="We offer a 1-year comprehensive warranty on all parts, including the laser module. We also provide lifetime technical support via email and our community forum." 
            />
          </div>
        </div>
      </section>

      {/* MODULE 9: Final CTA */}
      <section className="py-24 bg-cyan-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620917670359-994326071d0b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-luminosity"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <Zap className="w-12 h-12 text-cyan-300 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to upgrade your workshop?</h2>
          <p className="text-xl text-cyan-100 mb-10 font-medium max-w-2xl mx-auto">
            Join over 50,000 makers and businesses worldwide. Order today and get free shipping on all machines.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/shop" 
              className="bg-white text-cyan-900 hover:bg-zinc-100 px-10 py-4 rounded-lg font-bold text-lg transition-colors shadow-xl"
            >
              Shop Machines
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
