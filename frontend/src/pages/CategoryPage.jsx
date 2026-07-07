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
    <main className="space-y-8 py-10">
      <section className="rounded-[2rem] bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
        <p className="text-sm uppercase tracking-[0.28em] text-sky-600">Category</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">{title}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
          Explore products curated for the <strong>{title}</strong> collection.
        </p>
      </section>

      {filtered.length === 0 ? (
        <section className="rounded-[2rem] bg-white p-12 text-center shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-950">No products found for &ldquo;{title}&rdquo;.</h2>
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
