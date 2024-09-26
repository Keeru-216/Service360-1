// src/ForgotPassword.js
import React, { useState } from 'react';
import './Login_Register.css';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending a reset link
    console.log('Sending reset link to:', email);
    setMessage(`Password reset link sent to ${email}`);
  };

  return (
    <div className="login-register-container">
      <h3 align='center' style={{ color: '#0052cc' }} ><b>Forgot Password</b></h3>
      {<p>{message}</p>}
      <form onSubmit={handleSubmit} className="login-register-form login-register-text-label">
        <div className="login-register-form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-register-submit-button">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
