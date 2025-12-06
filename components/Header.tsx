import React, { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { View } from '../types';

interface HeaderProps {
    currentView?: View;
    onNavigate?: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView = 'dashboard', onNavigate = (_: View) => {} }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex flex-col md:flex-row items-center justify-between px-3 py-1 md:px-6 md:py-1 bg-[#fcfcfc] border-b-2 border-black gap-2 md:gap-0 shrink-0 relative z-50">
      <div className="flex items-center justify-between w-full md:w-auto">
        <button onClick={() => onNavigate('dashboard')} className="flex flex-col leading-none text-left hover:opacity-80 transition-opacity">
          <span className="text-lg md:text-xl font-black tracking-tighter">Pred</span>
          <span className="text-lg md:text-xl font-black tracking-tighter -mt-1">Arena <span className="text-[9px] font-normal text-blue-500 relative -top-1.5 md:-top-2">by Perd Labs</span></span>
        </button>
        <button 
          className="md:hidden text-gray-700 p-1"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
           {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-4 lg:gap-8 text-xs lg:text-sm font-bold tracking-wider">
        <button onClick={() => onNavigate('dashboard')} className={`hover:text-blue-600 flex items-center gap-1.5 ${currentView === 'dashboard' ? 'text-black' : 'text-gray-500'}`}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          LIVE
        </button>
        <span className="text-gray-300">|</span>
        <button onClick={() => onNavigate('leaderboard')} className={`hover:text-blue-600 ${currentView === 'leaderboard' ? 'text-black' : 'text-gray-500'}`}>LEADERBOARD</button>
        <span className="text-gray-300">|</span>
        <a href="#" className="hover:text-blue-600 text-gray-500">BLOG</a>
        <span className="text-gray-300">|</span>
        <a href="#" className="hover:text-blue-600 text-gray-500">MODELS</a>
      </nav>

      <div className="hidden md:flex items-center gap-4 lg:gap-6 text-[10px] lg:text-xs font-medium">
        <a href="#" className="flex items-center gap-1 hover:underline whitespace-nowrap">
          JOIN WAITLIST <ArrowUpRight size={12} />
        </a>
        <a href="#" className="flex items-center gap-1 hover:underline whitespace-nowrap">
          ABOUT PERD LABS <ArrowUpRight size={12} />
        </a>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#fcfcfc] border-b border-gray-300 shadow-xl flex flex-col p-4 md:hidden gap-4 text-sm font-bold animate-in slide-in-from-top-2 z-50">
            <button onClick={() => { onNavigate('dashboard'); setIsMenuOpen(false); }} className="hover:text-blue-600 py-2 border-b border-gray-100 flex items-center gap-2 text-left">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              LIVE
            </button>
            <button onClick={() => { onNavigate('leaderboard'); setIsMenuOpen(false); }} className="hover:text-blue-600 py-2 border-b border-gray-100 text-left">LEADERBOARD</button>
            <a href="#" className="hover:text-blue-600 py-2 border-b border-gray-100">BLOG</a>
            <a href="#" className="hover:text-blue-600 py-2 border-b border-gray-100">MODELS</a>
            <div className="flex flex-col gap-3 mt-2 text-xs text-gray-600">
                <a href="#" className="flex items-center gap-1">JOIN WAITLIST <ArrowUpRight size={12} /></a>
                <a href="#" className="flex items-center gap-1">ABOUT PERD LABS <ArrowUpRight size={12} /></a>
            </div>
        </div>
      )}
    </header>
  );
};

export default Header;