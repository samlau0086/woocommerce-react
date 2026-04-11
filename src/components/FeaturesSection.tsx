import React from 'react';
import { Truck, Shield, Clock, CreditCard } from 'lucide-react';

const features = [
  { icon: Truck, title: 'Free Shipping', description: 'On all orders over $100' },
  { icon: Shield, title: 'Secure Payment', description: '100% secure payment' },
  { icon: Clock, title: '24/7 Support', description: 'Dedicated support anytime' },
  { icon: CreditCard, title: 'Money Back', description: '30 days guarantee' },
];

export const FeaturesSection: React.FC = () => {
  return (
    <div className="bg-gray-50 py-12 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:shadow-md transition-shadow">
                <feature.icon className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
