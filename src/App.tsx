import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './pages/Home';
import AppDetailsPage from './pages/AppDetailsPage';
import AddProgramPage from './pages/AddProgramPage';

import { getAppById } from './data/mockData';

const AppContent = () => {
  const location = useLocation();
  const appId = location.pathname.split('/app/')[1];
  const app = appId ? getAppById(appId) : null;

  return (
    <div className="min-h-screen bg-surface-dark">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="ml-15 md:ml-20 mt-16 w-full p-5 pb-20 md:pb-6 page-transition">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryId" element={<Home />} />
            <Route path="/search/:query" element={<Home />} />
       
            <Route path="/app/:id" element={
              app ? <AppDetailsPage app={app} /> : <Navigate to="/" replace />
            } />
            <Route path="/add" element={<AddProgramPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;