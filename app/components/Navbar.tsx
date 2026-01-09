'use client';

import React, { useState } from 'react';
import { Trees, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isScrolled: boolean;
}

export default function Navbar({ activeTab, setActiveTab, isScrolled }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="bg-emerald-600 p-2 rounded-lg">
            <Trees className="w-6 h-6 text-white" />
          </div>
          <span className={`text-2xl font-bold tracking-tight ${isScrolled ? 'text-slate-800' : 'text-white'}`}>
            Terra<span className="text-emerald-500">Sumatra</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {['home', 'map', 'donate'].map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`capitalize font-medium transition-colors ${
                activeTab === item 
                  ? 'text-emerald-500' 
                  : isScrolled ? 'text-slate-600 hover:text-emerald-500' : 'text-slate-200 hover:text-white'
              }`}
            >
              {item === 'map' ? 'Monitoring Peta' : item === 'donate' ? 'Donasi Pohon' : 'Beranda'}
            </button>
          ))}
          <button 
            onClick={() => setActiveTab('donate')}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/30"
          >
            Mulai Aksi
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className={isScrolled ? 'text-slate-800' : 'text-white'}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-6 flex flex-col gap-4">
          {['home', 'map', 'donate'].map((item) => (
            <button
              key={item}
              onClick={() => { setActiveTab(item); setIsOpen(false); }}
              className="text-left capitalize font-medium text-slate-600 py-2 border-b border-slate-100"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}