import React, { useContext, useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "./Authprovider";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const { islogin, setislogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Close menu on route change (mobile UX fix)
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handlelogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setislogin(false);
    navigate("/login");
  };

  return (
    <nav className="w-full fixed top-0 left-0 bg-white border-gray-300  z-50">
      <div className="max-w-[1370px] mx-auto h-[9vh] px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
            <span className="text-white font-black text-xl">Q</span>
          </div>
          <h1 className="text-black font-black text-[22px] tracking-tighter">
            Queryla
          </h1>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6 text-[16px] text-gray-700 font-medium">
          <li>
            <Link to="/" className="hover:text-indigo-600 hover:font-bold">Home</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-indigo-600 hover:font-bold">Contact</Link>
          </li>
        </ul>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex gap-4">
          {islogin ? (
            <button
              onClick={handlelogout}
              className="bg-black text-white text-[15px] rounded-[7px] px-4 py-2 hover:bg-gray-800 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="border text-black text-[15px] rounded-[7px] px-4 py-2 hover:bg-gray-100 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-black text-white text-[15px] rounded-[7px] px-4 py-2 hover:bg-gray-800 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden text-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 flex flex-col gap-3">
          
          <Link
            to="/"
            className="text-center text-gray-800 hover:text-black"
          >
            Home
          </Link>

          <Link
            to="/contact"
            className="text-center text-gray-800 hover:text-black"
          >
            Contact
          </Link>

          {islogin ? (
            <button
              onClick={handlelogout}
              className="bg-black text-white rounded-[7px] px-4 py-2 mt-2 hover:bg-gray-800 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-black text-white text-center rounded-[7px] px-4 py-2 mt-2 hover:bg-gray-800 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-black text-white text-center rounded-[7px] px-4 py-2 mt-2 hover:bg-gray-800 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Nav;
