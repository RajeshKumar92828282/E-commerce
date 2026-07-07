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
    <main className="space-y-8 py-10 px-4 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] bg-white p-8 shadow-overlay">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-sky-600">Payment</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950">Select your payment method</h1>
            <p className="mt-3 text-sm text-slate-500">Choose the safest option to complete your order.</p>
          </div>
          <div className="rounded-full bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm">
            Payable ₹ {total.toFixed(2)}
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
        <form className="space-y-6 rounded-[2rem] bg-white p-8 shadow-soft" onSubmit={handleSubmit}>
          <div className="rounded-[2rem] bg-slate-50 p-6">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Choose payment</p>
            <p className="mt-2 text-sm text-slate-600">Secure payment options with instant confirmation.</p>
          </div>

          <div className="space-y-4">
            {[
              {
                value: "upi",
                label: "UPI",
                description: "Quick payment with your preferred UPI app.",
              },
              {
                value: "card",
                label: "Credit / Debit Card",
                description: "Pay securely with Visa, Mastercard, or RuPay.",
              },
              {
                value: "cod",
                label: "Cash on delivery",
                description: "Pay when your package arrives, easy and safe.",
              },
            ].map((option) => (
              <label
                key={option.value}
                className={`block rounded-[1.75rem] border p-4 transition ${
                  method === option.value ? "border-sky-500 bg-sky-50" : "border-slate-200 bg-slate-50 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value={option.value}
                    checked={method === option.value}
                    onChange={() => setMethod(option.value)}
                    className="h-5 w-5 text-sky-600"
                  />
                  <span className="text-lg font-semibold text-slate-950">{option.label}</span>
                </div>
                <p className="mt-3 text-sm text-slate-600">{option.description}</p>
              </label>
            ))}
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

        <aside className="rounded-[2rem] bg-slate-950 p-8 text-slate-50 shadow-overlay">
          <p className="text-sm uppercase tracking-[0.28em] text-sky-400">Order summary</p>
          <h2 className="mt-4 text-2xl font-semibold">Payment breakdown</h2>
          <div className="mt-6 space-y-4 rounded-[1.75rem] bg-slate-900/80 p-6">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Products total</span>
              <span>₹ {total.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Shipping</span>
              <span className="text-sky-300">FREE</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Payment fee</span>
              <span className="text-slate-300">₹ 0.00</span>
            </div>
            <div className="mt-4 flex items-center justify-between text-lg font-semibold text-white">
              <span>Total</span>
              <span>₹ {total.toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
