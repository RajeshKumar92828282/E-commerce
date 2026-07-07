import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuSearch, LuHeart, LuShoppingCart, LuUser, LuBell, LuMenu, LuX } from "react-icons/lu";

const categories = [
  { name: "Mobiles", slug: "electronics" },
  { name: "Fashion", slug: "mens-clothing" },
  { name: "Beauty", slug: "beauty" },
  { name: "Home", slug: "home" },
  { name: "Appliances", slug: "appliances" },
];

const Navbar = ({ count, wishlistCount, user, onLogout, searchValue = "", onSearchChange = () => {}, onSearchSubmit = () => {} }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("phone");
    localStorage.removeItem("address");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");

    if (onLogout) onLogout();
    navigate("/login");
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = searchValue.trim();
    onSearchSubmit(query);
    navigate(`/search${query ? `?q=${encodeURIComponent(query)}` : ""}`);
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/95 text-slate-100 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link to="/" className="inline-flex items-center gap-3 rounded-3xl bg-sky-500 px-4 py-3 text-lg font-semibold uppercase tracking-[0.35em] text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400">
            <span>A</span>
            AIDEN
          </Link>
          <div className="hidden sm:flex items-center gap-2 rounded-full bg-slate-900/70 px-3 py-2 text-sm text-slate-300 ring-1 ring-slate-700">
            <span className="rounded-full bg-slate-800 px-3 py-1">Premium</span>
            <span>Fast delivery</span>
          </div>
        </div>

        <div className="hidden flex-1 items-center justify-center lg:flex">
          <form onSubmit={handleSearchSubmit} className="relative w-full max-w-2xl">
            <LuSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search for products, brands and more"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-full border border-slate-800 bg-slate-900/90 py-3 pl-12 pr-4 text-sm text-slate-100 shadow-lg shadow-slate-900/20 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-500/20"
            />
          </form>
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <Link to="/wishlist" className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-slate-100 transition hover:bg-slate-800">
            <LuHeart className="h-5 w-5" />
            <span className="absolute -right-1 top-0 inline-flex h-5 min-w-[1.2rem] items-center justify-center rounded-full bg-rose-500 px-1.5 text-[10px] font-semibold text-white">{wishlistCount}</span>
          </Link>
          <Link to="/cart" className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-slate-100 transition hover:bg-slate-800">
            <LuShoppingCart className="h-5 w-5" />
            <span className="absolute -right-1 top-0 inline-flex h-5 min-w-[1.2rem] items-center justify-center rounded-full bg-sky-500 px-1.5 text-[10px] font-semibold text-white">{count}</span>
          </Link>
          <button type="button" className="inline-flex h-11 items-center justify-center rounded-full bg-slate-900 px-4 text-sm text-slate-100 transition hover:bg-slate-800">
            <LuBell className="h-5 w-5" />
          </button>
          {user && user.name ? (
            <div className="inline-flex items-center gap-3 rounded-full bg-slate-900 px-4 py-3 text-sm text-slate-100 shadow-sm shadow-slate-900/40">
              <LuUser className="h-5 w-5 text-sky-400" />
              <span>Hello, {user.name.split(" ")[0]}</span>
              <button onClick={handleLogout} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-white">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="inline-flex h-11 items-center justify-center rounded-full bg-slate-100 px-5 text-sm font-semibold text-slate-950 transition hover:bg-white">
              Login
            </Link>
          )}
        </div>

        <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-slate-100 transition hover:bg-slate-800 lg:hidden">
          {menuOpen ? <LuX className="h-5 w-5" /> : <LuMenu className="h-5 w-5" />}
        </button>
      </div>

      <div className={`${menuOpen ? "block" : "hidden"} border-t border-slate-800 bg-slate-950/95 lg:hidden`}>
        <div className="space-y-4 px-4 py-5">
          <form onSubmit={handleSearchSubmit} className="relative">
            <LuSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search products"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-full border border-slate-800 bg-slate-900 py-3 pl-12 pr-4 text-sm text-slate-100 outline-none"
            />
          </form>

          <div className="grid gap-3">
            <Link to="/category/all" onClick={() => setMenuOpen(false)} className="rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-800">
              All Categories
            </Link>
            <Link to="/cart" onClick={() => setMenuOpen(false)} className="rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-800">
              Cart ({count})
            </Link>
            <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-800">
              Wishlist ({wishlistCount})
            </Link>
            {user && user.name ? (
              <button onClick={handleLogout} className="rounded-3xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white">
                Logout
              </button>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)} className="rounded-3xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="hidden border-t border-slate-800/60 bg-slate-950/95 py-2 lg:flex">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 sm:px-6 lg:px-8">
          {categories.map((category) => (
            <Link
              key={category.slug}
              to={`/category/${category.slug}`}
              className="rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-700 hover:bg-slate-800"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


 