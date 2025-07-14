import React, { useState } from 'react';
import { User, Menu, LogIn } from 'lucide-react';
import SearchInput from './SearchInput';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './auth/AuthModal';
import UserProfile from './auth/UserProfile';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);

  const handleUserClick = () => {
    if (user) {
      setShowUserProfile(true);
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <>
      <header className="bg-surface h-16 flex items-center px-2 md:px-6 fixed top-0 left-0 right-0 z-20">
        <div className="flex items-center gap-5 md:ml-0">
          {/* Mobile menu button */}
          <button onClick={onMenuClick} className="md:hidden text-white">
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo (visible solo en escritorio) */}
          <img
            src="/Content/logo.png"
            alt="Nime"
            className="h-8 hidden md:block"
          />
        </div>

        <SearchInput />

        <div className="flex items-center ml-1 gap-6">
          <button
            onClick={handleUserClick}
            className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
          >
            {user ? (
              <>
                {user.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-5 h-5" />
                )}
                <span className="hidden md:block text-sm">
                  {user.user_metadata?.full_name || user.email?.split('@')[0]}
                </span>
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                <span className="hidden md:block text-sm">Iniciar Sesión</span>
              </>
            )}
          </button>
        </div>
      </header>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      <UserProfile isOpen={showUserProfile} onClose={() => setShowUserProfile(false)} />
    </>
  );
};

export default Header;
