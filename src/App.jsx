import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from './Products';
import ProductDetail from './ProductDetail';
import Cart from './Cart';
import Account from './Account';
import About from './About';
import Checkout from './Checkout';
import { CartProvider } from './CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Account />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<Account />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<Account />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;