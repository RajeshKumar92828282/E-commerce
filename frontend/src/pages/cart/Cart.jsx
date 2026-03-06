import React, { useEffect, useState } from "react";
import "../../CSS/cart.css";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

  // Fetch cart items
  const getcart = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("http://localhost:5000/api/cart");
      
      if (!res.ok) {
        throw new Error(`Failed to fetch cart: ${res.status} ${res.statusText}`);
      }
      
      const data = await res.json();
      setCart(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Cart fetch error:", err);
      setError(err.message || "Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getcart();
  }, []);

  // Remove item from cart
  const removeItem = async (id) => {
    try {
      setError(null);
      const res = await fetch(`http://localhost:5000/api/cart/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Failed to remove item: ${res.status}`);
      }

      setCart(cart.filter((item) => item._id !== id));
      
     
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message || "Failed to remove item");
    }
    

  };

  // Calculate total price
  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="cart-page">
      {/* ERROR MESSAGE */}
      {error && (
        <div className="error-message" style={{ color: "red", padding: "10px", marginBottom: "20px" }}>
          ⚠️ {error}
        </div>
      )}

      {/* LOADING */}
      {loading && <h2>Loading cart...</h2>}

      {/* LEFT SIDE */}
      <div className="cart-left">
        {cart.length === 0 ? (
          <h2>Your Cart is Empty</h2>
        ) : (
          cart.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.image} alt={item.title} />
              <div className="cart-info">
                <h3>{item.title}</h3>
                <p className="stock">In Stock</p>
                <p className="quantity">Qty: {item.quantity || 1}</p>
                <p className="price">₹ {item.price}</p>
                <div className="cart-actions">
                  <span>SAVE FOR LATER</span>
                  <span
                    onClick={() => removeItem(item._id)}
                    style={{ cursor: "pointer", color: "red" }}
                  >
                    REMOVE
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* RIGHT SIDE */}
      {cart.length > 0 && (
        <div className="cart-right">
          <h3>Price details</h3>
          <div className="price-row">
            <span>Price ({cart.length} items)</span>
            <span>₹ {total.toFixed(2)}</span>
          </div>

          <div className="price-row">
            <span>Delivery Charges</span>
            <span className="green">FREE</span>
          </div>

          <hr />

          <div className="price-row total">
            <span>Total Amount</span>
            <span>₹ {total.toFixed(2)}</span>
          </div>

          {/* PLACE ORDER */}
          <div className="place-order">
            <button disabled={loading || cart.length === 0}>
              {loading ? "Processing..." : "PLACE ORDER"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

