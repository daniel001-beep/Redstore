"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "./Providers";

export default function Navbar() {
  const cartContext = useContext(CartContext) as any;
  const cartCount = cartContext?.cartCount || 0;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar sticky-glass px-6 md:px-12 py-4 md:py-6 flex justify-between items-center z-50">
      <Link href="/" className="logo">
        <img src="/images/logo-white.png" alt="Redstore Logo" width="150" className="cursor-pointer" />
      </Link>

      {/* Hamburger Menu Button - Mobile Only */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
      >
        <div className={`hamburger-icon ${menuOpen ? "open" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      {/* Nav Links */}
      <ul className={`nav-menu ${menuOpen ? "open" : ""}`}>
        <li><Link href="/" onClick={() => setMenuOpen(false)} className="nav-link-anim text-white font-medium hover:text-blue-400">Home</Link></li>
        <li><Link href="/products" onClick={() => setMenuOpen(false)} className="nav-link-anim text-white font-medium hover:text-blue-400">Products</Link></li>
        <li><Link href="/about" onClick={() => setMenuOpen(false)} className="nav-link-anim text-white font-medium hover:text-blue-400">About</Link></li>
        <li><Link href="/contact" onClick={() => setMenuOpen(false)} className="nav-link-anim text-white font-medium hover:text-blue-400">Contact</Link></li>
        <li>
          <Link href="/cart" onClick={() => setMenuOpen(false)} className="relative group text-2xl">
            <span className="w-6 h-6 flex items-center justify-center bg-blue-600 text-white p-1 rounded-full text-xs absolute -top-4 -right-4 group-hover:scale-125 transition">{cartCount}</span>
            🛒
          </Link>
        </li>
        <li><Link href="/account" onClick={() => setMenuOpen(false)} className="btn px-4 py-2 bg-white/10 hover:bg-white/20 transition rounded-lg text-sm font-bold">Sign In</Link></li>
      </ul>
    </nav>
  );
}
