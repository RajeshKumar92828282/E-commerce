import React from "react";
import { FaShippingFast, FaLock, FaHeadset, FaStar } from "react-icons/fa";

export default function About() {
  return (
    <main className="space-y-10 py-10">
      <section className="rounded-[2rem] bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-sky-600">About AIDEN</p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-950">The premium destination for smart shopping</h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600">
              AIDEN brings you a modern shopping experience with curated products, live search, seamless checkout, and trusted delivery. We design every flow for speed, clarity, and dependable service.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-sky-500 text-white">
                <FaShippingFast />
              </div>
              <h2 className="mt-5 text-xl font-semibold text-slate-950">Fast delivery</h2>
              <p className="mt-3 text-sm text-slate-600">Shop with confidence and get products delivered quickly across India.</p>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-white">
                <FaLock />
              </div>
              <h2 className="mt-5 text-xl font-semibold text-slate-950">Secure payments</h2>
              <p className="mt-3 text-sm text-slate-600">Pay securely using multiple options with encrypted checkout protection.</p>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white">
                <FaHeadset />
              </div>
              <h2 className="mt-5 text-xl font-semibold text-slate-950">24/7 support</h2>
              <p className="mt-3 text-sm text-slate-600">Our support team is here to help with every order and delivery question.</p>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-white">
                <FaStar />
              </div>
              <h2 className="mt-5 text-xl font-semibold text-slate-950">Premium selection</h2>
              <p className="mt-3 text-sm text-slate-600">Enjoy premium brands and trend-led collections in one modern store.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-[2rem] bg-slate-950 p-10 text-slate-50 shadow-[0_30px_80px_rgba(15,23,42,0.18)]">
          <p className="text-sm uppercase tracking-[0.25em] text-sky-400">Our mission</p>
          <h2 className="mt-4 text-3xl font-semibold">Build trust through exceptional shopping experiences</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            We believe shopping should be simple, delightful, and reliable. From product discovery to order confirmation, every screen is designed for clarity and speed.
          </p>
        </div>
        <div className="rounded-[2rem] bg-white p-10 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Why choose us</p>
          <ul className="mt-6 space-y-4 text-slate-700">
            <li className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">Curated products from trusted sellers.</li>
            <li className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">Intuitive cart, address, payment and order flows.</li>
            <li className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">Responsive mobile-first design with premium layout.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
