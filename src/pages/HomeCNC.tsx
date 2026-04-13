import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Settings, 
  Crosshair, 
  Layers, 
  UploadCloud, 
  CheckCircle2, 
  ShieldCheck, 
  Activity, 
  Maximize, 
  FileCode2, 
  Gauge,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Cpu,
  Wrench,
  Microscope,
  Box
} from 'lucide-react';
import { SEO } from '../components/SEO';

// FAQ Component
const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-zinc-700 py-5">
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

export const HomeCNC: React.FC = () => {
  return (
    <div className="bg-zinc-950 min-h-screen font-sans text-zinc-300 selection:bg-cyan-500/30 selection:text-cyan-100">
      <SEO 
        title="Precision CNC Machining Services | Custom Parts Manufacturing" 
        description="High-precision CNC milling and turning services. Tolerances down to ±0.005mm. Instant quotes from your 3D CAD files." 
      />

      {/* MODULE 1: Hero Section (High-Tech Engineering Vibe) */}
      <section className="relative bg-zinc-950 text-white overflow-hidden border-b border-zinc-800">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1565439390114-3d0d82914101?q=80&w=2070&auto=format&fit=crop" 
            alt="CNC Milling Machine" 
            className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-transparent"></div>
          {/* Cyan glow effect */}
          <div className="absolute top-1/4 -left-64 w-96 h-96 bg-cyan-600/20 rounded-full blur-[128px]"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-cyan-500/10 text-cyan-400 text-xs font-mono mb-6 border border-cyan-500/30 uppercase tracking-widest">
              <Crosshair className="w-4 h-4" />
              <span>Precision Manufacturing</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-[1.1] text-white">
              Custom CNC Machined Parts in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Days, Not Weeks.</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed max-w-2xl font-light">
              From rapid prototyping to high-volume production. We deliver aerospace-grade precision with tolerances down to <span className="font-mono text-cyan-400 font-bold">±0.005mm</span>. Upload your CAD file for an instant quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/contact" 
                className="inline-flex justify-center items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded-sm font-bold text-lg transition-colors uppercase tracking-wider shadow-[0_0_20px_rgba(8,145,178,0.4)]"
              >
                <UploadCloud className="w-5 h-5" /> Upload 3D CAD
              </Link>
              <button 
                className="inline-flex justify-center items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 px-8 py-4 rounded-sm font-bold text-lg transition-colors uppercase tracking-wider"
              >
                View Capabilities
              </button>
            </div>
            <div className="mt-8 flex items-center gap-4 text-sm text-zinc-500 font-mono">
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-cyan-500" /> STEP, IGES, STL</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-cyan-500" /> ISO 9001:2015</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-cyan-500" /> AS9100D</span>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 2: Precision Stats */}
      <section className="bg-zinc-900 border-b border-zinc-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-zinc-800">
            <div>
              <div className="text-3xl md:text-4xl font-mono font-bold text-white mb-2">±0.005<span className="text-xl text-cyan-500">mm</span></div>
              <div className="font-bold uppercase tracking-widest text-xs text-zinc-500">Tightest Tolerance</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-mono font-bold text-white mb-2">150<span className="text-xl text-cyan-500">+</span></div>
              <div className="font-bold uppercase tracking-widest text-xs text-zinc-500">CNC Machines</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-mono font-bold text-white mb-2">60<span className="text-xl text-cyan-500">+</span></div>
              <div className="font-bold uppercase tracking-widest text-xs text-zinc-500">Metals & Plastics</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-mono font-bold text-white mb-2">3<span className="text-xl text-cyan-500"> Days</span></div>
              <div className="font-bold uppercase tracking-widest text-xs text-zinc-500">Fastest Turnaround</div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 3: Core Machining Services */}
      <section className="py-20 lg:py-32 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">Machining Capabilities</h2>
            <p className="text-lg text-zinc-400">Equipped with state-of-the-art 3, 4, and 5-axis CNC centers, we handle complex geometries and tight tolerances with ease.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Service 1 */}
            <div className="bg-zinc-900 p-8 border border-zinc-800 hover:border-cyan-500/50 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-full -z-0 group-hover:bg-cyan-500/10 transition-colors"></div>
              <Settings className="w-12 h-12 text-cyan-500 mb-6 relative z-10" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide relative z-10">CNC Milling</h3>
              <p className="text-zinc-400 leading-relaxed text-sm mb-6 relative z-10">
                High-speed 3-axis, 4-axis, and simultaneous 5-axis milling for complex parts, undercuts, and non-standard geometries.
              </p>
              <ul className="space-y-2 text-sm font-mono text-zinc-500 relative z-10">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-cyan-600" /> Max Size: 1500x800x600mm</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-cyan-600" /> Tolerance: ±0.01mm</li>
              </ul>
            </div>

            {/* Service 2 */}
            <div className="bg-zinc-900 p-8 border border-zinc-800 hover:border-cyan-500/50 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-full -z-0 group-hover:bg-cyan-500/10 transition-colors"></div>
              <Layers className="w-12 h-12 text-cyan-500 mb-6 relative z-10" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide relative z-10">CNC Turning</h3>
              <p className="text-zinc-400 leading-relaxed text-sm mb-6 relative z-10">
                Precision lathes with live tooling (Mill-Turn) for cylindrical parts, threading, boring, and internal features.
              </p>
              <ul className="space-y-2 text-sm font-mono text-zinc-500 relative z-10">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-cyan-600" /> Max Dia: Ø400mm</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-cyan-600" /> Tolerance: ±0.005mm</li>
              </ul>
            </div>

            {/* Service 3 */}
            <div className="bg-zinc-900 p-8 border border-zinc-800 hover:border-cyan-500/50 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-full -z-0 group-hover:bg-cyan-500/10 transition-colors"></div>
              <Activity className="w-12 h-12 text-cyan-500 mb-6 relative z-10" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide relative z-10">Wire EDM</h3>
              <p className="text-zinc-400 leading-relaxed text-sm mb-6 relative z-10">
                Electrical Discharge Machining for ultra-hard metals, sharp internal corners, and extremely tight tolerances.
              </p>
              <ul className="space-y-2 text-sm font-mono text-zinc-500 relative z-10">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-cyan-600" /> Wire Dia: 0.1mm - 0.25mm</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-cyan-600" /> Tolerance: ±0.002mm</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 4: Materials Library */}
      <section className="py-20 bg-zinc-900 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight">Material Selection</h2>
              <p className="text-lg text-zinc-400">We stock over 60 engineering-grade metals and plastics, complete with material certifications (MTC).</p>
            </div>
            <button className="flex items-center gap-2 text-cyan-500 font-bold hover:text-cyan-400 uppercase tracking-wider text-sm">
              View Full Material List <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Metals */}
            <div className="bg-zinc-950 border border-zinc-800 p-8">
              <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest border-b border-zinc-800 pb-4 flex items-center gap-3">
                <Box className="w-5 h-5 text-cyan-500" /> Metals
              </h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <h4 className="font-bold text-zinc-300 mb-2">Aluminum</h4>
                  <p className="text-sm font-mono text-zinc-500">6061-T6, 7075-T6, 6082, 5052</p>
                </div>
                <div>
                  <h4 className="font-bold text-zinc-300 mb-2">Stainless Steel</h4>
                  <p className="text-sm font-mono text-zinc-500">304, 316/316L, 17-4 PH, 416</p>
                </div>
                <div>
                  <h4 className="font-bold text-zinc-300 mb-2">Titanium</h4>
                  <p className="text-sm font-mono text-zinc-500">Grade 2, Grade 5 (Ti-6Al-4V)</p>
                </div>
                <div>
                  <h4 className="font-bold text-zinc-300 mb-2">Brass & Copper</h4>
                  <p className="text-sm font-mono text-zinc-500">C360 Brass, C101 Copper</p>
                </div>
              </div>
            </div>

            {/* Plastics */}
            <div className="bg-zinc-950 border border-zinc-800 p-8">
              <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest border-b border-zinc-800 pb-4 flex items-center gap-3">
                <Cpu className="w-5 h-5 text-cyan-500" /> Engineering Plastics
              </h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <h4 className="font-bold text-zinc-300 mb-2">POM (Delrin)</h4>
                  <p className="text-sm font-mono text-zinc-500">High stiffness, low friction</p>
                </div>
                <div>
                  <h4 className="font-bold text-zinc-300 mb-2">PEEK</h4>
                  <p className="text-sm font-mono text-zinc-500">High temp, medical/aerospace</p>
                </div>
                <div>
                  <h4 className="font-bold text-zinc-300 mb-2">Polycarbonate (PC)</h4>
                  <p className="text-sm font-mono text-zinc-500">Clear, impact resistant</p>
                </div>
                <div>
                  <h4 className="font-bold text-zinc-300 mb-2">Nylon / PTFE</h4>
                  <p className="text-sm font-mono text-zinc-500">Wear resistant, insulators</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 5: Surface Finishes */}
      <section className="py-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">Surface Finishes</h2>
            <p className="text-lg text-zinc-400">From standard "As Machined" to cosmetic and protective coatings, we deliver parts ready for final assembly.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'As Machined', desc: 'Standard Ra 1.6-3.2μm finish with visible tool marks.' },
              { name: 'Bead Blasting', desc: 'Uniform matte finish, removes tool marks.' },
              { name: 'Anodizing (Type II/III)', desc: 'Coloring and hard coat for aluminum parts.' },
              { name: 'Powder Coating', desc: 'Durable, corrosion-resistant color finish.' },
              { name: 'Electroless Nickel', desc: 'Uniform wear and corrosion resistance.' },
              { name: 'Passivation', desc: 'Improves corrosion resistance of stainless steel.' },
              { name: 'Polishing', desc: 'Mirror-like finish for cosmetic applications.' },
              { name: 'Laser Engraving', desc: 'Custom logos, part numbers, and barcodes.' },
            ].map((finish, idx) => (
              <div key={idx} className="bg-zinc-900 border border-zinc-800 p-6 hover:border-cyan-500/30 transition-colors">
                <h4 className="font-bold text-white mb-2">{finish.name}</h4>
                <p className="text-xs text-zinc-500">{finish.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULE 6: Quality Assurance & Inspection */}
      <section className="py-20 lg:py-32 bg-zinc-900 border-y border-zinc-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/10 rounded-sm transform -translate-x-4 translate-y-4 border border-cyan-500/20"></div>
              <img 
                src="https://images.unsplash.com/photo-1581092335397-9583eb92d232?q=80&w=2070&auto=format&fit=crop" 
                alt="CMM Inspection" 
                className="relative rounded-sm shadow-2xl border border-zinc-700 z-10 grayscale hover:grayscale-0 transition-all duration-500"
              />
              {/* Overlay UI element to look techy */}
              <div className="absolute bottom-4 right-4 bg-zinc-950/90 backdrop-blur border border-zinc-800 p-4 z-20 font-mono text-xs text-cyan-400">
                <div>&gt; CMM_SCAN_ACTIVE</div>
                <div>&gt; TOLERANCE_CHECK: PASS</div>
                <div>&gt; DEVIATION: 0.002mm</div>
              </div>
            </div>
            
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-zinc-800 text-zinc-300 text-xs font-mono mb-6 border border-zinc-700 uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4 text-cyan-500" />
                <span>Quality Assurance</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase tracking-tight">Zero-Defect Policy</h2>
              <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                Quality isn't an afterthought; it's machined into every part. Our climate-controlled inspection lab utilizes advanced metrology equipment to verify every dimension against your CAD model.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Maximize className="w-6 h-6 text-cyan-500 flex-shrink-0" />
                  <div>
                    <span className="text-white font-bold block mb-1">CMM Inspection</span>
                    <span className="text-sm text-zinc-500">Coordinate Measuring Machines for complex 3D geometries.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Microscope className="w-6 h-6 text-cyan-500 flex-shrink-0" />
                  <div>
                    <span className="text-white font-bold block mb-1">Material Traceability</span>
                    <span className="text-sm text-zinc-500">Full material certs (MTC) and RoHS/REACH compliance reports available.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FileCode2 className="w-6 h-6 text-cyan-500 flex-shrink-0" />
                  <div>
                    <span className="text-white font-bold block mb-1">First Article Inspection (FAI)</span>
                    <span className="text-sm text-zinc-500">Comprehensive AS9102 FAI reports provided for aerospace and medical orders.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 7: How It Works (The Process) */}
      <section className="py-20 lg:py-32 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">From CAD to Part</h2>
            <p className="text-lg text-zinc-400">A streamlined, digital-first manufacturing process designed for speed and reliability.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-8 left-0 w-full h-px bg-zinc-800 z-0"></div>
            
            {[
              { step: '01', title: 'Upload CAD', desc: 'Upload your 3D models (STEP, IGES) and 2D drawings (PDF) to our secure portal.' },
              { step: '02', title: 'Instant Quote', desc: 'Our DFM engineers analyze your geometry and provide a detailed quote within 12 hours.' },
              { step: '03', title: 'Machining', desc: 'Your parts are programmed and machined on our advanced CNC centers.' },
              { step: '04', title: 'Inspect & Ship', desc: 'Parts undergo strict QC, are securely packaged, and shipped globally.' }
            ].map((item, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center bg-zinc-950">
                <div className="w-16 h-16 bg-zinc-900 border border-cyan-500/50 text-cyan-400 rounded-sm flex items-center justify-center font-mono text-xl font-bold mb-6 shadow-[0_0_15px_rgba(8,145,178,0.2)]">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wider">{item.title}</h3>
                <p className="text-sm text-zinc-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULE 8: Industries Served */}
      <section className="py-20 bg-zinc-900 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tight">Industries We Serve</h2>
            <p className="text-zinc-400">Manufacturing mission-critical components for demanding sectors.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {[
              'Aerospace & Defense',
              'Medical Devices',
              'Automotive & EV',
              'Robotics & Automation',
              'Semiconductor',
              'Energy & Oil',
              'Consumer Electronics',
              'Industrial Machinery'
            ].map((industry, idx) => (
              <div key={idx} className="bg-zinc-950 p-6 text-center border border-zinc-800 hover:border-cyan-500/50 transition-colors cursor-default">
                <span className="font-bold text-zinc-300 text-sm uppercase tracking-wider">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULE 9: FAQ Section */}
      <section className="py-20 lg:py-32 bg-zinc-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tight">Machining FAQ</h2>
            <p className="text-lg text-zinc-400">Technical questions about our CNC services.</p>
          </div>

          <div className="space-y-2">
            <FaqItem 
              question="What file formats do you accept for quoting?" 
              answer="We prefer 3D CAD files in STEP (.stp, .step) or IGES (.igs, .iges) formats. For parts with tight tolerances or threaded holes, please also provide a 2D PDF drawing." 
            />
            <FaqItem 
              question="What is your standard machining tolerance?" 
              answer='Our standard tolerance for CNC machining is ±0.125mm (±0.005"). However, we can achieve tolerances down to ±0.005mm (±0.0002") for critical features when specified on your 2D drawing.' 
            />
            <FaqItem 
              question="Do you have a Minimum Order Quantity (MOQ)?" 
              answer="No, we do not have an MOQ. We regularly machine single prototypes (qty 1) as well as high-volume production runs (qty 10,000+)." 
            />
            <FaqItem 
              question="How do you handle threaded holes?" 
              answer="Please indicate all threaded holes on your 2D PDF drawing. We support standard metric (M) and imperial (UNC/UNF) threads, as well as custom threads and inserts (e.g., Heli-Coil)." 
            />
            <FaqItem 
              question="Are my designs kept confidential?" 
              answer="Absolutely. We respect your intellectual property. All uploads are encrypted, and we are happy to sign a Non-Disclosure Agreement (NDA) before you share any files." 
            />
          </div>
        </div>
      </section>

      {/* MODULE 10: Final CTA Section */}
      <section className="py-24 bg-cyan-600 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <Gauge className="w-16 h-16 text-cyan-200 mx-auto mb-6" strokeWidth={1.5} />
          <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight">Ready to Machine?</h2>
          <p className="text-xl text-cyan-100 mb-10 font-medium max-w-2xl mx-auto">
            Upload your CAD files today and receive a comprehensive DFM analysis and quote within 12 hours.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/contact" 
              className="bg-zinc-950 text-white hover:bg-zinc-800 px-10 py-5 rounded-sm font-black text-lg transition-colors uppercase tracking-widest shadow-2xl flex items-center justify-center gap-2"
            >
              <UploadCloud className="w-5 h-5" /> Upload CAD File
            </Link>
            <a 
              href="mailto:quote@cncfactory.com" 
              className="inline-flex justify-center items-center gap-2 bg-transparent hover:bg-cyan-700 text-white px-10 py-5 rounded-sm font-black text-lg transition-colors border-2 border-white uppercase tracking-widest"
            >
              Contact Engineering
            </a>
          </div>
          <p className="mt-6 text-sm text-cyan-200 font-mono">Secure, encrypted upload. NDA available upon request.</p>
        </div>
      </section>

    </div>
  );
};
