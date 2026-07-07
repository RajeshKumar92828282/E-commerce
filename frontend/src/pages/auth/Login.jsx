import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        if (onLoginSuccess) {
          onLoginSuccess({ user: data.user, token: data.token });
        } else {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.user._id);
          localStorage.setItem("name", data.user.name);
          localStorage.setItem("email", data.user.email);
          if (data.user.phone) localStorage.setItem("phone", data.user.phone);
          if (data.user.address) localStorage.setItem("address", data.user.address);
        }
        navigate("/");
      } else {
        setError(data.message || "Unable to login. Please check your credentials.");
      }
    } catch {
      setError("Unable to connect to the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 sm:px-6">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
        <div className="mb-8 space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.28em] text-sky-600">Welcome back</p>
          <h1 className="text-3xl font-semibold text-slate-950">Login to your account</h1>
        </div>

        {error && <div className="mb-4 rounded-3xl bg-rose-50 p-4 text-sm text-rose-700">{error}</div>}

        <form className="space-y-5" onSubmit={handleLogin}>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Email address</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
            />
          </label>
          <button type="submit" disabled={loading} className="w-full rounded-3xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400">
            {loading ? "Signing in..." : "Login"}
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
          Don’t have an account?{' '}
          <Link to="/signup" className="font-semibold text-slate-950 hover:text-slate-800">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
