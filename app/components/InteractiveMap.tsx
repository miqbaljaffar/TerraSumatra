'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Layers, Maximize2, Activity, Map as MapIcon, Flame, MapPin } from 'lucide-react';
import { ForestDataPoint, MOCK_FOREST_DATA, MOCK_HEATMAP_DATA } from '../lib/definitions';

// --- Type Definitions untuk Leaflet (Fix: no-explicit-any) ---

interface LeafletLayer {
  addTo: (map: LeafletMap) => LeafletLayer;
  remove: () => void;
  on?: (event: string, fn: () => void) => void;
}

interface LeafletMap {
  setView: (center: [number, number], zoom: number, options?: { animate: boolean }) => LeafletMap;
  removeLayer: (layer: LeafletLayer) => void;
  addLayer: (layer: LeafletLayer) => void;
}

interface LeafletIcon {
  options: Record<string, unknown>;
}

interface LeafletStatic {
  map: (element: HTMLElement | null) => LeafletMap;
  tileLayer: (url: string, options?: Record<string, unknown>) => LeafletLayer;
  divIcon: (options: Record<string, unknown>) => LeafletIcon;
  marker: (latlng: [number, number], options?: { icon: LeafletIcon }) => LeafletLayer;
  heatLayer?: (data: [number, number, number][], options: Record<string, unknown>) => LeafletLayer;
}

// Memperluas interface Window agar properti L dikenali
declare global {
  interface Window {
    L?: LeafletStatic;
  }
}

// -------------------------------------------------------------

