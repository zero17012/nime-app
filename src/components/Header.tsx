import React, { useState } from 'react';
import { User, Bell, Menu } from 'lucide-react';
import SearchInput from './SearchInput';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
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
        <User className="text-neutral-300 w-5 h-5 cursor-pointer hover:text-white transition-colors" />
      </div>
    </header>
  );
};

export default Header;
