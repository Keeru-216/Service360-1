// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './Components/Home_Index/Home_Navbar/NavBar';
import LoginPage from './Components/Login_Register/LoginPage';
import RegisterPage from './Components/Login_Register/RegistrationPage'; 
import ResetPassword from './Components/Login_Register/ResetPassword';
import ForgotPassword from './Components/Login_Register/ForgotPassword';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import WebIndex from './Components/Web_Index/WebIndex';
import SideBar from './Components/SideBar/SideBar';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState('Dashboard'); // Default active component

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <Router>
      <div className="main-content">
        {!isLoggedIn && <WebIndex />}
        
        {isLoggedIn && (
          <div className="d-flex">
            {isSidebarOpen && (
              <SideBar activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
            )}
            <div className="flex-grow-1">
              <NavigationBar onToggleSidebar={toggleSidebar} />
              <main className="container mt-4"> 
                <Routes>
                  <Route path="/" element={<WebIndex />} /> 
                  <Route path="/home" element={<h1></h1>} />
                  {/* Add more routes for the sidebar components here */}
                </Routes>
              </main>
            </div>
          </div>
        )}
        
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
        
        
      </div>
    </Router>
  );
};

export default App;
