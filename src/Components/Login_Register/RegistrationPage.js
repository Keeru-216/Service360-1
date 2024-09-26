import React, { useState } from 'react';
import './Login_Register.css';
import { useNavigate,Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';


const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registering:', { firstName, lastName, email, password });
    navigate('/login'); // Redirect to the login page after registration
  };

  return (
    <>
      <div className="login-register-container">
      <h3 align='center' style={{ color: '#0052cc' }} ><b>Create Account</b></h3>
        <form className="login-register-form login-register-text-label" onSubmit={handleSubmit}>
          <div className="login-register-form-group ">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="login-register-form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
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
          <div className="login-register-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-register-submit-button">Register</button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '0.9em' }}>
          <Link to="/login">Already have an account? Log In</Link>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
