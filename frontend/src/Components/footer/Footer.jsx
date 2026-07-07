import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-4">
          <Link to="/" className="text-2xl font-semibold text-white">
            AIDEN
          </Link>
          <p className="max-w-md text-sm text-slate-400">
            Premium shopping experience with secure checkout, fast delivery, and modern product discovery.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Shop</p>
            <div className="space-y-2 text-sm text-slate-400">
              <Link to="/" className="block hover:text-white">All products</Link>
              <Link to="/category/mens-clothing" className="block hover:text-white">Men's fashion</Link>
              <Link to="/category/womens-clothing" className="block hover:text-white">Women's fashion</Link>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Company</p>
            <div className="space-y-2 text-sm text-slate-400">
              <Link to="/about" className="block hover:text-white">About us</Link>
              <Link to="/orders" className="block hover:text-white">Orders</Link>
              <Link to="/profile" className="block hover:text-white">Profile</Link>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Support</p>
            <div className="space-y-2 text-sm text-slate-400">
              <span className="block">help@aiden.shop</span>
              <span className="block">+91 98765 43210</span>
              <span className="block">Mon-Sat 9am - 8pm</span>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-center text-sm text-slate-500 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} AIDEN. All rights reserved.</span>
          <span>Designed for premium ecommerce experiences.</span>
        </div>
      </div>
    </footer>
  );
}
