import React from "react";
import { Link } from "react-router-dom";

const Womans = () => {
  return (
    <main className="space-y-10 py-10 px-4 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] bg-white p-8 shadow-overlay">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-rose-500">Women's fashion</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950">Style made for modern living</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">Discover elegant apparel, accessories, and beauty essentials curated for every moment.</p>
          </div>
          <Link to="/category/womens-clothing" className="inline-flex items-center justify-center rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-400">
            Explore women's styles
          </Link>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">New arrivals</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">Everyday essentials</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">Shop versatile wardrobe staples designed for comfort and effortless style.</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Trending</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">Occasion wear</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">Find premium looks for celebrations, dates, and weekend outings.</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Beauty picks</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">Curated accessories</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">Complete your look with stylish bags, jewelry, and beauty essentials.</p>
        </div>
      </section>
    </main>
  );
};

export default Womans;