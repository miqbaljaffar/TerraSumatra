'use client';

import React, { useState } from 'react';
import { Leaf, Cat, Info, MapPin, Sparkles, Search } from 'lucide-react';
import { MOCK_SPECIES, Species } from '../lib/definitions';

export default function EncyclopediaSection() {
  const [filter, setFilter] = useState<'all' | 'flora' | 'fauna'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);

  const filteredSpecies = MOCK_SPECIES.filter(s => {
    const matchesFilter = filter === 'all' || s.type === filter;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.latinName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Critically Endangered': return 'bg-red-100 text-red-600 border-red-200';
      case 'Endangered': return 'bg-orange-100 text-orange-600 border-orange-200';
      case 'Vulnerable': return 'bg-yellow-100 text-yellow-600 border-yellow-200';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Dekorasi Background */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl -translate-x-1/2"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <span className="text-emerald-600 font-bold tracking-wider uppercase text-sm mb-2 block">
            Kekayaan Hayati
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Ensiklopedia <span className="text-emerald-600">Flora & Fauna</span>
          </h2>
          <p className="text-slate-600 text-lg">
            Mengenal lebih dekat spesies endemik dan terancam punah yang menjadikan hutan Sumatera sebagai rumah terakhir mereka.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 justify-center items-center">
          <div className="relative w-full md:w-96">
            <input 
              type="text"
              placeholder="Cari spesies (e.g., Harimau, Andalas)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all shadow-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          </div>

          <div className="flex bg-slate-100 p-1 rounded-full gap-1">
            <button 
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${filter === 'all' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Semua
            </button>
            <button 
              onClick={() => setFilter('flora')}
              className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-all ${filter === 'flora' ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Leaf size={16} /> Flora
            </button>
            <button 
              onClick={() => setFilter('fauna')}
              className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-all ${filter === 'fauna' ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Cat size={16} /> Fauna
            </button>
          </div>
        </div>

        {/* Grid Card Spesies */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSpecies.map((s) => (
            <div 
              key={s.id} 
              className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedSpecies(s)}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={s.imageUrl} 
                  alt={s.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                
                {/* Badge Type */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-sm border border-white/20 text-white flex items-center gap-1 ${s.type === 'flora' ? 'bg-emerald-500/80' : 'bg-orange-500/80'}`}>
                    {s.type === 'flora' ? <Leaf size={12}/> : <Cat size={12}/>}
                    {s.type === 'flora' ? 'Tumbuhan' : 'Satwa'}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">{s.name}</h3>
                    <p className="text-sm text-slate-400 italic font-serif">{s.latinName}</p>
                  </div>
                </div>

                <div className="my-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(s.status)}`}>
                    {s.status}
                  </span>
                </div>

                <p className="text-slate-600 text-sm line-clamp-3 mb-4">
                  {s.description}
                </p>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-emerald-600 text-sm font-bold group-hover:gap-3 transition-all">
                  Baca Fakta Unik <Sparkles size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Detail */}
      {selectedSpecies && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedSpecies(null)}
          ></div>
          
          <div className="bg-white rounded-[2rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedSpecies(null)}
              className="absolute top-4 right-4 bg-white/50 backdrop-blur hover:bg-white p-2 rounded-full transition-all z-20"
            >
              <span className="sr-only">Close</span>
              <svg className="w-6 h-6 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="grid md:grid-cols-2">
              <div className="h-64 md:h-auto relative">
                 <img 
                  src={selectedSpecies.imageUrl} 
                  alt={selectedSpecies.name} 
                  className="w-full h-full object-cover"
                 />
              </div>
              
              <div className="p-8 md:p-12">
                 <div className="mb-6">
                   <div className="flex items-center gap-2 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${selectedSpecies.type === 'flora' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                        {selectedSpecies.type}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(selectedSpecies.status)}`}>
                        {selectedSpecies.status}
                      </span>
                   </div>
                   <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-1">{selectedSpecies.name}</h2>
                   <p className="text-lg text-slate-500 italic font-serif">{selectedSpecies.latinName}</p>
                 </div>

                 <div className="space-y-6">
                   <div>
                     <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2">
                       <Info size={18} className="text-emerald-500"/> Deskripsi
                     </h4>
                     <p className="text-slate-600 leading-relaxed">
                       {selectedSpecies.description}
                     </p>
                   </div>

                   <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                     <h4 className="font-bold text-yellow-800 flex items-center gap-2 mb-2 text-sm uppercase tracking-wide">
                       <Sparkles size={16}/> Fakta Unik
                     </h4>
                     <p className="text-yellow-900 font-medium">
                        &quot;{selectedSpecies.uniqueFact}&quot;
                        </p>
                   </div>

                   <div>
                     <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2">
                       <MapPin size={18} className="text-emerald-500"/> Habitat Utama
                     </h4>
                     <p className="text-slate-600">
                       {selectedSpecies.habitat}
                     </p>
                   </div>
                 </div>

                 <div className="mt-8 pt-6 border-t border-slate-100">
                   <button 
                    onClick={() => {
                        // Tutup modal dan scroll ke donasi (opsional)
                        setSelectedSpecies(null);
                        const donateSection = document.getElementById('donation-section');
                        if (donateSection) donateSection.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all text-center block"
                   >
                     Adopsi Pohon untuk Habitat Mereka
                   </button>
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}