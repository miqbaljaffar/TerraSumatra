'use client';

import React from 'react';
import { Activity, Trees, Map as MapIcon, AlertTriangle } from 'lucide-react';

interface HeroProps {
  setActiveTab: (tab: string) => void;
}

export default function Hero({ setActiveTab }: HeroProps) {
  return (
    <div className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
          alt="Sumatra Rainforest" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
            <Activity className="w-4 h-4" />
            <span>Status Siaga: Banjir Bandang Aceh</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Pulihkan Hutan, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Cegah Bencana.
            </span>
          </h1>
          
          <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
            Platform monitoring real-time dan crowdfunding pertama untuk restorasi ekosistem Sumatera. Bergabunglah dengan gerakan #JagaSumatera.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => setActiveTab('donate')}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-emerald-500/40 flex items-center justify-center gap-2"
            >
              <Trees className="w-5 h-5" />
              Donasi Pohon
            </button>
            <button 
              onClick={() => setActiveTab('map')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg transition-all backdrop-blur-sm flex items-center justify-center gap-2"
            >
              <MapIcon className="w-5 h-5" />
              Lihat Peta Kritis
            </button>
          </div>

          <div className="flex items-center gap-8 pt-8 border-t border-white/10">
            <div>
              <p className="text-3xl font-bold text-white">25K+</p>
              <p className="text-slate-400 text-sm">Pohon Ditanam</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">120</p>
              <p className="text-slate-400 text-sm">Titik Dipantau</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">Rp 1.2M</p>
              <p className="text-slate-400 text-sm">Dana Terkumpul</p>
            </div>
          </div>
        </div>

        {/* Visual Decoration Right Side */}
        <div className="hidden md:block relative">
           <div className="absolute top-0 right-0 w-80 h-96 bg-slate-800/80 backdrop-blur-md rounded-3xl border border-slate-700 p-6 transform rotate-6 shadow-2xl animate-float">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white font-bold flex items-center gap-2"><Activity className="text-red-500 w-5 h-5"/> Live Alert</h3>
                <span className="text-xs text-slate-400">Update: 5m ago</span>
              </div>
              <div className="space-y-4">
                 {[1,2,3].map(i => (
                   <div key={i} className="flex items-center gap-4 bg-slate-700/50 p-3 rounded-xl border border-slate-600">
                      <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                        <AlertTriangle className="text-red-500 w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">Titik Panas Terdeteksi</p>
                        <p className="text-slate-400 text-xs">Kawasan Hutan Lindung {i}A</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}