import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt, FaGift } from "react-icons/fa";

export default function Cart({ cart = [], onRemoveItem, onCheckout }) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const removeItem = (id) => {
    setError(null);
    if (onRemoveItem) {
      onRemoveItem(id);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <main className="space-y-8 py-10 px-4 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] bg-white p-8 shadow-overlay">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-sky-600">Your cart</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-950">Bag summary</h1>
          </div>
          <div className="inline-flex items-center gap-3 rounded-full bg-slate-50 px-5 py-3 text-sm text-slate-700 shadow-sm">
            <FaGift className="text-sky-500" /> Free delivery on orders above ₹2,499
          </div>
        </div>
      </section>

      {error && (
        <section className="rounded-[2rem] border border-rose-200 bg-rose-50 p-6 text-rose-700 shadow-sm">
          {error}
        </section>
      )}

      <div className="grid gap-8 xl:grid-cols-[1.6fr_0.95fr]">
        <section className="rounded-[2rem] bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-950">Items in your cart</h2>
              <p className="text-sm text-slate-500">Review your selection before checkout.</p>
            </div>
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">{cart.length} items</span>
          </div>

          {cart.length === 0 ? (
            <div className="mt-8 rounded-[2rem] border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-slate-600">
              <p className="text-lg font-semibold">Your cart is empty</p>
              <p className="mt-2 text-sm">Add products to start shopping smart.</p>
            </div>
          ) : (
            <div className="mt-8 space-y-5">
              {cart.map((item) => (
                <div key={item._id || item.id} className="grid gap-4 rounded-[2rem] border border-slate-200 p-5 md:grid-cols-[140px_1fr] md:items-center">
                  <img src={item.image || "https://via.placeholder.com/200x200?text=No+Image"} alt={item.title} className="h-32 w-full rounded-[1.5rem] object-cover md:w-36" />
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-950 line-clamp-2">{item.title}</h3>
                        <p className="mt-2 text-sm text-slate-500">Qty: {item.quantity || 1}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-semibold text-slate-950">₹ {item.price.toFixed(2)}</span>
                        <button
                          type="button"
                          onClick={() => removeItem(item._id || item.id)}
                          className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-100"
                        >
                          <FaTrashAlt /> Remove
                        </button>
                      </div>
                    </div>
                    <p className="text-sm leading-6 text-slate-500">Delivery tracking, secure packaging, and easy returns included.</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {cart.length > 0 && (
          <aside className="space-y-6 rounded-[2rem] bg-slate-950 p-8 text-slate-50 shadow-overlay">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.28em] text-sky-400">Order summary</p>
              <h2 className="text-2xl font-semibold">Checkout details</h2>
            </div>
            <div className="space-y-4 rounded-[1.75rem] bg-slate-900/80 p-6">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Subtotal</span>
                <span>₹ {total.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Discount</span>
                <span className="text-emerald-400">₹ 0.00</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Delivery charges</span>
                <span className="text-sky-300">FREE</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-lg font-semibold text-white">
              <span>Total</span>
              <span>₹ {total.toFixed(2)}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                if (onCheckout) onCheckout();
                else navigate("/checkout/address");
              }}
              className="w-full rounded-[1.75rem] bg-sky-500 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
            >
              Proceed to checkout
            </button>
          </aside>
        )}
      </div>
    </main>
  );
}

