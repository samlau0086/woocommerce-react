import React, { useState } from 'react';
import { Package, Search, Loader2, CheckCircle2, Clock, Truck, XCircle } from 'lucide-react';
import { trackOrder } from '../services/api';

export const OrderTracking: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [orderData, setOrderData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId || !email) return;

    setStatus('loading');
    setErrorMessage('');
    setOrderData(null);

    try {
      // Clean up order ID (remove # if user entered it)
      const cleanOrderId = orderId.replace(/^#/, '').trim();
      const data = await trackOrder(cleanOrderId, email.trim());
      setOrderData(data);
      setStatus('success');
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.message || 'Could not find the order. Please check your details and try again.');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-8 h-8 text-green-500" />;
      case 'processing':
        return <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />;
      case 'on-hold':
      case 'pending':
        return <Clock className="w-8 h-8 text-yellow-500" />;
      case 'cancelled':
      case 'refunded':
      case 'failed':
        return <XCircle className="w-8 h-8 text-red-500" />;
      default:
        return <Package className="w-8 h-8 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'on-hold':
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
      case 'refunded':
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <Package className="mx-auto h-12 w-12 text-blue-600" />
          <h1 className="mt-4 text-3xl font-extrabold text-gray-900">Track Your Order</h1>
          <p className="mt-2 text-lg text-gray-600">
            To track your order please enter your Order ID in the box below and press the "Track" button.
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="orderId" className="block text-sm font-medium text-gray-700">
                Order ID
              </label>
              <div className="mt-1">
                <input
                  id="orderId"
                  name="orderId"
                  type="text"
                  required
                  placeholder="Found in your order confirmation email."
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Billing Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Email you used during checkout."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 transition-colors"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Tracking...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Track Order
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {status === 'error' && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <XCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}

        {status === 'success' && orderData && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Order #{orderData.id}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Placed on {new Date(orderData.date_created).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {getStatusIcon(orderData.status)}
                <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full capitalize ${getStatusColor(orderData.status)}`}>
                  {orderData.status}
                </span>
              </div>
            </div>
            
            <div className="px-4 py-5 sm:p-6">
              <h4 className="text-md font-medium text-gray-900 mb-4">Order Details</h4>
              <div className="border border-gray-200 rounded-md overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {orderData.line_items.map((item: any) => (
                    <li key={item.id} className="px-4 py-4 flex items-center justify-between sm:px-6">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        <span dangerouslySetInnerHTML={{ __html: orderData.currency_symbol }}></span>
                        {item.total}
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="bg-gray-50 px-4 py-4 sm:px-6 border-t border-gray-200">
                  <div className="flex justify-between text-sm font-medium text-gray-900">
                    <p>Total</p>
                    <p>
                      <span dangerouslySetInnerHTML={{ __html: orderData.currency_symbol }}></span>
                      {orderData.total}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Billing Address</h4>
                  <address className="text-sm text-gray-500 not-italic">
                    {orderData.billing.first_name} {orderData.billing.last_name}<br />
                    {orderData.billing.address_1}<br />
                    {orderData.billing.address_2 && <>{orderData.billing.address_2}<br /></>}
                    {orderData.billing.city}, {orderData.billing.state} {orderData.billing.postcode}<br />
                    {orderData.billing.country}<br />
                    <br />
                    {orderData.billing.email}<br />
                    {orderData.billing.phone}
                  </address>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Shipping Address</h4>
                  <address className="text-sm text-gray-500 not-italic">
                    {orderData.shipping.first_name} {orderData.shipping.last_name}<br />
                    {orderData.shipping.address_1}<br />
                    {orderData.shipping.address_2 && <>{orderData.shipping.address_2}<br /></>}
                    {orderData.shipping.city}, {orderData.shipping.state} {orderData.shipping.postcode}<br />
                    {orderData.shipping.country}
                  </address>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
