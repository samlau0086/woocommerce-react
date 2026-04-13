import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CheckCircle2, Tag, CreditCard, Loader2, AlertCircle, X, ExternalLink } from 'lucide-react';
import { getPaymentGateways, getCouponByCode, isApiConfigured, createOrder, getShippingMethods, getCustomer, loginCustomer, registerCustomer, getCurrentUser, getCountries, updateCustomer } from '../services/api';
import { PaymentGateway } from '../types';
import { decodeHtml } from '../utils/html';

export const Checkout: React.FC = () => {
  const { cart, cartSubtotal, cartTotal, clearCart, couponCode, discountAmount, applyCoupon, removeCoupon } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  // Form persistence state
  const [savedFormData, setSavedFormData] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('checkoutFormData');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return {};
      }
    }
    return {};
  });

  // User state
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  useEffect(() => {
    const loadUser = async () => {
      const savedUser = localStorage.getItem('woo_user');
      if (savedUser) {
        try {
          const user = JSON.parse(savedUser);
          setCurrentUser(user);
          
          // Fetch customer details to auto-fill
          if (user.id && isApiConfigured) {
            const customerData = await getCustomer(user.id);
            if (customerData) {
              setSavedFormData(prev => {
                const newData = { ...prev };
                
                // Auto-fill billing
                if (customerData.billing) {
                  newData['first-name'] = customerData.billing.first_name || newData['first-name'] || '';
                  newData['last-name'] = customerData.billing.last_name || newData['last-name'] || '';
                  newData.email = customerData.billing.email || user.email || newData.email || '';
                  newData.phone = customerData.billing.phone || newData.phone || '';
                  newData.address = customerData.billing.address_1 || newData.address || '';
                  newData.city = customerData.billing.city || newData.city || '';
                  newData.state = customerData.billing.state || newData.state || '';
                  newData['postal-code'] = customerData.billing.postcode || newData['postal-code'] || '';
                  newData.country = customerData.billing.country || newData.country || '';
                }
                
                // Auto-fill shipping if different
                if (customerData.shipping) {
                  newData.shipping_first_name = customerData.shipping.first_name || newData.shipping_first_name || '';
                  newData.shipping_last_name = customerData.shipping.last_name || newData.shipping_last_name || '';
                  newData.shipping_address_1 = customerData.shipping.address_1 || newData.shipping_address_1 || '';
                  newData.shipping_address_2 = customerData.shipping.address_2 || newData.shipping_address_2 || '';
                  newData.shipping_city = customerData.shipping.city || newData.shipping_city || '';
                  newData.shipping_state = customerData.shipping.state || newData.shipping_state || '';
                  newData.shipping_postcode = customerData.shipping.postcode || newData.shipping_postcode || '';
                  newData.shipping_country = customerData.shipping.country || newData.shipping_country || '';
                }
                
                return newData;
              });
              
              // Update selected country/state for shipping calculations
              if (customerData.billing?.country) {
                setSelectedCountry(customerData.billing.country);
              }
              if (customerData.billing?.state) {
                setSelectedState(customerData.billing.state);
              }
            }
          }
        } catch (e) {
          console.error('Error loading user data', e);
        }
      }
    };
    loadUser();
  }, []);

  // Shipping state
  const [allShippingMethods, setAllShippingMethods] = useState<any[]>([]);
  const [availableShippingMethods, setAvailableShippingMethods] = useState<any[]>([]);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<string>(savedFormData['shipping_method'] || '');
  const [isLoadingShipping, setIsLoadingShipping] = useState(true);
  const [shippingCost, setShippingCost] = useState(0);
  
  // Address state for shipping calculation
  const [selectedCountry, setSelectedCountry] = useState<string>(savedFormData['country'] || '');
  const [selectedState, setSelectedState] = useState<string>(savedFormData['state'] || '');
  const [countries, setCountries] = useState<any[]>([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      if (!isApiConfigured) {
        setIsLoadingCountries(false);
        return;
      }
      try {
        const data = await getCountries();
        setCountries(data);
        
        // Set default country if not set and data exists
        if (!savedFormData['country'] && data.length > 0) {
          const defaultCountry = data.find((c: any) => c.code === 'US') || data[0];
          setSelectedCountry(defaultCountry.code);
        }
      } catch (error) {
        console.error('Error loading countries:', error);
      } finally {
        setIsLoadingCountries(false);
      }
    };
    fetchCountries();
  }, []);
  
  // Check for redirect status from WooCommerce
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get('status');
    
    if (status === 'success') {
      setIsSuccess(true);
      clearCart();
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (status === 'cancel') {
      setErrorMessage('Payment was cancelled. You can try again below.');
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [location, clearCart]);
  
  // Payment Gateways
  const [paymentGateways, setPaymentGateways] = useState<PaymentGateway[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [isLoadingGateways, setIsLoadingGateways] = useState(true);

  // Coupon state
  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState({ type: '', text: '' });
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  // Validate coupon on mount or when cart changes
  useEffect(() => {
    const validateCoupon = async () => {
      if (couponCode) {
        const result = await applyCoupon(couponCode);
        if (!result.success) {
          removeCoupon();
          setCouponMessage({ text: result.message, type: 'error' });
        }
      }
    };
    validateCoupon();
  }, [couponCode, cartSubtotal]); // Re-validate if cart subtotal changes

  // Auth forms state
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLostPassword, setShowLostPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [registerMessage, setRegisterMessage] = useState('');
  
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!isApiConfigured) {
        setIsLoadingGateways(false);
        setIsLoadingShipping(false);
        return;
      }
      
      setIsLoadingGateways(true);
      setIsLoadingShipping(true);
      
      try {
        const [gateways, shipping] = await Promise.all([
          getPaymentGateways(),
          getShippingMethods()
        ]);
        
        setPaymentGateways(gateways);
        if (gateways.length > 0) {
          setSelectedPaymentMethod(gateways[0].id);
        }
        
        setAllShippingMethods(shipping);
        // Initial filter will be handled by the other useEffect
      } catch (error) {
        console.error('Error loading checkout data:', error);
      } finally {
        setIsLoadingGateways(false);
        setIsLoadingShipping(false);
      }
    };

    fetchData();
  }, []);

  // Filter shipping methods based on selected country and state
  useEffect(() => {
    if (allShippingMethods.length === 0) return;

    let matchedZoneId = 0; // Default to Rest of the World (zone_id 0)

    // 1. Try to match State (e.g. US:CA)
    const stateCode = selectedCountry && selectedState ? `${selectedCountry}:${selectedState}` : null;
    
    if (stateCode) {
      const stateMatch = allShippingMethods.find(m => 
        m.locations?.some((loc: any) => loc.type === 'state' && loc.code === stateCode)
      );
      if (stateMatch) matchedZoneId = stateMatch.zone_id;
    }

    // 2. If no state match, try to match Country
    if (matchedZoneId === 0 && selectedCountry) {
      const countryMatch = allShippingMethods.find(m => 
        m.locations?.some((loc: any) => loc.type === 'country' && loc.code === selectedCountry)
      );
      if (countryMatch) matchedZoneId = countryMatch.zone_id;
    }

    // Filter methods by the matched zone
    const filteredMethods = allShippingMethods.filter(m => m.zone_id === matchedZoneId);
    
    setAvailableShippingMethods(filteredMethods);
    
    if (filteredMethods.length > 0) {
      // Try to find the currently selected method in the new list
      let methodToSelect = filteredMethods.find(m => m.method_id === selectedShippingMethod);
      
      // If not found, default to the first one
      if (!methodToSelect) {
        methodToSelect = filteredMethods[0];
        setSelectedShippingMethod(methodToSelect.method_id);
      }
      
      // Always update the shipping cost based on the method in the new zone
      const costStr = methodToSelect.settings?.cost?.value || '0';
      const cost = parseFloat(costStr.replace(/[^0-9.-]+/g, ''));
      setShippingCost(isNaN(cost) ? 0 : cost);
    } else {
      setShippingCost(0);
      setSelectedShippingMethod('');
    }
  }, [selectedCountry, selectedState, allShippingMethods]);

  const handleShippingChange = (methodId: string) => {
    setSelectedShippingMethod(methodId);
    const method = availableShippingMethods.find(m => m.method_id === methodId);
    if (method) {
      const costStr = method.settings?.cost?.value || '0';
      const cost = parseFloat(costStr.replace(/[^0-9.-]+/g, ''));
      setShippingCost(isNaN(cost) ? 0 : cost);
    }
  };

  const handleToggleLogin = () => {
    setShowLogin(!showLogin);
    setShowRegister(false);
    setShowLostPassword(false);
    setResetSuccess(false);
    setRegisterMessage('');
  };

  const handleToggleRegister = () => {
    setShowRegister(!showRegister);
    setShowLogin(false);
    setShowLostPassword(false);
    setResetSuccess(false);
    setRegisterMessage('');
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isApiConfigured) {
      setLoginError('API is not configured. Cannot login.');
      return;
    }

    setIsLoggingIn(true);
    setLoginError('');
    try {
      const response = await loginCustomer(loginEmail, loginPassword);
      
      let customerId = response.user_id || 0;
      
      try {
        const me = await getCurrentUser(response.token);
        if (me && me.id) {
          customerId = me.id;
        }
      } catch (err) {
        console.error("Could not fetch current user details", err);
      }

      const userData = {
        id: customerId,
        email: response.user_email,
        username: response.user_display_name,
      };
      
      localStorage.setItem('woo_user', JSON.stringify(userData));
      localStorage.setItem('woo_token', response.token);
      
      setCurrentUser(userData);
      setShowLogin(false);
      
      // Try to fetch customer details to auto-fill
      if (customerId) {
        const customerData = await getCustomer(customerId);
        if (customerData) {
          setSavedFormData(prev => {
            const newData = { ...prev };
            if (customerData.billing) {
              newData['first-name'] = customerData.billing.first_name || newData['first-name'] || '';
              newData['last-name'] = customerData.billing.last_name || newData['last-name'] || '';
              newData.email = customerData.billing.email || userData.email || newData.email || '';
              newData.phone = customerData.billing.phone || newData.phone || '';
              newData.address = customerData.billing.address_1 || newData.address || '';
              newData.city = customerData.billing.city || newData.city || '';
              newData.state = customerData.billing.state || newData.state || '';
              newData['postal-code'] = customerData.billing.postcode || newData['postal-code'] || '';
              newData.country = customerData.billing.country || newData.country || '';
            }
            if (customerData.shipping) {
              newData.shipping_first_name = customerData.shipping.first_name || newData.shipping_first_name || '';
              newData.shipping_last_name = customerData.shipping.last_name || newData.shipping_last_name || '';
              newData.shipping_address_1 = customerData.shipping.address_1 || newData.shipping_address_1 || '';
              newData.shipping_address_2 = customerData.shipping.address_2 || newData.shipping_address_2 || '';
              newData.shipping_city = customerData.shipping.city || newData.shipping_city || '';
              newData.shipping_state = customerData.shipping.state || newData.shipping_state || '';
              newData.shipping_postcode = customerData.shipping.postcode || newData.shipping_postcode || '';
              newData.shipping_country = customerData.shipping.country || newData.shipping_country || '';
            }
            return newData;
          });
          if (customerData.billing?.country) setSelectedCountry(customerData.billing.country);
          if (customerData.billing?.state) setSelectedState(customerData.billing.state);
        }
      }
    } catch (error: any) {
      const msg = error.message.replace(/<[^>]+>/g, '');
      setLoginError(msg || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isApiConfigured) {
      setRegisterMessage('API is not configured. Cannot register.');
      return;
    }

    setIsRegistering(true);
    setRegisterMessage('');
    try {
      const response = await registerCustomer(registerEmail, registerPassword);
      
      const userData = {
        id: response.id,
        email: response.email,
        username: response.username || response.first_name || response.email.split('@')[0],
      };
      
      localStorage.setItem('woo_user', JSON.stringify(userData));
      setCurrentUser(userData);
      setShowRegister(false);
      
      setSavedFormData(prev => ({
        ...prev,
        email: response.email
      }));
    } catch (error: any) {
      setRegisterMessage(error.message || 'Failed to register. Email might already be in use.');
    } finally {
      setIsRegistering(false);
    }
  };

  const handleLostPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resetEmail === 'user@example.com') {
      setResetSuccess(true);
    } else {
      setShowLostPassword(false);
      setShowLogin(false);
      setShowRegister(true);
      setRegisterMessage('Email does not exist, please register.');
      setResetEmail('');
    }
  };

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    
    setIsApplyingCoupon(true);
    setCouponMessage({ type: '', text: '' });
    
    try {
      const result = await applyCoupon(couponInput);
      
      if (result.success) {
        setCouponInput('');
        setCouponMessage({ type: 'success', text: result.message });
      } else {
        setCouponMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setCouponMessage({ type: 'error', text: 'Error applying coupon.' });
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const getOrderData = () => {
    if (!formRef.current) return null;
    const formData = new FormData(formRef.current);
    
    const orderData: any = {
      customer_id: currentUser?.id || 0,
      billing: {
        first_name: formData.get('first-name') as string,
        last_name: formData.get('last-name') as string,
        address_1: formData.get('address') as string,
        city: formData.get('city') as string,
        state: formData.get('state') as string,
        postcode: formData.get('postal-code') as string,
        country: formData.get('country') as string,
        email: formData.get('email') as string,
        phone: `${formData.get('country-code')}${formData.get('phone')}`
      },
      shipping: {
        first_name: formData.get('first-name') as string,
        last_name: formData.get('last-name') as string,
        address_1: formData.get('address') as string,
        city: formData.get('city') as string,
        state: formData.get('state') as string,
        postcode: formData.get('postal-code') as string,
        country: formData.get('country') as string,
      },
      line_items: cart.map(item => ({
        product_id: item.product.id,
        quantity: item.quantity
      })),
      shipping_lines: selectedShippingMethod ? [
        {
          method_id: selectedShippingMethod,
          method_title: availableShippingMethods.find(m => m.method_id === selectedShippingMethod)?.title || 'Shipping',
          total: shippingCost.toString()
        }
      ] : [],
      coupon_lines: couponCode ? [{ code: couponCode }] : [],
      meta_data: [
        {
          key: '_headless_frontend_url',
          value: window.location.origin
        }
      ]
    };

    return orderData;
  };

  const handleFormChange = () => {
    setTimeout(() => {
      if (!formRef.current) return;
      const formData = new FormData(formRef.current);
      const data: Record<string, string> = {};
      formData.forEach((value, key) => {
        data[key] = value as string;
      });
      localStorage.setItem('checkoutFormData', JSON.stringify(data));
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const orderData = getOrderData();
    if (!orderData) {
      setIsSubmitting(false);
      return;
    }
    
    try {
      if (!isApiConfigured) {
        throw new Error('API is not configured');
      }
      const orderResponse = await createOrder(orderData);
      
      // Update customer billing and shipping address if logged in
      if (currentUser?.id) {
        try {
          await updateCustomer(currentUser.id, {
            billing: orderData.billing,
            shipping: orderData.shipping
          });
        } catch (err) {
          console.error('Failed to update customer address:', err);
        }
      }
      
      clearCart();
      
      if (orderResponse.payment_url) {
        // Show the manual redirect button to avoid iframe CSP issues
        let finalPaymentUrl = orderResponse.payment_url;
        const token = localStorage.getItem('woo_token');
        if (token) {
          const separator = finalPaymentUrl.includes('?') ? '&' : '?';
          finalPaymentUrl = `${finalPaymentUrl}${separator}token=${token}`;
        }
        setPaymentUrl(finalPaymentUrl);
      } else {
        // Fallback if no payment URL is provided
        navigate(`/order-confirmation?order_id=${orderResponse.id}`);
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Checkout failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (paymentUrl) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 sm:px-6 lg:px-8 text-center">
        <CreditCard className="w-20 h-20 text-blue-500 mx-auto mb-6" />
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Almost there!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Your order has been created. Please proceed to our secure payment portal to complete your purchase using your selected payment method.
        </p>
        <a 
          href={paymentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          Proceed to Payment <ExternalLink className="ml-2 w-5 h-5" />
        </a>
        <p className="mt-6 text-sm text-gray-500">
          This will open a new secure tab. You can close this window once your payment is complete.
        </p>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 sm:px-6 lg:px-8 text-center">
        <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Order Confirmed!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for your purchase. We've received your order and will begin processing it right away.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center justify-center px-8 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-black hover:bg-gray-800 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Checkout</h1>
        <p className="text-gray-500 mb-8">Your cart is empty. Please add some items before checking out.</p>
        <button 
          onClick={() => navigate('/')}
          className="inline-flex items-center justify-center px-8 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-black hover:bg-gray-800 transition-colors"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 pt-12 pb-24 sm:px-6 lg:px-8">
        
        {errorMessage && (
          <div className="mb-8 bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}

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

        {/* Login / Register Prompt */}
        {!currentUser && (
          <div className="mb-4 bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-medium">Returning customer?</span>{' '}
              <button onClick={handleToggleLogin} className="underline hover:text-blue-600 font-semibold">
                Click here to login
              </button>
            </div>
            <div>
              <span className="font-medium">New here?</span>{' '}
              <button onClick={handleToggleRegister} className="underline hover:text-blue-600 font-semibold">
                Create an account
              </button>
            </div>
          </div>
        )}

        {/* Inline Login Form */}
        {showLogin && !showLostPassword && (
          <div className="mb-8 p-6 bg-white border border-gray-200 rounded-lg shadow-sm max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Login to your account</h3>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginError && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm mb-4">
                  {loginError}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">Email address <span className="text-red-500">*</span></label>
                <input 
                  type="email" 
                  required 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password <span className="text-red-500">*</span></label>
                <input 
                  type="password" 
                  required 
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border" 
                />
              </div>
              <div className="flex items-center justify-between pt-2">
                <button 
                  type="submit" 
                  disabled={isLoggingIn}
                  className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 flex items-center"
                >
                  {isLoggingIn && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Login
                </button>
                <button type="button" onClick={() => setShowLostPassword(true)} className="text-sm text-blue-600 hover:text-blue-500">Lost your password?</button>
              </div>
            </form>
          </div>
        )}

        {/* Inline Lost Password Form */}
        {showLogin && showLostPassword && (
          <div className="mb-8 p-6 bg-white border border-gray-200 rounded-lg shadow-sm max-w-md">
            {resetSuccess ? (
              <div className="text-center py-4">
                <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Check your email</h3>
                <p className="text-sm text-gray-500 mb-6">A password recover link has been sent to your email.</p>
                <button 
                  onClick={() => { setShowLostPassword(false); setResetSuccess(false); setShowLogin(true); }} 
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  Return to login
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Lost your password?</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Please enter your username or email address. You will receive a link to create a new password via email.
                  <br/><span className="text-xs text-blue-500">(Hint: use user@example.com for success)</span>
                </p>
                <form onSubmit={handleLostPasswordSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email address</label>
                    <input 
                      type="email" 
                      required 
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border" 
                    />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <button type="submit" className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors font-medium">Reset password</button>
                    <button type="button" onClick={() => setShowLostPassword(false)} className="text-sm text-blue-600 hover:text-blue-500">Back to login</button>
                  </div>
                </form>
              </>
            )}
          </div>
        )}

        {/* Inline Register Form */}
        {showRegister && (
          <div className="mb-8 p-6 bg-white border border-gray-200 rounded-lg shadow-sm max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Create a new account</h3>
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              {registerMessage && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm mb-4">
                  {registerMessage}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">Email address <span className="text-red-500">*</span></label>
                <input 
                  type="email" 
                  required 
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password <span className="text-red-500">*</span></label>
                <input 
                  type="password" 
                  required 
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border" 
                />
              </div>
              <p className="text-xs text-gray-500">Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.</p>
              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={isRegistering}
                  className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 flex items-center"
                >
                  {isRegistering && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Register
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          
          {/* Checkout Form */}
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-8">Billing & Shipping Details</h2>
            <form key={`form-${savedFormData.email || ''}-${savedFormData['first-name'] || ''}`} id="checkout-form" ref={formRef} onSubmit={handleSubmit} onChange={handleFormChange} className="space-y-6">
              
              {/* Contact Info: Email & Phone at the top */}
              <div className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                  <div className="mt-1">
                    <input type="email" id="email" name="email" defaultValue={savedFormData['email'] || ''} required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border" />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone number</label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <select
                      id="country-code"
                      name="country-code"
                      defaultValue={savedFormData['country-code'] || '+1'}
                      className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="+1">US (+1)</option>
                      <option value="+44">UK (+44)</option>
                      <option value="+86">CN (+86)</option>
                      <option value="+61">AU (+61)</option>
                      <option value="+81">JP (+81)</option>
                      <option value="+49">DE (+49)</option>
                      <option value="+33">FR (+33)</option>
                      <option value="+91">IN (+91)</option>
                    </select>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      defaultValue={savedFormData['phone'] || ''}
                      required
                      className="flex-1 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300 px-4 py-2 border focus:ring-blue-500 focus:border-blue-500"
                      placeholder="234 567 8900"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 mt-6"></div>

              {/* Name & Address */}
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First name</label>
                  <div className="mt-1">
                    <input type="text" id="first-name" name="first-name" defaultValue={savedFormData['first-name'] || ''} required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border" />
                  </div>
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last name</label>
                  <div className="mt-1">
                    <input type="text" id="last-name" name="last-name" defaultValue={savedFormData['last-name'] || ''} required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border" />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country / Region</label>
                <div className="mt-1">
                  <select
                    id="country"
                    name="country"
                    required
                    value={selectedCountry}
                    onChange={(e) => {
                      setSelectedCountry(e.target.value);
                      setSelectedState(''); // Reset state when country changes
                      handleFormChange();
                    }}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border bg-white"
                    disabled={isLoadingCountries}
                  >
                    <option value="">Select a country...</option>
                    {countries.map((country: any) => (
                      <option key={country.code} value={country.code}>
                        {decodeHtml(country.name)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <div className="mt-1">
                  <input type="text" id="address" name="address" defaultValue={savedFormData['address'] || ''} required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                <div className="sm:col-span-1">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                  <div className="mt-1">
                    <input type="text" id="city" name="city" defaultValue={savedFormData['city'] || ''} required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border" />
                  </div>
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">State / Province</label>
                  <div className="mt-1">
                    {(() => {
                      const selectedCountryObj = countries.find(c => c.code === selectedCountry);
                      const hasStates = selectedCountryObj && selectedCountryObj.states && selectedCountryObj.states.length > 0;
                      
                      if (hasStates) {
                        return (
                          <select
                            id="state"
                            name="state"
                            required
                            value={selectedState}
                            onChange={(e) => {
                              setSelectedState(e.target.value);
                              handleFormChange();
                            }}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border bg-white"
                          >
                            <option value="">Select a state...</option>
                            {selectedCountryObj.states.map((state: any) => (
                              <option key={state.code} value={state.code}>
                                {decodeHtml(state.name)}
                              </option>
                            ))}
                          </select>
                        );
                      }
                      
                      return (
                        <input 
                          type="text" 
                          id="state" 
                          name="state" 
                          required 
                          value={selectedState}
                          onChange={(e) => {
                            setSelectedState(e.target.value);
                            handleFormChange();
                          }}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border" 
                        />
                      );
                    })()}
                  </div>
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">Postal code</label>
                  <div className="mt-1">
                    <input type="text" id="postal-code" name="postal-code" defaultValue={savedFormData['postal-code'] || ''} required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border" />
                  </div>
                </div>
              </div>
              <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Method</h2>
                
                {isLoadingShipping ? (
                  <div className="flex justify-center items-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                    <span className="ml-2 text-gray-500">Loading shipping methods...</span>
                  </div>
                ) : availableShippingMethods.length > 0 ? (
                  <div className="space-y-4">
                    {availableShippingMethods.map((method) => {
                      const costStr = method.settings?.cost?.value || '0';
                      const cost = parseFloat(costStr.replace(/[^0-9.-]+/g, ''));
                      const displayCost = isNaN(cost) || cost === 0 ? 'Free' : `$${cost.toFixed(2)}`;
                      
                      return (
                        <div key={method.method_id} className={`border rounded-lg p-4 cursor-pointer transition-colors ${selectedShippingMethod === method.method_id ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => handleShippingChange(method.method_id)}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <input
                                id={`shipping-${method.method_id}`}
                                name="shipping_method"
                                type="radio"
                                value={method.method_id}
                                checked={selectedShippingMethod === method.method_id}
                                onChange={(e) => handleShippingChange(e.target.value)}
                                className="h-4 w-4 text-black focus:ring-black border-gray-300"
                              />
                              <label htmlFor={`shipping-${method.method_id}`} className="ml-3 flex items-center cursor-pointer">
                                <span className="block text-sm font-medium text-gray-900">
                                  {method.title}
                                </span>
                              </label>
                            </div>
                            <span className="text-sm font-medium text-gray-900">{displayCost}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-yellow-50 p-4 border border-yellow-200 rounded-md text-sm text-yellow-700 flex items-start">
                    <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                    <p>No shipping methods are available. Please configure them in your WooCommerce settings.</p>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-8">Order Summary</h2>
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <ul className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <li key={item.product.id} className="flex py-6 px-4 sm:px-6">
                    <div className="flex-shrink-0">
                      {item.product.images[0] ? (
                        <img src={item.product.images[0].src} alt={decodeHtml(item.product.name)} className="w-16 h-16 rounded-md object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="w-16 h-16 rounded-md bg-gray-100" />
                      )}
                    </div>
                    <div className="ml-4 flex-1 flex flex-col">
                      <div>
                        <div className="flex justify-between text-sm font-medium text-gray-900">
                          <h3>{decodeHtml(item.product.name)}</h3>
                          <p>${(parseFloat(item.product.price) * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex-1 flex items-end justify-between text-sm">
                        <p className="text-gray-500">Qty {item.quantity}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              
              {/* Coupon Section */}
              <div className="border-t border-gray-200 py-6 px-4 sm:px-6 bg-gray-50">
                {couponCode ? (
                  <div className="flex items-center justify-between bg-green-50 p-2 rounded-md border border-green-200">
                    <div className="flex items-center">
                      <Tag className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-sm font-medium text-green-800">{couponCode}</span>
                    </div>
                    <button 
                      onClick={removeCoupon}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      type="button"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-3">
                    <div className="relative flex-grow">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Tag className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Coupon code"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="block w-full pl-10 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isApplyingCoupon || !couponInput.trim()}
                      className="bg-gray-200 text-gray-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors disabled:opacity-50 flex items-center"
                    >
                      {isApplyingCoupon ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Apply'}
                    </button>
                  </form>
                )}
                {couponMessage.text && (
                  <p className={`mt-2 text-sm ${couponMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {couponMessage.text}
                  </p>
                )}
              </div>

              <dl className="border-t border-gray-200 py-6 px-4 space-y-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">${cartSubtotal.toFixed(2)}</dd>
                </div>
                
                {couponCode && discountAmount > 0 && (
                  <div className="flex items-center justify-between text-green-600">
                    <dt className="text-sm">Discount ({couponCode})</dt>
                    <dd className="text-sm font-medium">-${discountAmount.toFixed(2)}</dd>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                  </dd>
                </div>
                
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">Total</dt>
                  <dd className="text-base font-medium text-gray-900">${(cartTotal + shippingCost).toFixed(2)}</dd>
                </div>
              </dl>

              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <button
                  type="submit"
                  form="checkout-form"
                  disabled={isSubmitting || isLoadingShipping}
                  className="w-full bg-black border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? 'Processing...' : isLoadingShipping ? 'Loading Shipping...' : 'Proceed to Payment'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
