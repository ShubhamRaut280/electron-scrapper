import { useState } from 'react';
import './styles/tailwind.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Pages/Dashboard';
import Setup from './components/Pages/Setup';
import Header from './components/Header';

function App() {
  const handleDownload = () => {

  };

  return (
    <div className='bg-white h-screen w-screen'>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/setup" element={<Setup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;