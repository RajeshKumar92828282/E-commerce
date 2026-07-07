import React from "react";
import { Link } from "react-router-dom";

const Mobile = () => {
  return (
    <main className="space-y-10 py-10 px-4 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] bg-white p-8 shadow-overlay">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-sky-600">Mobiles</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950">Premium smartphones & accessories</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">Shop the latest mobile phones, chargers, cases, and gadgets built for fast connectivity and style.</p>
          </div>
          <Link to="/category/electronics" className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-500">
            Browse mobiles
          </Link>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Flagship</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">Power devices</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">Explore top-tier phones with great battery life, crisp displays, and premium cameras.</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Accessories</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">Essential gear</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">Find fast chargers, protective cases, and headphones designed to complement your device.</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Smart living</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">Connected experience</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">Upgrade how you stay connected with seamless accessories and smart mobile bundles.</p>
        </div>
      </section>
    </main>
  );
};

export default Mobile;