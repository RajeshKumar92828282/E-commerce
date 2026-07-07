import React, { useEffect, useState } from "react";
import logger from "../utils/logger";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { fetchProductById } from "../services/api";

export default function ProductDetails({ addToCart, addToWishlist }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchProductById(id);
        setProduct(data.product || data);
        setRelated(data.related || []);
      } catch (err) {
        logger.error(err);
        setError("Unable to load product details.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <div className="py-20 text-center text-slate-500">Loading product...</div>;
  if (error) return <div className="py-20 text-center text-rose-600">{error}</div>;
  if (!product) return <div className="py-20 text-center text-slate-600">Product not found.</div>;

  const image = product.images?.[0] || product.image || "https://via.placeholder.com/600x600?text=No+Image";

  return (
    <div className="space-y-10 py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900">
            <FaArrowLeft /> Back to shop
          </Link>
          <p className="mt-3 text-sm uppercase tracking-[0.28em] text-sky-600">Product details</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">{product.title}</h1>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-600 shadow-sm">
          <p className="font-semibold text-slate-950">{product.category || "General"}</p>
          <p>{product.brand || "Best seller"}</p>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_25px_80px_rgba(15,23,42,0.08)]">
          <img src={image} alt={product.title} className="h-full w-full object-cover" />
        </div>

        <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_25px_80px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Price</p>
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-3xl font-semibold text-slate-950">₹ {product.price?.toFixed(2)}</span>
                  {product.oldPrice && <span className="text-sm text-slate-400 line-through">₹ {product.oldPrice.toFixed(2)}</span>}
                </div>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">
                <FaStar className="text-amber-500" /> {product.rating?.average?.toFixed(1) || "4.4"}
              </div>
            </div>
            <p className="text-sm leading-7 text-slate-600">{product.description || "No description available for this product."}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <span className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-700">Free shipping over ₹2,499</span>
              <span className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-700">30-day returns</span>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => addToCart && addToCart(product)}
                className="inline-flex items-center justify-center rounded-3xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-500"
              >
                <FaShoppingCart className="mr-2" /> Add to cart
              </button>
              <button
                type="button"
                onClick={() => {
                  localStorage.setItem("buyNow", JSON.stringify(product));
                  navigate("/checkout/address");
                }}
                className="inline-flex items-center justify-center rounded-3xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Buy now
              </button>
              <button
                type="button"
                onClick={() => addToWishlist && addToWishlist(product)}
                className="inline-flex items-center justify-center rounded-3xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:border-slate-400 hover:bg-slate-50"
              >
                <FaHeart className="mr-2 text-rose-500" /> Add to wishlist
              </button>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Related</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">Customers also viewed</h2>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {related.map((item) => (
              <div key={item._id || item.id} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
                <img src={item.images?.[0] || item.image || "https://via.placeholder.com/320x240?text=No+Image"} alt={item.title} className="h-44 w-full rounded-3xl object-cover" />
                <h3 className="mt-4 text-lg font-semibold text-slate-950 line-clamp-2">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-500">₹ {item.price?.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
