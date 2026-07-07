import { useNavigate } from "react-router-dom";
import category from "./categorydata";

export default function Category1() {
  const navigate = useNavigate();

  return (
    <section className="mx-auto mb-10 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-slate-950 px-5 py-8 text-slate-100 shadow-overlay sm:p-10">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-sky-400">Shop by category</p>
            <h2 className="mt-2 text-3xl font-semibold">Discover products by interest</h2>
          </div>
          <p className="max-w-xl text-sm text-slate-300">Tap a category to explore curated collections across fashion, electronics, and essentials.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {category.map((cat, index) => (
            <button
              key={index}
              type="button"
              onClick={() => navigate(cat.path)}
              className="group rounded-[1.75rem] border border-slate-700 bg-slate-900/90 px-5 py-6 text-left transition hover:border-sky-500 hover:bg-slate-900"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-800 transition group-hover:bg-sky-500">
                <img src={cat.image} alt={cat.name} className="h-10 w-10 object-contain" />
              </div>
              <p className="text-lg font-semibold text-white">{cat.name}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
