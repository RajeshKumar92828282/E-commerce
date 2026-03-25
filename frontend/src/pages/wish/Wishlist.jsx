import React, { useState, useEffect } from 'react'
import '../../CSS/Wishlist.css'
const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        
        if (!userId) {
          setError("Please login first");
          setLoading(false);
          return;
        }

        // Fetch wishlist from backend
        const res = await fetch(`http://localhost:5000/api/wishlist/${userId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
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
        console.error("Error fetching wishlist:", err);
        setError(err.message || "Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  if (loading) {
    return <div style={{ padding: "20px" }}>Loading wishlist...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Wishlist</h2>

      {error && (
        <div style={{ color: "red", padding: "10px", marginBottom: "10px" }}>
          ⚠️ {error}
        </div>
      )}

      {wishlist.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
          {wishlist.map((item) => (
            <div key={item._id} style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "5px" }}>
              <img src={item.image} width="100%" alt={item.title} style={{ marginBottom: "10px" }} />
              <p><strong>{item.title}</strong></p>
              <p style={{ color: "#27ae60", fontSize: "18px", fontWeight: "bold" }}>
                ${item.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Wishlist