"use client";

import Link from 'next/link';

const Footer = () => {
  const footerLinks = [
    { href: '/fintech/dashboard', label: 'Dashboard' },
    { href: '/fintech/marketplace', label: 'Marketplace' },
    { href: '/fintech/ledger', label: 'Ledger' },
    { href: '/fintech/security', label: 'Security' },
  ];

  const productCategories = [
    { label: 'Asset Management' },
    { label: 'Fixed Income' },
    { label: 'Equities' },
    { label: 'Derivatives' },
  ];

  const supportLinks = [
    { label: 'Help Center', href: '#' },
    { label: 'Contact Support', href: '#' },
    { label: 'Documentation', href: '#' },
    { label: 'API Docs', href: '#' },
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-700 text-slate-400 py-12">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Velox */}
          <div className="col-span-1">
            <Link href="/fintech/dashboard" className="text-lg font-bold text-slate-100 tracking-wide inline-block mb-3">
              VELOX<span className="text-xs text-blue-400 ml-1">FINTECH</span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed">Enterprise-grade financial platform with real-time portfolio management and AI-powered insights.</p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-slate-100 font-semibold text-sm mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs hover:text-slate-100 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="col-span-1">
            <h4 className="text-slate-100 font-semibold text-sm mb-4 uppercase tracking-wider">Categories</h4>
            <ul className="space-y-2">
              {productCategories.map((cat, idx) => (
                <li key={idx}>
                  <a href="#" className="text-xs hover:text-slate-100 transition-colors">
                    {cat.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h4 className="text-slate-100 font-semibold text-sm mb-4 uppercase tracking-wider">Support</h4>
            <ul className="space-y-2">
              {supportLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-xs hover:text-slate-100 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 pt-6 text-center text-xs text-slate-500">
          <p>&copy; 2026 Velox Fintech. All Rights Reserved. Enterprise Financial Platform</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;