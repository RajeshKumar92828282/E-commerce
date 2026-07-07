import React from "react";
import { useNavigate } from "react-router-dom";

export default function Category({ filterItems, categories = [] }) {
  const navigate = useNavigate();
  const categoryList = categories.length
    ? categories
    : [
        { name: "Men's Clothing", slug: "mens-clothing" },
        { name: "Women's Clothing", slug: "womens-clothing" },
        { name: "Electronics", slug: "electronics" },
        { name: "Beauty", slug: "beauty" },
      ];

  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => navigate("/category/all")}
          className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          All
        </button>
        {categoryList.map((category) => {
          const slug = category.slug || category.name.toLowerCase().replace(/\s+/g, "-");
          return (
            <button
              key={slug}
              type="button"
              onClick={() => navigate(`/category/${slug}`)}
              className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
