import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  { 
    name: 'Sarah Johnson', 
    role: 'Interior Designer', 
    text: 'The quality of these products is absolutely outstanding. They have completely transformed my living space and my clients love them.', 
    rating: 5 
  },
  { 
    name: 'Michael Chen', 
    role: 'Homeowner', 
    text: 'Fast shipping, incredible customer service, and the items look exactly like the pictures. I will definitely be shopping here again.', 
    rating: 5 
  },
  { 
    name: 'Emma Davis', 
    role: 'Architect', 
    text: 'Beautiful designs that blend perfectly with modern architecture. The attention to detail is what sets this brand apart.', 
    rating: 5 
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <div className="bg-white py-16 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Don't just take our word for it. Read what our satisfied customers have to say about their experience.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-8 italic leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-lg">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
