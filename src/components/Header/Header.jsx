import React, { useState } from "react";
import { Link } from "react-router-dom";
import AerTrip_Logo from "../../assets/AerTrip_Logo.svg";
import Sidebar from "./Sidebar";
import "./Header.css";
import { RxHamburgerMenu } from "react-icons/rx";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="main-header">
        <div className="header-container">
          {/* Logo */}
          <Link to="/" className="logo">
            <img src={AerTrip_Logo} alt="Logo" />
            {/* Hamburger */}
          </Link>

          {/* Desktop Nav */}
          <nav className="nav-desktop">
            <button
              className="hamburger-btn"
              onClick={() => setSidebarOpen(true)}
              disabled={sidebarOpen}
            >
              <RxHamburgerMenu size={30} color="#24b498" />
            </button>
            <Link to="#">
              <button className="login_signup_btn">
                Login/Signup
              </button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Header;
