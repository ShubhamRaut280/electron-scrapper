import React from 'react';
import { FiDownload } from 'react-icons/fi';
import '../styles/tailwind.css'

function Header({ handleDownload }) {
  return (
    <div className="flex justify-end items-center bg-[#ff9950] h-[60px] w-screen">
      <div
        className="flex justify-center items-center h-full w-[200px] cursor-pointer transition-all duration-300 ease-in-out transform  hover:bg-[#e78f3d] active:bg-[#d07a2a] focus:outline-none focus:ring-2 focus:ring-[#ff9950] focus:ring-offset-2"
        onClick={handleDownload}
      >
        <FiDownload className="h-8 w-auto text-white" />
         <span className="ml-2 text-white text-sm">Setup</span>
        
      </div>
    </div>
  );
}

export default Header;