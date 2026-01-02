'use client';

import React, { useState, useEffect } from 'react';
import { 
  Map, 
  Trees, 
  AlertTriangle, 
  Wind, 
  Droplets, 
  Users, 
  CreditCard,
  Activity,
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';

// --- Types & Interfaces ---

interface Donation {
  id: number;
  name: string;
  amount: number;
  message: string;
  timestamp: Date;
}

interface ForestDataPoint {
  id: number;
  lat: number; // % dari atas untuk SVG
  lng: number; // % dari kiri untuk SVG
  status: 'critical' | 'healthy' | 'recovering';
  location: string;
  intensity: number; // skala 1-10
}

// --- Mock Data (Simulasi Database) ---

const MOCK_FOREST_DATA: ForestDataPoint[] = [
  { id: 1, lat: 20, lng: 30, status: 'critical', location: 'Aceh Besar', intensity: 8 }, 
  { id: 2, lat: 25, lng: 35, status: 'recovering', location: 'Pidie', intensity: 3 },
  { id: 3, lat: 40, lng: 45, status: 'critical', location: 'Langkat', intensity: 9 }, 
  { id: 4, lat: 45, lng: 50, status: 'healthy', location: 'Taman Nasional Leuser', intensity: 1 },
  { id: 5, lat: 60, lng: 55, status: 'critical', location: 'Perbatasan Riau', intensity: 7 },
  { id: 6, lat: 35, lng: 25, status: 'recovering', location: 'Meulaboh', intensity: 4 },
];

// --- Components ---

const Navbar = ({ activeTab, setActiveTab, isScrolled }: { activeTab: string, setActiveTab: (t: string) => void, isScrolled: boolean }) => {
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
};

const Hero = ({ setActiveTab }: { setActiveTab: (t: string) => void }) => {
  return (
    <div className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* REPLACED next/image with img for standalone preview */}
        <img 
          src="https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
          alt="Sumatra Rainforest" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
            <Activity className="w-4 h-4" />
            <span>Status Siaga: Banjir Bandang Aceh</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Pulihkan Hutan, <br/>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-300">
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
              <Map className="w-5 h-5" />
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
           {/* Abstract Map Card */}
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
};

const InteractiveMap = () => {
  const [selectedPoint, setSelectedPoint] = useState<ForestDataPoint | null>(null);

  return (
    <div className="min-h-screen pt-24 bg-slate-50 pb-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Monitoring Hutan <span className="text-emerald-600">Real-time</span></h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Menggunakan data satelit Global Forest Watch & NASA FIRMS untuk mendeteksi deforestasi dan titik api di wilayah Sumatera.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Interface */}
          <div className="lg:col-span-2 bg-slate-900 rounded-3xl overflow-hidden shadow-2xl relative h-150 border border-slate-800 group">
            
            {/* Map Controls */}
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
              <button className="bg-slate-800 p-2 rounded-lg text-white hover:bg-slate-700 border border-slate-700 hover:text-emerald-400 transition-colors"><Map size={20}/></button>
              <button className="bg-slate-800 p-2 rounded-lg text-white hover:bg-slate-700 border border-slate-700 hover:text-emerald-400 transition-colors"><Wind size={20}/></button>
              <button className="bg-slate-800 p-2 rounded-lg text-white hover:bg-slate-700 border border-slate-700 hover:text-emerald-400 transition-colors"><Droplets size={20}/></button>
            </div>

            {/* Simulated Map of Sumatra (SVG Representation) */}
            <div className="w-full h-full relative bg-[#0f172a] p-10 flex items-center justify-center overflow-hidden">
               {/* Grid Lines */}
               <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
               
               {/* Abstract Island Shape - Updated styling */}
               <svg viewBox="0 0 200 300" className="h-full w-auto drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                  <path 
                    d="M60,10 C50,20 30,50 25,80 C20,110 35,130 50,150 C65,170 80,190 90,220 C100,250 120,280 140,290 C150,280 160,250 150,220 C140,190 120,150 110,120 C100,90 90,50 80,20 Z" 
                    fill="#064e3b" 
                    stroke="#10b981" 
                    strokeWidth="1"
                    className="hover:fill-emerald-900 transition-colors duration-500 opacity-90"
                  />
                  {/* Labels */}
                  <text x="70" y="40" className="text-[8px] fill-emerald-300 opacity-60 font-sans font-bold tracking-widest">ACEH</text>
                  <text x="80" y="100" className="text-[8px] fill-emerald-300 opacity-60 font-sans font-bold tracking-widest">SUMUT</text>
                  <text x="100" y="180" className="text-[8px] fill-emerald-300 opacity-60 font-sans font-bold tracking-widest">RIAU</text>
                  <text x="115" y="240" className="text-[8px] fill-emerald-300 opacity-60 font-sans font-bold tracking-widest">SUMSEL</text>
               </svg>

               {/* Data Points */}
               {MOCK_FOREST_DATA.map((point) => (
                 <button
                    key={point.id}
                    onClick={() => setSelectedPoint(point)}
                    style={{ top: `${point.lat}%`, left: `${point.lng}%` }}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center transition-all duration-300 hover:scale-125 focus:outline-none group/point`}
                 >
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${point.status === 'critical' ? 'bg-red-500' : point.status === 'healthy' ? 'bg-emerald-500' : 'bg-yellow-500'}`}></span>
                    <span className={`relative inline-flex rounded-full h-3 w-3 shadow-lg ${point.status === 'critical' ? 'bg-red-500' : point.status === 'healthy' ? 'bg-emerald-500' : 'bg-yellow-500'} ring-2 ring-white/20`}></span>
                    
                    {/* Tooltip on hover */}
                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover/point:opacity-100 transition-opacity pointer-events-none z-20">
                      {point.location}
                    </span>
                 </button>
               ))}
            </div>

            {/* Legend */}
            <div className="absolute bottom-6 left-6 bg-slate-800/90 backdrop-blur px-4 py-3 rounded-xl border border-slate-700 text-xs text-white">
               <div className="flex items-center gap-2 mb-2"><span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span> Deforestasi Kritis</div>
               <div className="flex items-center gap-2 mb-2"><span className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]"></span> Pemulihan</div>
               <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span> Hutan Terjaga</div>
            </div>
          </div>

          {/* Sidebar Detail */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 transition-all hover:shadow-xl">
              <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-600"/> Detail Area
              </h3>
              
              {selectedPoint ? (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                      selectedPoint.status === 'critical' ? 'bg-red-100 text-red-600' : 
                      selectedPoint.status === 'healthy' ? 'bg-emerald-100 text-emerald-600' : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {selectedPoint.status}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800">{selectedPoint.location}</h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-slate-50 p-3 rounded-lg">
                        <p className="text-xs text-slate-500">Intensitas Kerusakan</p>
                        <p className="font-bold text-slate-800">{selectedPoint.intensity}/10</p>
                     </div>
                     <div className="bg-slate-50 p-3 rounded-lg">
                        <p className="text-xs text-slate-500">Luas Terdampak</p>
                        <p className="font-bold text-slate-800">450 Ha</p>
                     </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    Terdeteksi adanya penurunan tutupan pohon yang signifikan dalam 24 jam terakhir. Area ini merupakan daerah resapan air hulu sungai.
                  </p>

                  <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-medium transition-colors shadow-lg shadow-emerald-500/20">
                    Adopsi Pohon di Area Ini
                  </button>
                </div>
              ) : (
                <div className="h-48 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                  <Map className="w-8 h-8 mb-2 opacity-50"/>
                  <p className="text-sm">Pilih titik di peta untuk melihat detail</p>
                </div>
              )}
            </div>

            <div className="bg-linear-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
               <div className="absolute -right-10 -bottom-10 opacity-20 transform rotate-12">
                 <Trees size={120} />
               </div>
               <h3 className="font-bold mb-2 relative z-10">Laporan Warga</h3>
               <p className="text-sm opacity-90 mb-4 relative z-10">Unggah foto kondisi sungai atau hutan di sekitarmu.</p>
               <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur py-2 rounded-lg text-sm font-medium transition-colors border border-white/30 relative z-10">
                 + Upload Laporan Foto
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DonationSection = () => {
  const [amount, setAmount] = useState<number>(50000);
  const [donations, setDonations] = useState<Donation[]>([
    { id: 1, name: "Budi Santoso", amount: 50000, message: "Semoga Aceh cepat pulih", timestamp: new Date() },
    { id: 2, name: "Siti Aminah", amount: 100000, message: "Untuk masa depan anak cucu", timestamp: new Date() },
    { id: 3, name: "Hamba Allah", amount: 250000, message: "Sedekah bumi", timestamp: new Date() }
  ]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    const newDonation: Donation = {
      id: donations.length + 1,
      name: name || "Anonim",
      amount,
      message,
      timestamp: new Date()
    };
    setDonations([newDonation, ...donations]);
    setName("");
    setMessage("");
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Bergabung dalam <span className="text-emerald-600">Reboisasi</span></h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Setiap Rp 50.000 setara dengan 1 bibit pohon produktif yang akan ditanam dan dirawat oleh petani lokal di area kritis.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Donation Form */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 relative overflow-hidden">
             {showSuccess && (
               <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-center p-6 animate-in fade-in duration-300">
                 <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                   <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                 </div>
                 <h3 className="text-2xl font-bold text-slate-800 mb-2">Terima Kasih!</h3>
                 <p className="text-slate-600">Donasi Anda akan segera diproses untuk penghijauan.</p>
               </div>
             )}

             <div className="flex items-center gap-3 mb-6">
               <div className="bg-emerald-100 p-3 rounded-full text-emerald-600">
                 <CreditCard className="w-6 h-6"/>
               </div>
               <h3 className="text-xl font-bold text-slate-800">Formulir Donasi</h3>
             </div>

             <form onSubmit={handleDonate} className="space-y-6">
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-3">Pilih Nominal Donasi</label>
                 <div className="grid grid-cols-3 gap-3">
                   {[50000, 100000, 250000].map((val) => (
                     <button
                       type="button"
                       key={val}
                       onClick={() => setAmount(val)}
                       className={`py-3 px-4 rounded-xl text-sm font-bold border transition-all ${
                         amount === val 
                           ? 'bg-emerald-600 text-white border-emerald-600 shadow-md transform scale-105' 
                           : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-500'
                       }`}
                     >
                       Rp {val.toLocaleString('id-ID')}
                     </button>
                   ))}
                 </div>
               </div>

               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nama Donatur</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                    placeholder="Masukkan nama anda"
                  />
               </div>

               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Pesan Dukungan (Opsional)</label>
                  <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all h-24 resize-none"
                    placeholder="Tulis pesan semangat..."
                  ></textarea>
               </div>

               <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/30 transition-all transform hover:-translate-y-1">
                 Donasi Sekarang - Rp {amount.toLocaleString('id-ID')}
               </button>
               
               <p className="text-xs text-center text-slate-400 flex items-center justify-center gap-1">
                 <CheckCircle2 className="w-3 h-3"/> Pembayaran aman & transparan
               </p>
             </form>
          </div>

          {/* Recent Donations Feed */}
          <div>
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                 <Users className="w-5 h-5 text-emerald-600"/> Donatur Terbaru
               </h3>
               <span className="text-sm text-emerald-600 font-medium cursor-pointer hover:underline">Lihat Semua</span>
            </div>

            <div className="space-y-4 max-h-125 overflow-y-auto pr-2 custom-scrollbar">
              {donations.map((d, i) => (
                <div key={d.id} className={`bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4 transition-all hover:shadow-md ${i === 0 ? 'animate-fade-in' : ''}`}>
                   <div className="w-10 h-10 rounded-full bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm">
                     {d.name.charAt(0)}
                   </div>
                   <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-800">{d.name}</h4>
                        <span className="text-xs text-slate-400">Baru saja</span>
                      </div>
                      <p className="text-emerald-600 font-semibold text-sm">Mendonasikan Rp {d.amount.toLocaleString('id-ID')}</p>
                      {d.message && <p className="text-slate-500 text-sm mt-1 italic">&ldquo;{d.message}&rdquo;</p>}
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
    <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-2 mb-4 text-white">
          <Trees className="w-6 h-6" />
          <span className="text-2xl font-bold">Terra<span className="text-emerald-500">Sumatra</span></span>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-slate-400">
          Proyek manajemen lingkungan berbasis teknologi untuk memulihkan ekosistem Sumatera dan mencegah bencana hidrometeorologi.
        </p>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4">Menu</h4>
        <ul className="space-y-2 text-sm">
          <li className="hover:text-emerald-400 cursor-pointer transition-colors">Beranda</li>
          <li className="hover:text-emerald-400 cursor-pointer transition-colors">Peta Monitoring</li>
          <li className="hover:text-emerald-400 cursor-pointer transition-colors">Laporan Transparansi</li>
          <li className="hover:text-emerald-400 cursor-pointer transition-colors">Tentang Kami</li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4">Kontak</h4>
        <ul className="space-y-2 text-sm">
          <li className="hover:text-emerald-400 cursor-pointer transition-colors">info@terrasumatra.org</li>
          <li className="hover:text-emerald-400 cursor-pointer transition-colors">Banda Aceh, Indonesia</li>
          <li className="hover:text-emerald-400 cursor-pointer transition-colors">+62 812 3456 7890</li>
        </ul>
      </div>
    </div>
    <div className="container mx-auto px-6 mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
      &copy; 2025 TerraSumatra. 
    </div>
  </footer>
);

// --- Main App Component ---

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
            <InteractiveMap />
            <DonationSection />
          </div>
        )}
        {activeTab === 'map' && <div className="animate-fade-in"><InteractiveMap /></div>}
        {activeTab === 'donate' && <div className="animate-fade-in"><DonationSection /></div>}
      </main>

      <Footer />
    </div>
  );
}