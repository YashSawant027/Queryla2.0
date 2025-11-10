import React from "react";
import { Mail, MapPin, Github, Linkedin, Twitter } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r mt-30 from-blue-50 via-indigo-100 to-purple-100 text-gray-700 pt-12 pb-6 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-black mb-3">Queryla</h2>
          <p className="text-sm text-black leading-relaxed">
            Empowering everyone to analyze databases using natural language — 
            no SQL skills required. Ask, explore, and visualize your data easily.
          </p>
        </div>

        {/* Product Links */}
        <div>
          <h3 className="text-lg font-semibold text-indigo-700 mb-3">Product</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-indigo-600 text-black transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-indigo-600 text-black transition-colors">How It Works</a></li>
            <li><a href="#" className="hover:text-indigo-600 text-black transition-colors">Pricing</a></li>
            <li><a href="#" className="hover:text-indigo-600 text-black transition-colors">FAQ</a></li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold text-indigo-700 mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-indigo-600 text-black transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-indigo-600  text-black transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-indigo-600  text-black transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-indigo-600  text-black transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold text-indigo-700 mb-3">Get in Touch</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-indigo-600" />
              <a
                href="mailto:support@dataquery.ai"
                className="hover:text-indigo-600 text-black transition-colors"
              >
                yashsawan70@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} className="text-indigo-600 " />
              <span className="text-black">India, Mumbai</span>
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-indigo-600 transition-colors">
              <Github size={18} />
            </a>
            <a href="#" className="hover:text-indigo-600 transition-colors">
              <Linkedin size={18} />
            </a>
            <a href="#" className="hover:text-indigo-600 transition-colors">
              <Twitter size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Divider & Copyright */}
      <div className="border-t border-indigo-200 mt-10 pt-5 text-center text-sm text-black">
        © {new Date().getFullYear()} <span className="text-black font-semibold">Queryla</span>. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
