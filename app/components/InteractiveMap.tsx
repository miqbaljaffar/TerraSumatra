'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Layers, Activity, Map as MapIcon, Flame, MapPin, Play, Pause, RotateCcw, Calendar } from 'lucide-react';
import { ForestDataPoint, MOCK_FOREST_DATA, MOCK_TIMELINE_DATA } from '../lib/definitions';

// --- Type Definitions untuk Leaflet (Global augmentation) ---
interface LeafletMap {
  setView: (center: [number, number], zoom: number, options?: { animate: boolean }) => LeafletMap;
  removeLayer: (layer: LeafletLayer) => void;
  addLayer: (layer: LeafletLayer) => void;
  remove: () => void; // Penting untuk cleanup
}

interface LeafletLayer {
  addTo: (map: LeafletMap) => LeafletLayer;
  remove: () => void;
  on?: (event: string, fn: () => void) => void;
  setLatLngs?: (data: [number, number, number][]) => void;
}

interface LeafletIcon {
  options: Record<string, unknown>;
}

interface LeafletStatic {
  map: (element: HTMLElement | string) => LeafletMap;
  tileLayer: (url: string, options?: Record<string, unknown>) => LeafletLayer;
  divIcon: (options: Record<string, unknown>) => LeafletIcon;
  marker: (latlng: [number, number], options?: { icon: LeafletIcon }) => LeafletLayer;
  heatLayer?: (data: [number, number, number][], options: Record<string, unknown>) => LeafletLayer;
}

declare global {
  interface Window {
    L?: LeafletStatic;
  }
}

const YEARS = [2015, 2018, 2021, 2024, 2025];

