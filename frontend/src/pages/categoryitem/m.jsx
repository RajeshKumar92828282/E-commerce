import React from "react";
import { Link } from "react-router-dom";

const M = () => {
  return (
    <main className="space-y-10 py-10 px-4 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] bg-white p-8 shadow-overlay">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Home essentials</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950">Refresh your space</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">Find smart home upgrades, decor, and essentials for comfortable living.</p>
          </div>
          <Link to="/category/kitchen" className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
            Shop home essentials
          </Link>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Living space</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">Smart organization</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">Choose storage, kitchen tools, and decor that make every room feel refreshed.</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Kitchen</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">Modern essentials</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">Upgrade your kitchen with durable cookware, gadgets, and storage solutions.</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Comfort</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">Daily convenience</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">Discover products that make everyday life simpler and more stylish.</p>
        </div>
      </section>
    </main>
  );
};

export default M;