import React from "react";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, addToCart, addToWishlist, isWished }) {
  const navigate = useNavigate();
  const productId = product._id || product.id;
  const image = product.image || product.images?.[0] || "https://via.placeholder.com/320x240?text=No+Image";
  const discount = product.oldPrice ? Math.round(100 - (product.price / product.oldPrice) * 100) : 0;

  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(15,23,42,0.12)]">
      <div className="relative overflow-hidden bg-slate-100">
        <img
          src={image}
          alt={product.title}
          className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {discount > 0 && (
          <span className="absolute left-4 top-4 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-slate-950 shadow-lg shadow-amber-500/20">
            {discount}% OFF
          </span>
        )}
        <button
          type="button"
          onClick={() => addToWishlist && addToWishlist(product)}
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/85 text-slate-900 shadow-lg shadow-slate-900/5 transition hover:scale-105 hover:bg-white"
        >
          <FaHeart className={`${isWished ? "text-rose-500" : "text-slate-500"}`} />
        </button>
      </div>

      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
          <span>{product.category}</span>
          <span>{product.stock > 0 ? "In stock" : "Out of stock"}</span>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-slate-950 line-clamp-2" onClick={() => navigate(`/product/${productId}`)}>
            {product.title}
          </h3>
          <p className="text-sm leading-6 text-slate-500 line-clamp-2">{product.description}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-amber-500">
            <FaStar />
            <span className="text-sm font-semibold">{product.rating?.average?.toFixed(1) || "4.3"}</span>
          </div>
          <span className="text-sm text-slate-400">({product.rating?.count || 86})</span>
        </div>

        <div className="flex items-center gap-3">
          <div>
            <p className="text-2xl font-semibold text-slate-950">₹ {product.price.toFixed(2)}</p>
            {product.oldPrice && <p className="text-sm text-slate-400 line-through">₹ {product.oldPrice.toFixed(2)}</p>}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <button
            type="button"
            onClick={() => navigate(`/product/${productId}`)}
            className="rounded-2xl border border-slate-200 bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            View details
          </button>
          <button
            type="button"
            onClick={() => addToCart && addToCart(product)}
            className="rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-500"
          >
            <FaShoppingCart className="mr-2 inline-block" /> Add to cart
          </button>
          <button
            type="button"
            onClick={() => {
              localStorage.setItem("buyNow", JSON.stringify(product));
              navigate("/checkout/address");
            }}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-50"
          >
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
}
