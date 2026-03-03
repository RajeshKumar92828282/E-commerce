import React from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { useState } from 'react';
import './Navbar.css'
const Navbar = () => {
const navigate=useNavigate();
const name=localStorage.getItem("name");
const [user,setUser]=useState(name);

const handleLogout=()=>{
  localStorage.removeItem("token");
  localStorage.removeItem("name");
  localStorage.removeItem("email");
  localStorage.removeItem("phone");
  localStorage.removeItem("address");
  setUser(null);
  navigate("/login");
}

  return (
    <nav>
      <input type="checkbox" id="menu-toggle" />
      <div className="navbar">
        <Link to='/' style={{textDecoration: 'none', color: 'black'}}>AIDEN</Link>


        <input
        type="text"
        placeholder="Search product...."
        className="search" />
        
        <div className="action">
          <Link to='/cart' className="cart">
            Cart🛒
          <span className="badge">0</span>
          </Link>

         {user ? (
  <div className="user-box">
    <span className="username">Hello, {user}</span>
    {/* <button className="logout-btn" onClick={handleLogout}>
      Logout
    </button> */}
  </div>
) : (
  <Link to="/login" className="signup">
    Login
  </Link>
)}
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
            <Link to='/cart' style={{textDecoration: 'none', color: 'black'}}>Cart</Link>
            <Link style={{textDecoration: 'none', color: 'black'}}>Your wishlist</Link>
            <Link style={{textDecoration: 'none', color: 'black'}}>Order</Link>
            <Link to='/profile' style={{textDecoration: 'none', color: 'black'}}>Your profile</Link>
             <Link to='/Login' style={{textDecoration: 'none', color: 'black'}}>Sign up</Link>
            
           
              </div>
    </nav>
  )
}

export default Navbar


 