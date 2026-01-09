'use client';

import React, { useState, useEffect } from 'react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EducationSection from './components/EducationSection';
import InteractiveMap from './components/InteractiveMap';
import DonationSection from './components/DonationSection';
import SuccessStoriesSection from './components/SuccessStoriesSection';
import EncyclopediaSection from './components/EncyclopediaSection'; // Import baru
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans text-slate-900 bg-slate-50 min-h-screen">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} isScrolled={isScrolled} />
      
      <main>
        {activeTab === 'home' && (
          <div className="animate-fade-in">
            <Hero setActiveTab={setActiveTab} />
            <EducationSection />
            <EncyclopediaSection /> {/* Ditambahkan di Home flow juga untuk SEO */}
            <InteractiveMap />
            <SuccessStoriesSection />
            <div id="donation-section">
              <DonationSection />
            </div>
          </div>
        )}
        
        {activeTab === 'map' && (
          <div className="animate-fade-in">
            <InteractiveMap />
          </div>
        )}

        {activeTab === 'encyclopedia' && ( // Tab Baru
          <div className="animate-fade-in pt-0">
             {/* Tambahkan padding top manual atau spacer karena navbar fixed */}
             <div className="h-20 bg-slate-900"></div> 
            <EncyclopediaSection />
          </div>
        )}

        {activeTab === 'stories' && (
          <div className="animate-fade-in pt-12">
            <SuccessStoriesSection />
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