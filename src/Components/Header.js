import React from "react";
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import '../css/Header.css';
// import { withAuth0 } from "@auth0/auth0-react";
// import LogoutButton from "./Logout";
// import LoginButton from "./Login";

class Header extends React.Component {
  render() {
    return (
      <Navbar bg="secondary" variant="dark">
        <Navbar.Brand>Watch Where?</Navbar.Brand>
        <div className="links">
          <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
          {/* {this.props.auth0.isAuthenticated && */
            < NavItem > <Link to="/Profile" className="nav-link">Profile</Link></NavItem>
          }
        <NavItem><Link to="/About" className="nav-link">About</Link></NavItem>
        {/* {this.props.auth0.isAuthenticated ? <LogoutButton /> : <LoginButton />} */}
      </div>
      </Navbar >
    )
  }
}

// export default withAuth0(Header);
export default Header;