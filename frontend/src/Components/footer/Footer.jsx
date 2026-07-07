import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
          <div className="space-y-5">
            <Link to="/" className="inline-flex items-center gap-3 text-2xl font-semibold text-white">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-500 text-base font-bold text-white">A</span>
              AIDEN
            </Link>
            <p className="max-w-sm text-sm leading-7 text-slate-400">
              Shop premium products with fast delivery, curated deals, and a modern shopping experience built for India.
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <Link to="#" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-sky-500">
                <FaFacebookF className="h-4 w-4" />
              </Link>
              <Link to="#" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-sky-500">
                <FaInstagram className="h-4 w-4" />
              </Link>
              <Link to="#" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-sky-500">
                <FaTwitter className="h-4 w-4" />
              </Link>
              <Link to="#" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-sky-500">
                <FaLinkedinIn className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Shop</p>
            <div className="space-y-3 text-sm text-slate-400">
              <Link to="/category/all" className="block transition hover:text-white">All products</Link>
              <Link to="/category/mens-clothing" className="block transition hover:text-white">Men's fashion</Link>
              <Link to="/category/womens-clothing" className="block transition hover:text-white">Women's fashion</Link>
              <Link to="/category/electronics" className="block transition hover:text-white">Electronics</Link>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Support</p>
            <div className="space-y-3 text-sm text-slate-400">
              <Link to="/about" className="block transition hover:text-white">About us</Link>
              <Link to="/orders" className="block transition hover:text-white">Orders</Link>
              <Link to="/profile" className="block transition hover:text-white">Account</Link>
              <Link to="/cart" className="block transition hover:text-white">Cart</Link>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Newsletter</p>
              <p className="mt-3 text-sm leading-7 text-slate-400">Subscribe for exclusive offers, new arrivals, and personalised deals.</p>
            </div>
            <form className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-3xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-500/20"
              />
              <button type="submit" className="rounded-3xl bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">
                Subscribe
              </button>
            </form>
            <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/70 p-5 text-sm text-slate-400">
              <p className="font-semibold text-slate-100">Need help?</p>
              <p className="mt-2">help@aiden.shop</p>
              <p className="mt-1">+91 98765 43210</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-center text-sm text-slate-500 sm:flex-row sm:justify-between sm:text-left">
          <span>© {new Date().getFullYear()} AIDEN. All rights reserved.</span>
          <span>Modern ecommerce design for curated shopping.</span>
        </div>
      </div>
    </footer>
  );
}
