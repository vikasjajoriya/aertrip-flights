import React, { useEffect, useRef } from "react";
import AerTrip_Logo from "../../assets/AerTrip_Logo.svg";
import { FaFacebookF, FaGoogle, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CgClose } from "react-icons/cg";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineMail, MdOutlinePhoneInTalk } from "react-icons/md";

const Sidebar = ({ open, onClose }) => {
  const sidebarRef = useRef(null);

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
      {open && <div className="fixed inset-0 w-full h-full bg-black/50 z-[100]" onClick={onClose}></div>}

      <aside
        ref={sidebarRef}
        className={`fixed top-0 -right-[450px] w-[450px] h-screen bg-white !p-6 z-[200] transition-[right] duration-400 ease-in-out overflow-y-auto rounded-l-[20px] ${open ? "right-0" : ""}`}

      >
        <div className="block relative after:content-[''] after:block after:w-full after:h-px after:bg-[#00ba9f] after:mb-6">
          <img src={AerTrip_Logo} alt="Logo" className="h-[50px] !mb-[24px]" />
        </div>

        <div className="!mb-[30px]">
          <p className="text-justify">
            <span className="text-[#00ba9f]">Aertrip</span> is a travel-focused company dedicated to simplifying travel planning and booking by offering innovative, user-friendly and intuitive interfaces, personalized recommendations, and transparent deals, making it the easiest way for travellers to plan and book their journeys effortlessly.
          </p>
        </div>

        <div className="!mb-[30px]">
          <h4 className="mb-2 text-[17px] font-semibold flex items-center gap-[0.3rem] text-[#00ba9f]">
            <IoLocationOutline size={25} />
            Office Address</h4>
          <p className="m-0 mb-[2px] leading-[26px] text-[#353844]">
            2nd Floor, Ch, Balraj and Sons Building, Aertrip India Limited, Kh. 385, 100 Feet Rd,
            <br />
            Near Wellness Gym, Ghitorni, New Delhi, Delhi 110030
          </p>
        </div>

        <div className="!mb-[30px]">
          <h4 className="mb-2 text-[17px] font-semibold flex items-center gap-[0.3rem] text-[#00ba9f]">
            <MdOutlinePhoneInTalk size={25} />
            Phone Number</h4>
          <p className="m-0 mb-[2px] leading-[26px] text-[#353844]">+91 80691 88877</p>
          <p className="m-0 mb-[2px] leading-[26px] text-[#353844]">+91 80691 88877</p>
        </div>

        <div className="!mb-[30px]">
          <h4 className="mb-2 text-[17px] font-semibold flex items-center gap-[0.3rem] text-[#00ba9f]">
            <MdOutlineMail size={25} />
            Email Address
          </h4>
          <p className="m-0 mb-[2px] leading-[26px] text-[#353844]">care@aertrip.com</p>
        </div>

        <div className="flex gap-3">
          <a href="#" className="w-9 h-9 rounded-full border border-[#00ba9f] text-[#00ba9f] flex items-center justify-center no-underline transition-all duration-200 ease-in hover:bg-[#00ba9f] hover:text-white">
            <FaFacebookF />
          </a>
          <a href="#" className="w-9 h-9 rounded-full border border-[#00ba9f] text-[#00ba9f] flex items-center justify-center no-underline transition-all duration-200 ease-in hover:bg-[#00ba9f] hover:text-white">
            <FaXTwitter />
          </a>
          <a href="#" className="w-9 h-9 rounded-full border border-[#00ba9f] text-[#00ba9f] flex items-center justify-center no-underline transition-all duration-200 ease-in hover:bg-[#00ba9f] hover:text-white">
            <FaGoogle />
          </a>
          <a href="#" className="w-9 h-9 rounded-full border border-[#00ba9f] text-[#00ba9f] flex items-center justify-center no-underline transition-all duration-200 ease-in hover:bg-[#00ba9f] hover:text-white">
            <FaInstagram />
          </a>
        </div>

        {/* Close button at bottom-left */}
        <button className="absolute top-[30px] right-[30px] bg-none border-none text-[22px] cursor-pointer" onClick={onClose}>
          <a href="#" className="w-9 h-9 rounded-full border border-[#00ba9f] text-[#00ba9f] flex items-center justify-center no-underline transition-all duration-200 ease-in hover:bg-[#00ba9f] hover:text-white">
            <CgClose />
          </a>
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
