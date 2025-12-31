import React, { useEffect, useRef } from "react";
import AerTrip_Logo from "../../assets/AerTrip_Logo.svg";
import "./Header.css";
import { FaFacebookF, FaGoogle, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CgClose } from "react-icons/cg";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineMail, MdOutlinePhoneInTalk } from "react-icons/md";

const Sidebar = ({ open, onClose }) => {
  const sidebarRef = useRef(null);

  // Close sidebar if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  return (
    <>
      {/* Overlay */}
      {open && <div className="sidebar-overlay" onClick={onClose}></div>}

      <aside
        ref={sidebarRef}
        className={`sidebar ${open ? "open" : ""}`}
      >
        <div className="Logo-sec">
          <img src={AerTrip_Logo} alt="Logo" className="sidebar-logo" />
        </div>

        <div className="sidebar-section"> 
          <p style={{textAlign:"justify"}}>
            <span className="Aertrip_Header">Aertrip</span> is a travel-focused company dedicated to simplifying travel planning and booking by offering innovative, user-friendly and intuitive interfaces, personalized recommendations, and transparent deals, making it the easiest way for travellers to plan and book their journeys effortlessly.
          </p>
        </div>

        <div className="sidebar-section">
          <h4>
            <IoLocationOutline size={25}/>
            Office Address</h4>
          <p>
            2nd Floor, Ch, Balraj and Sons Building, Aertrip India Limited, Kh. 385, 100 Feet Rd,  
            <br />
            Near Wellness Gym, Ghitorni, New Delhi, Delhi 110030
          </p>
        </div>

        <div className="sidebar-section">
          <h4>
            <MdOutlinePhoneInTalk size={25}/>
            Phone Number</h4>
          <p>+91 80691 88877</p>
          <p>+91 80691 88877</p>
        </div>

        <div className="sidebar-section">
          <h4>
            <MdOutlineMail size={25}/>
            Email Address
            </h4>
          <p>care@aertrip.com</p>
          <p>info@example.com</p>
        </div>

        <div className="social-icons">
          <a href="#">
            <FaFacebookF />
          </a>
          <a href="#">
            <FaXTwitter />
          </a>
          <a href="#">
            <FaGoogle />
          </a>
          <a href="#">
            <FaInstagram />
          </a>
        </div>

        {/* Close button at bottom-left */}
        <button className="close-btn" onClick={onClose}>
          <a href="#">
            <CgClose />
          </a>
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
