import React from 'react';
import { formatPrice } from '../utils/html';

interface PriceDisplayProps {
  price: string;
  regularPrice?: string;
  salePrice?: string;
  onSale?: boolean;
  className?: string;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({ 
  price, 
  regularPrice, 
  salePrice, 
  onSale,
  className = "text-sm font-semibold text-gray-900"
}) => {
  if (onSale && regularPrice) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="text-gray-400 line-through text-sm">{formatPrice(regularPrice)}</span>
        <span className="text-red-600">{formatPrice(price || salePrice || '')}</span>
      </div>
    );
  }

  return (
    <div className={className}>
      {formatPrice(price)}
    </div>
  );
};
