import React from "react";

export default function BadgeButton({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${active ? "border-sky-600 bg-sky-600/10 text-slate-950" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"}`}
    >
      {label}
    </button>
  );
}
