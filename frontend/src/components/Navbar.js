import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ isAdmin = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-green-600 to-green-700 shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-white rounded-full p-2">
              <i className="fas fa-map text-green-600 text-xl"></i>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-white font-bold text-lg">Trishal Civic Map</h1>
              <p className="text-green-100 text-xs">ত্রিশাল নাগরিক ম্যাপ</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-md transition ${
                isActive('/') ? 'bg-green-800 text-white' : 'text-green-100 hover:bg-green-700'
              }`}
            >
              <i className="fas fa-home mr-2"></i>হোম
            </Link>
            <Link
              to="/problems"
              className={`px-4 py-2 rounded-md transition ${
                isActive('/problems') ? 'bg-green-800 text-white' : 'text-green-100 hover:bg-green-700'
              }`}
            >
              <i className="fas fa-exclamation-circle mr-2"></i>সমস্যা
            </Link>
            {/* <Link
              to="/polling-stations"
              className={`px-4 py-2 rounded-md transition ${
                isActive('/polling-stations') ? 'bg-green-800 text-white' : 'text-green-100 hover:bg-green-700'
              }`}
            >
              <i className="fas fa-voting-box mr-2"></i>ভোট কেন্দ্র
            </Link> */}
            <Link
              to="/helpline"
              className={`px-4 py-2 rounded-md transition ${
                isActive('/helpline') ? 'bg-green-800 text-white' : 'text-green-100 hover:bg-green-700'
              }`}
            >
              <i className="fas fa-phone mr-2"></i>হেল্পলাইন
            </Link>
            <Link
              to="/statistics"
              className={`px-4 py-2 rounded-md transition ${
                isActive('/statistics') ? 'bg-green-800 text-white' : 'text-green-100 hover:bg-green-700'
              }`}
            >
              <i className="fas fa-chart-bar mr-2"></i>তথ্য
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                className={`px-4 py-2 rounded-md transition ${
                  isActive('/admin') ? 'bg-green-800 text-white' : 'text-green-100 hover:bg-green-700'
                }`}
              >
                <i className="fas fa-shield-alt mr-2"></i>অ্যাডমিন
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 rounded-md hover:bg-green-700 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              to="/"
              className="block px-4 py-2 rounded-md text-green-100 hover:bg-green-700 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fas fa-home mr-2"></i>হোম
            </Link>
            <Link
              to="/problems"
              className="block px-4 py-2 rounded-md text-green-100 hover:bg-green-700 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fas fa-exclamation-circle mr-2"></i>সমস্যা
            </Link>
            {/* <Link
              to="/polling-stations"
              className="block px-4 py-2 rounded-md text-green-100 hover:bg-green-700 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fas fa-voting-box mr-2"></i>ভোট কেন্দ্র
            </Link> */}
            <Link
              to="/helpline"
              className="block px-4 py-2 rounded-md text-green-100 hover:bg-green-700 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fas fa-phone mr-2"></i>হেল্পলাইন
            </Link>
            <Link
              to="/statistics"
              className="block px-4 py-2 rounded-md text-green-100 hover:bg-green-700 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fas fa-chart-bar mr-2"></i>তথ্য
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                className="block px-4 py-2 rounded-md text-green-100 hover:bg-green-700 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-shield-alt mr-2"></i>অ্যাডমিন
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
