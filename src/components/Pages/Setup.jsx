import React, { useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';  

function Setup() {
  const navigate = useNavigate();

  const [androidProgress, setAndroidProgress] = useState(0);
  const [appiumProgress, setAppiumProgress] = useState(0);
  const [androidMsg, setAndroidMsg] = useState('');
  const [appiumMsg, setAppiumMsg] = useState('');

  useEffect(() => {
    const handleProgress = (event, progress) => {
      setAndroidProgress(progress);
    };

    const handleComplete = (event, msg) => {
      setAndroidMsg(msg);
      if (msg === 'Download Complete') {
        setAndroidProgress(100);
      }
    };

    window.ipcRender.on('download-progress', handleProgress);
    window.ipcRender.on('download-complete', handleComplete);

    return () => {
      window.ipcRender.removeAllListeners('download-progress');
      window.ipcRender.removeAllListeners('download-complete');
    };
  }, []);

  const downloadAndroidPlatformTools = async () => {
    try {
      const response = await window.ipcRender.invoke('download-platform-tools', { tool: 'android' });
      console.log(response); // Should log 'Download Complete' if successful
    } catch (error) {
      console.error('Error downloading Android Platform Tools:', error);
      setAndroidMsg(`Download Failed: ${error.message}`);
    }
  };
  
  const handleBack = () => {
    navigate('/');
  };

  const startDownload = (tool) => {
    if (tool === 'android') {
      downloadAndroidPlatformTools();
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

  return (
    <div>
      <div className="flex justify-start items-center bg-[#ff9950] h-[60px] w-screen">
        <div
          className="flex justify-center items-center h-full w-[100px] cursor-pointer transition-all duration-300 ease-in-out transform hover:bg-[#e78f3d] active:bg-[#d07a2a] focus:outline-none focus:ring-2 focus:ring-[#ff9950] focus:ring-offset-2"
          onClick={handleBack}
        >
          <FiArrowLeft className="h-8 w-auto text-white" />
        </div>
        <span className="font-sans-serif font-semibold ml-5 text-white">Complete the Setup</span>
      </div>

      <div className="bg-gray-100 min-h-screen w-full flex flex-col p-6 items-start">
        <div className="w-full flex flex-wrap gap-6 justify-center">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-[300px] lg:w-[350px] h-[300px] flex flex-col justify-between">
            <h3 className="text-xl font-semibold mb-4 text-center">Android Platform Tools</h3>
            <p className="text-center text-gray-600 mb-4">
              Download the necessary platform tools for Android UI automation.
            </p>

            <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
              <div
                className="h-full bg-[#ff9950] rounded-full"
                style={{ width: `${androidProgress}%` }}
              ></div>
            </div>

            <p className="text-center text-gray-600 mb-4">
              {androidMsg || ''}
            </p>

            <button
              onClick={() => startDownload('android')}
              className="w-full bg-[#ff9950] text-white py-2 rounded-lg hover:bg-[#e78f3d] transition-all duration-300 ease-in-out"
              disabled={androidProgress > 0 && androidProgress < 100}
            >
              {androidProgress < 100 ? 'Download' : 'Download Complete'}
            </button>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-[300px] lg:w-[350px] h-[300px] flex flex-col justify-between">
            <h3 className="text-xl font-semibold mb-4 text-center">Appium Server</h3>
            <p className="text-center text-gray-600 mb-4">
              Download and set up the Appium server for UI automation on Android.
            </p>

            <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
              <div
                className="h-full bg-[#ff9950] rounded-full"
                style={{ width: `${appiumProgress}%` }}
              ></div>
            </div>

            <p className="text-center text-gray-600 mb-4">
              {appiumMsg || ''}
            </p>

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