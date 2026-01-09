'use client';

import React from 'react';
import { Trees } from 'lucide-react';

export default function Footer() {
  return (
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
}