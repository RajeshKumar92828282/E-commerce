import React, { useState ,useEffect} from "react";
import "./allproduct.css";
import { FaHeart } from "react-icons/fa";

export default function Allproduct({ items, setcount }) {
  const [add, setadd] = useState({});
  const [error, setError] = useState(null);
  const [wishlist,setWishlist]=useState([]);

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
  setcount(prev => prev + 1);
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
// wishlist
const addToWishlist = async (item) => {
  try {
    setError(null);

    const res = await fetch("http://localhost:5000/api/wishlist/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: "6645abc1234567890abcdef0", // replace with logged-in user’s ID
        productId: item.id,                // or ObjectId if you’re using Mongo refs
        title: item.title,
        image: item.image,
        price: item.price,
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to add to wishlist: ${res.status}`);
    }

    const data = await res.json();
    console.log("Wishlist response:", data);

    // Update local wishlist state
    setadd((prev) => ({ ...prev, [item.id]: true }));

    setTimeout(() => {
      setadd((prev) => ({ ...prev, [item.id]: false }));
    }, 2000);
  } catch (err) {
    console.error("Add to wishlist error:", err);
    setError(err.message || "Failed to add item to wishlist");
  }
};

// Load wishlist from backend
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/wishlist/6645abc1234567890abcdef0"); 
        if (!res.ok) throw new Error("Failed to fetch wishlist");
        const data = await res.json();
        setWishlist(data);
      } catch (err) {
        console.error("Wishlist fetch error:", err);
        setError(err.message);
      }
    };
    fetchWishlist();
  }, []);

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
              <div 
      className="wishlist"
  onClick={() => addToWishlist(item)}
  style={{
    cursor: "pointer",
    color: wishlist.some(w => w.id === item.id) ? "red" : "gray"
  }}
>
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