'use client';

import React, { useState } from 'react';
import { Trees, Menu, X, Book } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isScrolled: boolean;
}

export default function Navbar({ activeTab, setActiveTab, isScrolled }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Beranda' },
    { id: 'map', label: 'Monitoring Peta' },
    { id: 'encyclopedia', label: 'Ensiklopedia' },
    { id: 'stories', label: 'Cerita Sukses' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-slate-200/20 py-3 border-b border-white/20' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => setActiveTab('home')}
        >
          <div className="bg-gradient-to-br from-emerald-600 to-teal-500 p-2 rounded-xl shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
            <Trees className="w-6 h-6 text-white" />
          </div>
          <span className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${isScrolled ? 'text-slate-800' : 'text-white'}`}>
            Terra<span className="text-emerald-500">Sumatra</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center bg-slate-100/10 backdrop-blur-sm p-1.5 rounded-full border border-white/10">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                activeTab === item.id 
                  ? isScrolled ? 'text-emerald-600' : 'text-emerald-400'
                  : isScrolled ? 'text-slate-600 hover:text-emerald-600' : 'text-slate-300 hover:text-white'
              }`}
            >
              {/* Animated Active Background */}
              {activeTab === item.id && (
                <span className={`absolute inset-0 rounded-full shadow-sm -z-10 transition-all duration-300 ${
                    isScrolled ? 'bg-emerald-50' : 'bg-white/10'
                }`}></span>
              )}
              
              {item.id === 'encyclopedia' && <Book size={14} className={activeTab === 'encyclopedia' ? 'animate-bounce' : ''}/>}
              {item.label}
            </button>
          ))}
        </div>

        {/* Action Button */}
        <div className="hidden md:block">
            <button 
                onClick={() => setActiveTab('donate')}
                className="relative overflow-hidden bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/30 group"
            >
                <span className="relative z-10">Mulai Aksi</span>
                <div className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:animate-shimmer"></div>
            </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className={`transition-colors ${isScrolled ? 'text-slate-800' : 'text-white'}`}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl shadow-2xl border-t border-slate-100 transition-all duration-300 origin-top ${
        isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
      }`}>
        <div className="flex flex-col gap-2 p-6">
          {[...menuItems, { id: 'donate', label: 'Donasi Sekarang' }].map((item, idx) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setIsOpen(false); }}
              style={{ animationDelay: `${idx * 50}ms` }}
              className={`text-left font-bold py-3 px-4 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-4 fill-mode-backwards ${
                activeTab === item.id 
                    ? 'bg-emerald-50 text-emerald-600' 
                    : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {item.id === 'encyclopedia' && <Book size={18}/>}
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}