import React from "react";
import { FaArrowRight, FaBolt, FaShieldAlt, FaTag, FaTruck } from "react-icons/fa";
import Allproduct from "../Components/allproduct/Allproduct";

const defaultCategories = [
  { name: "Men's Clothing", slug: "mens-clothing" },
  { name: "Women's Clothing", slug: "womens-clothing" },
  { name: "Electronics", slug: "electronics" },
  { name: "Beauty", slug: "beauty" },
];

export default function Home({
  featuredProducts = [],
  trendingProducts = [],
  allProducts = [],
  loading = false,
  error = null,
  categories = [],
  activeCategory = "all",
  onCategorySelect,
  addToCart,
  addToWishlist,
  wishlist = [],
}) {
  const categoryItems = categories.length
    ? categories.map((category) => (typeof category === "string" ? { name: category, slug: category } : category))
    : defaultCategories;

  return (
    <main className="space-y-12 py-8">
      <section className="overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-10 text-slate-50 shadow-[0_30px_80px_rgba(15,23,42,0.25)] sm:px-10 lg:px-14">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-sky-500/15 px-4 py-2 text-sm font-semibold text-sky-200">
              Premium Collection
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Curated essentials for modern lifestyle shopping.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-300">
              Discover beautifully designed products, fast delivery, and a seamless cart experience. Shop select categories for the best deals and premium exclusives.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
              >
                Shop now
                <FaArrowRight />
              </button>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-5 py-3 text-sm text-slate-200">
                <FaTruck className="text-sky-400" /> Free shipping over ₹2,499
              </span>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[2rem] bg-white/5 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.15)]">
              <p className="text-sm uppercase tracking-[0.28em] text-sky-300">Fast delivery</p>
              <h3 className="mt-4 text-2xl font-semibold text-white">Next-day express shipping</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">Keep your wardrobe fresh with fast delivery on every order.</p>
            </div>
            <div className="rounded-[2rem] bg-white/5 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.15)]">
              <p className="text-sm uppercase tracking-[0.28em] text-sky-300">Shop with confidence</p>
              <h3 className="mt-4 text-2xl font-semibold text-white">Secure checkout</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">Your payments and personal details are protected with every purchase.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-sky-600">Browse by category</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">Shop by department</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onCategorySelect && onCategorySelect("all")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeCategory === "all" ? "bg-slate-950 text-white shadow-lg shadow-slate-950/10" : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"}`}
            >
              All
            </button>
            {categoryItems.map((category) => (
              <button
                key={category.slug || category.name}
                type="button"
                onClick={() => onCategorySelect && onCategorySelect(category.name)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeCategory === category.name ? "bg-slate-950 text-white shadow-lg shadow-slate-950/10" : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"}`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {error && (
        <section className="rounded-[2rem] border border-rose-200 bg-rose-50 px-6 py-5 text-rose-900 shadow-sm">
          <p className="font-semibold">Error loading products</p>
          <p>{error}</p>
        </section>
      )}

      <section className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Featured collection</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">Trending this week</h2>
          </div>
          <p className="max-w-xl text-sm text-slate-500">
            Discover the hottest picks across fashion, beauty, and electronics curated just for you.
          </p>
        </div>
        {loading ? (
          <div className="rounded-[2rem] bg-white p-12 text-center text-slate-500 shadow-sm">Loading trending products...</div>
        ) : trendingProducts.length || featuredProducts.length ? (
          <Allproduct
            items={trendingProducts.length ? trendingProducts : featuredProducts}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            wishlist={wishlist}
          />
        ) : (
          <div className="rounded-[2rem] bg-white p-12 text-center text-slate-500 shadow-sm">No trending products available right now.</div>
        )}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-10 text-white shadow-[0_25px_80px_rgba(15,23,42,0.24)]">
          <p className="text-sm uppercase tracking-[0.28em] text-sky-400">Limited offer</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight">Seasonal sale on electronics</h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300">
            Upgrade your setup with curated gadgets and premium tech essentials at up to 40% off.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white ring-1 ring-white/10">
              <FaBolt /> Instant discounts
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white ring-1 ring-white/10">
              <FaShieldAlt /> Secure checkout
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white ring-1 ring-white/10">
              <FaTag /> Best prices guaranteed
            </span>
          </div>
        </div>
        <div className="rounded-[2rem] bg-white p-8 shadow-[0_25px_60px_rgba(15,23,42,0.08)]">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Why shop with us</p>
          <ul className="mt-6 space-y-4 text-slate-700">
            <li className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">Premium curated products with fast delivery.</li>
            <li className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">Secure checkout, easy returns, and 24/7 support.</li>
            <li className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">Exclusive offers across trending brands.</li>
          </ul>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">All products</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">Explore our catalog</h2>
          </div>
          <p className="max-w-xl text-sm text-slate-500">Browse thousands of premium products across every category.</p>
        </div>
        {loading ? (
          <div className="rounded-[2rem] bg-white p-12 text-center text-slate-500 shadow-sm">Loading products...</div>
        ) : allProducts.length > 0 ? (
          <Allproduct
            items={allProducts}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            wishlist={wishlist}
          />
        ) : (
          <div className="rounded-[2rem] bg-white p-12 text-center text-slate-500 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">No products available.</h3>
            <p className="mt-2">Please check back soon or try another category.</p>
          </div>
        )}
      </section>
    </main>
  );
}
