import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ isAdmin = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItemClass = (path) =>
    `flex items-center px-4 py-2 rounded-md transition
     ${isActive(path)
       ? 'bg-green-800 text-white'
       : 'text-green-100 hover:bg-green-700'}`;

  return (
    <nav className="bg-gradient-to-r from-green-600 to-green-700 shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-white rounded-full p-2">
              <i className="fas fa-map text-green-600 text-xl"></i>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-white font-bold text-lg">
                Trishal Civic Map
              </h1>
              <p className="text-green-100 text-xs">
                ত্রিশাল নাগরিক ম্যাপ
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className={navItemClass('/')}>
              <i className="fas fa-home mr-2"></i>হোম
            </Link>
            <Link to="/problems" className={navItemClass('/problems')}>
              <i className="fas fa-exclamation-circle mr-2"></i>সমস্যা
            </Link>
            <Link to="/helpline" className={navItemClass('/helpline')}>
              <i className="fas fa-phone mr-2"></i>হেল্পলাইন
            </Link>
            <Link to="/statistics" className={navItemClass('/statistics')}>
              <i className="fas fa-chart-bar mr-2"></i>তথ্য
            </Link>
            {isAdmin && (
              <Link to="/admin" className={navItemClass('/admin')}>
                <i className="fas fa-shield-alt mr-2"></i>অ্যাডমিন
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white p-2 rounded-md hover:bg-green-700 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`} />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300
            ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="pb-4 space-y-2">
            <Link to="/" className={navItemClass('/')}>
              <i className="fas fa-home mr-2"></i>হোম
            </Link>
            <Link to="/problems" className={navItemClass('/problems')}>
              <i className="fas fa-exclamation-circle mr-2"></i>সমস্যা
            </Link>
            <Link to="/helpline" className={navItemClass('/helpline')}>
              <i className="fas fa-phone mr-2"></i>হেল্পলাইন
            </Link>
            <Link to="/statistics" className={navItemClass('/statistics')}>
              <i className="fas fa-chart-bar mr-2"></i>তথ্য
            </Link>
            {isAdmin && (
              <Link to="/admin" className={navItemClass('/admin')}>
                <i className="fas fa-shield-alt mr-2"></i>অ্যাডমিন
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
