import React, { useState ,useEffect} from "react";
import "./allproduct.css";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Allproduct({ items, setcount }) {
  const [add, setadd] = useState({});
  const [error, setError] = useState(null);
  const [wishlist,setWishlist]=useState([]);
  const [wishlistIds, setWishlistIds] = useState(new Set());
  const navigate = useNavigate();

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
    let userId = localStorage.getItem("userId");
    
    // If userId not in localStorage, try to fetch it from user profile
    if (!userId) {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login first");
        return;
      }
      
      try {
        const profileRes = await fetch("http://localhost:5000/api/user/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          userId = profileData._id;
          // Save for future use
          localStorage.setItem("userId", userId);
        } else {
          setError("Unable to verify user. Please login again.");
          return;
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Please login first");
        return;
      }
    }

    const res = await fetch("http://localhost:5000/api/wishlist/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        productId: item.id,
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
    setWishlist([...wishlist, data.item]);
    
    // Update wishlistIds
    const newIds = new Set(wishlistIds);
    newIds.add(item.id);
    setWishlistIds(newIds);

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
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        
        if (!userId || !token) {
          return; // Not logged in
        }

        const res = await fetch(`http://localhost:5000/api/wishlist/${userId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        
        if (!res.ok) throw new Error("Failed to fetch wishlist");
        const data = await res.json();
        setWishlist(data);
        
        // Create a Set of productIds for quick lookup
        const ids = new Set(data.map(item => item.productId));
        setWishlistIds(ids);
      } catch (err) {
        console.error("Wishlist fetch error:", err);
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
    color: wishlistIds.has(item.id) ? "red" : "gray",
    fontSize: "24px",
    transition: "color 0.3s"
  }}
  title="Add to Wishlist"
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