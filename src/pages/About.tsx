import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, Heart, Globe, Users, Leaf, Award } from 'lucide-react';
import { SEO } from '../components/SEO';

export const About: React.FC = () => {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Us",
    "description": "We are passionate about delivering exceptional products and creating memorable shopping experiences for our customers worldwide.",
    "url": window.location.href
  };

  return (
    <div className="bg-white font-sans text-zinc-900 selection:bg-zinc-200 selection:text-zinc-900">
      <SEO 
        title="About Us | Our Story & Mission"
        description="Learn about our story, our mission, and our core values. We are passionate about delivering exceptional products and radical transparency."
        canonicalUrl={window.location.href}
        schema={aboutSchema}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-serif tracking-tight text-zinc-900 mb-6">
            Redefining the standard.
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto font-light leading-relaxed">
            We believe in building products that matter, forging partnerships that last, and creating a more sustainable future for global commerce.
          </p>
        </div>
      </section>

      {/* Image Break */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden shadow-2xl bg-zinc-100">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2850&auto=format&fit=crop" 
            alt="Team collaboration" 
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-zinc-100">
            <div>
              <div className="text-4xl md:text-5xl font-serif text-zinc-900 mb-2">2018</div>
              <div className="text-xs font-medium text-zinc-400 uppercase tracking-widest">Founded</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-serif text-zinc-900 mb-2">50+</div>
              <div className="text-xs font-medium text-zinc-400 uppercase tracking-widest">Countries Served</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-serif text-zinc-900 mb-2">2M+</div>
              <div className="text-xs font-medium text-zinc-400 uppercase tracking-widest">Products Shipped</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-serif text-zinc-900 mb-2">100%</div>
              <div className="text-xs font-medium text-zinc-400 uppercase tracking-widest">Carbon Neutral</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-zinc-900 mb-8">Our Story</h2>
              <div className="space-y-6 text-zinc-600 font-light leading-relaxed text-lg">
                <p>
                  What started in a small studio has grown into a global operation. We noticed a gap in the market: consumers and businesses were forced to choose between exorbitant prices for high quality, or cheap, disposable goods.
                </p>
                <p>
                  We decided to build a third option. By vertically integrating our supply chain and partnering directly with the world's finest manufacturers, we eliminated the traditional retail markups.
                </p>
                <p>
                  Today, our team spans across three continents, united by a singular obsession: crafting exceptional products that elevate everyday experiences, while maintaining radical transparency in everything we do.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" 
                alt="Manufacturing" 
                className="rounded-xl w-full h-64 object-cover" 
                referrerPolicy="no-referrer"
              />
              <img 
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1000&auto=format&fit=crop" 
                alt="Retail" 
                className="rounded-xl w-full h-64 object-cover mt-8" 
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-zinc-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight mb-4">Our Core Values</h2>
            <p className="text-zinc-400 font-light text-lg">The principles that guide every decision we make.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: 'Uncompromising Quality', desc: 'We obsess over the details. If it isn\'t perfect, it doesn\'t ship.' },
              { icon: Heart, title: 'Customer Obsession', desc: 'Every product and process is designed backwards from the customer.' },
              { icon: Leaf, title: 'Sustainable Future', desc: 'We take responsibility for our footprint, using recycled materials wherever possible.' },
              { icon: Globe, title: 'Radical Transparency', desc: 'Honest pricing, clear sourcing, and open communication with our community.' }
            ].map((val, i) => (
              <div key={i} className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 hover:border-zinc-600 transition-colors">
                <val.icon className="w-8 h-8 text-zinc-300 mb-6" strokeWidth={1.5} />
                <h3 className="text-xl font-medium mb-3">{val.title}</h3>
                <p className="text-zinc-400 font-light text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-zinc-900 mb-4">Meet the Leadership</h2>
            <p className="text-zinc-500 font-light text-lg">The people behind the vision.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: 'Sarah Jenkins', role: 'Chief Executive Officer', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop' },
              { name: 'David Chen', role: 'Head of Product', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop' },
              { name: 'Elena Rodriguez', role: 'Creative Director', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop' }
            ].map((member, i) => (
              <div key={i} className="text-center group">
                <div className="aspect-square rounded-full overflow-hidden mb-6 max-w-[240px] mx-auto bg-zinc-100">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="text-xl font-medium text-zinc-900 mb-1">{member.name}</h3>
                <p className="text-zinc-500 text-sm uppercase tracking-widest">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-zinc-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-zinc-900 mb-6">Ready to experience the difference?</h2>
          <p className="text-lg text-zinc-600 font-light mb-10">
            Explore our latest collections or reach out to our team for partnership opportunities.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/shop" 
              className="bg-zinc-900 text-white hover:bg-zinc-800 px-8 py-4 rounded-full font-medium text-sm uppercase tracking-widest transition-colors"
            >
              Shop Collection
            </Link>
            <Link 
              to="/contact" 
              className="bg-transparent text-zinc-900 border border-zinc-300 hover:border-zinc-900 px-8 py-4 rounded-full font-medium text-sm uppercase tracking-widest transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
