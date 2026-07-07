import React from "react";
import { Link } from "react-router-dom";

export default function Orders() {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");

  return (
    <main className="space-y-8 py-10">
      <section className="rounded-[2rem] bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
        <p className="text-sm uppercase tracking-[0.28em] text-slate-500">My orders</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">Your recent purchases</h1>
      </section>

      {orders.length === 0 ? (
        <section className="rounded-[2rem] bg-white p-12 text-center shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-950">You haven’t placed any orders yet.</h2>
          <p className="mt-3 text-slate-500">Start shopping to see your orders appear here.</p>
          <Link to="/" className="mt-6 inline-flex rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-500">
            Browse products
          </Link>
        </section>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <section key={order.id || index} className="rounded-[2rem] bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.07)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Order #{index + 1}</p>
                  <h2 className="mt-2 text-xl font-semibold text-slate-950">{order.title}</h2>
                </div>
                <p className="rounded-full bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">{order.status}</p>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-sm text-slate-500">Total</p>
                  <p className="mt-2 text-lg font-semibold text-slate-950">₹ {order.total.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Delivery</p>
                  <p className="mt-2 text-lg text-slate-950">{order.address.city}, {order.address.state}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Items</p>
                  <p className="mt-2 text-lg font-semibold text-slate-950">{order.items.length}</p>
                </div>
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}
