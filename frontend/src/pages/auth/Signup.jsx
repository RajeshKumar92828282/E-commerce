import React, { useState,} from "react"
import { Link } from "react-router-dom";
import '../../CSS/Signup.css'

const Signup = () => {
    const [form,setForm]=useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    });
    const [error,setEror] =useState("");
    const handleChange =(e)=>{
      setForm({...form,[e.target.name]: e.target.value})
    };
    const handleSubmit = async(e)=>{
       e.preventDefault();
       if(!form.email.includes("@")){
        return setEror("invalid email");
       }
       if(form.password!==form.confirmPassword){
        return setEror("password do not match");
       }
       setEror("");
       
       try {
         const res = await fetch("http://localhost:5000/api/auth/signup",{
           method:"POST",
           headers:{
             "Content-Type":"application/json",
           },
           body:JSON.stringify({
             name:form.name,
             email:form.email,
             password:form.password,
           }),
         });
         const data = await res.json();
         if(res.ok){
           alert("signup successful"); 
         }else{
           setEror(data.message || "Signup failed");
         }
       } catch {
         setEror("An error occurred. Please try again.");
       }
    };
  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>

        <div className="divider">OR</div>

        <button className="google-btn">
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="google"
          />
          Continue with Google
        </button>

        <button className="facebook-btn">
          Continue with Facebook
        </button>

        <p className="bottom-text">
          Already have an account? <span><Link to='/Login'>Login</Link></span>
        </p>
      </div>
    </div>
  )
};

export default Signup
