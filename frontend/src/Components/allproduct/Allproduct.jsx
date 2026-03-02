import React from "react";
import "./allproduct.css";
import { FaHeart } from "react-icons/fa";

export default function Allproduct({ items }) {
  return (
    <div className="product-container">
      <div className="product-grid">
        {items.map((item) => {
          const discount = Math.floor(
            ((item.oldPrice - item.price) / item.oldPrice) * 100
          );

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
                    <span className="old-price">
                      ₹ {item.oldPrice}
                    </span>
                  )}
                </div>

                {/* WOW Offer */}
                <div className="wow-tag">WOW! Bank Offer</div>

                {/* Add to Cart */}
                <button className="cart-btn">Add to Cart</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}