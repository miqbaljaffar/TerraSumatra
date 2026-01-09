'use client';

import React, { useEffect, useState } from 'react';
import { Activity, Trees, Map as MapIcon, AlertTriangle, ArrowRight } from 'lucide-react';

interface HeroProps {
  setActiveTab: (tab: string) => void;
}

// Komponen CountUp Kecil untuk efek dinamis angka
const CountUp = ({ end, duration = 2000, suffix = "" }: { end: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function (easeOutExpo)
      const easeValue = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeValue * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

export default function Hero({ setActiveTab }: HeroProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToDonation = () => {
    setActiveTab('home');
    setTimeout(() => {
        const element = document.getElementById('donation');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
        else setActiveTab('donate');
    }, 100);
  };

  return (
    <div className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-900">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 z-0 will-change-transform"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }} // Efek Parallax
      >
        <img 
          src="https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
          alt="Sumatra Rainforest" 
          className="w-full h-[120%] object-cover opacity-50 scale-105" 
          loading="eager" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900/30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50"></div>
      </div>

      {/* Animated Blobs (Background Ambience) */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-blob mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl animate-blob animation-delay-2000 mix-blend-screen pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-fade-in-up">
          
          <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-emerald-500/30 text-emerald-300 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-md shadow-lg hover:bg-slate-800/70 transition-all cursor-default group">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="group-hover:text-white transition-colors">Status Siaga: Banjir Bandang Aceh</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight drop-shadow-lg">
            Pulihkan Hutan, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 animate-pulse-slow">
              Cegah Bencana.
            </span>
          </h1>
          
          <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
            Platform monitoring real-time dan crowdfunding pertama untuk restorasi ekosistem Sumatera. Bergabunglah dengan gerakan #JagaSumatera.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button 
              onClick={scrollToDonation}
              className="group relative px-8 py-4 bg-emerald-500 rounded-full font-bold text-lg text-white shadow-lg shadow-emerald-500/40 overflow-hidden transition-all hover:-translate-y-1 hover:shadow-emerald-500/60"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Trees className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Donasi Pohon
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button 
              onClick={() => setActiveTab('map')}
              className="group px-8 py-4 bg-white/5 border border-white/20 rounded-full font-bold text-lg text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/40 flex items-center gap-2"
            >
              <MapIcon className="w-5 h-5" />
              Lihat Peta Kritis
              <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </button>
          </div>

          <div className="flex items-center gap-8 pt-8 border-t border-white/10">
            <div className="hover:scale-105 transition-transform duration-300 cursor-default">
              <p className="text-3xl font-bold text-white"><CountUp end={25000} suffix="+" /></p>
              <p className="text-slate-400 text-sm">Pohon Ditanam</p>
            </div>
            <div className="hover:scale-105 transition-transform duration-300 cursor-default">
              <p className="text-3xl font-bold text-white"><CountUp end={120} /></p>
              <p className="text-slate-400 text-sm">Titik Dipantau</p>
            </div>
            <div className="hover:scale-105 transition-transform duration-300 cursor-default">
              <p className="text-3xl font-bold text-white">Rp <CountUp end={1.2} suffix="M" /></p>
              <p className="text-slate-400 text-sm">Dana Terkumpul</p>
            </div>
          </div>
        </div>

        {/* Visual Decoration Right Side - Floating & Glassmorphism */}
        <div className="hidden md:block relative h-full">
           <div className="absolute top-10 right-0 w-80 bg-slate-800/60 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-6 transform rotate-6 shadow-2xl animate-float z-20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white font-bold flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    Live Alert
                </h3>
                <span className="text-xs text-slate-400 font-mono">Update: 5m ago</span>
              </div>
              <div className="space-y-4">
                 {[1,2,3].map(i => (
                   <div key={i} className="group flex items-center gap-4 bg-slate-700/30 hover:bg-slate-700/50 transition-colors p-3 rounded-xl border border-slate-600/50 cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <AlertTriangle className="text-red-500 w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm group-hover:text-emerald-300 transition-colors">Titik Panas Terdeteksi</p>
                        <p className="text-slate-400 text-xs">Kawasan Hutan Lindung {i}A</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Dekorasi kartu kedua (belakang) */}
           <div className="absolute top-24 right-12 w-80 h-80 bg-gradient-to-br from-emerald-600/20 to-teal-900/20 backdrop-blur-md rounded-3xl border border-white/5 -rotate-3 animate-float-delayed z-10"></div>
        </div>
      </div>
    </div>
  );
}