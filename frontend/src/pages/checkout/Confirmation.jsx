import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaShoppingCart, FaBoxOpen } from "react-icons/fa";

export default function OrderConfirmation() {
  const order = JSON.parse(localStorage.getItem("checkoutOrder") || "null");

  if (!order) {
    return (
      <main className="py-20 text-center text-slate-600">
        <p className="text-xl font-semibold text-slate-950">No order found.</p>
        <p className="mt-3">Please complete checkout to see your confirmation.</p>
      </main>
    );
  }

  return (
    <main className="space-y-10 py-10">
      <section className="rounded-[2rem] bg-white p-10 shadow-[0_30px_80px_rgba(15,23,42,0.08)] text-center">
        <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
          <FaCheckCircle className="h-10 w-10" />
        </span>
        <h1 className="mt-6 text-3xl font-semibold text-slate-950">Order confirmed</h1>
        <p className="mt-4 max-w-xl mx-auto text-sm leading-7 text-slate-600">
          Your order has been placed successfully. You can view order details or continue shopping for more premium products.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link to="/orders" className="inline-flex items-center justify-center gap-2 rounded-3xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
            <FaBoxOpen /> View orders
          </Link>
          <Link to="/" className="inline-flex items-center justify-center gap-2 rounded-3xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-50">
            <FaShoppingCart /> Continue shopping
          </Link>
        </div>
      </section>

      <section className="rounded-[2rem] bg-slate-950 p-10 text-slate-50 shadow-[0_30px_80px_rgba(15,23,42,0.18)]">
        <p className="text-sm uppercase tracking-[0.28em] text-sky-400">Order summary</p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="rounded-[1.75rem] bg-slate-900/80 p-6">
            <p className="text-sm text-slate-400">Order ID</p>
            <p className="mt-2 text-lg font-semibold text-white">{order.id}</p>
          </div>
          <div className="rounded-[1.75rem] bg-slate-900/80 p-6">
            <p className="text-sm text-slate-400">Total amount</p>
            <p className="mt-2 text-lg font-semibold text-white">₹ {order.total.toFixed(2)}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
