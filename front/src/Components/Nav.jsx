import React, { useState } from "react";
import {  Menu, X } from "lucide-react"; 
import { Link } from "react-router-dom";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full mx-auto border-b border-gray-300 fixed top-0 left-0 bg-white shadow-sm z-50">
      <div className="w-full max-w-[1370px] mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center h-[9vh]">
        <h1 className="text-black font-bold text-[20px] md:text-[24px]">Queryla</h1>

        <ul className="hidden md:flex gap-6 ml-[86px] text-[16px] text-gray-700 font-medium">
          <li className="hover:text-black cursor-pointer"><Link to="/">Home</Link></li>
          <li className="hover:text-black cursor-pointer"><Link to="/contact">Contact</Link></li>
        </ul>

        <div className="flex gap-4">
          <Link to="/login" className="hidden md:block cursor-pointer  text-black border-1 text-[15px] rounded-[7px] px-4 py-2 hover:bg-gray-100 transition">
          Login
        </Link>

        <Link to="/register" className="hidden md:block cursor-pointer bg-black text-white text-[15px] rounded-[7px] px-4 py-2 hover:bg-gray-800 transition">
          Register
        </Link>
        </div>

        <button
          className="md:hidden flex items-center text-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3 bg-white pt-4 border-t border-gray-200">
          <Link
            to="/Queryla2.0"
            className="text-gray-800 text-[14px] text-center hover:text-black transition"
          >
            Home
          </Link>
          <Link
            to="/contact"
            className="text-gray-800 text-[14px] text-center hover:text-black transition"
          >
            Contact
          </Link>
          <Link to="/login" className="bg-black text-white text-center cursor-pointer text-[15px] rounded-[7px] px-4 py-2 mt-2 hover:bg-gray-800 transition">
            Login
          </Link>
          <Link to="/register" className="bg-black text-white text-center cursor-pointer text-[15px] rounded-[7px] px-4 py-2 mt-2 hover:bg-gray-800 transition">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Nav;
