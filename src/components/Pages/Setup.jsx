// src/pages/AboutPage.js
import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function Setup() {
  const navigate = useNavigate();

  const [androidProgress, setAndroidProgress] = useState(0);
  const [appiumProgress, setAppiumProgress] = useState(0);

  const handleDownload = () => {
    navigate('/');
  };

  const startDownload = (tool) => {
    if (tool === 'android') {
      // Simulate Android Platform Tools download progress
      const interval = setInterval(() => {
        setAndroidProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prevProgress + 10;
        });
      }, 500);
    } else if (tool === 'appium') {
      // Simulate Appium Server download progress
      const interval = setInterval(() => {
        setAppiumProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prevProgress + 10;
        });
      }, 500);
    }
  };

  return (    <div>
    <div className="flex justify-start items-center bg-[#ff9950] h-[60px] w-screen">
      <div
        className="flex justify-center items-center h-full w-[100px] cursor-pointer transition-all duration-300 ease-in-out transform hover:bg-[#e78f3d] active:bg-[#d07a2a] focus:outline-none focus:ring-2 focus:ring-[#ff9950] focus:ring-offset-2"
        onClick={handleDownload}
      >
        <FiArrowLeft className="h-8 w-auto text-white" />
      </div>
      <span className="font-sans-serif font-semibold ml-5 text-white">Complete the Setup</span>
    </div>

    {/* Main Content Section */}
    <div className="bg-gray-100 min-h-screen w-full flex flex-col p-6 items-start">
    {/* <div className="bg-gray-100 min-h-screen w-full p-6 flex flex-col items-start gap-6"> */}

      {/* Download Cards Section */}
      <div className="w-full flex flex-wrap gap-6 justify-center">
        {/* Android Platform Tools Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-[300px] lg:w-[350px] h-[300px] flex flex-col justify-between">
          <h3 className="text-xl font-semibold mb-4 text-center">Android Platform Tools</h3>
          <p className="text-center text-gray-600 mb-4">
            Download the necessary platform tools for Android UI automation.
          </p>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
            <div
              className="h-full bg-[#ff9950] rounded-full"
              style={{ width: `${androidProgress}%` }}
            ></div>
          </div>

          {/* Download Button */}
          <button
            onClick={() => startDownload('android')}
            className="w-full bg-[#ff9950] text-white py-2 rounded-lg hover:bg-[#e78f3d] transition-all duration-300 ease-in-out"
            disabled={androidProgress > 0 && androidProgress < 100}
          >
            {androidProgress < 100 ? 'Download' : 'Download Complete'}
          </button>
        </div>

        {/* Appium Server Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-[300px] lg:w-[350px] h-[300px] flex flex-col justify-between">
        <h3 className="text-xl font-semibold mb-4 text-center">Appium Server</h3>
          <p className="text-center text-gray-600 mb-4">
            Download and set up the Appium server for UI automation on Android.
          </p>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
            <div
              className="h-full bg-[#ff9950] rounded-full"
              style={{ width: `${appiumProgress}%` }}
            ></div>
          </div>

          {/* Download Button */}
          <button
            onClick={() => startDownload('appium')}
            className="w-full bg-[#ff9950] text-white py-2 rounded-lg hover:bg-[#e78f3d] transition-all duration-300 ease-in-out"
            disabled={appiumProgress > 0 && appiumProgress < 100}
          >
            {appiumProgress < 100 ? 'Download' : 'Download Complete'}
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Setup;
