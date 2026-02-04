import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ isAdmin = false }) => {
  let [isMenuOpen, setIsMenuOpen] = useState(false);
  let location = useLocation();

  let isActive = (path) => location.pathname === path;

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  let navItemClass = (path) =>
    `flex items-center gap-2 px-4 py-2 rounded-md transition text-sm
     ${isActive(path)
       ? 'bg-green-800 text-white'
       : 'text-green-100 hover:bg-green-700'}`;

  return (
    <nav className="bg-gradient-to-r from-green-600 to-green-700 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-white rounded-full p-2">
              <i className="fas fa-map text-green-600 text-xl"></i>
            </div>
            <div className="hidden sm:block leading-tight">
              <h1 className="text-white font-bold text-base">
                Trishal Civic Map
              </h1>
              <p className="text-green-100 text-xs">
                ত্রিশাল নাগরিক ম্যাপ
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/" className={navItemClass('/')}>
              <i className="fas fa-home"></i>হোম
            </Link>
            <Link to="/problems" className={navItemClass('/problems')}>
              <i className="fas fa-exclamation-circle"></i>সমস্যা
            </Link>
            <Link to="/helpline" className={navItemClass('/helpline')}>
              <i className="fas fa-phone"></i>হেল্পলাইন
            </Link>
            <Link to="/statistics" className={navItemClass('/statistics')}>
              <i className="fas fa-chart-bar"></i>তথ্য
            </Link>
            {isAdmin && (
              <Link to="/admin" className={navItemClass('/admin')}>
                <i className="fas fa-shield-alt"></i>অ্যাডমিন
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2 rounded-md hover:bg-green-700"
            aria-label="Toggle menu"
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`} />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
          overflow-hidden`}
        >
          <div className="flex flex-col gap-2 pb-4 pt-2">
            <Link to="/" className={navItemClass('/')}>হোম</Link>
            <Link to="/problems" className={navItemClass('/problems')}>সমস্যা</Link>
            <Link to="/helpline" className={navItemClass('/helpline')}>হেল্পলাইন</Link>
            <Link to="/statistics" className={navItemClass('/statistics')}>তথ্য</Link>
            {isAdmin && (
              <Link to="/admin" className={navItemClass('/admin')}>
                অ্যাডমিন
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
