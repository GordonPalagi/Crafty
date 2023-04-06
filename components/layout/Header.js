import React from "react";
import "./header.css";
import { Link, Navigate } from "react-router-dom";
import { logout } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Crafty from "../../assets/Crafty.jpeg";
const Header = (props) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const handleout = () => {
    dispatch(logout());
  };

  return (
    <header>
      <div>
        <Link className="logo-con" to="/">
          <img className="logo" src={Crafty} />
          <span>Crafty</span>
        </Link>
      </div>
      <nav>
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>

          {isLoggedIn && (
            <Link to="/brewer-dashboard">
              <li style={{ color: "#f76d1c" }}>Brewer dashboard</li>
            </Link>
          )}
        </ul>
      </nav>
      <div className="header-buttons">
        {!isLoggedIn && (
          <Link to="/sign-up">
            <button>Sign Up</button>
          </Link>
        )}
        {!isLoggedIn && (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
        {isLoggedIn && <button onClick={handleout}>Logout</button>}
      </div>
    </header>
  );
};

export default Header;
