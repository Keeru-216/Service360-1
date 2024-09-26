import React, { useState } from 'react';
import './Login_Register.css';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
    onLogin(); // Call the onLogin function to update the state in App
    navigate('/home'); // Navigate to home after login
  };

  return (
    <div className="login-register-container">
      <h3 align='center' style={{ color: '#0052cc' }} ><b>Login</b></h3>
      <form className="login-register-form login-register-text-label" onSubmit={handleSubmit}>
        <div className="login-register-form-group">
          <label htmlFor="email">Email or Username</label>
          <input
            type="text"
            id="email"
            placeholder="Enter your email or username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="login-register-form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-register-submit-button">Log In</button>
        <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '0.9em' }}>
          <Link to="/register">Don't have an account? Register</Link>
          <br />
          <Link to="/forgot-password">Forgot your password?</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
