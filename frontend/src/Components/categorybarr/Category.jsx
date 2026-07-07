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

  const handleCategoryClick = (slug) => {
    if (filterItems) {
      filterItems(slug.replace(/-/g, " "));
    }
    navigate(`/category/${slug}`);
  };

  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-overlay">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => handleCategoryClick("all")}
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
              onClick={() => handleCategoryClick(slug)}
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
