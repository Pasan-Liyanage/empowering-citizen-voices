import React from 'react';
import './Navbar.css';
import '../../roots/Colors.css';
import Logo from '../../assests/Logo.png';
import '@fontsource/poppins';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="header">
      <div className="logo">
        <img src={Logo} alt="logo" />
        <div className="logo-container">
          <h1 className="logo-text">EMPOWERING CITIZEN VOICES</h1>
          <div className="underline"></div>
          <h2 className="sinhala-text">ප්‍රජාතන්ත්‍රවාදයේ හඬ</h2>
        </div>
      </div>
      <nav className="nav">
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/complaints">Complaints</Link></li>
          <li><Link to="/suggestions">Suggestions</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>
    </header>
  );
}
