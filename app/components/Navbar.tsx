"use client";

import Link from 'next/link';
import { DollarSign, BarChart3, Lock, Server } from 'lucide-react';

import React, { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { href: '/fintech/dashboard', label: 'Dashboard', icon: BarChart3 },
    { href: '/fintech/marketplace', label: 'Marketplace', icon: DollarSign },
    { href: '/fintech/ledger', label: 'Ledger', icon: BarChart3 },
    { href: '/fintech/security', label: 'Security', icon: Lock },
    { href: '/fintech/api-status', label: 'API Status', icon: Server },
  ];

  return (
    <header className="navbar sticky-glass">
      <div className="container flex items-center justify-between">
        <Link href="/fintech/dashboard" className="text-2xl font-bold text-white tracking-wider">
          VELOX <span className="text-sm font-light text-blue-400">FINTECH</span>
        </Link>
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="nav-menu">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.href}>
                  <Link href={link.href} className="nav-link-anim flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        {/* Mobile Hamburger */}
        <button
          className="mobile-menu-btn md:hidden ml-4"
          aria-label="Open menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className={`hamburger-icon${menuOpen ? ' open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-end md:hidden">
            <div className="w-64 bg-base-bg h-full p-8 flex flex-col gap-8 animate-slide-in-right">
              <button
                className="self-end mb-8"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                <span className="hamburger-icon open">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </button>
              <ul className="flex flex-col gap-6">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="nav-link-anim flex items-center gap-3 text-lg"
                        onClick={() => setMenuOpen(false)}
                      >
                        <Icon className="w-5 h-5" />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;