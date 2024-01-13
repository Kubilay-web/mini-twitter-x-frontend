import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import * as Yup from "yup";
import logo from "./images/twitter-logo.png";
import { loginUser } from "../../store/Auth/Action";
import "./Login.css";
import { Link } from "react-router-dom";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Geçerli bir email adresi girin")
    .required("Email zorunlu"), 
  password: Yup.string().required("Şifre zorunlu"), 
});

function Login() {
  const history = useHistory();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });



  const [formErrors, setFormErrors] = useState({});
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        const formData = {
          password,
          email,
        };
    
        validationSchema
          .validate(formData, { abortEarly: false })
          .then(() => {
            dispatch(loginUser(formData));
            history.push('/homepage'); 
          })
          .catch((validationErrors) => {
            const errors = {};
            validationErrors.inner.forEach((error) => {
              errors[error.path] = error.message;
            });
            setFormErrors(errors);
          });
      } catch (error) {
        console.error('Login Failed', error);
      }
    };


  return (
    <div className="login-main-container">
      <div className="login-container">
        <img src={logo} alt="logo" style={{ width: 50, height: 41 }} />
        <h1 className="login-header">Log in to Twitter</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <label>
            <input
              className="login-form-text"
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Phone number, email address"
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </label>
          <label>
            <input
              className="login-form-password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </label>
          {errors.general && <div className="error-message">{errors.general}</div>}
          <button className="login-form-button" type="submit">
            Log In
          </button>
        </form>
        <div className="login-options">
          <h2>Forgot Password</h2>
          <Link to="/signup"><h2>Sign up to Twitter</h2></Link>
        </div>
      </div>
    </div>
  );
}

export default Login;