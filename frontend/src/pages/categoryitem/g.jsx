import React from "react";
import { Link } from "react-router-dom";

const G = () => {
  return (
    <main className="space-y-10 py-10 px-4 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] bg-white p-8 shadow-overlay">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Discover more</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950">Explore curated collections</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">Browse a wider selection of premium products across fashion, electronics, home, and accessories.</p>
          </div>
          <Link to="/category/all" className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
            Browse all categories
          </Link>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Hot picks</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">Trending items</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">Discover best-selling products that shoppers love right now.</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Deals</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">Exclusive savings</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">Shop limited-time offers on select premium brands and products.</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">New arrivals</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">Fresh arrivals</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">Explore the latest releases across fashion, beauty, and technology.</p>
        </div>
      </section>
    </main>
  );
};

export default G;