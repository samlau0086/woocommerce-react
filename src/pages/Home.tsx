import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import { getProducts, isApiConfigured } from '../services/api';
import { ProductCard } from '../components/ProductCard';
import { Loader2, AlertCircle, ArrowLeftRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        className="flex justify-between items-center w-full text-left font-medium text-gray-900"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-600">
          {answer}
        </div>
      )}
    </div>
  );
};

export const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!isApiConfigured) {
        setLoading(false);
        return;
      }
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative bg-gray-900 h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Hero background" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Elevate Your Lifestyle
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Discover our curated collection of premium products designed to bring elegance and functionality to your everyday life.
          </p>
          <Link to="/shop" className="inline-block bg-white text-gray-900 font-semibold px-8 py-4 rounded-md hover:bg-gray-100 transition-colors text-lg">
            Shop Now
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Left Image / Right Text */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
          <div className="w-full md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Premium Quality" 
              className="w-full h-auto rounded-lg shadow-lg object-cover aspect-[4/3]"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Uncompromising Quality</h2>
            <p className="text-lg text-gray-600 mb-6">
              We source only the finest materials to create products that stand the test of time. Every detail is meticulously crafted to ensure you receive nothing but the best. Experience the difference of true craftsmanship.
            </p>
            <div>
              <Link to="/shop" className="text-blue-600 font-medium hover:text-blue-800 flex items-center gap-1">
                Learn more about our process <ArrowLeftRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Image / Left Text */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12 mb-24">
          <div className="w-full md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Sustainable Design" 
              className="w-full h-auto rounded-lg shadow-lg object-cover aspect-[4/3]"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Sustainable Design</h2>
            <p className="text-lg text-gray-600 mb-6">
              Our commitment to the environment is reflected in every product we make. We use eco-friendly materials and sustainable manufacturing processes to minimize our footprint while maximizing quality and durability.
            </p>
            <div>
              <Link to="/shop" className="text-blue-600 font-medium hover:text-blue-800 flex items-center gap-1">
                Read our sustainability report <ArrowLeftRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Latest Arrivals */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Latest Arrivals
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Discover our newest collection of premium products.
            </p>
          </div>

          {!isApiConfigured && (
            <div className="mb-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Configuration Required</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      Please configure your WooCommerce API credentials in the AI Studio Secrets panel.
                      You need to set <strong>VITE_WP_API_URL</strong>, <strong>VITE_WC_CONSUMER_KEY</strong>, and <strong>VITE_WC_CONSUMER_SECRET</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          <div className="mt-10 text-center">
             <Link to="/shop" className="inline-block border border-gray-300 text-gray-700 font-medium px-6 py-3 rounded-md hover:bg-gray-50 transition-colors">
               View All Products
             </Link>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto mb-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-2">
            <FaqItem 
              question="What is your return policy?" 
              answer="We offer an easy 30-day return policy. If you are not completely satisfied with your purchase, you can return it within 30 days for a full refund or exchange. Items must be in their original condition."
            />
            <FaqItem 
              question="How long does shipping take?" 
              answer="Standard shipping typically takes 3-5 business days within the continental US. International shipping can take 7-14 business days depending on the destination."
            />
            <FaqItem 
              question="Do you offer international shipping?" 
              answer="Yes, we ship worldwide! We offer free international shipping on all orders above $50."
            />
            <FaqItem 
              question="Are your products covered by a warranty?" 
              answer="All our products come with a 1-year international warranty that covers manufacturing defects. The warranty is valid in the country of usage."
            />
          </div>
        </div>
      </div>
    </div>
  );
};
