import React from "react";

export default function SectionHeading({ title, subtitle }) {
  return (
    <div className="mb-8 max-w-2xl space-y-3">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-600">{subtitle}</p>
      <h2 className="text-3xl font-semibold text-slate-950 sm:text-4xl">{title}</h2>
    </div>
  );
}