export default function InteractiveMap() {
  const [selectedPoint, setSelectedPoint] = useState<ForestDataPoint | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [mapType, setMapType] = useState<'street' | 'satellite'>('street');
  const [showHeatmap, setShowHeatmap] = useState(true);
  
  // Timeline States
  const [currentYear, setCurrentYear] = useState(2025);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Refs untuk menyimpan instance agar tidak hilang saat re-render
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);
  const tileLayerRef = useRef<LeafletLayer | null>(null);
  const heatLayerRef = useRef<LeafletLayer | null>(null);

  // 1. Script Loading (Best Practice: Load only once)
  useEffect(() => {
    const loadLeaflet = async () => {
      if (typeof window === 'undefined') return;

      // Cek apakah CSS sudah ada
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      // Cek apakah Script JS sudah ada
      if (!window.L) {
        await new Promise<void>((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          script.async = true;
          script.onload = () => resolve();
          document.body.appendChild(script);
        });
      }
      
      // Load Heatmap plugin
      if (window.L && !window.L.heatLayer) {
        await new Promise<void>((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://leaflet.github.io/Leaflet.heat/dist/leaflet-heat.js';
          script.async = true;
          script.onload = () => resolve();
          document.body.appendChild(script);
        });
      }
      
      setIsMapReady(true);
    };

    loadLeaflet();
  }, []);

  // 2. Map Initialization & Cleanup (Best Practice: Prevent Memory Leaks)
  useEffect(() => {
    if (!isMapReady || !mapContainerRef.current || mapInstanceRef.current) return;

    const L = window.L;
    if (!L) return;

    // Inisialisasi Map
    const map = L.map(mapContainerRef.current).setView([2.5, 99.5], 6);
    mapInstanceRef.current = map;

    // Layer Dasar
    const streetLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; CARTO'
    });
    streetLayer.addTo(map);
    tileLayerRef.current = streetLayer;

    // Marker Data Hutan
    MOCK_FOREST_DATA.forEach((point) => {
      const colorClass = point.status === 'critical' ? 'bg-red-500' : point.status === 'healthy' ? 'bg-emerald-500' : 'bg-yellow-500';
      
      const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `
          <div class="relative w-6 h-6 -ml-3 -mt-3 group cursor-pointer">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${colorClass}"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 top-1.5 left-1.5 ${colorClass} shadow-lg ring-2 ring-white/20 transition-transform group-hover:scale-125"></span>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      } as Record<string, unknown>);

      const marker = L.marker([point.geoLat, point.geoLng], { icon: customIcon }).addTo(map);
      if (marker.on) {
        marker.on('click', () => {
          setSelectedPoint(point);
          map.setView([point.geoLat, point.geoLng], 9, { animate: true });
        });
      }
    });

    // Heatmap Awal
    if (L.heatLayer) {
      const heat = L.heatLayer(MOCK_TIMELINE_DATA[currentYear], {
        radius: 25,
        blur: 15,
        maxZoom: 10,
        gradient: { 0.4: 'blue', 0.6: 'lime', 0.8: 'yellow', 1: 'red' }
      }).addTo(map);
      heatLayerRef.current = heat;
    }

    // Cleanup Function: Hapus map saat komponen di-unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMapReady]); // Hanya jalankan saat map ready

  // 3. Handle Map Type Change
  useEffect(() => {
    if (!mapInstanceRef.current || !window.L) return;
    
    const map = mapInstanceRef.current;
    if (tileLayerRef.current) map.removeLayer(tileLayerRef.current);

    const newUrl = mapType === 'satellite' 
      ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
    
    const newLayer = window.L.tileLayer(newUrl, {
      attribution: mapType === 'satellite' ? 'Esri &copy; DigitalGlobe' : '&copy; CARTO'
    });
    newLayer.addTo(map);
    tileLayerRef.current = newLayer;
  }, [mapType]);

  // 4. Handle Timeline & Heatmap Updates
  useEffect(() => {
    if (!mapInstanceRef.current || !window.L || !window.L.heatLayer) return;

    // Remove existing heatmap layer first (safer approach than setLatLngs for some versions)
    if (heatLayerRef.current) {
      mapInstanceRef.current.removeLayer(heatLayerRef.current);
    }

    if (showHeatmap) {
      const heatData = MOCK_TIMELINE_DATA[currentYear] || [];
      const newHeat = window.L.heatLayer(heatData, {
          radius: 25,
          blur: 15,
          maxZoom: 10,
          gradient: { 0.4: 'blue', 0.6: 'lime', 0.8: 'yellow', 1: 'red' }
      }).addTo(mapInstanceRef.current);
      heatLayerRef.current = newHeat;
    }
  }, [currentYear, showHeatmap]);

  // 5. Playback Logic
  useEffect(() => {
    if (isPlaying) {
      playIntervalRef.current = setInterval(() => {
        setCurrentYear((prev) => {
          const currentIndex = YEARS.indexOf(prev);
          if (currentIndex === YEARS.length - 1) return YEARS[0];
          return YEARS[currentIndex + 1];
        });
      }, 1500);
    } else {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    }
    return () => { if (playIntervalRef.current) clearInterval(playIntervalRef.current); };
  }, [isPlaying]);

  return (
    <div className="min-h-screen pt-24 bg-slate-50 pb-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Monitoring Hutan <span className="text-emerald-600">Real-time</span></h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Gunakan kontrol timeline untuk membandingkan laju deforestasi dari tahun ke tahun dan deteksi dini area kritis.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {/* Map Interface */}
            <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl relative h-[600px] border border-slate-800 group z-0">
              
              {/* Controls UI */}
              <div className="absolute top-4 left-4 z-[500] flex flex-col gap-3">
                <div className="bg-slate-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700 shadow-2xl">
                  <div className="flex flex-col gap-1">
                    <button 
                      onClick={() => setMapType('street')}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all ${mapType === 'street' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                    >
                      <MapIcon size={16}/> Street
                    </button>
                    <button 
                      onClick={() => setMapType('satellite')}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all ${mapType === 'satellite' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                    >
                      <Layers size={16}/> Satellite
                    </button>
                  </div>
                </div>

                <div className="bg-slate-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700 shadow-2xl">
                  <button 
                    onClick={() => setShowHeatmap(!showHeatmap)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all w-full ${showHeatmap ? 'bg-orange-500 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                  >
                    <Flame size={16}/> {showHeatmap ? 'Sembunyikan Hotspots' : 'Tampilkan Hotspots'}
                  </button>
                </div>
              </div>

              <div id="map" ref={mapContainerRef} className="w-full h-full bg-[#1a1a1a]">
                {!isMapReady && (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 gap-3">
                    <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm">Inisialisasi Sistem Geospasial...</p>
                  </div>
                )}
              </div>

              {/* Year Badge Overlay */}
              <div className="absolute top-4 right-4 z-[500] bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold shadow-xl border border-emerald-400/30 flex items-center gap-2">
                <Calendar size={18} />
                Tahun {currentYear}
              </div>

              {/* Legend */}
              <div className="absolute bottom-6 left-6 z-[500] bg-slate-900/90 backdrop-blur px-4 py-4 rounded-2xl border border-slate-700 text-xs text-white shadow-xl min-w-[180px]">
                 <p className="font-bold mb-3 text-slate-400 uppercase tracking-widest text-[10px]">Indikator Status</p>
                 <div className="space-y-2.5">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span> 
                      <span>Deforestasi Kritis</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full bg-emerald-500"></span> 
                      <span>Hutan Primer</span>
                    </div>
                    {showHeatmap && (
                      <div className="pt-2 mt-2 border-t border-slate-700">
                        <p className="text-[10px] text-orange-400 font-bold mb-2 uppercase">Laju Kehilangan Tutupan</p>
                        <div className="h-2 w-full bg-gradient-to-r from-blue-500 via-lime-500 to-red-500 rounded-full"></div>
                        <div className="flex justify-between mt-1 text-[9px] text-slate-500">
                          <span>Minimum</span>
                          <span>Maksimum</span>
                        </div>
                      </div>
                    )}
                 </div>
              </div>
            </div>

            {/* Timeline Slider Control */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isPlaying ? 'bg-orange-100 text-orange-600 ring-2 ring-orange-200' : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'}`}
                  >
                    {isPlaying ? <Pause fill="currentColor" size={20} /> : <Play fill="currentColor" className="ml-1" size={20} />}
                  </button>
                  <button 
                    onClick={() => {setCurrentYear(YEARS[0]); setIsPlaying(false);}}
                    className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200"
                  >
                    <RotateCcw size={20} />
                  </button>
                </div>

                <div className="flex-1 w-full space-y-4">
                  <div className="relative h-2 bg-slate-100 rounded-full">
                    <input 
                      type="range"
                      min={YEARS[0]}
                      max={YEARS[YEARS.length - 1]}
                      step={1}
                      value={currentYear}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        // Snap logic untuk memastikan value selalu ada di array YEARS
                        const closest = YEARS.reduce((prev, curr) => Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev);
                        setCurrentYear(closest);
                        setIsPlaying(false);
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div 
                      className="absolute h-full bg-emerald-500 rounded-full transition-all duration-300"
                      style={{ width: `${((currentYear - YEARS[0]) / (YEARS[YEARS.length - 1] - YEARS[0])) * 100}%` }}
                    ></div>
                    <div 
                      className="absolute w-6 h-6 bg-white border-4 border-emerald-500 rounded-full top-1/2 -translate-y-1/2 shadow-lg transition-all duration-300"
                      style={{ left: `calc(${((currentYear - YEARS[0]) / (YEARS[YEARS.length - 1] - YEARS[0])) * 100}% - 12px)` }}
                    ></div>
                  </div>
                  <div className="flex justify-between px-1">
                    {YEARS.map(year => (
                      <button 
                        key={year}
                        onClick={() => {setCurrentYear(year); setIsPlaying(false);}}
                        className={`text-xs font-bold transition-all ${currentYear === year ? 'text-emerald-600 scale-125' : 'text-slate-400 hover:text-slate-600'}`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Detail */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 h-fit">
              <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-600"/> Analisis Timeline
              </h3>
              
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 mb-4">
                <p className="text-xs text-emerald-600 font-bold mb-1 uppercase">Wawasan Historis ({currentYear})</p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {currentYear < 2020 
                    ? "Pada periode ini, tutupan hutan primer masih relatif stabil dengan gangguan minimal di wilayah pesisir." 
                    : "Terjadi peningkatan intensitas titik panas di wilayah tengah akibat pembukaan lahan perkebunan skala besar."}
                </p>
              </div>

              {selectedPoint ? (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 pt-4 border-t border-slate-100">
                  <div className="flex justify-between items-start">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                      selectedPoint.status === 'critical' ? 'bg-red-100 text-red-600 border border-red-200' : 
                      selectedPoint.status === 'healthy' ? 'bg-emerald-100 text-emerald-600 border border-emerald-200' : 'bg-yellow-100 text-yellow-600 border border-yellow-200'
                    }`}>
                      {selectedPoint.status}
                    </span>
                    <MapPin className="text-slate-300 w-5 h-5" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-slate-800">{selectedPoint.location}</h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <p className="text-xs text-slate-500 mb-1">Intensitas API</p>
                        <p className="font-bold text-slate-800 text-lg flex items-center gap-1">
                          {selectedPoint.intensity}<span className="text-xs text-slate-400 font-normal">/10</span>
                        </p>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1">
                          <div className={`h-full rounded-full ${selectedPoint.intensity > 7 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{width: `${selectedPoint.intensity * 10}%`}}></div>
                        </div>
                     </div>
                     <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <p className="text-xs text-slate-500 mb-1">Status Area</p>
                        <p className="font-bold text-slate-800 text-sm">Terpantau Satelit</p>
                     </div>
                  </div>

                  <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20 transform hover:-translate-y-1 active:scale-95">
                    Donasi Pemulihan Area
                  </button>
                </div>
              ) : (
                <div className="h-48 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 p-6 text-center">
                  <MapIcon className="w-8 h-8 opacity-20 mb-2"/>
                  <p className="text-xs font-medium">Pilih titik di peta untuk melihat detail spesifik area.</p>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group">
               <div className="absolute -right-6 -bottom-6 opacity-10 transform rotate-12 group-hover:scale-110 transition-transform duration-500">
                 <Activity size={120} />
               </div>
               <h3 className="font-bold mb-3 relative z-10 flex items-center gap-2">
                 <Flame className="text-orange-500 w-5 h-5" /> Komparasi Data
               </h3>
               <div className="space-y-3 relative z-10">
                  <div className="flex justify-between text-xs border-b border-white/10 pb-2">
                    <span className="text-slate-400">Total Deforestasi 2015</span>
                    <span className="font-mono">12.5k Ha</span>
                  </div>
                  <div className="flex justify-between text-xs border-b border-white/10 pb-2">
                    <span className="text-slate-400">Total Deforestasi {currentYear}</span>
                    <span className="font-mono text-orange-400">{(12.5 + (currentYear - 2015) * 1.5).toFixed(1)}k Ha</span>
                  </div>
                  <p className="text-[10px] text-slate-500 italic mt-2">*Estimasi berdasarkan analisis citra satelit Sentinel-2.</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}