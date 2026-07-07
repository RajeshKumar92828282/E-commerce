import React from "react";
import { Link } from "react-router-dom";

export default function Orders() {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");

  return (
    <main className="space-y-8 py-10 px-4 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] bg-white p-8 shadow-overlay">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">My orders</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950">Your order history</h1>
            <p className="mt-2 text-sm text-slate-600">Track status, totals, and delivery details for every purchase.</p>
          </div>
          <span className="inline-flex rounded-full bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">{orders.length} orders</span>
        </div>
      </section>

      {orders.length === 0 ? (
        <section className="rounded-[2rem] bg-white p-12 text-center shadow-soft">
          <h2 className="text-2xl font-semibold text-slate-950">No orders yet</h2>
          <p className="mt-3 text-slate-500">Your purchases will appear here once checkout is complete.</p>
          <Link to="/" className="mt-6 inline-flex rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-500">
            Shop now
          </Link>
        </section>
      ) : (
        <div className="grid gap-6">
          {orders.map((order, index) => (
            <section key={order.id || index} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-overlay">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Order #{order.id || index + 1}</p>
                  <h2 className="mt-2 text-xl font-semibold text-slate-950">{order.title}</h2>
                </div>
                <span className="inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">{order.status}</span>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.75rem] bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Total</p>
                  <p className="mt-2 text-lg font-semibold text-slate-950">₹ {order.total.toFixed(2)}</p>
                </div>
                <div className="rounded-[1.75rem] bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Delivery</p>
                  <p className="mt-2 text-lg text-slate-950">{order.address?.city}, {order.address?.state}</p>
                </div>
                <div className="rounded-[1.75rem] bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Items</p>
                  <p className="mt-2 text-lg font-semibold text-slate-950">{order.items?.length || 0}</p>
                </div>
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}
