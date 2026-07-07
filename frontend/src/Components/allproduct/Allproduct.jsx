import React from "react";
import ProductCard from "../ProductCard";

export default function Allproduct({ items = [], addToWishlist, wishlist = [], addToCart }) {
  const wishlistIds = new Set((wishlist || []).map((item) => item.productId || item._id || item.id));

  if (!items?.length) {
    return (
      <div className="rounded-[2rem] border border-dashed border-slate-200 bg-white/80 p-12 text-center shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
        <p className="text-lg font-semibold text-slate-900">No products found.</p>
        <p className="mt-3 text-sm text-slate-500">Try another category or refine your search.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((product) => (
        <ProductCard
          key={product._id || product.id}
          product={product}
          addToCart={addToCart}
          addToWishlist={addToWishlist}
          isWished={wishlistIds.has(product._id || product.id)}
        />
      ))}
    </div>
  );
}

           