import React from 'react'
import { Link} from 'react-router-dom'
import '../../CSS/Login.css'

const login = () => {
  
  return (
   <div className="contaner">
    <div className="signup-container">
      <h1>Login</h1>
      <div className="input-f">
        <input type="Email" placeholder='Email'/>
        <input type="password" placeholder='password' />
      </div>
      <button>Login</button>

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

export default login