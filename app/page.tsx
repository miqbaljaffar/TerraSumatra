'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Map as MapIcon, 
  Trees, 
  AlertTriangle, 
  Wind, 
  Droplets, 
  Users, 
  CreditCard,
  Activity,
  CheckCircle2,
  Menu,
  X,
  PawPrint,
  Sprout,
  CloudRain,
  ArrowRight,
  Layers,
  Maximize2
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
  // Koordinat Geografis Asli
  geoLat: number; 
  geoLng: number;
  status: 'critical' | 'healthy' | 'recovering';
  location: string;
  intensity: number; // skala 1-10
}

// --- Mock Data (Simulasi Database dengan Koordinat Asli Sumatera) ---

const MOCK_FOREST_DATA: ForestDataPoint[] = [
  { id: 1, geoLat: 5.39, geoLng: 95.58, status: 'critical', location: 'Aceh Besar', intensity: 8 }, 
  { id: 2, geoLat: 5.05, geoLng: 96.02, status: 'recovering', location: 'Pidie', intensity: 3 },
  { id: 3, geoLat: 3.75, geoLng: 98.22, status: 'critical', location: 'Langkat', intensity: 9 }, 
  { id: 4, geoLat: 3.50, geoLng: 97.50, status: 'healthy', location: 'Taman Nasional Leuser', intensity: 1 },
  { id: 5, geoLat: 0.50, geoLng: 101.45, status: 'critical', location: 'Perbatasan Riau', intensity: 7 },
  { id: 6, geoLat: 4.14, geoLng: 96.12, status: 'recovering', location: 'Meulaboh', intensity: 4 },
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
};

