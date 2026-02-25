import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
const Navbar = () => {
  return (
    <nav>
      <input type="checkbox" id="menu-toggle" />
      <div className="navbar">
        <Link style={{textDecoration: 'none', color: 'black'}}>AIDEN</Link>


        <input
        type="text"
        placeholder="Search product...."
        className="search" />
        
        <div className="action">
          <Link className="cart">
            Cart🛒
          <span className="badge">0</span>
          </Link>

          <Link className="signup">
            sign up
          </Link>
        </div>
      
         <label htmlFor="menu-toggle" className="menu">
          <span></span>
          <span></span>
          <span></span>
         </label>

          
      </div>  
       <div className="nav">

      
         <Link style={{textDecoration: 'none', color: 'black'}}>Home</Link>
          <Link style={{textDecoration: 'none', color: 'black'}}>Product</Link>
            <Link style={{textDecoration: 'none', color: 'black'}}>Cart</Link>
            <Link style={{textDecoration: 'none', color: 'black'}}>Your wishlist</Link>
            <Link style={{textDecoration: 'none', color: 'black'}}>Order</Link>
            <Link style={{textDecoration: 'none', color: 'black'}}>Account</Link>
             <Link style={{textDecoration: 'none', color: 'black'}}>Sign up</Link>
            
           
              </div>
    </nav>
  )
}

export default Navbar


 