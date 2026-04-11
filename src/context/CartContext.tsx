import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '../types';
import { getCouponByCode, isApiConfigured } from '../services/api';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  couponCode: string | null;
  discountAmount: number;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('woo_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState<string | null>(() => {
    return localStorage.getItem('woo_coupon') || null;
  });
  const [discountAmount, setDiscountAmount] = useState(0);

  useEffect(() => {
    localStorage.setItem('woo_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (couponCode) {
      localStorage.setItem('woo_coupon', couponCode);
    } else {
      localStorage.removeItem('woo_coupon');
    }
  }, [couponCode]);

  const calculateDiscount = async (code: string | null, currentCart: CartItem[]) => {
    if (!code) {
      setDiscountAmount(0);
      return;
    }

    const subtotal = currentCart.reduce((total, item) => {
      const price = parseFloat(item.product.price);
      return total + price * item.quantity;
    }, 0);

    if (subtotal === 0) {
      setDiscountAmount(0);
      return;
    }

    if (!isApiConfigured) {
      setDiscountAmount(0);
      return;
    }

    try {
      const coupon = await getCouponByCode(code);
      if (!coupon) {
        setDiscountAmount(0);
        return;
      }

      // Check minimum amount
      const minAmount = parseFloat(coupon.minimum_amount);
      if (minAmount > 0 && subtotal < minAmount) {
        setDiscountAmount(0);
        return;
      }

      let calculatedDiscount = 0;
      const amount = parseFloat(coupon.amount);

      if (coupon.discount_type === 'percent') {
        calculatedDiscount = subtotal * (amount / 100);
      } else if (coupon.discount_type === 'fixed_cart') {
        calculatedDiscount = amount;
      } else {
        calculatedDiscount = amount;
      }

      calculatedDiscount = Math.min(calculatedDiscount, subtotal);
      setDiscountAmount(calculatedDiscount);
    } catch (error) {
      console.error('Error recalculating discount:', error);
      setDiscountAmount(0);
    }
  };

  // Recalculate discount when cart changes
  useEffect(() => {
    calculateDiscount(couponCode, cart);
  }, [cart, couponCode]);

  const addToCart = (product: Product, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    removeCoupon();
  };

  const applyCoupon = async (code: string): Promise<{ success: boolean; message: string }> => {
    if (!isApiConfigured) {
      return { success: false, message: 'API is not configured.' };
    }

    try {
      const coupon = await getCouponByCode(code);
      
      if (!coupon) {
        return { success: false, message: 'Invalid coupon code.' };
      }

      // Check usage limit
      if (coupon.usage_limit && coupon.usage_count >= coupon.usage_limit) {
        return { success: false, message: 'Coupon usage limit has been reached.' };
      }

      // Check expiry date
      if (coupon.expiry_date && new Date(coupon.expiry_date) < new Date()) {
        return { success: false, message: 'This coupon has expired.' };
      }

      const subtotal = cart.reduce((total, item) => {
        const price = parseFloat(item.product.price);
        return total + price * item.quantity;
      }, 0);

      // Check minimum amount
      const minAmount = parseFloat(coupon.minimum_amount);
      if (minAmount > 0 && subtotal < minAmount) {
        return { success: false, message: `Minimum spend for this coupon is $${minAmount}.` };
      }

      setCouponCode(code);
      await calculateDiscount(code, cart);
      
      return { success: true, message: 'Coupon applied successfully!' };
    } catch (error) {
      console.error('Error applying coupon:', error);
      return { success: false, message: 'Error applying coupon. Please try again.' };
    }
  };

  const removeCoupon = () => {
    setCouponCode(null);
    setDiscountAmount(0);
  };

  const cartSubtotal = cart.reduce((total, item) => {
    const price = parseFloat(item.product.price);
    return total + price * item.quantity;
  }, 0);

  const cartTotal = Math.max(0, cartSubtotal - discountAmount);

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        couponCode,
        discountAmount,
        applyCoupon,
        removeCoupon
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
