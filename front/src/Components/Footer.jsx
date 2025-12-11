import React from "react";
import { Mail, MapPin, Github, Linkedin, Twitter, Phone } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-linear-to-r mt-30 from-blue-50 via-indigo-100 text-center to-purple-100 text-gray-700 py-12  px-6 sm:px-10">
      
        © {new Date().getFullYear()} <span className="text-black font-semibold">Queryla</span>. All rights reserved.
      
     
    </footer>
  );
}

export default Footer;
