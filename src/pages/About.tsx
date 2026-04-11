import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, Heart } from 'lucide-react';
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
    <div className="bg-white">
      <SEO 
        title="About Us"
        description="Learn about our story, our mission, and our core values. We are passionate about delivering exceptional products."
        canonicalUrl={window.location.href}
        schema={aboutSchema}
      />
      {/* Hero Section */}
      <div className="relative bg-gray-900 py-24 sm:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80" 
            alt="Team working together" 
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            About Us
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
            We are passionate about delivering exceptional products and creating memorable shopping experiences for our customers worldwide.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="mb-12 lg:mb-0">
            <img 
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Our store" 
              className="rounded-xl shadow-xl object-cover w-full h-[400px]"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl mb-6">
              Our Story
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                Founded with a simple mission: to provide high-quality, thoughtfully designed products that enhance your everyday life. What started as a small passion project has grown into a global brand trusted by thousands.
              </p>
              <p className="mb-4">
                We believe that great design should be accessible to everyone. That's why we work directly with manufacturers, cutting out the middlemen to bring you premium goods at fair prices.
              </p>
              <p>
                Every item in our collection is carefully curated and rigorously tested to ensure it meets our uncompromising standards for quality, durability, and aesthetics.
              </p>
            </div>
            <div className="mt-8">
              <Link to="/shop" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                Explore our collection <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              Our Core Values
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              These principles guide everything we do, from product development to customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Uncompromising Quality</h3>
              <p className="text-gray-600">
                We never cut corners. We use only the finest materials and partner with the best craftsmen to ensure our products stand the test of time.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Customer First</h3>
              <p className="text-gray-600">
                Your satisfaction is our top priority. We strive to provide exceptional service and support at every step of your journey with us.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Continuous Innovation</h3>
              <p className="text-gray-600">
                We are constantly exploring new ideas, materials, and technologies to improve our products and bring you the best possible experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
