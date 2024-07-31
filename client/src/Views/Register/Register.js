import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import './Register.css';
import axios from 'axios';

function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const userRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/register`, {
        fullName,
        email,
        password
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setFullName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        toast.error(response.data.message);
      }
    } catch (e) {
      toast.error("Failed to register. Kindly try after some time");
    }
  };

  return (
    <div className="container">
      <form className="signup-form" onSubmit={userRegister}>
        <h2>REGISTER NOW</h2>
        <div className="input-container">
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
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
        <div className="input-container">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">CREATE ACCOUNT</button>
        <p className="login-link">Already have an account? <Link to="/login">Login here</Link></p>
      </form>
      <Toaster />
    </div>
  );
}

export default Register;
