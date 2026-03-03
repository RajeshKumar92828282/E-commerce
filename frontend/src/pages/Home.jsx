import React from "react";
import "../CSS/Home.css";
import Allproduct from "../Components/allproduct/Allproduct";
import Product from "../assets/allproductimg/Product";

const Home = () => {
  return (
    <div className="home">

      {/* HERO SECTION */}
      <div className="hero">
        <div className="hero-left">
          <h1>Big Festive Sale 🎉</h1>
          <p>Up to 70% OFF on All Categories</p>
          <button>Shop Now</button>
        </div>
        <div className="hero-right">
          <img
            src="https://images.unsplash.com/photo-1607082349566-187342175e2f"
            alt="sale"
          />
        </div>
      </div>

      
      {/* TRENDING */}
      <div className="section">
        <h2>🔥 Trending Now</h2>
        <Allproduct items={Product.slice(0, 6)} />
      </div>

      {/* OFFER BANNER */}
      <div className="offer-banner">
        <h2>💥 Mega Electronics Deal</h2>
        <p>Flat 40% OFF</p>
      </div>

      {/* ALL PRODUCTS */}
      <div className="section">
        <h2>🛍 Explore Products</h2>
        <Allproduct items={Product} />
      </div>

    </div>
  );
};

export default Home;