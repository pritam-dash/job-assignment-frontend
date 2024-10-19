
import React from 'react';
import { GoHomeFill } from "react-icons/go"; // Importing Home icon from React Icons
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/dashboard');
  };

  return (
    <div className="lg:fixed hidden lg:block left-0 h-full w-16 bg-white flex flex-col items-center pt-10 mt-[3%] border-r-2 border-gray-300">
      {/* Home Icon */}
      <button href="#home" className="text-white hover:text-gray-300 mt-5" onClick={goHome}>
        <GoHomeFill className="h-8 w-8 text-black  ml-4" />
      </button>
    </div>
  );
};

export default SideBar;
