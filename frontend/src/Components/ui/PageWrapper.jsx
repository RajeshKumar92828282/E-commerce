import React from "react";

export default function PageWrapper({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 antialiased">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
}
