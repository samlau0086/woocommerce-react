import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Settings, 
  Ruler, 
  ShieldCheck, 
  CheckCircle2, 
  UploadCloud, 
  PhoneCall, 
  Factory, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  HardHat, 
  Clock,
  Mail,
  MapPin,
  Rocket,
  HeartPulse,
  Car,
  Cpu,
  Quote,
  Star,
  ListChecks,
  Wrench,
  Camera,
  Microscope
} from 'lucide-react';
import { SEO } from '../components/SEO';

// FAQ Component
const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-5">
      <button 
        className="flex w-full items-center justify-between text-left font-semibold text-slate-900 focus:outline-none text-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp className="h-5 w-5 text-blue-600 flex-shrink-0" /> : <ChevronDown className="h-5 w-5 text-slate-400 flex-shrink-0" />}
      </button>
      {isOpen && <p className="mt-3 text-slate-600 leading-relaxed pr-8">{answer}</p>}
    </div>
  );
};

export const HomeCNC: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900 selection:bg-blue-200 selection:text-blue-900">
      <SEO 
        title="Precision CNC Machining Services | Reliable Manufacturing" 
        description="ISO 9001 certified CNC machining facility. We deliver high-quality custom parts on time and on budget." 
      />

      {/* MODULE 1: Hero Section (Trustworthy & Grounded) */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" 
            alt="Real CNC Factory Floor" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-slate-900/80"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/20 text-blue-300 text-sm font-semibold mb-6 border border-blue-500/30">
              <ShieldCheck className="w-4 h-4" />
              <span>ISO 9001:2015 Certified Machine Shop</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight text-white">
              Precision CNC Machining You Can <span className="text-blue-400">Trust.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
              Real engineers. Real machines. Real results. From single prototypes to 10,000+ part production runs, we deliver high-quality custom parts on time and on budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/contact" 
                className="inline-flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg"
              >
                <UploadCloud className="w-5 h-5" /> Get a Free Quote
              </Link>
              <a 
                href="tel:+18001234567"
                className="inline-flex justify-center items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                <PhoneCall className="w-5 h-5" /> Talk to an Engineer
              </a>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-slate-300 font-medium">
              <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-blue-400" /> 100% Quality Guarantee</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-blue-400" /> Material Certifications</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-blue-400" /> Direct Factory Pricing</span>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 2: Trust Bar */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100">
            <div>
              <div className="text-3xl font-bold text-slate-900 mb-1">20+</div>
              <div className="text-sm text-slate-500 font-medium">Years in Business</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 mb-1">50+</div>
              <div className="text-sm text-slate-500 font-medium">CNC Machines</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 mb-1">99%</div>
              <div className="text-sm text-slate-500 font-medium">On-Time Delivery</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 mb-1">±0.01mm</div>
              <div className="text-sm text-slate-500 font-medium">Standard Tolerance</div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 3: The "Real Factory" Difference */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Work With Us Directly?</h2>
            <p className="text-lg text-slate-600">Skip the middlemen and cloud-broker platforms. Work directly with the people actually making your parts.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <HardHat className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Direct Engineer Contact</h3>
              <p className="text-slate-600 leading-relaxed">
                When you call us, you speak to a machinist or manufacturing engineer, not a customer service rep. We review your drawings and provide real DFM feedback.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Factory className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">No Middleman Markup</h3>
              <p className="text-slate-600 leading-relaxed">
                Because we own the machines and the facility, you get direct factory pricing. No broker fees, no hidden platform margins. Just honest, transparent quoting.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Reliable Lead Times</h3>
              <p className="text-slate-600 leading-relaxed">
                We don't outsource your job to the lowest bidder. We schedule it on our own floor, meaning we control the timeline and guarantee our delivery dates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 4: Core Machining Services */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Machining Capabilities</h2>
              <p className="text-lg text-slate-600">A fully equipped shop floor ready to handle your most demanding projects.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="group">
              <div className="aspect-video bg-slate-100 rounded-2xl mb-6 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1565439387814-1776ce353591?q=80&w=2070&auto=format&fit=crop" alt="CNC Milling" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">CNC Milling (3, 4 & 5-Axis)</h3>
              <p className="text-slate-600 mb-4">
                Our advanced milling centers can produce complex geometries, tight tolerances, and excellent surface finishes on a wide variety of materials.
              </p>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Max Workpiece: 1500 x 800 mm</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Tolerances to ±0.01mm</li>
              </ul>
            </div>

            {/* Service 2 */}
            <div className="group">
              <div className="aspect-video bg-slate-100 rounded-2xl mb-6 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop" alt="CNC Turning" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">CNC Turning & Lathe</h3>
              <p className="text-slate-600 mb-4">
                High-precision turning centers equipped with live tooling, allowing us to mill, drill, and tap cylindrical parts in a single setup.
              </p>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Max Diameter: 400 mm</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Threading & Internal Grooving</li>
              </ul>
            </div>

            {/* Service 3 */}
            <div className="group">
              <div className="aspect-video bg-slate-100 rounded-2xl mb-6 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop" alt="Wire EDM" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Wire EDM & Grinding</h3>
              <p className="text-slate-600 mb-4">
                For ultra-hard materials, sharp internal corners, and extreme precision, our Wire EDM and surface grinding departments deliver.
              </p>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Tolerances to ±0.005mm</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Hardened Steels & Carbides</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 5: Equipment List (NEW - Adds Technical Credibility) */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Equipment List</h2>
            <p className="text-lg text-slate-400">Engineers want to know what's on the floor. Here is a snapshot of our primary production equipment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-bold">Milling Centers</h3>
              </div>
              <ul className="space-y-3 text-slate-300">
                <li className="flex justify-between border-b border-slate-700 pb-2"><span>Haas VF-4 (4-Axis)</span> <span className="text-slate-500">x4</span></li>
                <li className="flex justify-between border-b border-slate-700 pb-2"><span>Haas UMC-750 (5-Axis)</span> <span className="text-slate-500">x2</span></li>
                <li className="flex justify-between border-b border-slate-700 pb-2"><span>Mazak Variaxis i-600</span> <span className="text-slate-500">x2</span></li>
                <li className="flex justify-between border-b border-slate-700 pb-2"><span>Doosan DNM 5700</span> <span className="text-slate-500">x6</span></li>
              </ul>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <Wrench className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-bold">Turning Centers</h3>
              </div>
              <ul className="space-y-3 text-slate-300">
                <li className="flex justify-between border-b border-slate-700 pb-2"><span>Mazak Quick Turn 250M</span> <span className="text-slate-500">x3</span></li>
                <li className="flex justify-between border-b border-slate-700 pb-2"><span>Haas ST-20Y (Live Tooling)</span> <span className="text-slate-500">x4</span></li>
                <li className="flex justify-between border-b border-slate-700 pb-2"><span>Doosan Puma 2600</span> <span className="text-slate-500">x3</span></li>
                <li className="flex justify-between border-b border-slate-700 pb-2"><span>Citizen Swiss Lathes</span> <span className="text-slate-500">x5</span></li>
              </ul>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <ListChecks className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-bold">Inspection & EDM</h3>
              </div>
              <ul className="space-y-3 text-slate-300">
                <li className="flex justify-between border-b border-slate-700 pb-2"><span>Zeiss Contura CMM</span> <span className="text-slate-500">x2</span></li>
                <li className="flex justify-between border-b border-slate-700 pb-2"><span>Keyence IM-8000</span> <span className="text-slate-500">x1</span></li>
                <li className="flex justify-between border-b border-slate-700 pb-2"><span>Mitsubishi Wire EDM</span> <span className="text-slate-500">x3</span></li>
                <li className="flex justify-between border-b border-slate-700 pb-2"><span>Optical Comparator</span> <span className="text-slate-500">x2</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 6: Materials & Finishes */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Materials */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Common Materials</h2>
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200">
                      <th className="py-4 px-6 font-semibold text-slate-900">Category</th>
                      <th className="py-4 px-6 font-semibold text-slate-900">Specific Grades</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-4 px-6 font-medium text-slate-900">Aluminum</td>
                      <td className="py-4 px-6 text-slate-600">6061-T6, 7075-T6, 5052, 6082</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-medium text-slate-900">Stainless Steel</td>
                      <td className="py-4 px-6 text-slate-600">304, 316/316L, 17-4 PH, 416</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-medium text-slate-900">Carbon/Alloy Steel</td>
                      <td className="py-4 px-6 text-slate-600">1018, 4140, A36, Tool Steels (D2, O1)</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-medium text-slate-900">Brass & Copper</td>
                      <td className="py-4 px-6 text-slate-600">C360 Brass, C101 Copper, Bronze</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-medium text-slate-900">Plastics</td>
                      <td className="py-4 px-6 text-slate-600">Delrin (POM), PEEK, Nylon, Polycarbonate</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-500 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Material Test Reports (MTRs) available upon request.
              </p>
            </div>

            {/* Finishes */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Surface Finishes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: 'As Machined', desc: 'Standard finish, tool marks visible.' },
                  { name: 'Bead Blasting', desc: 'Matte, uniform texture.' },
                  { name: 'Anodizing (Type II & III)', desc: 'Coloring and hard coat protection.' },
                  { name: 'Powder Coating', desc: 'Durable painted finish.' },
                  { name: 'Electroless Nickel', desc: 'Corrosion and wear resistance.' },
                  { name: 'Passivation', desc: 'For stainless steel protection.' },
                  { name: 'Polishing', desc: 'High-gloss cosmetic finish.' },
                  { name: 'Laser Engraving', desc: 'Part numbers and logos.' },
                ].map((finish, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 mb-1">{finish.name}</h4>
                    <p className="text-sm text-slate-600">{finish.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 7: Part Gallery / Recent Work (NEW - Visual Proof) */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Recent Projects</h2>
              <p className="text-lg text-slate-600">A selection of precision components manufactured in our facility.</p>
            </div>
            <Link to="/shop" className="flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700">
              <Camera className="w-5 h-5" /> View Full Gallery
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="group relative aspect-square overflow-hidden rounded-2xl bg-slate-100">
              <img src="https://images.unsplash.com/photo-1580983546224-ea917387d853?q=80&w=2067&auto=format&fit=crop" alt="Machined Aluminum Part" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <div>
                  <p className="text-white font-bold">5-Axis Impeller</p>
                  <p className="text-blue-300 text-sm">Aluminum 7075-T6</p>
                </div>
              </div>
            </div>
            <div className="group relative aspect-square overflow-hidden rounded-2xl bg-slate-100">
              <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop" alt="Turned Steel Part" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <div>
                  <p className="text-white font-bold">Precision Shaft</p>
                  <p className="text-blue-300 text-sm">Stainless Steel 316L</p>
                </div>
              </div>
            </div>
            <div className="group relative aspect-square overflow-hidden rounded-2xl bg-slate-100">
              <img src="https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?q=80&w=2136&auto=format&fit=crop" alt="Complex Milling" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <div>
                  <p className="text-white font-bold">Optical Housing</p>
                  <p className="text-blue-300 text-sm">Black Anodized 6061</p>
                </div>
              </div>
            </div>
            <div className="group relative aspect-square overflow-hidden rounded-2xl bg-slate-100">
              <img src="https://images.unsplash.com/photo-1611078816664-972171582b13?q=80&w=2070&auto=format&fit=crop" alt="Brass Component" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <div>
                  <p className="text-white font-bold">Custom Fitting</p>
                  <p className="text-blue-300 text-sm">C360 Brass</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 8: Quality Control */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Strict Quality Control</h2>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                We don't just promise quality; we measure it. Our dedicated inspection room is climate-controlled and equipped with calibrated metrology tools to ensure your parts meet the exact specifications of your drawings.
              </p>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Microscope className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">CMM Inspection</h4>
                    <p className="text-slate-400">Coordinate Measuring Machines used for verifying complex geometries and tight tolerances.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Ruler className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">First Article Inspection (FAI)</h4>
                    <p className="text-slate-400">Comprehensive AS9102 FAI reports provided for aerospace, medical, and critical production runs.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <ShieldCheck className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">ISO 9001:2015 Processes</h4>
                    <p className="text-slate-400">Documented routing, material traceability, and continuous calibration of all measuring instruments.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1581092335397-9583eb92d232?q=80&w=2070&auto=format&fit=crop" 
                alt="Quality Inspector" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-blue-600 p-6 rounded-2xl shadow-xl max-w-xs hidden md:block">
                <p className="text-white font-medium">"Quality is never an accident; it is always the result of high intention and sincere effort."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 9: Industries Served (NEW - Market Positioning) */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Industries We Serve</h2>
            <p className="text-lg text-slate-600">Manufacturing mission-critical components for demanding sectors.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center hover:shadow-md transition-shadow">
              <Rocket className="w-10 h-10 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-slate-900">Aerospace</h3>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center hover:shadow-md transition-shadow">
              <HeartPulse className="w-10 h-10 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-slate-900">Medical Devices</h3>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center hover:shadow-md transition-shadow">
              <Car className="w-10 h-10 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-slate-900">Automotive</h3>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center hover:shadow-md transition-shadow">
              <Cpu className="w-10 h-10 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-slate-900">Semiconductor</h3>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 10: The Process (NEW - How it works) */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-lg text-slate-600">A straightforward process designed to get your parts made quickly and correctly.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-slate-100 z-0"></div>
            
            {[
              { step: '1', title: 'Request Quote', desc: 'Upload your 3D CAD and 2D drawings. Tell us your material and quantity.' },
              { step: '2', title: 'DFM & Pricing', desc: 'Our engineers review your files and provide a quote within 24 hours.' },
              { step: '3', title: 'Machining', desc: 'Once approved, we program, setup, and machine your parts in-house.' },
              { step: '4', title: 'QC & Delivery', desc: 'Parts are inspected, securely packaged, and shipped to your door.' }
            ].map((item, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center bg-white">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mb-6 border-4 border-white shadow-sm">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULE 11: Testimonials (NEW - Social Proof) */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What Our Clients Say</h2>
            <p className="text-lg text-slate-600">Don't just take our word for it. Hear from the engineers who rely on us.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 relative">
              <Quote className="absolute top-10 right-10 w-12 h-12 text-slate-100" />
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />)}
              </div>
              <p className="text-lg text-slate-700 italic mb-8 leading-relaxed relative z-10">
                "We had a line-down situation and needed a complex 5-axis part remade immediately. They reviewed the CAD, caught a tolerance issue we missed, and had the part in our hands in 4 days. Incredible service."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center font-bold text-white">
                  DR
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">David R.</h4>
                  <p className="text-sm text-slate-500">Lead Mechanical Engineer, AeroTech</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 relative">
              <Quote className="absolute top-10 right-10 w-12 h-12 text-slate-100" />
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />)}
              </div>
              <p className="text-lg text-slate-700 italic mb-8 leading-relaxed relative z-10">
                "I stopped using the big cloud manufacturing platforms because the quality was too inconsistent. Working directly with this shop means I know exactly who is making my parts. Their FAI reports are flawless."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center font-bold text-white">
                  SM
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Sarah M.</h4>
                  <p className="text-sm text-slate-500">Supply Chain Manager, MedDevices Inc.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 12: FAQ Section */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-600">Straight answers to common machining questions.</p>
          </div>

          <div className="space-y-2">
            <FaqItem 
              question="What file formats do you need for a quote?" 
              answer="We prefer 3D CAD models in STEP (.stp, .step) or IGES formats. If your part has threaded holes, tight tolerances, or specific surface finish requirements, please also include a 2D PDF drawing." 
            />
            <FaqItem 
              question="How fast can I get my parts?" 
              answer="For standard prototypes (1-10 parts) in common materials like Aluminum 6061, we can often ship within 3-5 business days. Production runs typically take 2-4 weeks depending on volume and finishing requirements." 
            />
            <FaqItem 
              question="Do you have a Minimum Order Quantity (MOQ)?" 
              answer="No. We are happy to machine a single prototype to help you prove out your design, and we have the capacity to scale up to 10,000+ parts when you are ready for production." 
            />
            <FaqItem 
              question="Will you sign an NDA?" 
              answer="Yes. We understand the importance of protecting your intellectual property. We are happy to sign your Non-Disclosure Agreement before you send any files." 
            />
            <FaqItem 
              question="Can I visit the shop?" 
              answer="Absolutely. We welcome current and prospective customers to tour our facility, meet our machinists, and see our quality control processes firsthand. Please contact us to schedule a visit." 
            />
          </div>
        </div>
      </section>

      {/* MODULE 13: Final CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-700/50 rounded-3xl p-8 md:p-16 border border-blue-500/30 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to start your project?</h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Send us your drawings today. Our engineering team will review your files and provide a detailed quote within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
              <Link 
                to="/contact" 
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                <UploadCloud className="w-5 h-5" /> Request a Quote
              </Link>
              <a 
                href="mailto:sales@cncfactory.com" 
                className="inline-flex justify-center items-center gap-2 bg-transparent hover:bg-blue-800 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors border-2 border-blue-400"
              >
                <Mail className="w-5 h-5" /> Email Drawings
              </a>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-blue-200 text-sm">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4" />
                <span>Call us: (800) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>123 Industrial Parkway, Manufacturing City, ST 12345</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
