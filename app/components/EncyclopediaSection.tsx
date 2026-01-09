'use client';

import React, { useState, useMemo } from 'react';
import { Leaf, Cat, Info, MapPin, Sparkles, Search, X } from 'lucide-react';
import { MOCK_SPECIES, Species } from '../lib/definitions';

export default function EncyclopediaSection() {
  const [filter, setFilter] = useState<'all' | 'flora' | 'fauna'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);

  // Best Practice: Gunakan useMemo untuk expensive calculation atau filtering array
  // agar tidak dijalankan ulang setiap kali render jika dependency tidak berubah
  const filteredSpecies = useMemo(() => {
    return MOCK_SPECIES.filter(s => {
      const matchesFilter = filter === 'all' || s.type === filter;
      const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            s.latinName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Critically Endangered': return 'bg-red-100 text-red-600 border-red-200';
      case 'Endangered': return 'bg-orange-100 text-orange-600 border-orange-200';
      case 'Vulnerable': return 'bg-yellow-100 text-yellow-600 border-yellow-200';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden" id="encyclopedia">
      {/* Dekorasi Background */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl -translate-x-1/2 pointer-events-none"></div>
      
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
        <div className="flex flex-col md:flex-row gap-4 mb-12 justify-center items-center sticky top-24 z-30 py-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-slate-100 px-6">
          <div className="relative w-full md:w-96 group">
            <input 
              type="text"
              placeholder="Cari spesies (e.g., Harimau, Andalas)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all bg-slate-50 focus:bg-white"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-emerald-500 transition-colors" />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X size={16} />
              </button>
            )}
          </div>

          <div className="flex bg-slate-100 p-1 rounded-full gap-1 overflow-x-auto max-w-full">
            <button 
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${filter === 'all' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
            >
              Semua
            </button>
            <button 
              onClick={() => setFilter('flora')}
              className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${filter === 'flora' ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
            >
              <Leaf size={16} /> Flora
            </button>
            <button 
              onClick={() => setFilter('fauna')}
              className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${filter === 'fauna' ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
            >
              <Cat size={16} /> Fauna
            </button>
          </div>
        </div>

        {/* Empty State */}
        {filteredSpecies.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
             <div className="bg-white p-4 rounded-full inline-block mb-4 shadow-sm">
                <Search className="w-8 h-8 text-slate-300" />
             </div>
             <p className="text-slate-500 font-medium">Tidak ditemukan spesies dengan kata kunci &quot;{searchQuery}&quot;</p>
             <button onClick={() => {setSearchQuery(''); setFilter('all');}} className="mt-4 text-emerald-600 font-bold hover:underline">Reset Pencarian</button>
          </div>
        )}

        {/* Grid Card Spesies */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSpecies.map((s) => (
            <div 
              key={s.id} 
              className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col h-full"
              onClick={() => setSelectedSpecies(s)}
            >
              <div className="relative h-64 overflow-hidden shrink-0">
                <img 
                  src={s.imageUrl} 
                  alt={s.name}
                  loading="lazy" // Performance: Lazy load images
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                
                {/* Badge Type */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md shadow-sm border border-white/20 text-white flex items-center gap-1.5 ${s.type === 'flora' ? 'bg-emerald-500/90' : 'bg-orange-500/90'}`}>
                    {s.type === 'flora' ? <Leaf size={12}/> : <Cat size={12}/>}
                    {s.type === 'flora' ? 'Tumbuhan' : 'Satwa'}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
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

                <p className="text-slate-600 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                  {s.description}
                </p>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-emerald-600 text-sm font-bold mt-auto">
                  <span className="flex items-center gap-2 group-hover:gap-3 transition-all">
                    Baca Fakta Unik <Sparkles size={16} />
                  </span>
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Info size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Detail with Accessible Overlay */}
      {selectedSpecies && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in"
            onClick={() => setSelectedSpecies(null)}
          ></div>
          
          <div className="bg-white rounded-[2rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl animate-in zoom-in-95 duration-200 custom-scrollbar">
            <button 
              onClick={() => setSelectedSpecies(null)}
              className="absolute top-4 right-4 bg-white/80 backdrop-blur hover:bg-white p-2 rounded-full transition-all z-20 shadow-sm"
              aria-label="Tutup detail"
            >
              <X className="w-6 h-6 text-slate-800" />
            </button>

            <div className="grid md:grid-cols-2">
              <div className="h-64 md:h-auto relative">
                 <img 
                  src={selectedSpecies.imageUrl} 
                  alt={selectedSpecies.name} 
                  className="w-full h-full object-cover"
                 />
                 <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
              </div>
              
              <div className="p-8 md:p-12">
                 <div className="mb-8">
                   <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1 ${selectedSpecies.type === 'flora' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                        {selectedSpecies.type === 'flora' ? <Leaf size={12}/> : <Cat size={12}/>}
                        {selectedSpecies.type}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(selectedSpecies.status)}`}>
                        {selectedSpecies.status}
                      </span>
                   </div>
                   <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-1">{selectedSpecies.name}</h2>
                   <p className="text-lg text-slate-500 italic font-serif border-l-4 border-emerald-500 pl-3">{selectedSpecies.latinName}</p>
                 </div>

                 <div className="space-y-6">
                   <div>
                     <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2 text-sm uppercase tracking-wider">
                       <Info size={16} className="text-emerald-500"/> Deskripsi
                     </h4>
                     <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                       {selectedSpecies.description}
                     </p>
                   </div>

                   <div className="bg-amber-50 p-5 rounded-2xl border border-amber-100 relative overflow-hidden">
                     <div className="absolute -right-4 -top-4 opacity-10">
                        <Sparkles size={100} className="text-amber-500" />
                     </div>
                     <h4 className="font-bold text-amber-800 flex items-center gap-2 mb-2 text-sm uppercase tracking-wide relative z-10">
                       <Sparkles size={16}/> Fakta Unik
                     </h4>
                     <p className="text-amber-900 font-medium italic relative z-10">
                        &quot;{selectedSpecies.uniqueFact}&quot;
                     </p>
                   </div>

                   <div>
                     <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2 text-sm uppercase tracking-wider">
                       <MapPin size={16} className="text-emerald-500"/> Habitat Utama
                     </h4>
                     <p className="text-slate-600 text-sm md:text-base">
                       {selectedSpecies.habitat}
                     </p>
                   </div>
                 </div>

                 <div className="mt-8 pt-6 border-t border-slate-100">
                   <button 
                    onClick={() => {
                        setSelectedSpecies(null);
                        const donateSection = document.getElementById('donation-section');
                        if (donateSection) donateSection.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all text-center block transform hover:-translate-y-1 active:scale-95"
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