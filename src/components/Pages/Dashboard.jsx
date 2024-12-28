// src/pages/HomePage.js
import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import '../../styles/tailwind.css';
import Header from '../Header';


function Dashboard() {

  const navigate = useNavigate();

  const handleDownload = () => {
    navigate('/setup');
  }

  return (
    <div className="bg-white h-[100%] w-[100%]">
      <Header handleDownload={handleDownload} />
      
     </div>
  );
}

export default Dashboard;
