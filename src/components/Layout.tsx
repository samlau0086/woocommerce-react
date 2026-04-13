import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, Search, User, X, MapPin, ArrowLeftRight, Globe, Lock, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CartDrawer } from './CartDrawer';
import { getSiteInfo } from '../services/api';
import { SiteInfo } from '../types';

export const Layout: React.FC = () => {
  const { cartCount, setIsCartOpen } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [siteInfo, setSiteInfo] = useState<SiteInfo | null>(null);

  useEffect(() => {
    const fetchSiteInfo = async () => {
      const info = await getSiteInfo();
      if (info) {
        setSiteInfo(info);
        document.title = info.name;
      }
    };
    fetchSiteInfo();
  }, []);

  // Close mobile menu and scroll to top when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 relative">
        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="absolute inset-0 bg-white z-40 flex items-center px-4 sm:px-6 lg:px-8">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <form onSubmit={handleSearch} className="flex-1 flex items-center">
              <input
                type="text"
                autoFocus
                placeholder="Search products..."
                className="w-full border-none focus:ring-0 text-lg outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="hidden">Search</button>
            </form>
            <button 
              onClick={() => setIsSearchOpen(false)} 
              className="p-2 text-gray-500 hover:text-gray-900 ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                className="p-2 -ml-2 mr-2 md:hidden text-gray-500 hover:text-gray-900"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
              <Link to="/" className="text-xl font-bold tracking-tight">
                {siteInfo ? siteInfo.name : <>WOO<span className="text-blue-600">STORE</span></>}
              </Link>
              <nav className="hidden md:flex ml-10 space-x-8 items-center">
                <div className="relative group">
                  <button className="text-sm font-medium text-gray-700 hover:text-black transition-colors flex items-center gap-1 py-2">
                    Home Versions
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="absolute left-0 top-full w-48 bg-white border border-gray-100 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                    <div className="py-2">
                      <Link to="/" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 font-medium">B2C Retail</Link>
                      <Link to="/b2b" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 font-medium">B2B Wholesale</Link>
                      <Link to="/factory" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 font-medium">OEM Factory</Link>
                      <Link to="/cnc" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 font-medium">CNC Machining</Link>
                      <Link to="/auto-parts" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 font-medium">Auto Parts B2B</Link>
                      <Link to="/cosmetics" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 font-medium">Cosmetics OEM</Link>
                      <Link to="/pet-supplies" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 font-medium">Pet Supplies B2B</Link>
                      <Link to="/dtc" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 font-medium">DTC Brand</Link>
                      <Link to="/laser" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 font-medium">Laser Engraver</Link>
                    </div>
                  </div>
                </div>
                <Link to="/shop" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
                  Shop
                </Link>
                <Link to="/about" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
                  About
                </Link>
                <Link to="/blog" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
                  Blog
                </Link>
                <Link to="/contact" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
                  Contact
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="w-5 h-5" />
              </button>
              <Link to="/account" className="p-2 text-gray-500 hover:text-gray-900 transition-colors">
                <User className="w-5 h-5" />
              </Link>
              <button 
                className="p-2 text-gray-500 hover:text-gray-900 transition-colors relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-blue-600 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div 
              className="fixed inset-0 bg-black bg-opacity-25" 
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl">
              <div className="px-4 pt-5 pb-2 flex justify-between items-center border-b border-gray-200">
                <Link to="/" className="text-xl font-bold tracking-tight">
                  {siteInfo ? siteInfo.name : <>WOO<span className="text-blue-600">STORE</span></>}
                </Link>
                <button
                  type="button"
                  className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400 hover:text-gray-500"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="py-6 px-4 space-y-6 overflow-y-auto">
                <div className="flow-root">
                  <div className="-m-2 p-2 block font-medium text-gray-900">
                    Home Versions
                  </div>
                  <div className="pl-4 space-y-4 mt-4 border-l-2 border-gray-100">
                    <Link to="/" className="block text-sm text-gray-600 hover:text-blue-600 font-medium">B2C Retail</Link>
                    <Link to="/b2b" className="block text-sm text-gray-600 hover:text-blue-600 font-medium">B2B Wholesale</Link>
                    <Link to="/factory" className="block text-sm text-gray-600 hover:text-blue-600 font-medium">OEM Factory</Link>
                    <Link to="/cnc" className="block text-sm text-gray-600 hover:text-blue-600 font-medium">CNC Machining</Link>
                    <Link to="/auto-parts" className="block text-sm text-gray-600 hover:text-blue-600 font-medium">Auto Parts B2B</Link>
                    <Link to="/cosmetics" className="block text-sm text-gray-600 hover:text-blue-600 font-medium">Cosmetics OEM</Link>
                    <Link to="/pet-supplies" className="block text-sm text-gray-600 hover:text-blue-600 font-medium">Pet Supplies B2B</Link>
                    <Link to="/dtc" className="block text-sm text-gray-600 hover:text-blue-600 font-medium">DTC Brand</Link>
                    <Link to="/laser" className="block text-sm text-gray-600 hover:text-blue-600 font-medium">Laser Engraver</Link>
                  </div>
                </div>
                <div className="flow-root">
                  <Link to="/shop" className="-m-2 p-2 block font-medium text-gray-900">
                    Shop
                  </Link>
                </div>
                <div className="flow-root">
                  <Link to="/about" className="-m-2 p-2 block font-medium text-gray-900">
                    About
                  </Link>
                </div>
                <div className="flow-root">
                  <Link to="/blog" className="-m-2 p-2 block font-medium text-gray-900">
                    Blog
                  </Link>
                </div>
                <div className="flow-root">
                  <Link to="/contact" className="-m-2 p-2 block font-medium text-gray-900">
                    Contact
                  </Link>
                </div>
                <div className="flow-root border-t border-gray-200 pt-6">
                  <Link to="/account" className="-m-2 p-2 block font-medium text-gray-900 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    My Account
                  </Link>
                </div>
                <div className="flow-root">
                  <Link to="/track-order" className="-m-2 p-2 block font-medium text-gray-900">
                    Track Order
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Features Banner (Before Footer) */}
      <div className="border-t border-gray-200 bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Free Worldwide shipping</h4>
                <p className="text-sm text-gray-500 mt-1">On all orders above $50</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <ArrowLeftRight className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Easy 30 days returns</h4>
                <p className="text-sm text-gray-500 mt-1">30 days money back guarantee</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Globe className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">International Warranty</h4>
                <p className="text-sm text-gray-500 mt-1">Offered in the country of usage</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Lock className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">100% Secure Checkout</h4>
                <p className="text-sm text-gray-500 mt-1">PayPal / MasterCard / Visa</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="text-xl font-bold tracking-tight">
                {siteInfo ? siteInfo.name : <>WOO<span className="text-blue-600">STORE</span></>}
              </Link>
              <p className="mt-4 text-sm text-gray-500">
                {siteInfo?.description || 'A headless React storefront for WooCommerce. Fast, modern, and beautiful.'}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Shop</h3>
              <ul className="mt-4 space-y-4">
                <li><Link to="/shop" className="text-sm text-gray-500 hover:text-gray-900">All Products</Link></li>
                <li><Link to="/shop" className="text-sm text-gray-500 hover:text-gray-900">New Arrivals</Link></li>
                <li><Link to="/shop" className="text-sm text-gray-500 hover:text-gray-900">Sale</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Support</h3>
              <ul className="mt-4 space-y-4">
                <li><Link to="/track-order" className="text-sm text-gray-500 hover:text-gray-900">Track Order</Link></li>
                <li><Link to="/contact" className="text-sm text-gray-500 hover:text-gray-900">Contact Us</Link></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900">FAQ</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900">Shipping</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900">Returns</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} {siteInfo?.name || 'WooStore'}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <CartDrawer />
    </div>
  );
};
