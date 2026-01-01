import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import AerTrip_Logo from "../../assets/AerTrip_Logo.svg";
import Sidebar from "./Sidebar";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full z-[100] bg-white">
        <div className="mx-auto !px-[60px] !py-2 flex items-center justify-between !border-b !border-gray-500/20">
          <Link to="/" className="flex items-center justify-center gap-4">
            <img src={AerTrip_Logo} alt="Logo" className="h-[20px]" />
          </Link>
          <nav className="flex gap-[10px]">
            <button
              className="bg-none border-none cursor-pointer "
              onClick={() => setSidebarOpen(true)}
              disabled={sidebarOpen}
            >
              <RxHamburgerMenu size={20} color="#24b498" />
            </button>
            <Link to="#">
              <button className="cta_btn">
                Login/Signup
              </button>
            </Link>
          </nav>
        </div>

        <section className="relative flex justify-center h-[60px]">
          {/* Overlay background */}
          <div className="absolute top-0 left-0 w-full h-full bg-[rgba(32,221,186,0.25)] z-0"></div>
          {/* Flight search card */}
          <div className="relative z-10 w-full max-w-[1100px] h-[70px] bg-white rounded-[18px] shadow-[0_0_15px_0_rgba(0,0,0,0.08)] flex items-center px-[28px] border border-[#14b8a6] top-[27px]">
            <div className="w-full max-w-[1100px] h-[60px] rounded-[16px] flex items-center !px-[24px] gap-[24px]">
              {/* FROM */}
              <div className="flex-1 relative">
                <span className="text-[13px] text-gray-500">From</span>
                <h4 className="text-[18px] font-[500] my-1 text-[#111827]">Delhi</h4>
                <span className="absolute right-0 top-[28px] text-gray-500">DEL</span>
              </div>

              {/* SWITCH */}
              <div className="w-[30px] h-[30px] rounded-full border border-gray-200 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-gray-100">
                <HiOutlineSwitchHorizontal className="text-[18px] text-[#374151]"/>
              </div>

              {/* TO */}
              <div className="flex-1 relative">
                <span className="text-[13px] text-gray-500">To</span>
                <h4 className="text-[18px] font-[500] my-1 text-[#111827]">Mumbai</h4>
                <span className="absolute right-0 top-[28px] text-gray-500">BOM</span>
              </div>

              {/* DEPART */}
              <div className="flex-1 relative">
                <span className="text-[13px] text-gray-500">Depart</span>
                <h4 className="text-[18px] font-[500] my-1 text-[#111827]">31 December</h4>
                <span className="absolute right-12 top-[28px] text-gray-500">Wed</span>
              </div>

              {/* SEARCH */}
              <button className="cta_btn">Search</button>
            </div>
          </div>
        </section>

      </header>
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Header;
