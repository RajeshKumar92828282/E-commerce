import React, { useEffect, useState } from "react";
import logger from "../../utils/logger";
import { FaHeartBroken, FaHeart, FaTrashAlt } from "react-icons/fa";

const Wishlist = ({ wishlist: wishlistProp = [], onRemoveItem }) => {
  const [wishlist, setWishlist] = useState(wishlistProp);
  const [loading, setLoading] = useState(!wishlistProp.length);
  const [error, setError] = useState(null);

  useEffect(() => {
    setWishlist(wishlistProp);
  }, [wishlistProp]);

  useEffect(() => {
    if (wishlistProp.length > 0) {
      setLoading(false);
      return;
    }

    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (!userId || !token) {
          setError("Please login first to view wishlist.");
          setLoading(false);
          return;
        }

        const res = await fetch(`http://localhost:5000/api/wishlist/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch wishlist");
        }

        const data = await res.json();
        setWishlist(data);
        setError(null);
      } catch (err) {
      logger.error("Error fetching wishlist:", err);
      setError(err.message || "Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [wishlistProp.length]);

  return (
    <main className="space-y-8 py-10">
      <section className="rounded-[2rem] bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-rose-500">Wishlist</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-950">Saved favorites</h1>
          </div>
          <div className="inline-flex items-center gap-3 rounded-full bg-rose-50 px-5 py-3 text-sm text-rose-700 shadow-sm">
            <FaHeart className="text-rose-500" /> {wishlist.length} items
          </div>
        </div>
      </section>

      {loading ? (
        <div className="rounded-[2rem] bg-white p-12 text-center text-slate-500 shadow-sm">Loading wishlist...</div>
      ) : error ? (
        <div className="rounded-[2rem] border border-rose-200 bg-rose-50 p-6 text-rose-700 shadow-sm">{error}</div>
      ) : wishlist.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-slate-200 bg-slate-50 p-14 text-center text-slate-600 shadow-sm">
          <p className="text-xl font-semibold">No saved items yet</p>
          <p className="mt-2 text-sm">Browse products and add favorites to come back to later.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {wishlist.map((item) => (
            <div key={item._id} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
              <img src={item.image || "https://via.placeholder.com/320x240?text=No+Image"} alt={item.title} className="h-52 w-full rounded-[1.75rem] object-cover" />
              <div className="mt-5 space-y-3">
                <h2 className="text-lg font-semibold text-slate-950 line-clamp-2">{item.title}</h2>
                <p className="text-sm text-slate-500">₹ {item.price?.toFixed(2)}</p>
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
                    <FaHeart className="text-rose-500" /> Saved
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemoveItem?.(item._id)}
                    className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-100"
                  >
                    <FaTrashAlt /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Wishlist;
