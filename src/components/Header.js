import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VscThreeBars } from "react-icons/vsc";
import { AiOutlineClose } from 'react-icons/ai';

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setUser(null);
        navigate('/');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
    
    setDropdownOpen(false);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <header className="w-full flex justify-between items-center p-4 px-6 sm:px-10 font-semibold bg-white fixed top-0 z-50 border-b-2 border-gray-300">
      {/* Logo Section */}
      <div className="text-2xl sm:text-3xl font-bold text-blue-600">
        <img src="/logonew.png" alt="Logo" className="h-8" />
      </div>

      {/* Mobile Hamburger Menu Button */}
      <button onClick={toggleDrawer} className="block lg:hidden focus:outline-none">
        <VscThreeBars className="h-8 w-8 text-gray-700" />
      </button>

      {/* Drawer for Mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${drawerOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden z-50`}
      >
        {/* Close button inside the drawer */}
        <div className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-300">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button onClick={toggleDrawer} className="focus:outline-none">
            <AiOutlineClose className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        {/* Drawer Links */}
        <div className="p-4 space-y-6">
          <a href="#contact" className="block text-lg text-gray-800 hover:text-gray-900">Contact</a>

          {user && (
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-lg text-gray-800 hover:bg-gray-100"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Links for Desktop View */}
      <div className="hidden lg:flex items-center space-x-6">
        <a href="#contact" className="text-gray-800 hover:text-gray-900 text-lg">Contact</a>

        {user && (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center text-gray-800 hover:text-gray-900 text-lg border-2 p-2 border-gray-200 focus:outline-none"
            >
              {/* User Avatar */}
              <span className="inline-block h-8 w-8 rounded-full bg-gray-400"></span>

              {/* Username */}
              <span className="ml-2 flex items-center">
                {user.name}
                <svg
                  className="ml-2 h-4 w-4 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;