// src/ResetPassword.js
import React, { useState } from 'react';
import './Login_Register.css';
import { useNavigate } from 'react-router-dom';


const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword === confirmPassword) {
      // Simulate password reset logic
      console.log('Password reset to:', newPassword);
      setMessage('Your password has been reset successfully!');
    } else {
      setMessage('Passwords do not match.');
    }
    navigate('/login');
  };

  return (
    <div className="login-register-container">
      <h3 align='center' style={{ color: '#0052cc' }} ><b>Reset Password</b></h3>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className="login-register-form login-register-text-label">
        <div className="login-register-form-group">
          <label htmlFor="new-password">New Password</label>
          <input
            type="password"
            id="new-password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="login-register-form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-register-submit-button">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
