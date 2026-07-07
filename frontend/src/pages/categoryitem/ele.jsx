import React from "react";
import { Link } from "react-router-dom";

const Ele = () => {
  return (
    <main className="space-y-10 py-10 px-4 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] bg-white p-8 shadow-overlay">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-sky-600">Electronics</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950">Discover premium gadgets</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">Shop the latest smartphones, accessories, and smart home devices carefully selected for performance and style.</p>
          </div>
          <Link to="/category/electronics" className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-500">
            Browse electronics
          </Link>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Top picks</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">Smartphones</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">Explore flagship phones from trusted brands with high-resolution displays and powerful cameras.</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Featured</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">Audio & wearables</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">Find premium earbuds, smartwatches, and sound systems for immersive everyday experiences.</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Value</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">Home tech</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">Upgrade your home with smart accessories, reliable chargers, and fast charging solutions.</p>
        </div>
      </section>
    </main>
  );
};

export default Ele;