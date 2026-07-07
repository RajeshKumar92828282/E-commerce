import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaSearch, FaShoppingCart, FaHeart, FaUserCircle } from "react-icons/fa";

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
    <nav className="bg-slate-950 text-slate-100 shadow-lg shadow-slate-950/10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold uppercase tracking-[0.4em] text-white">
          <span className="text-sky-400">A</span>AIDEN
        </Link>

        <div className="hidden flex-1 lg:block">
          <form onSubmit={handleSearchSubmit} className="relative max-w-2xl">
            <input
              type="text"
              placeholder="Search for shoes, bags, gadgets..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-full border border-slate-700 bg-slate-900/90 px-4 py-3 pr-14 text-sm text-slate-100 outline-none transition focus:border-sky-500"
            />
            <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-sky-500 px-4 py-3 text-slate-950 transition hover:bg-sky-400">
              <FaSearch />
            </button>
          </form>
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <Link to="/about" className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/90 px-4 py-2 text-sm text-slate-100 transition hover:bg-slate-800">
            About
          </Link>
          <Link to="/cart" className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/90 px-4 py-2 text-sm text-slate-100 transition hover:bg-slate-800">
            <FaShoppingCart /> Cart
            <span className="rounded-full bg-sky-500 px-2 py-0.5 text-xs font-semibold text-slate-950">{count}</span>
          </Link>
          <Link to="/wishlist" className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/90 px-4 py-2 text-sm text-slate-100 transition hover:bg-slate-800">
            <FaHeart /> Wishlist
            <span className="rounded-full bg-rose-500 px-2 py-0.5 text-xs font-semibold text-slate-950">{wishlistCount}</span>
          </Link>
          {user && user.name ? (
            <div className="flex items-center gap-3 rounded-full border border-slate-700 bg-slate-900/90 px-4 py-2 text-sm text-slate-100">
              <FaUserCircle className="text-sky-400" />
              <span>Hello, {user.name.split(" ")[0]}</span>
              <button onClick={handleLogout} className="rounded-full bg-white px-3 py-2 text-slate-950 transition hover:bg-slate-100">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">
              Login
            </Link>
          )}
        </div>

        <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-100 lg:hidden">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className={`${menuOpen ? "block" : "hidden"} border-t border-slate-800 bg-slate-950/95 lg:hidden`}>
        <div className="space-y-4 px-4 py-5">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-full border border-slate-700 bg-slate-900/90 px-4 py-3 pr-14 text-sm text-slate-100 outline-none"
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-sky-500 px-3 py-2 text-slate-950">
              <FaSearch />
            </button>
          </form>

          <div className="grid gap-3">
            <Link to="/cart" onClick={() => setMenuOpen(false)} className="inline-flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-sm text-slate-100">
              <span>Cart</span>
              <span className="rounded-full bg-sky-500 px-2 py-0.5 text-xs font-semibold text-slate-950">{count}</span>
            </Link>
            <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="inline-flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-sm text-slate-100">
              <span>Wishlist</span>
              <span className="rounded-full bg-rose-500 px-2 py-0.5 text-xs font-semibold text-slate-950">{wishlistCount}</span>
            </Link>
            <Link to="/profile" onClick={() => setMenuOpen(false)} className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-sm text-slate-100">
              <FaUserCircle /> Profile
            </Link>
            {user && user.name ? (
              <button onClick={handleLogout} className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950">
                Logout
              </button>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)} className="rounded-2xl bg-sky-500 px-4 py-3 text-sm font-semibold text-slate-950">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


 