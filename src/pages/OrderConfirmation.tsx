import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { getOrder } from '../services/api';

export const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const orderId = params.get('order_id');
    const status = params.get('status');

    if (status === 'cancel') {
      setError('Payment was cancelled. You can try placing the order again.');
      setLoading(false);
      return;
    }

    if (!orderId) {
      setError('No order ID found.');
      setLoading(false);
      return;
    }

    getOrder(Number(orderId))
      .then(data => {
        setOrder(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load order details.');
        setLoading(false);
      });
  }, [location]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Payment Cancelled</h1>
        <p className="text-lg text-gray-600 mb-8">{error}</p>
        <Link 
          to="/checkout" 
          className="inline-flex items-center justify-center px-8 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-black hover:bg-gray-800 transition-colors"
        >
          Return to Checkout
        </Link>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-extrabold text-gray-900">Order Confirmed!</h1>
          <p className="text-lg text-gray-600 mt-2">Thank you for your order. Your order number is #{order.id}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-medium text-gray-900">Order Details</h2>
          </div>
          <div className="p-6">
            <div className="flow-root">
              <ul className="-my-4 divide-y divide-gray-200">
                {order.line_items.map((item: any) => (
                  <li key={item.id} className="py-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900">{item.name}</span>
                      <span className="ml-3 text-sm text-gray-500">x {item.quantity}</span>
                    </div>
                    <span className="font-medium text-gray-900">${parseFloat(item.total).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                <p>Total</p>
                <p>${parseFloat(order.total).toFixed(2)}</p>
              </div>
              <div className="text-sm text-gray-600 space-y-2">
                <p><strong>Payment Method:</strong> {order.payment_method_title || 'N/A'}</p>
                <p><strong>Status:</strong> <span className="capitalize">{order.status}</span></p>
                <p><strong>Email:</strong> {order.billing.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link 
            to="/" 
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-black hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};
