import React from "react";
import { FaHeart, FaShoppingCart, FaStar, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, addToCart, addToWishlist, isWished }) {
  const navigate = useNavigate();
  const productId = product._id ?? product.id ?? product?.productId ?? product?.productId;
  const image = product.image || product.images?.[0] || "https://via.placeholder.com/360x360?text=No+Image";
  const discount = product.oldPrice ? Math.max(5, Math.round(100 - (product.price / product.oldPrice) * 100)) : 0;
  const ratingValue = product.rating?.average?.toFixed(1) || "4.4";

  const handleView = () => {
    if (!productId) return;
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = () => {
    if (!addToCart) return;
    addToCart(product);
  };

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-overlay">
      <div className="relative overflow-hidden">
        <button type="button" onClick={handleView} className="block w-full">
          <img src={image} alt={product.title} className="h-44 w-full object-cover transition duration-300 group-hover:scale-105" />
        </button>

        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white shadow-sm">
            -{discount}%
          </span>
        )}

        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-slate-950/90 px-3 py-1 text-[11px] font-semibold text-white">
          <FaStar className="h-3 w-3 text-amber-400" /> {ratingValue}
        </span>

        <button
          type="button"
          onClick={() => addToWishlist && addToWishlist(product)}
          className="absolute right-3 bottom-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 shadow-sm transition hover:bg-slate-100"
          aria-label="Add to wishlist"
        >
          <FaHeart className={isWished ? "text-rose-500" : "text-slate-400"} />
        </button>
      </div>

      <div className="space-y-3 p-4">
        <button type="button" onClick={handleView} className="w-full text-left text-sm font-semibold text-slate-950 line-clamp-2 transition hover:text-sky-600">
          {product.title}
        </button>

        <p className="text-xs leading-5 text-slate-500 line-clamp-2">{product.description || product.category || "Premium product"}</p>

        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-slate-700">Free delivery</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-slate-700">{product.category || "General"}</span>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xl font-semibold text-slate-950">₹ {product.price.toFixed(2)}</p>
            {product.oldPrice && <p className="text-xs text-slate-400 line-through">₹ {product.oldPrice.toFixed(2)}</p>}
          </div>
          <span className="rounded-full bg-sky-50 px-3 py-1 text-[11px] font-semibold text-sky-700">Top rated</span>
        </div>

        <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
          <button
            type="button"
            onClick={handleAddToCart}
            className="inline-flex items-center justify-center gap-2 rounded-[1.5rem] bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <FaShoppingCart className="h-4 w-4" /> Add
          </button>
          <button
            type="button"
            onClick={handleView}
            disabled={!productId}
            className={`inline-flex items-center justify-center gap-2 rounded-[1.5rem] border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-50 ${!productId ? "cursor-not-allowed opacity-60" : ""}`}
          >
            View <FaChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </article>
  );
}