const EducationSection = () => {
  const facts = [
    {
      icon: <PawPrint className="w-8 h-8 text-orange-500" />,
      title: "Rumah Satwa Langka",
      desc: "Hutan Sumatera adalah satu-satunya tempat di dunia di mana Harimau, Badak, Orangutan, dan Gajah hidup berdampingan di alam liar."
    },
    {
      icon: <Wind className="w-8 h-8 text-blue-500" />,
      title: "Paru-Paru Dunia",
      desc: "Hutan hujan tropis Sumatera menyerap jutaan ton CO2 setiap tahunnya, menjadi benteng utama melawan perubahan iklim global."
    },
    {
      icon: <CloudRain className="w-8 h-8 text-teal-500" />,
      title: "Siklus Air",
      desc: "Hutan yang sehat mencegah banjir dan tanah longsor serta menjamin ketersediaan air bersih bagi jutaan masyarakat di sekitarnya."
    },
    {
      icon: <Sprout className="w-8 h-8 text-emerald-500" />,
      title: "Ekonomi Hijau",
      desc: "Pemberdayaan masyarakat lokal melalui agroforestri (kopi, kakao) mengurangi ketergantungan pada penebangan liar."
    }
  ];

  return (
    <div className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-30 translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-emerald-600 font-semibold tracking-wider uppercase text-sm">Wawasan & Edukasi</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2 mb-4">Kenapa Kita Harus Bertindak Sekarang?</h2>
          <p className="text-slate-600">
            Hutan Sumatera bukan sekadar pohon. Ini adalah sistem penyangga kehidupan yang kompleks dan tak tergantikan. Kehilangannya adalah bencana bagi kita semua.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {facts.map((fact, idx) => (
            <div key={idx} className="bg-slate-50 p-8 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-2 border border-slate-100 group">
              <div className="mb-6 bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                {fact.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{fact.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {fact.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-slate-900 rounded-3xl p-8 md:p-12 relative overflow-hidden">
           <div className="absolute inset-0 opacity-20">
              <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                 <path d="M0 100 C 20 0 50 0 100 100 Z" fill="url(#grad1)" />
                 <defs>
                   <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                     <stop offset="0%" style={{stopColor:'rgb(16, 185, 129)', stopOpacity:1}} />
                     <stop offset="100%" style={{stopColor:'rgb(20, 184, 166)', stopOpacity:1}} />
                   </linearGradient>
                 </defs>
              </svg>
           </div>
           
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="text-white">
                <h3 className="text-2xl font-bold mb-2">Tahukah Anda?</h3>
                <p className="text-slate-300 max-w-xl">
                  Satu pohon dewasa dapat menyerap hingga 22kg karbon dioksida per tahun dan menghasilkan oksigen yang cukup untuk 2 orang bernapas.
                </p>
             </div>
             <a href="#" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-full font-bold transition-all shadow-lg shadow-emerald-500/30 shrink-0">
               Baca Laporan Lengkap <ArrowRight className="w-4 h-4" />
             </a>
           </div>
        </div>
      </div>
    </div>
  );
};

const InteractiveMap = () => {
  const [selectedPoint, setSelectedPoint] = useState<ForestDataPoint | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  // FIX: Using object | null instead of any to satisfy ESLint
  const mapInstanceRef = useRef<object | null>(null);

  // Initialize Leaflet Map
  useEffect(() => {
    // Check if scripts are already loaded
    const existingScript = document.getElementById('leaflet-script');
    const existingCss = document.getElementById('leaflet-css');

    if (!existingCss) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'leaflet-script';
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.async = true;
      script.onload = () => setIsMapReady(true);
      document.body.appendChild(script);
    } else {
      // FIX: Use setTimeout to avoid synchronous state update in effect warning
      setTimeout(() => setIsMapReady(true), 0);
    }

    return () => {
      // Optional: Cleanup if needed
    };
  }, []);

  // Render Map when ready
  useEffect(() => {
    // FIX: ESLint disable next line for accessing 'window.L' without types
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (isMapReady && mapContainerRef.current && !mapInstanceRef.current && (window as any).L) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const L = (window as any).L;
      
      // Initialize map centered on Sumatra
      const map = L.map(mapContainerRef.current).setView([2.5, 99.5], 6); // Sumatra Coordinates
      mapInstanceRef.current = map;

      // Add CartoDB Dark Matter Tiles (Free & Nice looking)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      // Add Markers
      MOCK_FOREST_DATA.forEach((point) => {
        // Create custom HTML icon to keep our pulsating effect
        const colorClass = point.status === 'critical' ? 'bg-red-500' : point.status === 'healthy' ? 'bg-emerald-500' : 'bg-yellow-500';
        
        const customIcon = L.divIcon({
          className: 'custom-div-icon',
          html: `
            <div class="relative w-6 h-6 -ml-3 -mt-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${colorClass}"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 top-1.5 left-1.5 ${colorClass} shadow-lg ring-2 ring-white/20"></span>
            </div>
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        const marker = L.marker([point.geoLat, point.geoLng], { icon: customIcon }).addTo(map);
        
        // Handle Click
        marker.on('click', () => {
          setSelectedPoint(point);
          map.setView([point.geoLat, point.geoLng], 8, { animate: true });
        });
      });
    }
  }, [isMapReady]);

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
          <div className="lg:col-span-2 bg-slate-900 rounded-3xl overflow-hidden shadow-2xl relative h-[600px] border border-slate-800 group z-0">
            
            {/* Map Controls (Overlay) */}
            <div className="absolute top-4 right-4 z-[500] flex flex-col gap-2">
              <button className="bg-slate-800 p-2 rounded-lg text-white hover:bg-slate-700 border border-slate-700 hover:text-emerald-400 transition-colors shadow-lg"><Layers size={20}/></button>
              <button className="bg-slate-800 p-2 rounded-lg text-white hover:bg-slate-700 border border-slate-700 hover:text-emerald-400 transition-colors shadow-lg"><Maximize2 size={20}/></button>
            </div>

            {/* LEAFLET MAP CONTAINER */}
            <div id="map" ref={mapContainerRef} className="w-full h-full bg-[#1a1a1a]">
              {!isMapReady && (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 gap-3">
                  <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm">Memuat Peta Satelit...</p>
                </div>
              )}
            </div>

            {/* Legend */}
            <div className="absolute bottom-6 left-6 z-[500] bg-slate-900/90 backdrop-blur px-4 py-3 rounded-xl border border-slate-700 text-xs text-white shadow-xl">
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
                  <MapIcon className="w-8 h-8 mb-2 opacity-50"/>
                  <p className="text-sm">Pilih titik di peta untuk melihat detail</p>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
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

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {donations.map((d, i) => (
                <div key={d.id} className={`bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4 transition-all hover:shadow-md ${i === 0 ? 'animate-fade-in' : ''}`}>
                   <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm">
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
      &copy; 2025 TerraSumatra Project.
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
            <EducationSection />
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