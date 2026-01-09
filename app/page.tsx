'use client';

import React, { useState, useEffect } from 'react';

// Import komponen yang sudah dimodularisasi
// Catatan: Pastikan path import sesuai dengan folder Anda
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EducationSection from './components/EducationSection';
import InteractiveMap from './components/InteractiveMap';
import DonationSection from './components/DonationSection';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  // Logic scroll di level halaman utama
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans text-slate-900 bg-slate-50 min-h-screen">
      {/* Navbar menerima state dari parent */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} isScrolled={isScrolled} />
      
      <main>
        {activeTab === 'home' && (
          <div className="animate-fade-in">
            <Hero setActiveTab={setActiveTab} />
            <EducationSection />
            <InteractiveMap />
            <DonationSection />
          </div>
        )}
        
        {/* Render kondisional yang bersih */}
        {activeTab === 'map' && (
          <div className="animate-fade-in">
            <InteractiveMap />
          </div>
        )}
        
        {activeTab === 'donate' && (
          <div className="animate-fade-in">
            <DonationSection />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}