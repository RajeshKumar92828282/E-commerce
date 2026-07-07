import React from "react";
import { Link } from "react-router-dom";

const Mens = () => {
  return (
    <main className="space-y-10 py-10 px-4 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] bg-white p-8 shadow-overlay">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Men's style</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950">Elevated looks for every day</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">Browse premium menswear, athleisure, and accessory sets created for effortless confidence.</p>
          </div>
          <Link to="/category/mens-clothing" className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
            Explore men’s clothing
          </Link>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">New season</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">Smart casual</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">Add versatile layers, jackets, and casual essentials that move with your day.</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Comfort</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">Everyday essentials</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">Discover premium basics, denim, and loungewear for reliable comfort and style.</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Accessories</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950"> polished finishing touches</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">Complete your wardrobe with premium belts, bags, and footwear designed for modern wear.</p>
        </div>
      </section>
    </main>
  );
};

export default Mens;