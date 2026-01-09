'use client';

import React from 'react';
import { ArrowRight, PawPrint, Wind, CloudRain, Sprout } from 'lucide-react';
import { EDUCATION_FACTS } from '../lib/definitions';

// Helper untuk memetakan nama icon string dari definisi ke komponen
const getIcon = (name: string) => {
  switch(name) {
    case 'PawPrint': return <PawPrint className="w-8 h-8 text-orange-500" />;
    case 'Wind': return <Wind className="w-8 h-8 text-blue-500" />;
    case 'CloudRain': return <CloudRain className="w-8 h-8 text-teal-500" />;
    case 'Sprout': return <Sprout className="w-8 h-8 text-emerald-500" />;
    default: return <Sprout className="w-8 h-8" />;
  }
};

export default function EducationSection() {
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
          {EDUCATION_FACTS.map((fact, idx) => (
            <div key={idx} className="bg-slate-50 p-8 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-2 border border-slate-100 group">
              <div className="mb-6 bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                {getIcon(fact.iconName)}
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
}