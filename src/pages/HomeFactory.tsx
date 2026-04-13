import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Factory, 
  Settings, 
  ShieldCheck, 
  Globe, 
  Cpu, 
  Wrench, 
  CheckCircle2, 
  Truck, 
  Microscope, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  ArrowRight,
  Layers,
  Zap,
  Quote,
  FileCheck2
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
        {isOpen ? <ChevronUp className="h-5 w-5 text-amber-600 flex-shrink-0" /> : <ChevronDown className="h-5 w-5 text-zinc-400 flex-shrink-0" />}
      </button>
      {isOpen && <p className="mt-3 text-zinc-600 leading-relaxed pr-8">{answer}</p>}
    </div>
  );
};

export const HomeFactory: React.FC = () => {
  return (
    <div className="bg-zinc-50 min-h-screen font-sans text-zinc-900 selection:bg-amber-200 selection:text-amber-900">
      <SEO 
        title="Direct Manufacturer | OEM & ODM Factory Solutions" 
        description="Your trusted global manufacturing partner. 50,000 sqm facility, ISO 9001 certified, providing end-to-end OEM & ODM services." 
      />

      {/* MODULE 1: Hero Section (Industrial Vibe) */}
      <section className="relative bg-zinc-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1565514020179-026b92b84bb6?q=80&w=2070&auto=format&fit=crop" 
            alt="Factory Production Line" 
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900/90 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-sm font-bold mb-6 border border-amber-500/30 uppercase tracking-widest">
              <Factory className="w-4 h-4" />
              <span>Direct Manufacturer</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-[1.1]">
              Your Global <span className="text-amber-500">Manufacturing</span> Partner.
            </h1>
            <p className="text-lg md:text-xl text-zinc-300 mb-10 leading-relaxed max-w-2xl font-light">
              From concept to mass production. We provide end-to-end OEM & ODM solutions with a 50,000 sqm state-of-the-art facility, rigorous quality control, and global logistics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/contact" 
                className="inline-flex justify-center items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-8 py-4 rounded-none font-bold text-lg transition-colors uppercase tracking-wider"
              >
                Request a Quote <ArrowRight className="w-5 h-5" />
              </Link>
              <button 
                className="inline-flex justify-center items-center gap-2 bg-transparent hover:bg-white/10 text-white border-2 border-white/30 px-8 py-4 rounded-none font-bold text-lg transition-colors uppercase tracking-wider"
              >
                <Play className="w-5 h-5" /> Factory Tour
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 2: Factory Quick Stats */}
      <section className="bg-amber-500 text-zinc-950 py-12 border-b-8 border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-zinc-900/20">
            <div>
              <div className="text-4xl md:text-5xl font-black mb-2">25+</div>
              <div className="font-bold uppercase tracking-widest text-xs md:text-sm">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black mb-2">50k</div>
              <div className="font-bold uppercase tracking-widest text-xs md:text-sm">SQM Facility</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black mb-2">1M+</div>
              <div className="font-bold uppercase tracking-widest text-xs md:text-sm">Monthly Capacity</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black mb-2">120+</div>
              <div className="font-bold uppercase tracking-widest text-xs md:text-sm">R&D Engineers</div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 3: Core Capabilities */}
      <section className="py-20 lg:py-32 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-zinc-900 mb-6 uppercase tracking-tight">Core Capabilities</h2>
            <p className="text-lg text-zinc-600">We control the entire production ecosystem in-house, ensuring maximum efficiency, IP protection, and quality consistency.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Cpu, title: 'R&D & Engineering', desc: 'In-house industrial design, PCB layout, and mechanical engineering teams ready to bring your ideas to life.' },
              { icon: Wrench, title: 'Precision Tooling', desc: 'Advanced CNC machining and injection molding. We design and manufacture custom molds with 0.01mm precision.' },
              { icon: Layers, title: 'Mass Assembly', desc: '15 automated assembly lines equipped with robotic arms, supporting high-volume, scalable manufacturing.' },
              { icon: Microscope, title: 'Testing Labs', desc: 'Comprehensive reliability testing including drop, temperature, humidity, and aging tests in our certified labs.' },
              { icon: ShieldCheck, title: 'Strict QC (QA/QC)', desc: 'IQC, IPQC, and OQC processes. Every product undergoes 100% functional testing before packaging.' },
              { icon: Truck, title: 'Global Supply Chain', desc: 'Strategic partnerships with global freight forwarders. We handle customs, EXW, FOB, or DDP shipping directly to your warehouse.' }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 border border-zinc-200 hover:border-amber-500 transition-colors group">
                <feature.icon className="w-12 h-12 text-zinc-400 mb-6 group-hover:text-amber-500 transition-colors" strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-zinc-900 mb-3 uppercase tracking-wide">{feature.title}</h3>
                <p className="text-zinc-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULE 4: The OEM / ODM Process */}
      <section className="py-20 lg:py-32 bg-zinc-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight">How We Work</h2>
            <p className="text-lg text-zinc-400">A transparent, milestone-driven process from your initial sketch to the final container loading.</p>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-12 left-0 w-full h-1 bg-zinc-800 z-0"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 relative z-10">
              {[
                { step: '01', title: 'Concept & Design', desc: 'Submit your requirements. Our engineers will provide DFM (Design for Manufacturing) feedback within 48 hours.' },
                { step: '02', title: 'Prototyping', desc: 'We create 3D printed or CNC machined working prototypes for your approval before opening molds.' },
                { step: '03', title: 'Tooling & Trial', desc: 'Custom molds are fabricated. We run a small batch (EVT/DVT) to verify the production process and quality.' },
                { step: '04', title: 'Mass Production', desc: 'Full-scale manufacturing begins. Real-time updates and inspection reports are provided throughout.' }
              ].map((item, idx) => (
                <div key={idx} className="relative flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-zinc-950 border-4 border-amber-500 text-amber-500 rounded-full flex items-center justify-center text-3xl font-black mb-6 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3 uppercase tracking-wider">{item.title}</h3>
                  <p className="text-zinc-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 5: Factory Tour / Gallery */}
      <section className="py-20 bg-white border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-black text-zinc-900 mb-4 uppercase tracking-tight">Inside Our Facility</h2>
              <p className="text-lg text-zinc-600">Take a look at our modern production lines, clean rooms, and automated equipment.</p>
            </div>
            <button className="flex items-center gap-2 text-amber-600 font-bold hover:text-amber-700 uppercase tracking-wider">
              View Full Gallery <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="relative group overflow-hidden bg-zinc-100 aspect-video lg:aspect-square">
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" alt="Lab" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <span className="text-white font-bold uppercase tracking-wider">R&D Laboratory</span>
              </div>
            </div>
            <div className="relative group overflow-hidden bg-zinc-100 aspect-video lg:aspect-square">
              <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop" alt="Assembly" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <span className="text-white font-bold uppercase tracking-wider">Automated Assembly</span>
              </div>
            </div>
            <div className="relative group overflow-hidden bg-zinc-100 aspect-video lg:aspect-square">
              <img src="https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=2070&auto=format&fit=crop" alt="Warehouse" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <span className="text-white font-bold uppercase tracking-wider">Smart Warehouse</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 6: Certifications & Compliance */}
      <section className="py-16 bg-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/3">
              <h2 className="text-2xl md:text-3xl font-black text-zinc-900 mb-4 uppercase tracking-tight">Certified Quality</h2>
              <p className="text-zinc-600 mb-6">We adhere to the strictest international standards. Our facility is regularly audited by third-party agencies to ensure compliance and ethical manufacturing.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 font-bold text-zinc-800"><FileCheck2 className="w-5 h-5 text-amber-600" /> ISO 9001:2015 Quality Management</li>
                <li className="flex items-center gap-3 font-bold text-zinc-800"><FileCheck2 className="w-5 h-5 text-amber-600" /> ISO 14001 Environmental</li>
                <li className="flex items-center gap-3 font-bold text-zinc-800"><FileCheck2 className="w-5 h-5 text-amber-600" /> BSCI Social Compliance</li>
              </ul>
            </div>
            <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Placeholder Certification Badges */}
              <div className="bg-white p-6 border border-zinc-200 flex flex-col items-center justify-center aspect-square text-center">
                <Award className="w-12 h-12 text-zinc-300 mb-3" />
                <span className="font-black text-zinc-800 tracking-widest">ISO 9001</span>
              </div>
              <div className="bg-white p-6 border border-zinc-200 flex flex-col items-center justify-center aspect-square text-center">
                <Award className="w-12 h-12 text-zinc-300 mb-3" />
                <span className="font-black text-zinc-800 tracking-widest">CE</span>
              </div>
              <div className="bg-white p-6 border border-zinc-200 flex flex-col items-center justify-center aspect-square text-center">
                <Award className="w-12 h-12 text-zinc-300 mb-3" />
                <span className="font-black text-zinc-800 tracking-widest">RoHS</span>
              </div>
              <div className="bg-white p-6 border border-zinc-200 flex flex-col items-center justify-center aspect-square text-center">
                <Award className="w-12 h-12 text-zinc-300 mb-3" />
                <span className="font-black text-zinc-800 tracking-widest">FCC</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 7: Industry Applications */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-zinc-900 mb-6 uppercase tracking-tight">Industries We Serve</h2>
            <p className="text-lg text-zinc-600">Our manufacturing expertise spans across multiple high-demand sectors.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Consumer Electronics', icon: Zap },
              { title: 'Smart Home & IoT', icon: Globe },
              { title: 'Industrial Equipment', icon: Settings },
              { title: 'Automotive Parts', icon: Truck },
            ].map((industry, idx) => (
              <div key={idx} className="bg-zinc-50 p-8 border border-zinc-200 text-center hover:bg-zinc-900 hover:text-white transition-colors group cursor-pointer">
                <industry.icon className="w-12 h-12 text-amber-500 mx-auto mb-4" strokeWidth={1.5} />
                <h3 className="text-lg font-bold uppercase tracking-wider">{industry.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULE 8: Global Logistics */}
      <section className="py-20 bg-zinc-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-sm font-bold mb-6 border border-amber-500/30 uppercase tracking-widest">
                <Globe className="w-4 h-4" />
                <span>Worldwide Export</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight">Seamless Global Logistics</h2>
              <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                Located near major international ports, we offer highly efficient export services. Whether you need air freight for urgent prototypes or sea freight for mass production, our logistics team handles it all.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-amber-500 flex-shrink-0" />
                  <span className="text-zinc-300 font-medium">FOB, CIF, EXW, and DDP terms supported</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-amber-500 flex-shrink-0" />
                  <span className="text-zinc-300 font-medium">Customs clearance and documentation handling</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-amber-500 flex-shrink-0" />
                  <span className="text-zinc-300 font-medium">Drop-shipping directly to Amazon FBA warehouses</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              {/* Abstract Map Placeholder */}
              <div className="aspect-square rounded-full border border-zinc-800 flex items-center justify-center relative p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 to-transparent rounded-full"></div>
                <Globe className="w-full h-full text-zinc-800" strokeWidth={0.5} />
                
                {/* Ping animations for ports */}
                <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-amber-500 rounded-full animate-ping"></div>
                <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-amber-500 rounded-full animate-ping" style={{ animationDelay: '0.5s'}}></div>
                <div className="absolute bottom-1/3 left-1/2 w-5 h-5 bg-amber-500 rounded-full animate-ping" style={{ animationDelay: '1s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 9: B2B Client Testimonials */}
      <section className="py-20 lg:py-32 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-zinc-900 mb-4 uppercase tracking-tight">Trusted by Brands</h2>
            <p className="text-lg text-zinc-600">Hear from the companies that outsource their manufacturing to us.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 border border-zinc-200 relative">
              <Quote className="absolute top-8 right-8 w-12 h-12 text-zinc-100" />
              <p className="text-lg text-zinc-700 italic mb-8 leading-relaxed relative z-10">
                "Finding a reliable OEM partner was our biggest hurdle. Since partnering with them, our defect rate dropped to near zero, and they consistently meet our aggressive holiday season deadlines."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-900 text-white rounded-none flex items-center justify-center font-bold">
                  JD
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 uppercase tracking-wider">James D.</h4>
                  <p className="text-sm text-zinc-500">Supply Chain Director, TechBrand USA</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 border border-zinc-200 relative">
              <Quote className="absolute top-8 right-8 w-12 h-12 text-zinc-100" />
              <p className="text-lg text-zinc-700 italic mb-8 leading-relaxed relative z-10">
                "Their R&D team is phenomenal. We came to them with just a rough concept, and they handled the industrial design, tooling, and mass production flawlessly. A true turnkey solution."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-900 text-white rounded-none flex items-center justify-center font-bold">
                  MK
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 uppercase tracking-wider">Maria K.</h4>
                  <p className="text-sm text-zinc-500">Founder, Innovate European</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 10: FAQ Section */}
      <section className="py-20 lg:py-32 bg-white border-t border-zinc-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-zinc-900 mb-4 uppercase tracking-tight">Factory FAQ</h2>
            <p className="text-lg text-zinc-600">Common questions about our manufacturing capabilities.</p>
          </div>

          <div className="space-y-2">
            <FaqItem 
              question="What is your Minimum Order Quantity (MOQ)?" 
              answer="For standard OEM products, our MOQ is typically 1,000 units. For fully custom ODM projects requiring new molds, the MOQ starts at 3,000 units to offset tooling costs." 
            />
            <FaqItem 
              question="How do you protect my Intellectual Property (IP)?" 
              answer="We take IP protection very seriously. We sign strict Non-Disclosure Agreements (NDAs) and NNN agreements before you share any designs. Our facility also has restricted access zones for proprietary projects." 
            />
            <FaqItem 
              question="What is the typical lead time for a new product?" 
              answer="Tooling and prototyping usually take 25-35 days. Once the golden sample is approved, mass production takes 30-45 days depending on component availability and order volume." 
            />
            <FaqItem 
              question="Do you provide product packaging design?" 
              answer="Yes, we have an in-house packaging design team. We can source and manufacture retail-ready packaging, manuals, and inserts according to your brand guidelines." 
            />
            <FaqItem 
              question="Can I visit the factory?" 
              answer="Absolutely. We welcome clients to visit our facility. If you cannot travel, we also offer live virtual video tours of our production lines and testing labs." 
            />
          </div>
        </div>
      </section>

      {/* MODULE 11: Final CTA Section */}
      <section className="py-24 bg-amber-500 text-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight">Start Your Production</h2>
          <p className="text-xl text-zinc-900/80 mb-10 font-medium">
            Send us your CAD files, BOM, or just a rough idea. Our engineers will get back to you with a quote within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/contact" 
              className="bg-zinc-950 text-white hover:bg-zinc-800 px-10 py-5 rounded-none font-black text-lg transition-colors uppercase tracking-widest shadow-2xl"
            >
              Get a Free Quote
            </Link>
            <a 
              href="mailto:oem@factory.com" 
              className="inline-flex justify-center items-center gap-2 bg-transparent hover:bg-zinc-950/10 text-zinc-950 px-10 py-5 rounded-none font-black text-lg transition-colors border-4 border-zinc-950 uppercase tracking-widest"
            >
              Email Drawings
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
