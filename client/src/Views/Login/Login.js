import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        email,
        password
      });
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem('currentUser', JSON.stringify(response.data.data));

        toast.loading('Redirecting to dashboard...');

        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      } else {
        toast.error(response.data.message);
      }
    } catch (e) {
      toast.error("Failed to login. Try again later.");
    }
  };

  return (
    <div className="container">
      <form className="login-form" onSubmit={userLogin}>
        <h2>LOGIN</h2>
        <div className="input-container">
          <input
            type="email"
            placeholder="E-mail"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">
          LOGIN
        </button>
        <p className="signup-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
      <Toaster />
    </div>
  );
}

export default Login;
