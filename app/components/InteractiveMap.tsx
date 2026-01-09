'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Layers, Maximize2, Activity, Map as MapIcon, Trees } from 'lucide-react';
import { ForestDataPoint, MOCK_FOREST_DATA } from '../lib/definitions';

export default function InteractiveMap() {
  const [selectedPoint, setSelectedPoint] = useState<ForestDataPoint | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
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
      setTimeout(() => setIsMapReady(true), 0);
    }
  }, []);

  // Render Map when ready
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (isMapReady && mapContainerRef.current && !mapInstanceRef.current && (window as any).L) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const L = (window as any).L;
      
      const map = L.map(mapContainerRef.current).setView([2.5, 99.5], 6); // Sumatra Coordinates
      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

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
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        const marker = L.marker([point.geoLat, point.geoLng], { icon: customIcon }).addTo(map);
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
            <div className="absolute top-4 right-4 z-[500] flex flex-col gap-2">
              <button className="bg-slate-800 p-2 rounded-lg text-white hover:bg-slate-700 border border-slate-700 hover:text-emerald-400 transition-colors shadow-lg"><Layers size={20}/></button>
              <button className="bg-slate-800 p-2 rounded-lg text-white hover:bg-slate-700 border border-slate-700 hover:text-emerald-400 transition-colors shadow-lg"><Maximize2 size={20}/></button>
            </div>

            <div id="map" ref={mapContainerRef} className="w-full h-full bg-[#1a1a1a]">
              {!isMapReady && (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 gap-3">
                  <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm">Memuat Peta Satelit...</p>
                </div>
              )}
            </div>

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
}