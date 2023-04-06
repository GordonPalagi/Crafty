import { Link } from "react-router-dom";
import React from "react"
import { useRef, useState, useEffect } from "react";
import { register } from "../../store/authSlice";
import { messageActions } from "../../store/messageSlice";
import { useSelector, useDispatch } from "react-redux";
import "./signUpForm.css";
const SignUpForm = () => {
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(messageActions.clearMessage());
  }, [dispatch]);

  const userNameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const isBeerLoverRef = useRef();
  const isBrewerRef = useRef();

  const handleSignUp = (event) => {
    event.preventDefault();
    const username = userNameRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    const roleBrewer = isBrewerRef.current;
    const roleNormalUser = isBeerLoverRef.current;
    const role = "User";
    {
      dispatch(register({ username, password, confirmPassword, role }))
        .unwrap()
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };
  console.log(message);
  return (
    <form className="signup-login-form" onSubmit={handleSignUp}>
      <h2>Create an account:</h2>
      <p>{message}</p>
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
      <label></label>
      <input
        type="password"
        id="passwordConfirm"
        name="passwordConfirm"
        placeholder="Confirm password"
        required
        ref={confirmPasswordRef}
      />

      <button type="submit">Sign up</button>

      {successful && "Congratulations! You can login now"}
      <a>Login to your account</a>
    </form>
  );
};

export default SignUpForm;
