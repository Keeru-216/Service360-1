import React from 'react';
import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from '../Home_NavBar_Labels/DashBoards';
import Project from '../Home_NavBar_Labels/Projects';
import Ticket from '../Home_NavBar_Labels/Tickets';
import Boards from '../Home_NavBar_Labels/Boards';
import Plans from '../Home_NavBar_Labels/Plans';
import Assets from '../Home_NavBar_Labels/Assets';
import AdminUserIcons from './AdminUserIcons';
import './Navigationbar.css'; 

const navLinks = [
  { href: "#dashboard", label: <Dashboard /> },
  { href: "#project", label: <Project /> },
  { href: "#ticket", label: <Ticket /> },
  { href: "#boards", label: <Boards /> },
  { href: "#plans", label: <Plans /> },
  { href: "#assets", label: <Assets /> },
];

const NavigationBar = ({ onToggleSidebar }) => {
  return (
    <Navbar className="home-navbar" expand="lg" fixed="top">
      <Container fluid>
        <Navbar.Brand href="/" className="text-white">Service360</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {navLinks.map((link, index) => (
              <Nav.Link key={index} href={link.href} className='nav-link'>
                {link.label}
              </Nav.Link>
            ))}
            <Button className="home-navbar-button">Click Me</Button>
          </Nav>
          <AdminUserIcons onToggleSidebar={onToggleSidebar} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
