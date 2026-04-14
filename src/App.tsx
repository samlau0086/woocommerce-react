/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { OrderTracking } from './pages/OrderTracking';
import { OrderDetails } from './pages/OrderDetails';
import { Blog } from './pages/Blog';
import { BlogPostPage } from './pages/BlogPost';
import { Account } from './pages/Account';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { LandingPageExample } from './pages/LandingPageExample';
import { LandingPageFullWidth } from './pages/LandingPageFullWidth';
import { LandingPageCustom } from './pages/LandingPageCustom';
import { HomeB2B } from './pages/HomeB2B';
import { HomeFactory } from './pages/HomeFactory';
import { HomeCNC } from './pages/HomeCNC';
import { HomeAutoParts } from './pages/HomeAutoParts';
import { HomeCosmetics } from './pages/HomeCosmetics';
import { HomePetSupplies } from './pages/HomePetSupplies';
import { HomeDTC } from './pages/HomeDTC';
import { HomeLaser } from './pages/HomeLaser';
import { HomeFragrance } from './pages/HomeFragrance';
import { CartProvider } from './context/CartContext';

export default function App() {
  return (
    <HelmetProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="b2b" element={<HomeB2B />} />
              <Route path="factory" element={<HomeFactory />} />
              <Route path="cnc" element={<HomeCNC />} />
              <Route path="auto-parts" element={<HomeAutoParts />} />
              <Route path="cosmetics" element={<HomeCosmetics />} />
              <Route path="pet-supplies" element={<HomePetSupplies />} />
              <Route path="dtc" element={<HomeDTC />} />
              <Route path="laser" element={<HomeLaser />} />
              <Route path="fragrance" element={<HomeFragrance />} />
              <Route path="shop" element={<Shop />} />
              <Route path="product/:slug" element={<ProductDetails />} />
              <Route path="landing/:slug" element={<LandingPageExample />} />
              <Route path="landing-full/:slug" element={<LandingPageFullWidth />} />
              <Route path="landing-custom/:slug" element={<LandingPageCustom />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="order-confirmation" element={<OrderConfirmation />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="track-order" element={<OrderTracking />} />
              <Route path="order/:id" element={<OrderDetails />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<BlogPostPage />} />
              <Route path="account" element={<Account />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </HelmetProvider>
  );
}
