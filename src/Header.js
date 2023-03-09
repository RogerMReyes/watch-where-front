import React from "react";
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './Header.css';
class Header extends React.Component {
  render() {
    return (
      <Navbar bg="secondary" variant="dark">
        <Navbar.Brand>Watch Where?</Navbar.Brand>
        <div className="links">
          <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
          <NavItem><Link to="/about" className="nav-link">About</Link></NavItem>
        </div>
      </Navbar>
    )
  }
}

export default Header;