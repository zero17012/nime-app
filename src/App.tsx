import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthModal from './components/auth/AuthModal';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './pages/Home';
import AppDetailsPage from './pages/AppDetailsPage';
import AddProgramPage from './pages/AddProgramPage';

import { getAppById } from './data/mockData';

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = React.useState(false);

  React.useEffect(() => {
    if (!loading && !user) {
      setShowAuthModal(true);
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-dark flex items-center justify-center">
        <div className="text-center">
          <img src="/Content/logo.png" alt="Nime" className="h-16 mx-auto mb-4 animate-pulse" />
          <p className="text-white">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-surface-dark flex items-center justify-center">
        <AuthModal isOpen={showAuthModal} onClose={() => {}} />
      </div>
    );
  }

  return <>{children}</>;
};

const AppContent = () => {
  const location = useLocation();
  const appId = location.pathname.split('/app/')[1];
  const app = appId ? getAppById(appId) : null;

  return (
    <AuthGuard>
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
    </AuthGuard>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;