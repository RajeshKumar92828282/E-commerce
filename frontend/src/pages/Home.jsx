import React from "react";
import { useState,useEffect,useRef } from "react";
import "../CSS/Home.css";
import Allproduct from "../Components/allproduct/Allproduct";
import Product from "../assets/allproductimg/Product";
const banners = [
  {
    img: "https://rukminim2.flixcart.com/fk-p-flap/3160/1540/image/d67861d0ed1caa10.png?q=60",
  },
  {
    img: "https://rukminim2.flixcart.com/fk-p-flap/3160/1540/image/2cae96839abb3b0c.png?q=60",
  },
  {
    img: "https://rukminim2.flixcart.com/fk-p-flap/3160/1540/image/144c40069694017d.jpg?q=60",
  },
  {
    img: "https://rukminim2.flixcart.com/fk-p-flap/460/224/image/8c74683de2443df3.jpg?q=80",
  },
  {
    img: "https://rukminim2.flixcart.com/fk-p-flap/3160/1540/image/186b00eb949245ca.png?q=60",
  },
 
 
];
const Home = () => {
   const sliderRef = useRef();

 const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [index, setIndex] = useState(0);

   useEffect(() => {
    const interval = setInterval(() => {

      if (!isDown && sliderRef.current) {

        sliderRef.current.scrollLeft += 400;

        setIndex((prev) => (prev + 1) % banners.length);

      }

    }, 3000);

    return () => clearInterval(interval);

  }, [isDown]);


/* DRAG EVENTS */
const handleMouseDown = (e) => {

    if (e.button !== 0) return; // only left click

    setIsDown(true);

    setStartX(e.pageX - sliderRef.current.offsetLeft);

    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e) => {

    if (!isDown) return;

    e.preventDefault();

    const x = e.pageX - sliderRef.current.offsetLeft;

    const walk = (x - startX) * 2;

    sliderRef.current.scrollLeft = scrollLeft - walk;

  };
  
  

  return (
    <div className="home">

      {/* HERO SECTION */}
   <div
  className="banner-container"
  ref={sliderRef}
        onContextMenu={(e) => e.preventDefault()}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
>

 
        <div className="banner-slider">

          {banners.map((item, i) => (

            <div className="banner-card" key={i}>

              <img src={item.img} alt="banner" />

            </div>

          ))}

        </div>

      </div>

      {/* DOTS */}

      <div className="dots">

        {banners.map((_, i) => (

          <span
            key={i}
            className={index === i ? "dot active" : "dot"}
          ></span>

        ))}

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