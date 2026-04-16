import Link from 'next/link';

"use client";


import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="navbar sticky-glass">
      <div className="container flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-white tracking-wider">
          VELOX
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <ul className="nav-menu">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="nav-link-anim">{link.label}</Link>
              </li>
            ))}
          </ul>
          <Link href="/cart" className="relative group">
            <Shopping className="w-6 h-6 text-white hover:text-blue-400 transition-colors" />
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center group-hover:bg-blue-700 transition-colors">0</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;