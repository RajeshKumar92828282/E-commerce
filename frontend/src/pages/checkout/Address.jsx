import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutAddress({ cart = [], onProceed }) {
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    name: localStorage.getItem("name") || "",
    phone: localStorage.getItem("phone") || "",
    street: "",
    city: "",
    state: "",
    pin: "",
  });
  const [error, setError] = useState(null);
  const buyNowProduct = JSON.parse(localStorage.getItem("buyNow") || "null");
  const checkoutItems = cart.length ? cart : buyNowProduct ? [buyNowProduct] : [];
  const totalAmount = checkoutItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address.name || !address.phone || !address.street || !address.city || !address.state || !address.pin) {
      setError("Please complete all address fields.");
      return;
    }
    setError(null);
    onProceed(address);
  };

  return (
    <main className="space-y-8 py-10">
      <section className="rounded-[2rem] bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
        <p className="text-sm uppercase tracking-[0.28em] text-sky-600">Checkout</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">Confirm shipping address</h1>
        <p className="mt-4 text-sm text-slate-500">Review your delivery address before proceeding to payment.</p>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <form className="space-y-6 rounded-[2rem] bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)]" onSubmit={handleSubmit}>
          {error && <div className="rounded-3xl bg-rose-50 p-4 text-sm text-rose-700">{error}</div>}
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Full name</span>
              <input
                name="name"
                value={address.name}
                onChange={handleChange}
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Phone</span>
              <input
                name="phone"
                value={address.phone}
                onChange={handleChange}
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Street address</span>
            <input
              name="street"
              value={address.street}
              onChange={handleChange}
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
            />
          </label>

          <div className="grid gap-6 sm:grid-cols-3">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">City</span>
              <input
                name="city"
                value={address.city}
                onChange={handleChange}
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">State</span>
              <input
                name="state"
                value={address.state}
                onChange={handleChange}
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">PIN code</span>
              <input
                name="pin"
                value={address.pin}
                onChange={handleChange}
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
              />
            </label>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button type="button" onClick={() => navigate(-1)} className="rounded-3xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-50">
              Back to cart
            </button>
            <button type="submit" className="rounded-3xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-500">
              Continue to payment
            </button>
          </div>
        </form>

        <aside className="rounded-[2rem] bg-slate-950 p-8 text-slate-50 shadow-[0_30px_80px_rgba(15,23,42,0.18)]">
          <p className="text-sm uppercase tracking-[0.28em] text-sky-400">Order summary</p>
          <h2 className="mt-4 text-2xl font-semibold">{checkoutItems.length} items</h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-[1.75rem] bg-slate-900/70 p-5">
              <p className="text-sm text-slate-400">Total estimated</p>
              <p className="mt-3 text-3xl font-semibold text-white">₹ {totalAmount.toFixed(2)}</p>
            </div>
            <p className="text-sm leading-7 text-slate-300">You can update shipping address and finalize your payment on the next screen.</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
