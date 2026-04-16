"use client";

import { useState } from 'react';
import Link from 'next/link';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const footerLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/cart', label: 'Cart' },
  ];

  const productCategories = [
    { label: 'Men\'s Wear' },
    { label: 'Women\'s Wear' },
    { label: 'Accessories' },
    { label: 'New Arrivals' },
  ];

  const socialLinks = [
    { icon: 'fa-twitter', href: '#', label: 'Twitter' },
    { icon: 'fa-instagram', href: '#', label: 'Instagram' },
    { icon: 'fa-facebook', href: '#', label: 'Facebook' },
    { icon: 'fa-linkedin', href: '#', label: 'LinkedIn' },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 text-gray-400 py-16">
      <div className="container mx-auto px-6">
        {/* Newsletter Section */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Stay in the Loop</h3>
            <p className="text-gray-400 mb-6">Get the latest on new drops, exclusive deals, and fitness tips delivered to your inbox.</p>
            {subscribed ? (
              <div className="inline-block text-emerald-400 font-medium">✓ Thanks for subscribing!</div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="col-span-1">
            <Link href="/" className="text-3xl font-bold text-white tracking-wider mb-4 inline-block">
              VELOX
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">Premium fitness wear for people who take their workouts seriously.</p>
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.icon}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  title={social.label}
                >
                  <i className={`fab ${social.icon} text-lg`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-6">Categories</h4>
            <ul className="space-y-3">
              {productCategories.map((cat, idx) => (
                <li key={idx}>
                  <a href="#" className="text-sm hover:text-white transition-colors">
                    {cat.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-6">Support</h4>
            <ul className="space-y-3">
              <li><Link href="/contact" className="text-sm hover:text-white transition-colors">Contact Us</Link></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Returns</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-6">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Cookies</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Sitemap</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Velox. All Rights Reserved. | Designed with <span className="text-blue-500">❤</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;