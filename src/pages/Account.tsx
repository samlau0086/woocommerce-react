import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GenericSkeleton } from '../components/Skeletons';
import { CheckCircle2, Loader2, LogOut, User as UserIcon, Eye, EyeOff, Package, MapPin, Settings, LayoutDashboard } from 'lucide-react';
import { registerCustomer, getCustomerByEmail, loginCustomer, isApiConfigured, getCustomerOrders, getCustomer, updateCustomer, getCurrentUser, getCountries } from '../services/api';

const OrdersSection = ({ userId }: { userId: number }) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    getCustomerOrders(userId).then(setOrders).finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <GenericSkeleton className="w-full h-64" />;
  if (orders.length === 0) return (
    <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
      <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
      <p className="text-gray-500 mb-4">No order has been made yet.</p>
      <Link to="/shop" className="inline-block bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors">Browse products</Link>
    </div>
  );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Your Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="py-3 px-4 font-medium text-sm text-gray-700">Order</th>
              <th className="py-3 px-4 font-medium text-sm text-gray-700">Date</th>
              <th className="py-3 px-4 font-medium text-sm text-gray-700">Status</th>
              <th className="py-3 px-4 font-medium text-sm text-gray-700">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm font-medium">
                  <Link to={`/order/${order.id}`} className="text-blue-600 hover:underline">#{order.id}</Link>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">{new Date(order.date_created).toLocaleDateString()}</td>
                <td className="py-3 px-4 text-sm">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                    ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                      order.status === 'processing' ? 'bg-blue-100 text-blue-800' : 
                      order.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                      'bg-gray-100 text-gray-800'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-900">${order.total} <span className="text-gray-500 text-xs">for {order.line_items?.length || 0} items</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AddressesSection = ({ userId }: { userId: number }) => {
  const [customer, setCustomer] = useState<any>(null);
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    Promise.all([
      getCustomer(userId),
      getCountries()
    ]).then(([customerData, countriesData]) => {
      setCustomer(customerData);
      setCountries(countriesData);
    }).finally(() => setLoading(false));
  }, [userId]);

  const getStatesForCountry = (countryCode: string) => {
    const country = countries.find(c => c.code === countryCode);
    return country?.states || [];
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    setSaving(true);
    setMessage({ type: '', text: '' });
    try {
      const sanitizeAddress = (addr: any, isBilling: boolean) => {
        if (!addr) return {};
        const sanitized: any = {
          first_name: addr.first_name || '',
          last_name: addr.last_name || '',
          company: addr.company || '',
          address_1: addr.address_1 || '',
          address_2: addr.address_2 || '',
          city: addr.city || '',
          postcode: addr.postcode || '',
          country: addr.country || '',
          state: addr.state || ''
        };
        
        if (isBilling) {
          sanitized.phone = addr.phone || '';
          if (addr.email) {
            sanitized.email = addr.email;
          }
        } else {
          if (addr.phone) {
            sanitized.phone = addr.phone;
          }
        }
        
        return sanitized;
      };

      await updateCustomer(userId, {
        billing: sanitizeAddress(customer.billing, true),
        shipping: sanitizeAddress(customer.shipping, false)
      });
      setMessage({ type: 'success', text: 'Addresses saved successfully.' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error saving addresses.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <GenericSkeleton className="w-full h-64" />;
  if (!customer) return <div className="p-8 text-center text-gray-500">Could not load customer data. Please try logging out and logging in again.</div>;

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Addresses</h2>
      <p className="text-sm text-gray-500 mb-6">The following addresses will be used on the checkout page by default.</p>
      
      {message.text && (
        <div className={`mb-6 p-4 rounded-md text-sm ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><MapPin className="w-4 h-4" /> Billing Address</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">First Name</label>
                <input type="text" value={customer?.billing?.first_name || ''} onChange={e => setCustomer({...customer, billing: {...customer.billing, first_name: e.target.value}})} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Last Name</label>
                <input type="text" value={customer?.billing?.last_name || ''} onChange={e => setCustomer({...customer, billing: {...customer.billing, last_name: e.target.value}})} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Company Name (optional)</label>
              <input type="text" value={customer?.billing?.company || ''} onChange={e => setCustomer({...customer, billing: {...customer.billing, company: e.target.value}})} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Street Address</label>
              <input type="text" value={customer?.billing?.address_1 || ''} onChange={e => setCustomer({...customer, billing: {...customer.billing, address_1: e.target.value}})} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border mb-2" placeholder="House number and street name" />
              <input type="text" value={customer?.billing?.address_2 || ''} onChange={e => setCustomer({...customer, billing: {...customer.billing, address_2: e.target.value}})} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border" placeholder="Apartment, suite, unit, etc. (optional)" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">City</label>
                <input type="text" value={customer?.billing?.city || ''} onChange={e => setCustomer({...customer, billing: {...customer.billing, city: e.target.value}})} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Postcode / ZIP</label>
                <input type="text" value={customer?.billing?.postcode || ''} onChange={e => setCustomer({...customer, billing: {...customer.billing, postcode: e.target.value}})} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Country / Region</label>
                <select 
                  value={customer?.billing?.country || ''} 
                  onChange={e => setCustomer({...customer, billing: {...customer.billing, country: e.target.value, state: ''}})} 
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border bg-white"
                >
                  <option value="">Select a country...</option>
                  {countries.map(country => (
                    <option key={country.code} value={country.code}>{country.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">State / County</label>
                {getStatesForCountry(customer?.billing?.country).length > 0 ? (
                  <select 
                    value={customer?.billing?.state || ''} 
                    onChange={e => setCustomer({...customer, billing: {...customer.billing, state: e.target.value}})} 
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border bg-white"
                  >
                    <option value="">Select a state...</option>
                    {getStatesForCountry(customer?.billing?.country).map((state: any) => (
                      <option key={state.code} value={state.code}>{state.name}</option>
                    ))}
                  </select>
                ) : (
                  <input 
                    type="text" 
                    value={customer?.billing?.state || ''} 
                    onChange={e => setCustomer({...customer, billing: {...customer.billing, state: e.target.value}})} 
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border" 
                  />
                )}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
              <input type="tel" value={customer?.billing?.phone || ''} onChange={e => setCustomer({...customer, billing: {...customer.billing, phone: e.target.value}})} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border" />
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><MapPin className="w-4 h-4" /> Shipping Address</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">First Name</label>
                <input type="text" value={customer?.shipping?.first_name || ''} onChange={e => setCustomer({...customer, shipping: {...customer.shipping, first_name: e.target.value}})} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Last Name</label>
                <input type="text" value={customer?.shipping?.last_name || ''} onChange={e => setCustomer({...customer, shipping: {...customer.shipping, last_name: e.target.value}})} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Company Name (optional)</label>
              <input type="text" value={customer?.shipping?.company || ''} onChange={e => setCustomer({...customer, shipping: {...customer.shipping, company: e.target.value}})} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Street Address</label>
              <input type="text" value={customer?.shipping?.address_1 || ''} onChange={e => setCustomer({...customer, shipping: {...customer.shipping, address_1: e.target.value}})} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border mb-2" placeholder="House number and street name" />
              <input type="text" value={customer?.shipping?.address_2 || ''} onChange={e => setCustomer({...customer, shipping: {...customer.shipping, address_2: e.target.value}})} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border" placeholder="Apartment, suite, unit, etc. (optional)" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">City</label>
                <input type="text" value={customer?.shipping?.city || ''} onChange={e => setCustomer({...customer, shipping: {...customer.shipping, city: e.target.value}})} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Postcode / ZIP</label>
                <input type="text" value={customer?.shipping?.postcode || ''} onChange={e => setCustomer({...customer, shipping: {...customer.shipping, postcode: e.target.value}})} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Country / Region</label>
                <select 
                  value={customer?.shipping?.country || ''} 
                  onChange={e => setCustomer({...customer, shipping: {...customer.shipping, country: e.target.value, state: ''}})} 
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border bg-white"
                >
                  <option value="">Select a country...</option>
                  {countries.map(country => (
                    <option key={country.code} value={country.code}>{country.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">State / County</label>
                {getStatesForCountry(customer?.shipping?.country).length > 0 ? (
                  <select 
                    value={customer?.shipping?.state || ''} 
                    onChange={e => setCustomer({...customer, shipping: {...customer.shipping, state: e.target.value}})} 
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border bg-white"
                  >
                    <option value="">Select a state...</option>
                    {getStatesForCountry(customer?.shipping?.country).map((state: any) => (
                      <option key={state.code} value={state.code}>{state.name}</option>
                    ))}
                  </select>
                ) : (
                  <input 
                    type="text" 
                    value={customer?.shipping?.state || ''} 
                    onChange={e => setCustomer({...customer, shipping: {...customer.shipping, state: e.target.value}})} 
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border" 
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-span-full pt-4">
          <button type="submit" disabled={saving} className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors font-medium flex items-center gap-2 disabled:opacity-70">
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            Save Addresses
          </button>
        </div>
      </form>
    </div>
  );
};

const AccountDetailsSection = ({ userId }: { userId: number }) => {
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    getCustomer(userId).then(setCustomer).finally(() => setLoading(false));
  }, [userId]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    
    if (newPassword && newPassword !== confirmNewPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    setSaving(true);
    setMessage({ type: '', text: '' });
    try {
      const updateData: any = {
        first_name: customer.first_name,
        last_name: customer.last_name,
        email: customer.email
      };
      
      if (newPassword) {
        updateData.password = newPassword;
      }

      await updateCustomer(userId, updateData);
      
      setMessage({ type: 'success', text: 'Account details saved successfully.' });
      setNewPassword('');
      setConfirmNewPassword('');
      
      // Update local storage user info
      const savedUser = localStorage.getItem('woo_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        localStorage.setItem('woo_user', JSON.stringify({
          ...parsed,
          email: customer.email,
          username: customer.first_name ? `${customer.first_name} ${customer.last_name}`.trim() : parsed.username
        }));
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error saving details.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <GenericSkeleton className="w-full h-64" />;
  if (!customer) return <div className="p-8 text-center text-gray-500">Could not load customer data. Please try logging out and logging in again.</div>;

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Account Details</h2>
      
      {message.text && (
        <div className={`mb-6 p-4 rounded-md text-sm ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input type="text" value={customer?.first_name || ''} onChange={e => setCustomer({...customer, first_name: e.target.value})} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input type="text" value={customer?.last_name || ''} onChange={e => setCustomer({...customer, last_name: e.target.value})} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
          <input type="text" value={customer?.username || ''} disabled className="w-full border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500 sm:text-sm px-4 py-2 border cursor-not-allowed" />
          <p className="text-xs text-gray-500 mt-1">This will be how your name will be displayed in the account section and in reviews.</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address <span className="text-red-500">*</span></label>
          <input type="email" required value={customer?.email || ''} onChange={e => setCustomer({...customer, email: e.target.value})} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border" />
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Password Change</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password (leave blank to leave unchanged)</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border pr-10" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input 
                type={showPassword ? "text" : "password"} 
                value={confirmNewPassword}
                onChange={e => setConfirmNewPassword(e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border" 
              />
            </div>
          </div>
        </div>
        
        <div className="pt-4">
          <button type="submit" disabled={saving} className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors font-medium flex items-center gap-2 disabled:opacity-70">
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export const Account: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [activeSection, setActiveSection] = useState<'dashboard' | 'orders' | 'addresses' | 'details'>('dashboard');
  const [showLostPassword, setShowLostPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // User state
  const [user, setUser] = useState<{ id: number; email: string; username: string } | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('woo_user');
    const savedToken = localStorage.getItem('woo_token');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      
      // Fix for users stuck with id: 0
      if ((!parsedUser.id || parsedUser.id === 0) && savedToken) {
        getCurrentUser(savedToken).then(me => {
          if (me && me.id) {
            const updatedUser = { ...parsedUser, id: me.id };
            setUser(updatedUser);
            localStorage.setItem('woo_user', JSON.stringify(updatedUser));
          }
        }).catch(console.error);
      }
    }
  }, []);

  const handleTabChange = (tab: 'login' | 'register') => {
    setActiveTab(tab);
    setErrorMessage('');
    setShowLostPassword(false);
    setResetSuccess(false);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isApiConfigured) {
      setErrorMessage('API is not configured. Cannot login.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await loginCustomer(email, password);
      
      let customerId = response.user_id || 0;
      
      // Try to get the real ID using the token
      try {
        const me = await getCurrentUser(response.token);
        if (me && me.id) {
          customerId = me.id;
        }
      } catch (err) {
        console.warn('Could not fetch user via token', err);
      }

      if (!customerId) {
        const customer = await getCustomerByEmail(email);
        if (customer) {
          customerId = customer.id;
        }
      }

      const userData = { 
        id: customerId, 
        email: response.user_email || email, 
        username: response.user_display_name || response.user_nicename || email.split('@')[0],
        token: response.token
      };
      setUser(userData);
      localStorage.setItem('woo_user', JSON.stringify(userData));
      localStorage.setItem('woo_token', response.token);
      setActiveSection('dashboard');
    } catch (error: any) {
      const msg = error.message.replace(/<[^>]+>/g, ''); // Strip HTML tags if any
      setErrorMessage(msg || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isApiConfigured) {
      setErrorMessage('API is not configured. Cannot register.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    try {
      const customer = await registerCustomer(email, password);
      const userData = { id: customer.id, email: customer.email, username: customer.username };
      setUser(userData);
      localStorage.setItem('woo_user', JSON.stringify(userData));
      setActiveSection('dashboard');
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to register. Email might already be in use.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('woo_user');
    localStorage.removeItem('woo_token');
  };

  const handleLostPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resetEmail === 'user@example.com') {
      setResetSuccess(true);
    } else {
      setShowLostPassword(false);
      setActiveTab('register');
      setErrorMessage('Email does not exist, please register.');
      setResetEmail('');
    }
  };

  if (user) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900">My Account</h1>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 shrink-0">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <nav className="flex flex-col">
                  <button 
                    onClick={() => setActiveSection('dashboard')}
                    className={`flex items-center gap-3 px-6 py-4 text-sm font-medium border-b border-gray-100 transition-colors text-left
                      ${activeSection === 'dashboard' ? 'bg-blue-50 text-blue-700 border-l-4 border-l-blue-600' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-l-transparent'}`}
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    Dashboard
                  </button>
                  <button 
                    onClick={() => setActiveSection('orders')}
                    className={`flex items-center gap-3 px-6 py-4 text-sm font-medium border-b border-gray-100 transition-colors text-left
                      ${activeSection === 'orders' ? 'bg-blue-50 text-blue-700 border-l-4 border-l-blue-600' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-l-transparent'}`}
                  >
                    <Package className="w-5 h-5" />
                    Orders
                  </button>
                  <button 
                    onClick={() => setActiveSection('addresses')}
                    className={`flex items-center gap-3 px-6 py-4 text-sm font-medium border-b border-gray-100 transition-colors text-left
                      ${activeSection === 'addresses' ? 'bg-blue-50 text-blue-700 border-l-4 border-l-blue-600' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-l-transparent'}`}
                  >
                    <MapPin className="w-5 h-5" />
                    Addresses
                  </button>
                  <button 
                    onClick={() => setActiveSection('details')}
                    className={`flex items-center gap-3 px-6 py-4 text-sm font-medium border-b border-gray-100 transition-colors text-left
                      ${activeSection === 'details' ? 'bg-blue-50 text-blue-700 border-l-4 border-l-blue-600' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-l-transparent'}`}
                  >
                    <Settings className="w-5 h-5" />
                    Account Details
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-6 py-4 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors text-left border-l-4 border-l-transparent"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </nav>
              </div>
            </div>
            
            {/* Main Content Area */}
            <div className="flex-1">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 md:p-8">
                {activeSection === 'dashboard' && (
                  <div>
                    <div className="mb-8">
                      <p className="text-gray-700">
                        Hello <strong className="text-gray-900">{user.username || user.email}</strong> (not <strong className="text-gray-900">{user.username || user.email}</strong>? <button onClick={handleLogout} className="text-blue-600 hover:underline">Log out</button>)
                      </p>
                      <p className="text-gray-600 mt-4">
                        From your account dashboard you can view your <button onClick={() => setActiveSection('orders')} className="text-blue-600 hover:underline">recent orders</button>, manage your <button onClick={() => setActiveSection('addresses')} className="text-blue-600 hover:underline">shipping and billing addresses</button>, and <button onClick={() => setActiveSection('details')} className="text-blue-600 hover:underline">edit your password and account details</button>.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <button onClick={() => setActiveSection('orders')} className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-left hover:border-blue-300 hover:shadow-md transition-all group">
                        <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                          <Package className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">Orders</h3>
                        <p className="text-sm text-gray-500">View recent orders</p>
                      </button>
                      <button onClick={() => setActiveSection('addresses')} className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-left hover:border-blue-300 hover:shadow-md transition-all group">
                        <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                          <MapPin className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">Addresses</h3>
                        <p className="text-sm text-gray-500">Manage addresses</p>
                      </button>
                      <button onClick={() => setActiveSection('details')} className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-left hover:border-blue-300 hover:shadow-md transition-all group">
                        <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                          <Settings className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">Account Details</h3>
                        <p className="text-sm text-gray-500">Update personal info</p>
                      </button>
                    </div>
                  </div>
                )}
                
                {activeSection === 'orders' && <OrdersSection userId={user.id} />}
                {activeSection === 'addresses' && <AddressesSection userId={user.id} />}
                {activeSection === 'details' && <AccountDetailsSection userId={user.id} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-md mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">My Account</h1>
        
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          {!showLostPassword ? (
            <>
              <div className="flex border-b border-gray-200">
                <button 
                  className={`flex-1 py-4 text-center font-medium text-sm transition-colors ${activeTab === 'login' ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'bg-gray-50 text-gray-500 hover:text-gray-700'}`}
                  onClick={() => handleTabChange('login')}
                >
                  Login
                </button>
                <button 
                  className={`flex-1 py-4 text-center font-medium text-sm transition-colors ${activeTab === 'register' ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'bg-gray-50 text-gray-500 hover:text-gray-700'}`}
                  onClick={() => handleTabChange('register')}
                >
                  Register
                </button>
              </div>

              <div className="p-6">
                {errorMessage && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm mb-4">
                    {errorMessage}
                  </div>
                )}
                
                {activeTab === 'login' ? (
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email address <span className="text-red-500">*</span></label>
                      <input 
                        type="email" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Password <span className="text-red-500">*</span></label>
                      <div className="relative mt-1">
                        <input 
                          type={showPassword ? "text" : "password"} 
                          required 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border pr-10" 
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <button 
                        type="submit" 
                        disabled={isLoading}
                        className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors font-medium flex items-center gap-2 disabled:opacity-70"
                      >
                        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                        Login
                      </button>
                      <button type="button" onClick={() => setShowLostPassword(true)} className="text-sm text-blue-600 hover:text-blue-500">Lost your password?</button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email address <span className="text-red-500">*</span></label>
                      <input 
                        type="email" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Password <span className="text-red-500">*</span></label>
                      <div className="relative mt-1">
                        <input 
                          type={showPassword ? "text" : "password"} 
                          required 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border pr-10" 
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Confirm Password <span className="text-red-500">*</span></label>
                      <div className="relative mt-1">
                        <input 
                          type={showConfirmPassword ? "text" : "password"} 
                          required 
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border pr-10" 
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.</p>
                    <div className="pt-2">
                      <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors font-medium flex justify-center items-center gap-2 disabled:opacity-70"
                      >
                        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                        Register
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </>
          ) : (
            <div className="p-6">
              {resetSuccess ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Check your email</h3>
                  <p className="text-sm text-gray-500 mb-6">A password recover link has been sent to your email.</p>
                  <button 
                    onClick={() => handleTabChange('login')} 
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
        </div>
      </div>
    </div>
  );
};
