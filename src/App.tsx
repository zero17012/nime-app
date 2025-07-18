import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthModal from './components/auth/AuthModal';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import AppDetailsPage from './pages/AppDetailsPage';
import { getAppById } from './data/supabaseData';

const LoadingScreen: React.FC = () => (
  <div className="min-h-screen bg-surface-dark flex items-center justify-center">
    <div className="text-center">
      <img src="/Content/logo.png" alt="Nime" className="h-16 mx-auto mb-4 animate-pulse" />
      <div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-white">Cargando...</p>
    </div>
  </div>
);

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      setShowAuthModal(true);
    } else if (user) {
      setShowAuthModal(false);
    }
  }, [user, loading]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-surface-dark flex items-center justify-center">
        <div className="text-center mb-8">
          <img src="/Content/logo.png" alt="Nime" className="h-20 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-white mb-2">Bienvenido a Nime</h1>
          <p className="text-gray-400 mb-8">Inicia sesión para acceder a la aplicación</p>
        </div>
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => {
            // No permitir cerrar el modal si no hay usuario autenticado
            if (user) {
              setShowAuthModal(false);
            }
          }} 
        />
      </div>
    );
  }

  return <>{children}</>;
};

const AppContent = () => {
  const location = useLocation();
  const [app, setApp] = useState(null);
  const [appLoading, setAppLoading] = useState(false);

  useEffect(() => {
    const loadApp = async () => {
      const appId = location.pathname.split('/app/')[1];
      if (appId) {
        setAppLoading(true);
        try {
          const appData = await getAppById(appId);
          setApp(appData);
        } catch (error) {
          console.error('Error loading app:', error);
          setApp(null);
        } finally {
          setAppLoading(false);
        }
      } else {
        setApp(null);
      }
    };

    loadApp();
  }, [location.pathname]);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-surface-dark">
        <Sidebar />
        
        <main className="ml-15 md:ml-20 mt-16 w-full p-5 pb-20 md:pb-6 page-transition">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryId" element={<Home />} />
            <Route path="/search/:query" element={<Home />} />
       
            <Route path="/app/:id" element={
              appLoading ? (
                <div className="flex items-center justify-center min-h-[400px]">
                  <div className="text-center">
                    <div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-white">Cargando aplicación...</p>
                  </div>
                </div>
              ) : app ? (
                <AppDetailsPage app={app} />
              ) : (
                <Navigate to="/" replace />
              )
            } />
          </Routes>
        </main>
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