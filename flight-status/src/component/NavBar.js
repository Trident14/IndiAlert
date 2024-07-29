import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Global.css'; 

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">Home</Link>
        <Link to="/flights" className="navbar-link">Find Flight Status</Link>
      </div>
    </nav>
  );
};

export default NavBar;
