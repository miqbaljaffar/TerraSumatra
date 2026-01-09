'use client';

import React, { useState } from 'react';
import { CreditCard, CheckCircle2, Users, Trophy, Medal, Building2, User, Crown, Loader2 } from 'lucide-react';
import { Donation, MOCK_LEADERBOARD } from '../lib/definitions';

export default function DonationSection() {
  const [amount, setAmount] = useState<number>(50000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  // UI States
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewMode, setViewMode] = useState<'recent' | 'leaderboard'>('leaderboard');
  const [donations, setDonations] = useState<Donation[]>([
    { id: 1, name: "Budi Santoso", amount: 50000, message: "Semoga Aceh cepat pulih", timestamp: new Date() },
    { id: 2, name: "Siti Aminah", amount: 100000, message: "Untuk masa depan anak cucu", timestamp: new Date() },
    { id: 3, name: "Hamba Allah", amount: 250000, message: "Sedekah bumi", timestamp: new Date() }
  ]);

  const handleAmountChange = (val: number) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, ''); // Hanya angka
    setCustomAmount(val);
    setAmount(val ? parseInt(val) : 0);
  };

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount < 10000) {
        alert("Minimal donasi Rp 10.000");
        return;
    }

    setIsSubmitting(true);
    
    // Simulasi API Call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newDonation: Donation = {
      id: donations.length + 1,
      name: name || "Anonim",
      amount,
      message,
      timestamp: new Date()
    };
    
    setDonations([newDonation, ...donations]);
    
    // Reset Form
    setName("");
    setEmail("");
    setMessage("");
    setCustomAmount("");
    setAmount(50000); // Reset ke default
    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Auto switch ke tab recent untuk melihat donasi sendiri
    setViewMode('recent');
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Crown className="w-5 h-5 text-yellow-500 fill-yellow-500" />;
      case 1: return <Medal className="w-5 h-5 text-slate-400 fill-slate-400" />;
      case 2: return <Medal className="w-5 h-5 text-amber-700 fill-amber-700" />;
      default: return <span className="text-slate-400 font-bold text-sm">#{index + 1}</span>;
    }
  };

  const getCardStyle = (index: number) => {
    switch (index) {
      case 0: return 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200';
      case 1: return 'bg-gradient-to-r from-slate-50 to-gray-50 border-slate-200';
      case 2: return 'bg-gradient-to-r from-orange-50 to-amber-50/50 border-orange-200';
      default: return 'bg-white border-slate-100';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50" id="donation">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Bergabung dalam <span className="text-emerald-600">Reboisasi</span></h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Setiap donasi Anda dikonversi menjadi bibit pohon yang ditanam langsung oleh petani lokal. Bergabunglah dengan leaderboard pahlawan bumi.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Left Column: Donation Form */}
          <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 relative overflow-hidden h-fit">
             {showSuccess && (
               <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-center p-6 animate-in fade-in duration-300">
                 <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-inner animate-in zoom-in duration-500">
                   <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                 </div>
                 <h3 className="text-2xl font-bold text-slate-800 mb-2">Terima Kasih, Pahlawan!</h3>
                 <p className="text-slate-600 max-w-xs mx-auto mb-6">Donasi Anda telah tercatat. Nama Anda akan segera muncul di feed donasi.</p>
                 <button 
                  onClick={() => setShowSuccess(false)}
                  className="px-6 py-2 bg-emerald-100 text-emerald-700 rounded-full font-bold text-sm hover:bg-emerald-200 transition-colors"
                 >
                   Donasi Lagi
                 </button>
               </div>
             )}

             <div className="flex items-center gap-3 mb-8">
               <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-600 shadow-sm">
                 <CreditCard className="w-6 h-6"/>
               </div>
               <div>
                  <h3 className="text-xl font-bold text-slate-800">Mulai Berdonasi</h3>
                  <p className="text-xs text-slate-400">Pilih nominal atau masukkan jumlah custom</p>
               </div>
             </div>

             <form onSubmit={handleDonate} className="space-y-6">
               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-3">Pilih Nominal Bibit</label>
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                   {[50000, 100000, 250000].map((val) => (
                     <button
                       type="button"
                       key={val}
                       onClick={() => handleAmountChange(val)}
                       className={`py-4 px-4 rounded-xl text-sm font-bold border-2 transition-all relative overflow-hidden group ${
                         amount === val && !customAmount
                           ? 'bg-emerald-50 text-emerald-700 border-emerald-500 shadow-sm' 
                           : 'bg-white text-slate-500 border-slate-100 hover:border-emerald-200 hover:bg-slate-50'
                       }`}
                     >
                       <span className="relative z-10 block text-xs font-normal opacity-70 mb-1 group-hover:text-emerald-600">
                         {val === 50000 ? '1 Bibit' : val === 100000 ? '2 Bibit' : '5 Bibit'}
                       </span>
                       <span className="relative z-10">Rp {val.toLocaleString('id-ID')}</span>
                     </button>
                   ))}
                 </div>
                 
                 {/* Custom Amount Input */}
                 <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span>
                    <input 
                      type="text"
                      value={customAmount ? parseInt(customAmount).toLocaleString('id-ID') : ''}
                      onChange={handleCustomAmountChange}
                      placeholder="Atau masukkan nominal lainnya..."
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 outline-none transition-all font-semibold ${
                        customAmount ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-100 bg-slate-50 focus:border-emerald-300 focus:bg-white'
                      }`}
                    />
                 </div>
               </div>

               <div className="grid md:grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Nama Donatur</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-emerald-500 focus:ring-0 outline-none transition-all bg-slate-50 focus:bg-white"
                      placeholder="Nama Anda / Organisasi"
                      required
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email <span className="text-slate-300 font-normal">(Opsional)</span></label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-emerald-500 focus:ring-0 outline-none transition-all bg-slate-50 focus:bg-white"
                      placeholder="email@contoh.com"
                    />
                 </div>
               </div>

               <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Pesan Dukungan</label>
                  <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-emerald-500 focus:ring-0 outline-none transition-all bg-slate-50 focus:bg-white h-28 resize-none"
                    placeholder="Tulis pesan semangat untuk para penjaga hutan..."
                  ></textarea>
               </div>

               <button 
                type="submit" 
                disabled={isSubmitting || amount < 10000}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-xl shadow-emerald-500/20 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
               >
                 {isSubmitting ? (
                   <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Memproses...
                   </>
                 ) : (
                   <span>Tanam {Math.max(1, Math.floor(amount/50000))} Pohon Sekarang</span>
                 )}
               </button>
               
               <p className="text-[10px] text-center text-slate-400 flex items-center justify-center gap-1">
                 <CheckCircle2 className="w-3 h-3"/> Pembayaran Anda diamankan dengan enkripsi SSL 256-bit
               </p>
             </form>
          </div>

          {/* Right Column: Leaderboard & Recent Feed */}
          <div className="flex flex-col h-full">
            {/* Toggle Tabs */}
            <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 mb-6 flex gap-1">
               <button 
                onClick={() => setViewMode('leaderboard')}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  viewMode === 'leaderboard' 
                    ? 'bg-emerald-100 text-emerald-700 shadow-sm' 
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
               >
                 <Trophy className="w-4 h-4" /> Top Pahlawan
               </button>
               <button 
                onClick={() => setViewMode('recent')}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  viewMode === 'recent' 
                    ? 'bg-emerald-100 text-emerald-700 shadow-sm' 
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
               >
                 <Users className="w-4 h-4" /> Donasi Terbaru
               </button>
            </div>

            {/* List Container */}
            <div className="flex-1 bg-white rounded-[2rem] p-6 shadow-xl border border-slate-100 relative overflow-hidden min-h-[500px]">
                <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-white to-transparent z-10"></div>
                
                <div className="space-y-4 h-[600px] overflow-y-auto pr-2 custom-scrollbar pb-8 pt-2">
                  
                  {viewMode === 'leaderboard' ? (
                    // Leaderboard View
                    MOCK_LEADERBOARD.map((entry, i) => (
                      <div 
                        key={entry.id} 
                        className={`p-4 rounded-2xl border flex items-center gap-4 transition-all hover:scale-[1.02] ${getCardStyle(i)}`}
                      >
                         <div className="w-10 h-10 flex items-center justify-center shrink-0">
                           {getRankIcon(i)}
                         </div>
                         
                         <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-bold text-slate-800 truncate">{entry.name}</h4>
                              {entry.type === 'corporate' && (
                                <span className="bg-blue-100 text-blue-600 p-1 rounded-md" title="Korporasi">
                                  <Building2 className="w-3 h-3"/>
                                </span>
                              )}
                              {entry.type === 'individual' && (
                                <span className="bg-emerald-100 text-emerald-600 p-1 rounded-md" title="Individu">
                                  <User className="w-3 h-3"/>
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                                {Math.floor(entry.amount / 50000)} Pohon
                              </span>
                            </div>
                         </div>
                         
                         <div className="text-right">
                           <p className="font-bold text-emerald-600 text-sm">Rp {(entry.amount / 1000000).toFixed(1)}jt</p>
                         </div>
                      </div>
                    ))
                  ) : (
                    // Recent Donations View
                    donations.map((d, i) => (
                      <div key={d.id} className={`bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4 transition-all hover:shadow-md ${i === 0 ? 'animate-in slide-in-from-top-4 bg-emerald-50/50 border-emerald-100' : ''}`}>
                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm ring-2 ring-emerald-100">
                           {d.name.charAt(0)}
                         </div>
                         <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-bold text-slate-800">{d.name}</h4>
                              <span className="text-[10px] text-slate-400">{i === 0 ? 'Baru saja' : '2j lalu'}</span>
                            </div>
                            <p className="text-emerald-600 font-semibold text-sm flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              Rp {d.amount.toLocaleString('id-ID')}
                            </p>
                            {d.message && <p className="text-slate-500 text-xs mt-2 italic bg-slate-50 p-2 rounded-lg">&ldquo;{d.message}&rdquo;</p>}
                         </div>
                      </div>
                    ))
                  )}
                  
                  {viewMode === 'recent' && donations.length === 0 && (
                    <div className="text-center text-slate-400 py-10">
                      <p>Belum ada donasi baru saat ini.</p>
                    </div>
                  )}

                  <div className="text-center pt-4">
                    <button className="text-xs font-bold text-slate-400 hover:text-emerald-600 transition-colors uppercase tracking-wider">
                      {viewMode === 'leaderboard' ? 'Lihat Semua Peringkat' : 'Lihat Semua Riwayat'}
                    </button>
                  </div>
                </div>
                
                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}