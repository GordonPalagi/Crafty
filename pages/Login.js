import LoginForm from "../components/profile/LoginForm";
import "./login.css";
import React from "react"


const Login = () => {
  return (
<div className="login">
      <LoginForm />
      <div className="login-features" style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}>
        <h2 style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}>Sign up for a full-featured beer tracking experience!</h2>
        <ul>
          <li> <b>Track your beer!</b></li>
          <p>
            Keep notes about what you have tasted and when. You can also share your thoughts with your friends!
          </p>
          <li> <b>Remember your favorite breweries!</b></li>
          <p>
            Rate and review breweries!
          </p>
          <li><b>Stay informed!</b></li>
          <p>
            Keep up to date with news and events near you! Don't miss a fun event again!
          </p>
        </ul>
      </div>
      
    </div>
  );
};

export default Login;
