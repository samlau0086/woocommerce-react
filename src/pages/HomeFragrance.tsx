import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Star, 
  Droplet, 
  Wind, 
  Flame, 
  ShieldCheck, 
  ArrowUpRight,
  FlaskConical,
  CheckCircle2,
  Instagram,
  Globe,
  Leaf,
  Recycle
} from 'lucide-react';
import { SEO } from '../components/SEO';

export const HomeFragrance: React.FC = () => {
  return (
    <div className="bg-zinc-950 min-h-screen font-sans text-zinc-100 selection:bg-amber-900 selection:text-amber-50">
      <SEO 
        title="OAK & IRON | Premium Men's Fragrance DTC" 
        description="Master-crafted men's cologne. Extrait de Parfum concentration. No retail markups, just exceptional scents." 
      />

      {/* MODULE 1: Hero Section (Moody & Sophisticated) */}
      <section className="relative h-[95vh] min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=2000&auto=format&fit=crop" 
            alt="Premium Men's Cologne" 
            className="w-full h-full object-cover object-center opacity-60 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/80 backdrop-blur-sm text-amber-500 text-xs font-medium mb-8 border border-amber-500/20 tracking-widest uppercase">
            <FlaskConical className="w-4 h-4" />
            <span>Extrait de Parfum • 25% Concentration</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight text-white mb-6 drop-shadow-lg">
            Signature scents.<br />
            <span className="italic text-zinc-400 font-light">Honest prices.</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 mb-12 font-light max-w-xl mx-auto drop-shadow-md leading-relaxed">
            Crafted by master perfumers in Grasse, France. We cut out the celebrity endorsements and department store markups to bring you luxury fragrances directly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/shop" 
              className="bg-amber-600 text-white hover:bg-amber-500 px-10 py-4 rounded-sm font-medium text-sm uppercase tracking-widest transition-colors shadow-lg shadow-amber-900/20"
            >
              Shop The Collection
            </Link>
            <Link 
              to="/quiz" 
              className="bg-transparent text-white border border-zinc-600 hover:bg-zinc-800 px-10 py-4 rounded-sm font-medium text-sm uppercase tracking-widest transition-colors"
            >
              Find Your Scent
            </Link>
          </div>
        </div>
      </section>

      {/* MODULE 2: Press Bar */}
      <section className="border-b border-zinc-900 bg-zinc-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-medium text-zinc-600 uppercase tracking-widest mb-8">Recognized By</p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-24 opacity-50 grayscale">
            <div className="text-2xl font-serif tracking-widest">GQ</div>
            <div className="text-xl font-sans font-black tracking-tighter">Esquire</div>
            <div className="text-2xl font-serif italic">Forbes</div>
            <div className="text-xl font-sans font-bold tracking-widest uppercase">Men's Health</div>
            <div className="text-2xl font-serif">HYPEBEAST</div>
          </div>
        </div>
      </section>

      {/* MODULE 3: The DTC Advantage */}
      <section className="py-24 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-6">
                <Droplet className="w-6 h-6 text-amber-500" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-serif mb-3 tracking-tight text-white">Extrait de Parfum</h3>
              <p className="text-zinc-400 text-base leading-relaxed max-w-xs">
                While designer brands use 8-15% fragrance oil (Eau de Toilette), we use 25%. Our scents last 12+ hours on the skin.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-amber-500" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-serif mb-3 tracking-tight text-white">Clean & Vegan</h3>
              <p className="text-zinc-400 text-base leading-relaxed max-w-xs">
                Free from parabens, phthalates, and known toxins. 100% vegan, cruelty-free, and sustainably sourced ingredients.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-6">
                <Wind className="w-6 h-6 text-amber-500" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-serif mb-3 tracking-tight text-white">Direct Pricing</h3>
              <p className="text-zinc-400 text-base leading-relaxed max-w-xs">
                A $150 designer cologne costs $10 to make. We skip the retail markups and sell a superior $150 product for $65.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 4: The Craft (NEW - Storytelling & Ingredients) */}
      <section className="bg-zinc-950 border-y border-zinc-900">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="h-[50vh] lg:h-auto relative">
            <img 
              src="https://images.unsplash.com/photo-1608528577891-eb055944f2e7?q=80&w=2070&auto=format&fit=crop" 
              alt="Master Perfumer" 
              className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 to-transparent lg:hidden"></div>
          </div>
          <div className="flex flex-col justify-center p-12 lg:p-24 xl:p-32 bg-zinc-950">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 text-zinc-400 text-xs font-medium mb-8 border border-zinc-800 uppercase tracking-widest">
              <Globe className="w-3 h-3 text-amber-500" />
              <span>Grasse, France</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-white mb-8">
              The art of <br />fine perfumery.
            </h2>
            <p className="text-lg text-zinc-400 mb-8 leading-relaxed font-light">
              We partnered with 5th-generation master perfumers in Grasse, France—the historic capital of perfume. Instead of giving them a strict budget, we gave them creative freedom.
            </p>
            <p className="text-lg text-zinc-400 mb-12 leading-relaxed font-light">
              The result? Complex, multi-layered fragrances that evolve throughout the day, utilizing rare ingredients like Haitian Vetiver, Indonesian Oud, and Calabrian Bergamot.
            </p>
            <div>
              <Link to="/about" className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-amber-500 border-b border-amber-500/30 pb-1 hover:text-amber-400 hover:border-amber-400 transition-colors">
                Explore Our Ingredients <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 5: The Collection (Product Grid) */}
      <section className="py-32 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-white mb-4">The Core Collection</h2>
              <p className="text-lg text-zinc-400 font-light">Four distinct profiles. Masterfully blended.</p>
            </div>
            <Link to="/shop" className="hidden md:flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-amber-500 hover:text-amber-400 transition-colors">
              View All Scents <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'No. 01 — Tobacco & Vanilla', type: 'Warm & Spicy', notes: 'Tobacco Leaf, Vanilla, Cacao, Tonka Bean', price: '$65', img: 'https://images.unsplash.com/photo-1595425970377-c9703bc48baf?q=80&w=1974&auto=format&fit=crop' },
              { name: 'No. 02 — Vetiver & Cedar', type: 'Woody & Earthy', notes: 'Haitian Vetiver, Cedarwood, Bergamot, Musk', price: '$65', img: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=1974&auto=format&fit=crop' },
              { name: 'No. 03 — Sea Salt & Sage', type: 'Fresh & Aquatic', notes: 'Ambrette Seeds, Sea Salt, Sage, Grapefruit', price: '$65', img: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=2000&auto=format&fit=crop' },
              { name: 'No. 04 — Oud & Bergamot', type: 'Rich & Exotic', notes: 'Oud Wood, Bergamot, Black Pepper, Amber', price: '$75', img: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=2053&auto=format&fit=crop' },
            ].map((product, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="aspect-[3/4] bg-zinc-900 overflow-hidden mb-6 relative border border-zinc-800">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out mix-blend-luminosity group-hover:mix-blend-normal" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80"></div>
                  
                  {/* Scent Profile Overlay */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-zinc-950/80 backdrop-blur text-zinc-300 text-xs uppercase tracking-widest px-3 py-1 border border-zinc-800">
                      {product.type}
                    </span>
                  </div>

                  {/* Quick Add Button */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <button className="w-full bg-white text-zinc-950 py-4 text-sm font-bold uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-colors">
                      Add to Cart — {product.price}
                    </button>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-serif text-white mb-2">{product.name}</h3>
                  <p className="text-xs text-amber-500 uppercase tracking-widest mb-2">Key Notes</p>
                  <p className="text-sm text-zinc-500 font-light">{product.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULE 6: Anatomy of a Scent (NEW - Education) */}
      <section className="py-24 bg-zinc-900 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-white mb-6">The Anatomy of a Scent.</h2>
            <p className="text-lg text-zinc-400 font-light leading-relaxed">
              A true Extrait de Parfum is a living thing. It evolves on your skin over time, revealing different layers from the moment you spray it until the end of the night.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-zinc-950 p-10 rounded-sm border border-zinc-800 text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-amber-500/20 group-hover:bg-amber-500 transition-colors"></div>
              <h3 className="text-2xl font-serif text-white mb-2">Top Notes</h3>
              <p className="text-xs text-amber-500 uppercase tracking-widest mb-6">0 - 30 Minutes</p>
              <p className="text-zinc-400 font-light text-sm leading-relaxed">
                The first impression. Usually bright, citrusy, or fresh. These molecules are the lightest and evaporate quickly, making way for the core of the fragrance.
              </p>
            </div>
            <div className="bg-zinc-950 p-10 rounded-sm border border-zinc-800 text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-amber-500/50 group-hover:bg-amber-500 transition-colors"></div>
              <h3 className="text-2xl font-serif text-white mb-2">Heart Notes</h3>
              <p className="text-xs text-amber-500 uppercase tracking-widest mb-6">30 Mins - 4 Hours</p>
              <p className="text-zinc-400 font-light text-sm leading-relaxed">
                The soul of the scent. As the top notes fade, the heart emerges. These are typically richer, spicier, or floral notes that define the fragrance's true character.
              </p>
            </div>
            <div className="bg-zinc-950 p-10 rounded-sm border border-zinc-800 text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-amber-500 group-hover:bg-amber-500 transition-colors"></div>
              <h3 className="text-2xl font-serif text-white mb-2">Base Notes</h3>
              <p className="text-xs text-amber-500 uppercase tracking-widest mb-6">4 - 12+ Hours</p>
              <p className="text-zinc-400 font-light text-sm leading-relaxed">
                The lingering memory. Heavy molecules like woods, musks, and vanilla that anchor the scent to your skin and last throughout the entire day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 7: The Discovery Set (Upsell/Low Barrier Entry) */}
      <section className="py-32 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 text-zinc-300 text-xs font-medium mb-6 border border-zinc-800 uppercase tracking-widest">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span>Most Popular for New Customers</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight text-white mb-6">The Discovery Set.</h2>
              <p className="text-lg text-zinc-400 font-light mb-8 leading-relaxed max-w-md">
                Can't decide? Experience our entire core collection. Four 5ml travel sprays, perfectly sized to test on your skin over time. 
              </p>
              <p className="text-lg text-amber-500 font-medium mb-10">
                Plus, get a $25 credit toward your first full-size bottle.
              </p>
              
              <ul className="space-y-4 mb-12">
                <li className="flex items-center gap-3 text-zinc-300">
                  <CheckCircle2 className="w-5 h-5 text-amber-500" />
                  <span>4 x 5ml Extrait de Parfum sprays</span>
                </li>
                <li className="flex items-center gap-3 text-zinc-300">
                  <CheckCircle2 className="w-5 h-5 text-amber-500" />
                  <span>Good for ~120 sprays total</span>
                </li>
                <li className="flex items-center gap-3 text-zinc-300">
                  <CheckCircle2 className="w-5 h-5 text-amber-500" />
                  <span>$25 digital gift card included</span>
                </li>
              </ul>
              
              <button className="bg-white text-zinc-950 px-10 py-4 rounded-sm font-bold text-sm uppercase tracking-widest hover:bg-zinc-200 transition-colors w-full sm:w-auto text-center">
                Get The Set — $25
              </button>
            </div>
            <div className="order-1 lg:order-2">
              <div className="aspect-square bg-zinc-900 rounded-sm overflow-hidden border border-zinc-800 p-12 flex items-center justify-center relative">
                {/* Simulated Discovery Set Graphic */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.05)_0%,transparent_70%)]"></div>
                <img 
                  src="https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=2000&auto=format&fit=crop" 
                  alt="Discovery Set" 
                  className="w-full h-full object-cover mix-blend-luminosity opacity-40"
                />
                <div className="absolute inset-0 flex items-center justify-center gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-40 bg-zinc-950/90 backdrop-blur border border-zinc-700 rounded-sm shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
                      <div className="absolute bottom-0 w-full h-1/2 bg-amber-500/20 group-hover:bg-amber-500/40 transition-colors"></div>
                      <div className="absolute top-4 w-full text-center text-zinc-500 text-[10px] font-serif">0{i}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 8: Grooming Essentials (NEW - Cross-sell) */}
      <section className="py-24 bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-white mb-4">Complete the Routine</h2>
              <p className="text-lg text-zinc-400 font-light">Elevate your daily grooming with our matching body care.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Exfoliating Body Wash', price: '$22', desc: 'Infused with No. 02 Vetiver & Cedar', img: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=2080&auto=format&fit=crop' },
              { name: 'Natural Deodorant', price: '$18', desc: 'Aluminum-free. 24hr protection.', img: 'https://images.unsplash.com/photo-1608248593842-8021b61cb9cb?q=80&w=2053&auto=format&fit=crop' },
              { name: 'Solid Cologne', price: '$35', desc: 'Travel-friendly wax-based scent.', img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1974&auto=format&fit=crop' },
            ].map((item, idx) => (
              <div key={idx} className="group cursor-pointer bg-zinc-950 border border-zinc-800 rounded-sm overflow-hidden">
                <div className="aspect-video bg-zinc-900 overflow-hidden relative">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out mix-blend-luminosity group-hover:mix-blend-normal" />
                </div>
                <div className="p-6 flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-serif text-white mb-1">{item.name}</h3>
                    <p className="text-sm text-zinc-500 font-light">{item.desc}</p>
                  </div>
                  <span className="font-medium text-white">{item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULE 9: Founder's Note (NEW - Trust & Story) */}
      <section className="py-24 bg-zinc-950 border-y border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden flex-shrink-0 border-2 border-zinc-800">
              <img 
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop" 
                alt="Founder" 
                className="w-full h-full object-cover mix-blend-luminosity"
              />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-serif tracking-tight text-white mb-6">"I was tired of paying $300 for a bottle of scented water."</h3>
              <p className="text-zinc-400 font-light leading-relaxed mb-8">
                When I discovered that the luxury cologne I'd been wearing for years cost less than $12 to manufacture, I felt cheated. The rest of the price tag went to celebrity marketing, fancy retail space, and middlemen. I started OAK & IRON to strip away the BS. We invest our money where it matters: inside the bottle.
              </p>
              <div className="font-serif italic text-2xl text-white">
                Marcus Thorne
              </div>
              <div className="text-sm text-amber-500 uppercase tracking-widest mt-2">Founder</div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 10: The Risk-Free Guarantee */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShieldCheck className="w-16 h-16 text-amber-500 mx-auto mb-8" strokeWidth={1} />
          <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-white mb-6">The 30-Day Trial.</h2>
          <p className="text-lg text-zinc-400 font-light leading-relaxed mb-10">
            Buying fragrance online shouldn't be a gamble. Every full-size bottle comes with a 2ml sample of the same scent. Try the sample first. If it's not your new signature scent, return the unopened full-size bottle within 30 days for a full refund. No questions asked.
          </p>
          <Link to="/about/returns" className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-white border-b border-zinc-600 pb-1 hover:text-amber-500 hover:border-amber-500 transition-colors">
            Read Our Return Policy <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* MODULE 11: Scent Quiz CTA */}
      <section className="py-32 bg-zinc-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=2000&auto=format&fit=crop" 
            alt="Background" 
            className="w-full h-full object-cover mix-blend-luminosity"
          />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <Flame className="w-12 h-12 text-amber-500 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-white mb-6">Find your signature.</h2>
          <p className="text-xl text-zinc-300 mb-10 font-light">
            Take our 60-second scent profiler quiz. Tell us what you like, where you're going, and how you want to feel. We'll match you with the perfect fragrance.
          </p>
          <button className="bg-amber-600 text-white hover:bg-amber-500 px-10 py-4 rounded-sm font-bold text-sm uppercase tracking-widest transition-colors shadow-xl">
            Take The Scent Quiz
          </button>
        </div>
      </section>

      {/* MODULE 12: Testimonials */}
      <section className="py-24 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-white mb-4">Word on the street.</h2>
            <div className="flex items-center justify-center gap-2 text-zinc-400">
              <div className="flex">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />)}
              </div>
              <span className="font-medium">4.8/5 based on 5,000+ reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Michael T.', product: 'No. 01 — Tobacco & Vanilla', text: 'I used to wear Tom Ford, but the prices got ridiculous. This smells incredibly similar, lasts twice as long on my skin, and costs a third of the price. I get compliments daily.' },
              { name: 'David R.', product: 'The Discovery Set', text: 'The discovery set is genius. I wore a different one each week. Ended up buying full bottles of Vetiver & Cedar for the office, and Oud & Bergamot for date nights.' },
              { name: 'James L.', product: 'No. 04 — Oud & Bergamot', text: 'This is a powerhouse. Two sprays in the morning and I can still smell it when I get home from work. It\'s masculine, dark, and very sophisticated.' },
            ].map((review, idx) => (
              <div key={idx} className="bg-zinc-900 p-10 rounded-sm border border-zinc-800">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />)}
                </div>
                <h4 className="font-bold text-white mb-1">{review.name}</h4>
                <p className="text-xs text-zinc-500 uppercase tracking-widest mb-6">Verified Buyer • {review.product}</p>
                <p className="text-zinc-400 font-light leading-relaxed">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULE 13: UGC / Instagram Feed (NEW - Social Proof) */}
      <section className="py-24 bg-zinc-900 overflow-hidden border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-serif tracking-tight text-white">The Gentlemen's Club</h2>
            <p className="text-zinc-500 mt-2 font-light">@oakandiron</p>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-amber-500 hover:text-amber-400 transition-colors">
            Follow Us <Instagram className="w-4 h-4" />
          </a>
        </div>
        
        <div className="flex overflow-x-auto pb-8 md:pb-0 md:grid md:grid-cols-4 gap-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto snap-x">
          {[
            'https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=2000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=2053&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1595425970377-c9703bc48baf?q=80&w=1974&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=1974&auto=format&fit=crop'
          ].map((img, idx) => (
            <div key={idx} className="min-w-[280px] md:min-w-0 aspect-square bg-zinc-950 relative group cursor-pointer snap-center border border-zinc-800">
              <img src={img} alt="UGC" className="w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:opacity-100 group-hover:mix-blend-normal transition-all duration-500" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODULE 14: Newsletter Signup (NEW - Lead Gen) */}
      <section className="py-32 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-white mb-6">Join the inner circle.</h2>
          <p className="text-zinc-400 mb-12 font-light text-lg">
            Subscribe for early access to limited batch releases, private sales, and grooming tips. Take 10% off your first order.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 bg-zinc-900 border border-zinc-700 rounded-sm px-6 py-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
              required
            />
            <button 
              type="submit" 
              className="bg-white text-zinc-950 px-10 py-4 rounded-sm font-bold uppercase tracking-widest text-sm hover:bg-zinc-200 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};
