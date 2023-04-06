import "./loginForm.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { baseUrl } from "../../shared/base-url";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { messageActions } from "../../store/messageSlice";
import { login } from "../../store/authSlice";
import { Navigate } from "react-router-dom";

const LoginForm = (props) => {
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const userNameRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    dispatch(messageActions.clearMessage());
  }, [dispatch]);

  const handleLogin = (event) => {
    event.preventDefault();
    const username = userNameRef.current.value;
    const password = passwordRef.current.value;

    dispatch(login({ username, password }))
      .unwrap()
      .then(() => {
        console.log(message);
        props.history.push("/");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <form className="signup-login-form" onSubmit={handleLogin}>
      <h2>Please enter your login information:</h2>
      {message}

      <label></label>
      <input
        type="text"
        id="username"
        name="username"
        required
        placeholder="Username"
        ref={userNameRef}
      />
      <label></label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        required
        ref={passwordRef}
      />
      <button type="submit">Sign in</button>
      <a>Open a new account</a>
    </form>
  );
};

export default LoginForm;
