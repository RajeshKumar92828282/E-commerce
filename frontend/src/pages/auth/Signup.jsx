import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email.includes("@")) {
      return setError("Please enter a valid email address.");
    }
    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match.");
    }
    setError("");

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        navigate("/login");
      } else {
        setError(data.message || "Signup failed.");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 sm:px-6">
      <div className="w-full max-w-5xl rounded-[2rem] bg-white shadow-overlay">
        <div className="grid gap-0 lg:grid-cols-[0.95fr_0.85fr]">
          <div className="rounded-[2rem] bg-slate-950 p-10 text-slate-50 sm:p-12 lg:rounded-r-none">
            <div className="max-w-md">
              <p className="text-sm uppercase tracking-[0.28em] text-sky-400">Create your account</p>
              <h1 className="mt-4 text-4xl font-semibold">Create your AIDEN account</h1>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Join AIDEN to save your address, track orders, and check out with fewer steps.
              </p>
              <div className="mt-8 grid gap-4 text-sm text-slate-300">
                <div className="rounded-[1.75rem] bg-slate-900/80 p-4">
                  <p className="font-semibold text-slate-50">Saved details</p>
                  <p className="mt-1">Use one account across every purchase.</p>
                </div>
                <div className="rounded-[1.75rem] bg-slate-900/80 p-4">
                  <p className="font-semibold text-slate-50">Faster checkout</p>
                  <p className="mt-1">Complete orders quickly with stored shipping information.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-[2rem] bg-white p-8 sm:p-10 lg:rounded-l-none">
            <div className="mb-8 space-y-3 text-center">
              <p className="text-sm uppercase tracking-[0.28em] text-sky-600">Signup</p>
              <h2 className="text-3xl font-semibold text-slate-950">Create your account</h2>
            </div>

            {error && <div className="mb-4 rounded-3xl bg-rose-50 p-4 text-sm text-rose-700">{error}</div>}

            <form className="space-y-5" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Full Name</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Email address</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Password</span>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Confirm password</span>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
                />
              </label>

              <button type="submit" disabled={loading} className="w-full rounded-3xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400">
                {loading ? "Creating account..." : "Create account"}
              </button>
            </form>

            <div className="mt-8 space-y-4">
              <button type="button" className="flex w-full items-center justify-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50">
                <img src="https://developers.google.com/identity/images/g-logo.png" alt="google" className="h-5 w-5" />
                Continue with Google
              </button>
              <button type="button" className="flex w-full items-center justify-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50">
                Continue with Facebook
              </button>
            </div>

            <p className="mt-8 text-center text-sm text-slate-500">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-slate-950 hover:text-slate-800">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
