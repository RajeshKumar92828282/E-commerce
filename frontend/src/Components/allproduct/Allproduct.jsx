import React from "react";
import ProductCard from "../ProductCard";

export default function Allproduct({ items = [], addToWishlist, wishlist = [], addToCart }) {
  const wishlistIds = new Set((wishlist || []).map((item) => item.productId || item._id || item.id));

  if (!items?.length) {
    return (
      <div className="rounded-[2rem] border border-dashed border-slate-200 bg-white/90 p-12 text-center shadow-soft">
        <p className="text-lg font-semibold text-slate-950">No products available.</p>
        <p className="mt-3 text-sm text-slate-500">Try another category or return to the homepage.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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

           