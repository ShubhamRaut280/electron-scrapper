// src/pages/AboutPage.js
import React from 'react';
import { Link } from 'react-router-dom';

function Setup() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="bg-green-200 p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-4">About Page</h2>
        <p className="mb-4">This is the About Page of the app.</p>
        <Link to="/" className="text-blue-600 hover:underline">Back to Home Page</Link>
      </div>
    </div>
  );
}

export default Setup;
