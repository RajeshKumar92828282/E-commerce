import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutPayment({ cart = [], onConfirm }) {
  const navigate = useNavigate();
  const [method, setMethod] = useState("upi");
  const [processing, setProcessing] = useState(false);

  const buyNowProduct = JSON.parse(localStorage.getItem("buyNow") || "null");
  const checkoutItems = cart.length ? cart : buyNowProduct ? [buyNowProduct] : [];
  const total = checkoutItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);

    const address = JSON.parse(localStorage.getItem("checkoutAddress") || "{}");
    const order = {
      id: `ORDER-${Date.now()}`,
      title: `Order of ${checkoutItems.length} item${checkoutItems.length === 1 ? "" : "s"}`,
      status: "Processing",
      total,
      method,
      address,
      items: checkoutItems,
      placedAt: new Date().toISOString(),
    };

    setTimeout(() => {
      onConfirm(order);
      localStorage.removeItem("buyNow");
      setProcessing(false);
    }, 800);
  };

  return (
    <main className="space-y-8 py-10">
      <section className="rounded-[2rem] bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
        <p className="text-sm uppercase tracking-[0.28em] text-sky-600">Payment</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">Select your payment method</h1>
        <p className="mt-4 text-sm text-slate-500">Complete your order with a secure, trusted payment option.</p>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
        <form className="space-y-6 rounded-[2rem] bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)]" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <label className="block rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <input type="radio" name="payment" value="upi" checked={method === "upi"} onChange={() => setMethod("upi")} className="h-5 w-5 text-sky-600" />
                <span className="text-lg font-semibold text-slate-950">UPI</span>
              </div>
              <p className="mt-3 text-sm text-slate-600">Fast and secure payment with any UPI app.</p>
            </label>
            <label className="block rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <input type="radio" name="payment" value="card" checked={method === "card"} onChange={() => setMethod("card")} className="h-5 w-5 text-sky-600" />
                <span className="text-lg font-semibold text-slate-950">Credit / Debit Card</span>
              </div>
              <p className="mt-3 text-sm text-slate-600">Enter your card details securely for instant checkout.</p>
            </label>
            <label className="block rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <input type="radio" name="payment" value="cod" checked={method === "cod"} onChange={() => setMethod("cod")} className="h-5 w-5 text-sky-600" />
                <span className="text-lg font-semibold text-slate-950">Cash on delivery</span>
              </div>
              <p className="mt-3 text-sm text-slate-600">Pay when your order arrives at your doorstep.</p>
            </label>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button type="button" onClick={() => navigate(-1)} className="rounded-3xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-50">
              Back to address
            </button>
            <button type="submit" disabled={processing} className="rounded-3xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:bg-slate-300">
              {processing ? "Processing..." : `Pay ₹ ${total.toFixed(2)}`}
            </button>
          </div>
        </form>

        <aside className="rounded-[2rem] bg-slate-950 p-8 text-slate-50 shadow-[0_30px_80px_rgba(15,23,42,0.18)]">
          <p className="text-sm uppercase tracking-[0.28em] text-sky-400">Order summary</p>
          <h2 className="mt-4 text-2xl font-semibold">Total payment</h2>
          <div className="mt-6 space-y-4 rounded-[1.75rem] bg-slate-900/70 p-6">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Items price</span>
              <span>₹ {total.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Delivery charge</span>
              <span className="text-sky-300">FREE</span>
            </div>
            <div className="mt-4 flex items-center justify-between text-lg font-semibold text-white">
              <span>Payable amount</span>
              <span>₹ {total.toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
