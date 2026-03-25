import React, { useState } from 'react'
import { Link} from 'react-router-dom'
import '../../CSS/Login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async() => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    if(res.ok){
      localStorage.setItem("token",data.token);
      localStorage.setItem("userId",data.user._id);
      localStorage.setItem("name",data.user.name);
      localStorage.setItem("email",data.user.email);
      if (data.user.phone) localStorage.setItem("phone", data.user.phone);
      if (data.user.address) localStorage.setItem("address", data.user.address);
      window.location.href="/";
    }else{
      alert(data.message);
    }
  };
  
  return (
   <div className="contaner">
    <div className="signup-container">
      <h1>Login</h1>
      <div className="input-f">
        <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogin}>Login</button>

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
      <p className="sign-text">
        Do you not have account ?  <span> <Link to='/Signup'>Sign up</Link> </span>
      </p>
    </div>
   </div>
  )
}

export default Login