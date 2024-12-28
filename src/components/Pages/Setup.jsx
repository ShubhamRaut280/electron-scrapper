// src/pages/AboutPage.js
import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

function Setup() {
  const navigate = useNavigate();

  const handleDownload = () => {  navigate('/'); };

  return (
    <div className="flex justify-start items-center bg-[#ff9950] h-[60px] w-screen">
      <div
        className="flex justify-center items-center h-full w-[100px] cursor-pointer transition-all duration-300 ease-in-out transform  hover:bg-[#e78f3d] active:bg-[#d07a2a] focus:outline-none focus:ring-2 focus:ring-[#ff9950] focus:ring-offset-2"
        onClick={handleDownload}
      >
        <FiArrowLeft className="h-8 w-auto text-white" />

      </div>
      <span className='font-sans-serif font-semibold ms-5'>Complete the setup</span>

      

    </div>
  );
}

export default Setup;
