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

  const placedDate = order.placedAt ? new Date(order.placedAt).toLocaleString() : "—";
  const itemCount = order.items?.length || 0;

  return (
    <main className="space-y-10 py-10 px-4 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] bg-white p-10 shadow-overlay text-center">
        <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
          <FaCheckCircle className="h-10 w-10" />
        </span>
        <h1 className="mt-6 text-3xl font-semibold text-slate-950">Order confirmed</h1>
        <p className="mt-4 max-w-xl mx-auto text-sm leading-7 text-slate-600">
          Thank you for your purchase! Your order is being processed and will be shipped soon.
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

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] bg-slate-950 p-10 text-slate-50 shadow-overlay">
          <p className="text-sm uppercase tracking-[0.28em] text-sky-400">Order summary</p>
          <div className="mt-6 space-y-4 rounded-[1.75rem] bg-slate-900/80 p-6">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Order ID</span>
              <span>{order.id}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Order date</span>
              <span>{placedDate}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Items</span>
              <span>{itemCount}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Payment method</span>
              <span className="capitalize">{order.method || "—"}</span>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-10 shadow-soft">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Total paid</p>
          <p className="mt-4 text-4xl font-semibold text-slate-950">₹ {order.total.toFixed(2)}</p>
          <p className="mt-3 text-sm text-slate-500">Your order will arrive soon. Track delivery details in your orders page.</p>
          <div className="mt-8 grid gap-3">
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Shipping address</p>
              <p className="mt-3 text-sm text-slate-700">{order.address?.street || "Not available"}</p>
              <p className="text-sm text-slate-700">{order.address?.city}, {order.address?.state} {order.address?.pin}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Status</p>
              <p className="mt-3 text-sm font-semibold text-slate-950">{order.status || "Processing"}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