export default function InteractiveMap() {
  const [selectedPoint, setSelectedPoint] = useState<ForestDataPoint | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [mapType, setMapType] = useState<'street' | 'satellite'>('street');
  const [showHeatmap, setShowHeatmap] = useState(true);
  
  // Fix: Menggunakan tipe spesifik daripada 'any'
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);
  const layerRef = useRef<LeafletLayer | null>(null);
  const heatLayerRef = useRef<LeafletLayer | null>(null);

  // Initialize Leaflet & Heatmap Script
  useEffect(() => {
    const existingCss = document.getElementById('leaflet-css');
    if (!existingCss) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    const loadScripts = async () => {
      // Load Leaflet
      // Fix: Mengakses window.L dengan aman tanpa casting ke 'any'
      if (!window.L) {
        await new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          script.async = true;
          script.onload = resolve;
          document.body.appendChild(script);
        });
      }
      
      // Load Heatmap Plugin
      if (!window.L?.heatLayer) {
        await new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://leaflet.github.io/Leaflet.heat/dist/leaflet-heat.js';
          script.async = true;
          script.onload = resolve;
          document.body.appendChild(script);
        });
      }
      
      setIsMapReady(true);
    };

    loadScripts();
  }, []);

  // Effect to handle Map Initialization
  useEffect(() => {
    if (isMapReady && mapContainerRef.current && !mapInstanceRef.current) {
      const L = window.L;
      
      // Safety check jika L belum terload sempurna
      if (!L) return;
      
      const map = L.map(mapContainerRef.current).setView([2.5, 99.5], 6);
      mapInstanceRef.current = map;

      // Base layer
      const streetLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; CARTO'
      });
      
      streetLayer.addTo(map);
      layerRef.current = streetLayer;

      // Add Markers
      MOCK_FOREST_DATA.forEach((point) => {
        const colorClass = point.status === 'critical' ? 'bg-red-500' : point.status === 'healthy' ? 'bg-emerald-500' : 'bg-yellow-500';
        
        const customIcon = L.divIcon({
          className: 'custom-div-icon',
          html: `
            <div class="relative w-6 h-6 -ml-3 -mt-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${colorClass}"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 top-1.5 left-1.5 ${colorClass} shadow-lg ring-2 ring-white/20"></span>
            </div>
          `,
          iconSize: [24, 24], // Leaflet mengharapkan array atau object Point, kita pakai array untuk simplifikasi tipe
          iconAnchor: [12, 12]
        } as Record<string, unknown>); // Casting options ke Record agar sesuai interface

        const marker = L.marker([point.geoLat, point.geoLng], { icon: customIcon }).addTo(map);
        
        // Cek jika method 'on' tersedia (karena interface kita membuatnya opsional)
        if (marker.on) {
          marker.on('click', () => {
            setSelectedPoint(point);
            map.setView([point.geoLat, point.geoLng], 8, { animate: true });
          });
        }
      });

      // Add Heatmap Layer
      if (L.heatLayer) {
        const heat = L.heatLayer(MOCK_HEATMAP_DATA, {
          radius: 25,
          blur: 15,
          maxZoom: 10,
          gradient: { 0.4: 'blue', 0.6: 'lime', 0.8: 'yellow', 1: 'red' }
        }).addTo(map);
        heatLayerRef.current = heat;
      }
    }
  }, [isMapReady]);

  // Handle Layer Toggle (Street vs Satellite)
  useEffect(() => {
    if (mapInstanceRef.current) {
      const L = window.L;
      const map = mapInstanceRef.current;

      if (!L) return;

      if (layerRef.current) {
        map.removeLayer(layerRef.current);
      }

      const newUrl = mapType === 'satellite' 
        ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
      
      const newLayer = L.tileLayer(newUrl, {
        attribution: mapType === 'satellite' ? 'Esri &copy; DigitalGlobe' : '&copy; CARTO'
      });

      newLayer.addTo(map);
      layerRef.current = newLayer;
    }
  }, [mapType]);

  // Handle Heatmap Toggle
  useEffect(() => {
    if (mapInstanceRef.current && heatLayerRef.current) {
      const map = mapInstanceRef.current;
      if (showHeatmap) {
        map.addLayer(heatLayerRef.current);
      } else {
        map.removeLayer(heatLayerRef.current);
      }
    }
  }, [showHeatmap]);

  return (
    <div className="min-h-screen pt-24 bg-slate-50 pb-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Monitoring Hutan <span className="text-emerald-600">Real-time</span></h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Gunakan kontrol peta untuk melihat visualisasi titik panas (Hotspots) dan pantauan satelit untuk deteksi perambahan ilegal.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Interface */}
          <div className="lg:col-span-2 bg-slate-900 rounded-3xl overflow-hidden shadow-2xl relative h-[650px] border border-slate-800 group z-0">
            
            {/* Custom Layer Controls UI */}
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

            <div className="absolute top-4 right-4 z-[500]">
              <button className="bg-slate-800 p-2 rounded-lg text-white hover:bg-slate-700 border border-slate-700 shadow-lg"><Maximize2 size={20}/></button>
            </div>

            <div id="map" ref={mapContainerRef} className="w-full h-full bg-[#1a1a1a]">
              {!isMapReady && (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 gap-3">
                  <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm">Inisialisasi Sistem Geospasial...</p>
                </div>
              )}
            </div>

            {/* Legend */}
            <div className="absolute bottom-6 left-6 z-[500] bg-slate-900/90 backdrop-blur px-4 py-4 rounded-2xl border border-slate-700 text-xs text-white shadow-xl min-w-[180px]">
               <p className="font-bold mb-3 text-slate-400 uppercase tracking-widest text-[10px]">Indikator Status</p>
               <div className="space-y-2.5">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></span> 
                    <span>Deforestasi Kritis</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></span> 
                    <span>Area Pemulihan</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span> 
                    <span>Hutan Primer</span>
                  </div>
                  {showHeatmap && (
                    <div className="pt-2 mt-2 border-t border-slate-700">
                      <p className="text-[10px] text-orange-400 font-bold mb-2">HEATMAP KERAWANAN</p>
                      <div className="h-2 w-full bg-gradient-to-r from-blue-500 via-lime-500 to-red-500 rounded-full"></div>
                      <div className="flex justify-between mt-1 text-[9px] text-slate-500">
                        <span>Rendah</span>
                        <span>Tinggi</span>
                      </div>
                    </div>
                  )}
               </div>
            </div>
          </div>

          {/* Sidebar Detail */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 transition-all hover:shadow-xl">
              <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-600"/> Analisis Geospasial
              </h3>
              
              {selectedPoint ? (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex justify-between items-start">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                      selectedPoint.status === 'critical' ? 'bg-red-100 text-red-600' : 
                      selectedPoint.status === 'healthy' ? 'bg-emerald-100 text-emerald-600' : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {selectedPoint.status}
                    </span>
                    <MapPin className="text-slate-300 w-5 h-5" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-slate-800">{selectedPoint.location}</h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <p className="text-xs text-slate-500 mb-1">Intensitas API</p>
                        <p className="font-bold text-slate-800 text-lg">{selectedPoint.intensity}/10</p>
                     </div>
                     <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <p className="text-xs text-slate-500 mb-1">Luas Pantauan</p>
                        <p className="font-bold text-slate-800 text-lg">1.2k Ha</p>
                     </div>
                  </div>

                  <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                    <p className="text-xs text-red-600 font-bold mb-1">PERINGATAN DINI</p>
                    {/* Fix: react/no-unescaped-entities - Mengganti kutip dua dengan &quot; */}
                    <p className="text-sm text-red-700 leading-relaxed italic">
                      &quot;Titik panas terdeteksi di radius 2km. Risiko kebakaran hutan meningkat akibat cuaca ekstrem.&quot;
                    </p>
                  </div>

                  <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20 transform hover:-translate-y-1">
                    Kirim Bantuan Reboisasi
                  </button>
                </div>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 p-8 text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                    <MapIcon className="w-8 h-8 opacity-20"/>
                  </div>
                  <p className="text-sm font-medium">Klik pada marker di peta untuk menganalisis data tutupan lahan secara mendalam.</p>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group">
               <div className="absolute -right-6 -bottom-6 opacity-10 transform rotate-12 group-hover:scale-110 transition-transform">
                 <Activity size={120} />
               </div>
               <h3 className="font-bold mb-3 relative z-10 flex items-center gap-2">
                 <Flame className="text-orange-500 w-5 h-5" /> Data FIRMS NASA
               </h3>
               <p className="text-sm text-slate-400 mb-4 relative z-10">Integrasi data real-time untuk memantau titik api dalam 24 jam terakhir.</p>
               <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono bg-emerald-400/10 p-2 rounded-lg border border-emerald-400/20">
                 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                 Connected to Sentinel-2 API
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}