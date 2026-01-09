'use client';

import React, { useState } from 'react';
import { CreditCard, CheckCircle2, Users } from 'lucide-react';
import { Donation } from '../lib/definitions';

export default function DonationSection() {
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
}