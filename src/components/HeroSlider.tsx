import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    title: 'Welcome to WMVault',
    description: 'Explore our exclusive range of high-end products tailored for your sophisticated taste.',
    ctaText: 'Shop Now',
    ctaLink: '/shop'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1618220179428-22790b46a013?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    title: 'Modern Living Spaces',
    description: 'Transform your home with our contemporary furniture and decor pieces that blend style with comfort.',
    ctaText: 'Explore Collection',
    ctaLink: '/shop'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    title: 'Uncompromising Quality',
    description: 'We source only the finest materials to create products that stand the test of time.',
    ctaText: 'Learn More',
    ctaLink: '/shop'
  }
];

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative bg-gray-900 h-[600px] w-full overflow-hidden group">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center justify-center ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-full object-cover opacity-40"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6 transform transition-transform duration-700 translate-y-0">
              {slide.title}
            </h2>
            <p className="text-xl sm:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
              {slide.description}
            </p>
            <Link to={slide.ctaLink} className="inline-block bg-white text-gray-900 font-semibold px-8 py-4 rounded-md hover:bg-gray-100 transition-colors text-lg">
              {slide.ctaText}
            </Link>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
