import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { 
    title: 'Living Room', 
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
    className: 'md:col-span-2 md:row-span-2' 
  },
  { 
    title: 'Bedroom', 
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
    className: 'md:col-span-1 md:row-span-1' 
  },
  { 
    title: 'Kitchen & Dining', 
    image: 'https://images.unsplash.com/photo-1556910103-1c02745a872f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
    className: 'md:col-span-1 md:row-span-1' 
  },
];

export const CategoriesGrid: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">Explore our wide range of collections tailored for every room in your home.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
        {categories.map((cat, i) => (
          <Link 
            key={i} 
            to="/shop" 
            className={`relative overflow-hidden group rounded-xl ${cat.className}`}
          >
            <img 
              src={cat.image} 
              alt={cat.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              referrerPolicy="no-referrer" 
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-2xl font-bold text-white tracking-wide drop-shadow-md">{cat.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
