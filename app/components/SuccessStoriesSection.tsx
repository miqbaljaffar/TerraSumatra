'use client';

import React from 'react';
import { BookOpen, User, Calendar, ArrowRight, Bookmark } from 'lucide-react';
import { MOCK_STORIES } from '../lib/definitions';

export default function SuccessStoriesSection() {
  return (
    <div className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-emerald-600 font-bold uppercase tracking-wider text-sm flex items-center gap-2">
              <BookOpen size={16} /> Konten Edukasi & Blog
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-4 leading-tight">
              Kisah <span className="text-emerald-600">Nyata</span> Dari Lapangan
            </h2>
            <p className="text-slate-600 mt-4 text-lg">
              Inspirasi dari mereka yang berjuang di garis depan restorasi ekosistem Sumatera.
            </p>
          </div>
          <button className="flex items-center gap-2 text-emerald-600 font-bold hover:gap-3 transition-all border-b-2 border-emerald-600 pb-1">
            Lihat Semua Artikel <ArrowRight size={20} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_STORIES.map((story) => (
            <article 
              key={story.id} 
              className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={story.imageUrl} 
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-emerald-700 px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">
                    {story.category}
                  </span>
                </div>
                <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-emerald-600 transition-colors">
                  <Bookmark size={18} />
                </button>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                  <div className="flex items-center gap-1.5">
                    <User size={14} className="text-emerald-500" /> {story.author}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-emerald-500" /> {story.date}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-emerald-600 transition-colors leading-snug">
                  {story.title}
                </h3>
                
                <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-1">
                  {story.excerpt}
                </p>

                <div className="pt-6 border-t border-slate-50 flex justify-between items-center">
                  <span className="text-xs font-medium text-slate-400">Waktu baca: {story.readTime}</span>
                  <a 
                    href={`/blog/${story.slug}`}
                    className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                  >
                    <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}