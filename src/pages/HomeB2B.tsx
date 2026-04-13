import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Globe, 
  ShieldCheck, 
  Users, 
  ArrowRight, 
  BarChart3, 
  PhoneCall, 
  CheckCircle2,
  PackageSearch,
  Headset,
  Code,
  Database,
  TrendingUp,
  Award,
  ChevronDown,
  ChevronUp,
  Quote,
  Zap,
  Settings
} from 'lucide-react';
import { SEO } from '../components/SEO';

// FAQ Component
const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 py-5">
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

export const HomeB2B: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900 selection:bg-blue-200 selection:text-blue-900">
      <SEO 
        title="Enterprise & Wholesale Solutions | B2B Portal" 
        description="Partner with us for premium B2B wholesale solutions, dedicated support, and global logistics." 
      />

      {/* MODULE 1: Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
            alt="Corporate Office" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold mb-6 border border-blue-500/30">
              <Building2 className="w-4 h-4" />
              <span>B2B Enterprise Portal</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Scale Your Business with <span className="text-blue-400">Premium Wholesale</span> Solutions.
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
              Streamline your procurement process with our dedicated enterprise platform. Enjoy tiered pricing, dedicated account managers, and priority global logistics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/contact" 
                className="inline-flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                Request a Quote <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/shop" 
                className="inline-flex justify-center items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                Browse Catalog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 2: Trust Logos */}
      <section className="border-b border-slate-200 bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">Trusted by innovative companies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale">
            <div className="text-2xl font-black font-serif tracking-tighter">AcmeCorp</div>
            <div className="text-2xl font-black font-sans tracking-widest">GLOBEX</div>
            <div className="text-2xl font-black font-mono">Initech</div>
            <div className="text-2xl font-black font-sans italic">Soylent</div>
            <div className="text-2xl font-black font-serif">Massive Dynamic</div>
          </div>
        </div>
      </section>

      {/* MODULE 3: Impact Stats (NEW) */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-blue-500/50">
            <div>
              <div className="text-4xl md:text-5xl font-black mb-2">500+</div>
              <div className="text-blue-200 font-medium">Enterprise Clients</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black mb-2">99.9%</div>
              <div className="text-blue-200 font-medium">Fulfillment Rate</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black mb-2">24h</div>
              <div className="text-blue-200 font-medium">Avg. Response Time</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black mb-2">50+</div>
              <div className="text-blue-200 font-medium">Countries Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 4: Value Proposition */}
      <section className="py-20 lg:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Partner With Us?</h2>
            <p className="text-lg text-slate-600">We understand the complexities of enterprise procurement. Our platform is built to eliminate friction and accelerate your growth.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Volume Discounts</h3>
              <p className="text-slate-600 leading-relaxed">
                Access exclusive tiered pricing. The more you order, the more you save with our transparent wholesale rates.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mb-6">
                <Headset className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Dedicated Support</h3>
              <p className="text-slate-600 leading-relaxed">
                Get assigned a personal account manager who understands your business needs and industry requirements.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center mb-6">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Global Logistics</h3>
              <p className="text-slate-600 leading-relaxed">
                Reliable worldwide shipping with priority handling, customs clearance support, and real-time freight tracking.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-slate-100 text-slate-700 rounded-lg flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Quality Assurance</h3>
              <p className="text-slate-600 leading-relaxed">
                Every bulk order undergoes rigorous QA testing before dispatch. ISO certified processes guarantee consistency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 5: Feature Highlight (Dashboard) */}
      <section className="py-20 bg-white overflow-hidden border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Streamlined Procurement Dashboard</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Take control of your supply chain with our enterprise dashboard. Manage multiple shipping addresses, track bulk orders in real-time, and download automated invoices.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <span className="text-slate-700 font-medium">One-click reordering for frequent inventory</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <span className="text-slate-700 font-medium">Multi-user account access with role-based permissions</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <span className="text-slate-700 font-medium">Net 30/60 payment terms for approved accounts</span>
                </li>
              </ul>
              <Link to="/contact" className="text-blue-600 font-bold hover:text-blue-700 flex items-center gap-2">
                Learn more about our platform <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="absolute inset-0 bg-blue-100 rounded-3xl transform translate-x-4 translate-y-4"></div>
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" 
                alt="Dashboard Preview" 
                className="relative rounded-3xl shadow-xl border border-slate-200 z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 6: API & Integrations (NEW) */}
      <section className="py-20 lg:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center aspect-square">
                  <Database className="w-10 h-10 text-blue-600 mb-3" />
                  <span className="font-bold text-slate-900">ERP Sync</span>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center aspect-square transform translate-y-8">
                  <Code className="w-10 h-10 text-indigo-600 mb-3" />
                  <span className="font-bold text-slate-900">REST API</span>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center aspect-square">
                  <Zap className="w-10 h-10 text-amber-500 mb-3" />
                  <span className="font-bold text-slate-900">Webhooks</span>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center aspect-square transform translate-y-8">
                  <Settings className="w-10 h-10 text-slate-600 mb-3" />
                  <span className="font-bold text-slate-900">Custom EDI</span>
                </div>
              </div>
            </div>
            
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-6">
                <Code className="w-4 h-4" />
                <span>Developer Friendly</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Seamless ERP Integrations</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Connect our catalog and ordering system directly to your existing procurement software. We support standard EDI, robust REST APIs, and pre-built connectors for major ERPs.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-indigo-600 flex-shrink-0" />
                  <span className="text-slate-700 font-medium">Automated Purchase Order (PO) creation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-indigo-600 flex-shrink-0" />
                  <span className="text-slate-700 font-medium">Real-time inventory and pricing sync</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-indigo-600 flex-shrink-0" />
                  <span className="text-slate-700 font-medium">Pre-built integrations for SAP, Oracle, and NetSuite</span>
                </li>
              </ul>
              <Link to="/contact" className="text-indigo-600 font-bold hover:text-indigo-700 flex items-center gap-2">
                Read API Documentation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 7: Partnership Process (NEW) */}
      <section className="py-20 lg:py-32 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-lg text-slate-600">Getting started is simple. We've optimized our onboarding process to get you up and running in days, not months.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting Line for Desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>
            
            {[
              { step: '01', title: 'Apply', desc: 'Submit your company details and tax ID for a wholesale account review.' },
              { step: '02', title: 'Consult', desc: 'Meet with your dedicated account manager to discuss volume and needs.' },
              { step: '03', title: 'Integrate', desc: 'Set up your dashboard, payment terms, and optional ERP integrations.' },
              { step: '04', title: 'Scale', desc: 'Start ordering with your exclusive pricing and priority fulfillment.' }
            ].map((item, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center bg-white p-6 rounded-2xl">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-black mb-6 shadow-lg shadow-blue-600/30 border-4 border-white">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULE 8: Industry Solutions */}
      <section className="py-20 lg:py-32 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Solutions by Industry</h2>
            <p className="text-slate-400 text-lg">Tailored product catalogs and supply chain solutions designed for your specific sector.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Corporate Offices', desc: 'Bulk IT equipment, ergonomic furniture, and daily office supplies.', icon: Building2 },
              { title: 'Retail & Resellers', desc: 'High-margin consumer goods ready for your store shelves.', icon: PackageSearch },
              { title: 'Hospitality', desc: 'Premium amenities, linens, and commercial-grade appliances.', icon: Users },
            ].map((industry, idx) => (
              <div key={idx} className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-blue-500 transition-colors group cursor-pointer">
                <industry.icon className="w-10 h-10 text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-3">{industry.title}</h3>
                <p className="text-slate-400 mb-6">{industry.desc}</p>
                <Link to="/shop" className="text-blue-400 font-medium flex items-center gap-2 group-hover:text-blue-300">
                  View Catalog <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULE 9: Case Studies / Testimonials (NEW) */}
      <section className="py-20 lg:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Client Success Stories</h2>
            <p className="text-lg text-slate-600">See how leading enterprises are optimizing their procurement with us.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 relative">
              <Quote className="absolute top-10 right-10 w-12 h-12 text-slate-100" />
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Award key={i} className="w-5 h-5 text-blue-600" />)}
              </div>
              <p className="text-xl text-slate-700 italic mb-8 leading-relaxed relative z-10">
                "Switching to their B2B portal reduced our procurement cycle time by 40%. The automated invoicing and dedicated account manager have been game-changers for our finance team."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600">
                  MR
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Michael Roberts</h4>
                  <p className="text-sm text-slate-500">Director of Procurement, TechFlow Inc.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 relative">
              <Quote className="absolute top-10 right-10 w-12 h-12 text-slate-100" />
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Award key={i} className="w-5 h-5 text-blue-600" />)}
              </div>
              <p className="text-xl text-slate-700 italic mb-8 leading-relaxed relative z-10">
                "The API integration with our SAP system was flawless. We now have real-time inventory visibility across all our 50+ retail locations, completely eliminating stockouts."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600">
                  SL
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Sarah Lin</h4>
                  <p className="text-sm text-slate-500">VP of Supply Chain, Global Retail Group</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 10: FAQ Section (NEW) */}
      <section className="py-20 lg:py-32 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-600">Everything you need to know about our wholesale program.</p>
          </div>

          <div className="space-y-2">
            <FaqItem 
              question="What is the Minimum Order Quantity (MOQ)?" 
              answer="Our standard MOQ varies by product category, typically starting at 50 units for electronics and 200 units for consumables. Your account manager can provide specific details based on your catalog." 
            />
            <FaqItem 
              question="Do you offer Net 30 or Net 60 payment terms?" 
              answer="Yes, we offer Net 30, Net 60, and Net 90 terms for approved enterprise accounts. Credit approval typically takes 3-5 business days after submitting your financial documentation." 
            />
            <FaqItem 
              question="Can you ship directly to our multiple retail locations?" 
              answer="Absolutely. Our platform supports multi-address shipping (split fulfillment). You can upload a CSV of locations or manage them directly in your dashboard." 
            />
            <FaqItem 
              question="Do you provide white-label or custom packaging?" 
              answer="Yes, custom packaging and white-labeling services are available for orders exceeding 1,000 units. Please contact our sales team for a custom quote and lead times." 
            />
            <FaqItem 
              question="How do I integrate my ERP system?" 
              answer="Once your account is approved, you will receive access to our Developer Portal, which includes API keys, documentation, and pre-built connectors for major ERPs like SAP, Oracle, and NetSuite." 
            />
          </div>
        </div>
      </section>

      {/* MODULE 11: Final CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to upgrade your supply chain?</h2>
          <p className="text-xl text-blue-100 mb-10">
            Join thousands of businesses that trust us for their wholesale procurement needs. Apply for a B2B account today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/contact" 
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg"
            >
              Apply for Wholesale Account
            </Link>
            <a 
              href="tel:+18001234567" 
              className="inline-flex justify-center items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors border border-blue-500"
            >
              <PhoneCall className="w-5 h-5" /> Talk to Sales
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
