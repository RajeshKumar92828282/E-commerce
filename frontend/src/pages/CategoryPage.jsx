import React from "react";
import { useParams, Link } from "react-router-dom";
import Allproduct from "../Components/allproduct/Allproduct";

const categoryAliases = {
  mens: ["men's clothing", "mens clothing", "mens"],
  mens_clothing: ["men's clothing", "mens clothing", "mens"],
  "mens-clothing": ["men's clothing", "mens clothing", "mens"],
  womens: ["women's clothing", "womens clothing", "women"],
  "womens-clothing": ["women's clothing", "womens clothing", "women"],
  electronics: ["electronics", "electronic", "mobile", "mobiles", "gadgets"],
  beauty: ["beauty", "cosmetics", "makeup"],
  travel: ["travel", "luggage"],
  appliances: ["appliances", "home appliances"],
  kitchen: ["kitchen", "home appliances", "kitchenware"],
};

const productMatchesSlug = (product, slug) => {
  const text = `${product.category || ""} ${product.title || ""} ${product.brand || ""}`.toLowerCase();
  const aliases = categoryAliases[slug] || [slug.replace(/-/g, " ")];
  return aliases.some((alias) => text.includes(alias));
};

export default function CategoryPage({ products = [], addToCart, addToWishlist, wishlist = [] }) {
  const { slug } = useParams();
  const normalized = slug?.toLowerCase();
  const title = normalized ? (normalized === "all" ? "All products" : normalized.replace(/-/g, " ")) : "Category";
  const filtered = normalized === "all" ? products : products.filter((product) => productMatchesSlug(product, normalized));

  return (
    <main className="space-y-8 py-10 px-4 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 px-8 py-10 text-slate-50 shadow-overlay">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-sky-300">Category</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">{title}</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
              Discover top-rated products across the {title} category, curated for fast delivery and best value.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/70 px-5 py-3 text-sm font-semibold text-slate-100 shadow-sm">
            <span className="rounded-full bg-sky-500 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white">{filtered.length}</span>
            items available
          </div>
        </div>
      </section>

      {filtered.length === 0 ? (
        <section className="rounded-[2rem] bg-white p-12 text-center shadow-soft">
          <h2 className="text-2xl font-semibold text-slate-950">No products found for “{title}”.</h2>
          <p className="mt-3 text-slate-500">Try browsing another category or return to the home page.</p>
          <Link to="/" className="mt-6 inline-flex rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-500">
            Return to home
          </Link>
        </section>
      ) : (
        <Allproduct items={filtered} addToCart={addToCart} addToWishlist={addToWishlist} wishlist={wishlist} />
      )}
    </main>
  );
}
