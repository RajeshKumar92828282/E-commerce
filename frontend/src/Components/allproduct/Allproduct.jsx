import React from "react";
import "./allproduct.css";

export default function Allproduct({ items }) {
  return (
    <div className="product-container">
      <h2>{items.length} Products</h2>

      <div className="product-grid">
        {items.map((val) => (
          <div key={val.id} className="card">
            
            <div className="image-box">
              <img src={val.image} alt={val.title} />
            </div>

            <div className="card-body">
              <h4 className="title">
                {val.title.substring(0, 40)}...
              </h4>

              <div className="rating">
                ⭐ {val.rating?.rate} ({val.rating?.count})
              </div>

              <div className="price-section">
                <span className="price">₹{val.price}</span>
                <span className="old-price">
                  ₹{(val.price * 1.5).toFixed(0)}
                </span>
              </div>

              <span className="category">{val.category}</span>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
