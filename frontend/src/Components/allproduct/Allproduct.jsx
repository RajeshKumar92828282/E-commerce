import React, { useState } from "react";
import "./allproduct.css";
import { FaHeart } from "react-icons/fa";

export default function Allproduct({ items }) {
  const [add, setadd] = useState({});
  const [error, setError] = useState(null);

  const addtocard = async (item) => {
    try {
      setError(null);

      // Validate item
      if (!item.title || !item.price || !item.image) {
        setError("Invalid product data");
        return;
      }

      const res = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: item.title,
          price: item.price,
          image: item.image,
          quantity: 1,
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to add item: ${res.status}`);
      }

      await res.json();
      setadd((prev) => ({ ...prev, [item.id]: true }));

      // Reset button after 2 seconds
      setTimeout(() => {
        setadd((prev) => ({ ...prev, [item.id]: false }));
      }, 2000);
    } catch (err) {
      console.error("Add to cart error:", err);
      setError(err.message || "Failed to add item to cart");
    }
  };

  return (
    <div className="product-container">
      {error && (
        <div className="error-message" style={{ color: "red", padding: "10px", marginBottom: "20px" }}>
          ⚠️ {error}
        </div>
      )}

      <div className="product-grid">
        {items.map((item) => {
          const discount = item.oldPrice
            ? Math.floor(((item.oldPrice - item.price) / item.oldPrice) * 100)
            : 0;

          return (
            <div key={item.id} className="product-card">
              {/* Wishlist Icon */}
              <div className="wishlist">
                <FaHeart />
              </div>

              {/* Discount Badge */}
              {discount > 0 && (
                <div className="discount-badge">{discount}% OFF</div>
              )}

              {/* Image */}
              <div className="image-box">
                <img src={item.image} alt={item.title} />
              </div>

              {/* Info */}
              <div className="product-info">
                <h4>{item.title}</h4>

                {/* Price Section */}
                <div className="price-section">
                  <span className="new-price">₹ {item.price}</span>
                  {item.oldPrice && (
                    <span className="old-price">₹ {item.oldPrice}</span>
                  )}
                </div>

                {/* WOW Offer */}
                <div className="wow-tag">WOW! Bank Offer</div>

                {/* Add to Cart */}
                <button
                  className={`cart-btn ${add[item.id] ? "add" : ""}`}
                  onClick={() => addtocard(item)}
                >
                  {add[item.id] ? "Added ✓" : "Add to Cart"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}