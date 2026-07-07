import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Allproduct from "../Components/allproduct/Allproduct";
import { fetchProducts } from "../services/api";

export default function SearchResults({ addToCart, addToWishlist, wishlist = [] }) {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";
  const trimmed = query.trim();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!trimmed) {
        setProducts([]);
        setError(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const payload = await fetchProducts({ search: trimmed, limit: 100 });
        const items = Array.isArray(payload.products) ? payload.products : [];
        setProducts(items);
      } catch (err) {
        setError(err.message || "Unable to load search results.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [trimmed]);

  return (
    <main className="space-y-8 py-10 px-4 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] bg-white p-8 shadow-overlay">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-sky-600">Search</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950">Search results</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
              {trimmed ? (
                <span>
                  Showing results for <strong>"{trimmed}"</strong>. {products.length} product{products.length === 1 ? "" : "s"} found.
                </span>
              ) : (
                "Enter a product name or brand in the search box to get started."
              )}
            </p>
          </div>
          <div className="rounded-full bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm">
            {trimmed ? `${products.length} results` : "Start searching to explore products"}
          </div>
        </div>
      </section>

      {error && (
        <section className="rounded-[2rem] border border-rose-200 bg-rose-50 p-6 text-rose-700 shadow-soft">
          <p>{error}</p>
        </section>
      )}

      {loading ? (
        <section className="rounded-[2rem] bg-white p-12 text-center text-slate-500 shadow-soft">Loading search results...</section>
      ) : trimmed ? (
        products.length > 0 ? (
          <Allproduct items={products} addToCart={addToCart} addToWishlist={addToWishlist} wishlist={wishlist} />
        ) : (
          <section className="rounded-[2rem] bg-white p-12 text-center shadow-soft">
            <h2 className="text-2xl font-semibold text-slate-950">No products matched your search.</h2>
            <p className="mt-3 text-slate-500">Try a different keyword or browse popular categories instead.</p>
            <Link to="/" className="mt-6 inline-flex rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-500">
              Browse all products
            </Link>
          </section>
        )
      ) : (
        <section className="rounded-[2rem] bg-white p-12 text-center shadow-soft">
          <h2 className="text-2xl font-semibold text-slate-950">Start searching for products</h2>
          <p className="mt-3 text-slate-500">Use the search bar above to find the best deals, brands, and more.</p>
          <Link to="/" className="mt-6 inline-flex rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-500">
            Browse categories
          </Link>
        </section>
      )}
    </main>
  );
}
