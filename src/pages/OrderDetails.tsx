import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft, Package, CheckCircle2, Clock, XCircle, AlertCircle, CreditCard } from 'lucide-react';
import { getOrder, isApiConfigured } from '../services/api';

export const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id || !isApiConfigured) {
        setError('Invalid order ID or API not configured.');
        setLoading(false);
        return;
      }

      try {
        const orderData = await getOrder(parseInt(id, 10));
        
        // Basic security check: ensure the user viewing this is the owner
        // In a real app, the API request should be authenticated and the backend should enforce this.
        // Here we do a client-side check against the logged-in user.
        const savedUser = localStorage.getItem('woo_user');
        if (savedUser) {
          const user = JSON.parse(savedUser);
          if (orderData.customer_id !== 0 && orderData.customer_id !== user.id) {
            setError('You do not have permission to view this order.');
            setLoading(false);
            return;
          }
        } else if (orderData.customer_id !== 0) {
           setError('Please log in to view this order.');
           setLoading(false);
           return;
        }

        setOrder(orderData);
      } catch (err: any) {
        console.error('Error fetching order:', err);
        setError('Failed to load order details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'on-hold': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-gray-100 text-gray-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'processing': return <Package className="w-5 h-5 text-blue-600" />;
      case 'on-hold': return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'cancelled': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'failed': return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'pending': return <Clock className="w-5 h-5 text-yellow-600" />;
      default: return <Package className="w-5 h-5 text-gray-600" />;
    }
  };

  const isUnpaid = order && ['pending', 'on-hold', 'failed'].includes(order.status);

  const getPaymentUrlWithToken = (url: string) => {
    const token = localStorage.getItem('woo_token');
    if (!token) return url;
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}token=${token}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </button>
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error || 'Order not found'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => navigate('/account')} className="flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Account
        </button>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-200 gap-4">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Order #{order.id}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Placed on {new Date(order.date_created).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {getStatusIcon(order.status)}
              <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full capitalize ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            {isUnpaid && order.payment_url && (
              <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                <h4 className="text-lg font-medium text-yellow-800 mb-2">Payment Required</h4>
                <p className="text-sm text-yellow-700 mb-4">
                  This order is currently {order.status}. Please complete your payment to process the order.
                </p>
                <a 
                  href={getPaymentUrlWithToken(order.payment_url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-black hover:bg-gray-800 transition-colors"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Pay Now
                </a>
              </div>
            )}

            <h4 className="text-md font-medium text-gray-900 mb-4">Order Details</h4>
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {order.line_items.map((item: any) => (
                  <li key={item.id} className="px-4 py-4 flex items-center justify-between sm:px-6">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      <span dangerouslySetInnerHTML={{ __html: order.currency_symbol }}></span>
                      {item.total}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="bg-gray-50 px-4 py-4 sm:px-6 border-t border-gray-200">
                <div className="flex justify-between text-sm font-medium text-gray-900">
                  <p>Total</p>
                  <p>
                    <span dangerouslySetInnerHTML={{ __html: order.currency_symbol }}></span>
                    {order.total}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Billing Address</h4>
                <address className="text-sm text-gray-500 not-italic">
                  {order.billing.first_name} {order.billing.last_name}<br />
                  {order.billing.address_1}<br />
                  {order.billing.address_2 && <>{order.billing.address_2}<br /></>}
                  {order.billing.city}, {order.billing.state} {order.billing.postcode}<br />
                  {order.billing.country}<br />
                  <br />
                  {order.billing.email}<br />
                  {order.billing.phone}
                </address>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Shipping Address</h4>
                <address className="text-sm text-gray-500 not-italic">
                  {order.shipping.first_name} {order.shipping.last_name}<br />
                  {order.shipping.address_1}<br />
                  {order.shipping.address_2 && <>{order.shipping.address_2}<br /></>}
                  {order.shipping.city}, {order.shipping.state} {order.shipping.postcode}<br />
                  {order.shipping.country}
                </address>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
