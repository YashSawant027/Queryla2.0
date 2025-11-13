import React, { useState } from "react";
import { Menu, X } from "lucide-react"; 

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full mx-auto border-b border-gray-300 fixed top-0 left-0 backdrop-blur-sm z-50">
      <div className="w-full max-w-[1370px] mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center h-[9vh]">
        <h1 className="text-black font-bold text-[20px] md:text-[24px]">Queryla</h1>

        <ul className="hidden md:flex gap-6 ml-[86px] text-[16px] text-gray-700 font-medium">
          <li className="hover:text-black cursor-pointer">Home</li>
          <li className="hover:text-black cursor-pointer">Contact</li>
        </ul>

        <div className="flex gap-4">
          <button className="hidden md:block cursor-pointer  text-black border-1 text-[15px] rounded-[7px] px-4 py-2 hover:bg-gray-100 transition">
          Login
        </button>

        <button className="hidden md:block cursor-pointer bg-black text-white text-[15px] rounded-[7px] px-4 py-2 hover:bg-gray-800 transition">
          Register
        </button>
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
          <a
            href="#"
            className="text-gray-800 text-[14px] hover:text-black transition"
          >
            Home
          </a>
          <a
            href="#"
            className="text-gray-800 text-[14px] hover:text-black transition"
          >
            Contact
          </a>
          <button className="bg-black text-white cursor-pointer text-[15px] rounded-[7px] px-4 py-2 mt-2 hover:bg-gray-800 transition">
            Login
          </button>
          <button className="bg-black text-white cursor-pointer text-[15px] rounded-[7px] px-4 py-2 mt-2 hover:bg-gray-800 transition">
            Register
          </button>
        </div>
      )}
    </nav>
  );
}

export default Nav;
