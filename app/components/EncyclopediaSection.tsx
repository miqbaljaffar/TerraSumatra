'use client';

import React, { useState, useMemo } from 'react';
import { Leaf, Cat, Info, MapPin, Sparkles, Search, X, ArrowRight } from 'lucide-react';
import { MOCK_SPECIES, Species } from '../lib/definitions';

export default function EncyclopediaSection() {
  const [filter, setFilter] = useState<'all' | 'flora' | 'fauna'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);

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
      {/* Dynamic Background */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl -translate-x-1/2 pointer-events-none animate-blob"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl translate-x-1/2 pointer-events-none animate-blob animation-delay-4000"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 max-w-4xl mx-auto space-y-4">
          <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 text-emerald-600 font-bold tracking-wider uppercase text-xs mb-2">
            Kekayaan Hayati
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800">
            Ensiklopedia <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Flora & Fauna</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Mengenal lebih dekat spesies endemik dan terancam punah yang menjadikan hutan Sumatera sebagai rumah terakhir mereka.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 justify-center items-center sticky top-24 z-30 py-4 px-6">
          <div className="bg-white/80 backdrop-blur-xl p-2 rounded-2xl shadow-xl border border-white/40 flex flex-col md:flex-row gap-4 w-full md:w-auto">
            
            <div className="relative w-full md:w-80 group">
              <input 
                type="text"
                placeholder="Cari spesies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-emerald-500 transition-colors" />
            </div>

            <div className="flex bg-slate-100 p-1.5 rounded-xl gap-1">
                {(['all', 'flora', 'fauna'] as const).map((f) => (
                    <button 
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-5 py-2 rounded-lg text-sm font-bold transition-all relative overflow-hidden ${
                            filter === f 
                                ? 'text-slate-800 shadow-sm bg-white' 
                                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                        }`}
                    >
                        <span className="relative z-10 capitalize flex items-center gap-2">
                            {f === 'flora' && <Leaf size={14}/>}
                            {f === 'fauna' && <Cat size={14}/>}
                            {f === 'all' ? 'Semua' : f}
                        </span>
                        {/* Smooth sliding background could be implemented with framer-motion, 
                            here we stick to CSS transition classes above */}
                    </button>
                ))}
            </div>
          </div>
        </div>

        {/* Grid Card Spesies */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
          {filteredSpecies.map((s, idx) => (
            <div 
              key={s.id} 
              className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col h-full animate-fade-in-up"
              style={{ animationDelay: `${idx * 100}ms` }} // Staggered animation
              onClick={() => setSelectedSpecies(s)}
            >
              <div className="relative h-72 overflow-hidden shrink-0">
                <img 
                  src={s.imageUrl} 
                  alt={s.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                
                {/* Floating Content over Image */}
                <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span className={`inline-flex px-3 py-1 mb-3 rounded-full text-xs font-bold backdrop-blur-md shadow-sm border border-white/20 text-white items-center gap-1.5 ${s.type === 'flora' ? 'bg-emerald-500/80' : 'bg-orange-500/80'}`}>
                        {s.type === 'flora' ? <Leaf size={12}/> : <Cat size={12}/>}
                        {s.type === 'flora' ? 'Tumbuhan' : 'Satwa'}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-1">{s.name}</h3>
                    <p className="text-white/80 italic font-serif text-sm">{s.latinName}</p>
                </div>

                {/* Top Badge */}
                <div className="absolute top-4 right-4 translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
                   <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-lg">
                      <Info size={20} />
                   </div>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1 relative">
                 {/* Status Pill */}
                 <div className="mb-4">
                     <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${getStatusColor(s.status)}`}>
                        {s.status}
                     </span>
                 </div>

                <p className="text-slate-600 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                  {s.description}
                </p>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between group-hover:border-emerald-100 transition-colors">
                  <span className="text-emerald-600 text-xs font-bold uppercase tracking-widest group-hover:text-emerald-700">Lihat Detail</span>
                  <ArrowRight className="w-5 h-5 text-emerald-500 transform group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredSpecies.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 animate-in fade-in zoom-in">
             <div className="bg-white p-6 rounded-full inline-block mb-4 shadow-sm">
                <Search className="w-12 h-12 text-slate-300" />
             </div>
             <p className="text-slate-500 font-medium text-lg">Tidak ditemukan spesies untuk &quot;{searchQuery}&quot;</p>
             <button onClick={() => {setSearchQuery(''); setFilter('all');}} className="mt-6 px-6 py-2 bg-emerald-100 text-emerald-700 rounded-full font-bold hover:bg-emerald-200 transition-colors">Reset Pencarian</button>
          </div>
        )}
      </div>

      {/* Modal Detail */}
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
          
          <div className="bg-white rounded-[2rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl animate-in zoom-in-95 duration-300 custom-scrollbar border border-white/20">
            <button 
              onClick={() => setSelectedSpecies(null)}
              className="absolute top-4 right-4 bg-white/80 backdrop-blur hover:bg-white p-2 rounded-full transition-all z-20 shadow-sm hover:rotate-90 duration-300"
            >
              <X className="w-6 h-6 text-slate-800" />
            </button>

            <div className="grid md:grid-cols-2">
              <div className="h-72 md:h-auto relative">
                 <img 
                  src={selectedSpecies.imageUrl} 
                  alt={selectedSpecies.name} 
                  className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r"></div>
              </div>
              
              <div className="p-8 md:p-12">
                 <div className="mb-8 animate-in slide-in-from-bottom-4 duration-500">
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

                 <div className="space-y-8">
                   <div className="animate-in slide-in-from-bottom-4 duration-500 delay-100">
                     <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2 text-sm uppercase tracking-wider">
                       <Info size={16} className="text-emerald-500"/> Deskripsi
                     </h4>
                     <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                       {selectedSpecies.description}
                     </p>
                   </div>

                   <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 relative overflow-hidden group animate-in slide-in-from-bottom-4 duration-500 delay-200 hover:shadow-md transition-shadow">
                     <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity group-hover:rotate-12 duration-700">
                        <Sparkles size={100} className="text-amber-500" />
                     </div>
                     <h4 className="font-bold text-amber-800 flex items-center gap-2 mb-2 text-sm uppercase tracking-wide relative z-10">
                       <Sparkles size={16}/> Fakta Unik
                     </h4>
                     <p className="text-amber-900 font-medium italic relative z-10 leading-relaxed">
                        &quot;{selectedSpecies.uniqueFact}&quot;
                     </p>
                   </div>

                   <div className="animate-in slide-in-from-bottom-4 duration-500 delay-300">
                     <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2 text-sm uppercase tracking-wider">
                       <MapPin size={16} className="text-emerald-500"/> Habitat Utama
                     </h4>
                     <p className="text-slate-600 text-sm md:text-base">
                       {selectedSpecies.habitat}
                     </p>
                   </div>
                 </div>

                 <div className="mt-10 pt-6 border-t border-slate-100 animate-in slide-in-from-bottom-4 duration-500 delay-500">
                   <button 
                    onClick={() => {
                        setSelectedSpecies(null);
                        const donateSection = document.getElementById('donation-section');
                        if (donateSection) donateSection.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all text-center block transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
                   >
                     <Leaf className="w-5 h-5" /> Adopsi Pohon untuk Habitat Mereka
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