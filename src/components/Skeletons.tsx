import React from 'react';

export const ProductCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
    <div className="w-full h-64 bg-gray-200"></div>
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-6 bg-gray-200 rounded w-1/4 mt-4"></div>
    </div>
  </div>
);

export const ProductGridSkeleton = ({ count = 4 }: { count?: number }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

export const ProductDetailSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
    <div className="flex items-center gap-2 mb-8">
      <div className="h-4 bg-gray-200 rounded w-16"></div>
      <div className="h-4 bg-gray-200 rounded w-4"></div>
      <div className="h-4 bg-gray-200 rounded w-24"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="space-y-4">
        <div className="aspect-square bg-gray-200 rounded-2xl w-full"></div>
        <div className="grid grid-cols-4 gap-4">
          <div className="aspect-square bg-gray-200 rounded-lg"></div>
          <div className="aspect-square bg-gray-200 rounded-lg"></div>
          <div className="aspect-square bg-gray-200 rounded-lg"></div>
          <div className="aspect-square bg-gray-200 rounded-lg"></div>
        </div>
      </div>
      <div className="space-y-6">
        <div className="h-10 bg-gray-200 rounded w-3/4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
        <div className="h-12 bg-gray-200 rounded w-full mt-8"></div>
      </div>
    </div>
  </div>
);

export const BlogPostSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
    <div className="w-full h-64 bg-gray-200"></div>
    <div className="p-8 space-y-4">
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      <div className="h-8 bg-gray-200 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
  </div>
);

export const BlogGridSkeleton = ({ count = 3 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {Array.from({ length: count }).map((_, i) => (
      <BlogPostSkeleton key={i} />
    ))}
  </div>
);

export const BlogPostDetailSkeleton = () => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-24 mb-8"></div>
    <div className="h-12 bg-gray-200 rounded w-3/4 mb-6"></div>
    <div className="flex gap-4 mb-8">
      <div className="h-4 bg-gray-200 rounded w-32"></div>
      <div className="h-4 bg-gray-200 rounded w-32"></div>
    </div>
    <div className="w-full h-96 bg-gray-200 rounded-2xl mb-12"></div>
    <div className="space-y-4">
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="h-4 bg-gray-200 rounded w-full mt-8"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-4/5"></div>
    </div>
  </div>
);

export const GenericSkeleton = ({ className }: { className?: string }) => (
  <div className={`bg-gray-200 animate-pulse rounded-lg ${className || 'w-full h-32'}`}></div>
);
