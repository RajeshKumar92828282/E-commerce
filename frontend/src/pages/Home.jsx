import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaBolt, FaShieldAlt, FaTag, FaTruck, FaGift } from "react-icons/fa";
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
    <main className="space-y-10 py-10">
      <section className="overflow-hidden rounded-[2rem] bg-white shadow-overlay sm:px-10 lg:px-14">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-8 py-10 text-white shadow-soft sm:px-12 sm:py-14">
            <span className="inline-flex rounded-full bg-sky-500/15 px-4 py-2 text-sm font-semibold text-sky-200">
              Premium Collection
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
              Shop premium electronics, fashion, and home essentials.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Discover handpicked products, fast delivery, and exclusive offers designed for modern shopping.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/category/all" className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-400">
                Start shopping
                <FaArrowRight />
              </Link>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-3 text-sm text-slate-100 ring-1 ring-white/20">
                <FaTruck className="text-sky-200" /> Free delivery over ₹2,499
              </span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[2rem] bg-slate-950 p-7 shadow-soft">
              <p className="text-sm uppercase tracking-[0.28em] text-sky-300">Flash savings</p>
              <h2 className="mt-4 text-2xl font-semibold text-white">Best deals of the day</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Save on trending products with limited-time offers and premium warranties.
              </p>
            </div>
            <div className="rounded-[2rem] bg-white p-7 shadow-soft">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Why choose us</p>
              <div className="mt-5 space-y-4 text-slate-700">
                <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4">
                  <FaBolt className="h-5 w-5 text-sky-500" /> Instant discounts on select brands.
                </div>
                <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4">
                  <FaShieldAlt className="h-5 w-5 text-sky-500" /> Secure checkout with trusted payments.
                </div>
                <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4">
                  <FaGift className="h-5 w-5 text-sky-500" /> Free delivery and easy returns.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Browse categories</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">Popular categories</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onCategorySelect && onCategorySelect("all")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeCategory === "all" ? "bg-slate-950 text-white shadow-lg" : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"}`}
            >
              All
            </button>
            {categoryItems.map((category) => (
              <button
                key={category.slug || category.name}
                type="button"
                onClick={() => onCategorySelect && onCategorySelect(category.name)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeCategory === category.name ? "bg-slate-950 text-white shadow-lg" : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"}`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-6 shadow-soft">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categoryItems.slice(0, 4).map((category) => (
              <div key={category.slug} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-sky-300">
                <p className="font-semibold text-slate-900">{category.name}</p>
                <p className="mt-2 text-sm text-slate-500">Explore curated selections</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Featured collection</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">Trending this week</h2>
          </div>
          <p className="max-w-xl text-sm text-slate-500">Curated picks from fashion, electronics, and home that shoppers love.</p>
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

      <section className="grid gap-6 px-4 sm:px-6 lg:px-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-10 text-white shadow-overlay">
          <p className="text-sm uppercase tracking-[0.28em] text-sky-300">Limited offer</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight">Seasonal sale on electronics</h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300">
            Upgrade your setup with curated gadgets and premium tech essentials at up to 40% off.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white ring-1 ring-white/15">
              <FaBolt /> Instant discounts
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white ring-1 ring-white/15">
              <FaShieldAlt /> Secure checkout
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white ring-1 ring-white/15">
              <FaTag /> Best prices guaranteed
            </span>
          </div>
        </div>
        <div className="rounded-[2rem] bg-white p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Why shop with us</p>
          <ul className="mt-6 space-y-4 text-slate-700">
            <li className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">Premium curated products with fast delivery.</li>
            <li className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">Secure checkout, easy returns, and 24/7 support.</li>
            <li className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">Exclusive offers across trending brands.</li>
          </ul>
        </div>
      </section>

      <section className="space-y-6 px-4 sm:px-6 lg:px-8">
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
          <Allproduct items={allProducts} addToCart={addToCart} addToWishlist={addToWishlist} wishlist={wishlist} />
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
