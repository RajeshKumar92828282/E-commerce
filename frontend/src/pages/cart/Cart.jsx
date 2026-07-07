import React, { useState } from "react";
import logger from "../../utils/logger";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt, FaShoppingBag, FaGift } from "react-icons/fa";

export default function Cart({ cart = [], onRemoveItem, onCheckout }) {
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const removeItem = async (id) => {
    setError(null);
    if (onRemoveItem) {
      onRemoveItem(id);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/cart/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Failed to remove item: ${res.status}`);
    } catch (err) {
      logger.error("Delete error:", err);
      setError(err.message || "Failed to remove item");
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <main className="space-y-8 py-10">
      <div className="rounded-[2rem] bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-sky-600">Your cart</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-950">Ready to checkout</h1>
          </div>
          <div className="inline-flex items-center gap-3 rounded-full bg-slate-50 px-5 py-3 text-sm text-slate-700 shadow-sm">
            <FaGift className="text-sky-500" /> Free delivery on orders above ₹2,499
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-[2rem] border border-rose-200 bg-rose-50 p-6 text-rose-700 shadow-sm">
          {error}
        </div>
      )}

      <div className="grid gap-8 xl:grid-cols-[1.65fr_0.95fr]">
        <section className="space-y-6 rounded-[2rem] bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.06)]">
          <h2 className="text-xl font-semibold text-slate-950">Items in your cart</h2>

          {cart.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-slate-600">
              <p className="text-lg font-semibold">Your cart is empty</p>
              <p className="mt-2 text-sm">Add items to your cart to begin checkout.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item._id || item.id} className="flex flex-col gap-4 rounded-[2rem] border border-slate-200 p-5 sm:flex-row sm:items-center">
                  <img src={item.image || "https://via.placeholder.com/200x200?text=No+Image"} alt={item.title} className="h-32 w-full rounded-[1.5rem] object-cover sm:w-40" />
                  <div className="flex flex-1 flex-col gap-3">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
                        <p className="text-sm text-slate-500">Qty: {item.quantity || 1}</p>
                      </div>
                      <div className="flex items-center gap-3 text-slate-700">
                        <span className="text-lg font-semibold">₹ {item.price.toFixed(2)}</span>
                        <button type="button" onClick={() => removeItem(item._id || item.id)} className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-100">
                          <FaTrashAlt /> Remove
                        </button>
                      </div>
                    </div>
                    <p className="text-sm leading-6 text-slate-500">Enjoy premium support, warranty, and fast delivery on this item.</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {cart.length > 0 && (
          <aside className="space-y-6 rounded-[2rem] bg-slate-950 p-8 text-slate-50 shadow-[0_25px_70px_rgba(15,23,42,0.18)]">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.28em] text-sky-400">Order summary</p>
              <h2 className="text-2xl font-semibold">Price details</h2>
            </div>
            <div className="space-y-4 rounded-[1.75rem] bg-slate-900/80 p-6">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Subtotal ({cart.length} items)</span>
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
              className="w-full rounded-3xl bg-sky-500 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
            >
              Proceed to checkout
            </button>
          </aside>
        )}
      </div>
    </main>
  );
}

