import React from "react";
import { Link } from "react-router-dom";

const Kids = () => {
  return (
    <main className="space-y-10 py-10 px-4 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] bg-white p-8 shadow-overlay">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-emerald-600">Kids essentials</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950">Fresh finds for little ones</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">Shop playful styles, cozy essentials, and top-rated kids' gear for every age.</p>
          </div>
          <Link to="/category/mens-clothing" className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400">
            Discover kids' picks
          </Link>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Everyday wear</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">Comfort first</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">Find soft, durable pieces for school, play, and weekend adventures.</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Gift ideas</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">Fun accessories</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">Pick the sweetest toys, backpacks, and accessories for every little personality.</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Safe choices</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">Trusted brands</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">Choose reliable products parents trust for quality, comfort, and value.</p>
        </div>
      </section>
    </main>
  );
};

export default Kids;