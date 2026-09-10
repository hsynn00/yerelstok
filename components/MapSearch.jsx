'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Phone, Search, Clock, Store } from 'lucide-react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function MapSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // VERİTABANINDAKİ CANLI ÜRÜNLERİ VE DÜKKANLARI ÇEK
  useEffect(() => {
    const fetchLiveProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const list = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(list);
      } catch (error) {
        console.error("Arama verisi çekilemedi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveProducts();
  }, []);

  // FİLTRELEME MANTIĞI
  const filteredProducts = products.filter(item => 
    item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.code?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        
        {/* ARAMA BARI */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-700" /> Canlı Stok & Harita Arama
            </h2>
            <p className="text-xs text-slate-500">Veritabanındaki gerçek ürünleri anlık arayın</p>
          </div>

          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ürün adı veya kod yazın (Örn: Somun)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            <Search className="absolute left-3 top-3 text-slate-400 w-4 h-4" />
          </div>
        </div>

        {/* LİSTELEME EKRANI */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {loading ? (
              <p className="text-xs text-slate-400 p-2">Stoklar taranıyor...</p>
            ) : filteredProducts.length === 0 ? (
              <div className="p-6 text-center border border-dashed border-slate-200 rounded-xl">
                <p className="text-xs text-slate-400">Aradığınız kriterde ürün bulunamadı.</p>
              </div>
            ) : (
              filteredProducts.map((item) => (
                <div key={item.id} className="p-4 rounded-xl border border-slate-200 hover:border-emerald-600 bg-white transition-all space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">{item.name}</h3>
                      <p className="text-[11px] text-slate-400 font-mono">KOD: {item.code || 'Yok'}</p>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 font-bold text-xs px-2.5 py-1 rounded-full">
                      {item.stock} Adet
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-50 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 font-medium text-slate-700">
                      <Store className="w-3.5 h-3.5 text-emerald-700" /> Yılmaz Sanayi Cıvata
                    </span>
                    <span className="text-emerald-700 font-semibold">1.2 km uzaklıkta</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* HARİTA SİMÜLASYONU */}
          <div className="lg:col-span-3 bg-slate-100 rounded-2xl border border-slate-200 p-4 flex flex-col justify-between relative overflow-hidden min-h-[300px]">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            <div className="relative z-10 flex-1 flex items-center justify-center">
              <div className="bg-white border-2 border-emerald-600 px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce">
                <MapPin className="w-5 h-5 text-emerald-700" />
                <div>
                  <p className="text-xs font-bold text-slate-800">Bulunan Stok Lokasyonu</p>
                  <p className="text-[10px] text-emerald-700 font-semibold">İkitelli OSB - İstanbul</p>
                </div>
              </div>
            </div>

            <div className="relative z-10 bg-white p-3.5 rounded-xl border border-slate-200 shadow-md flex items-center justify-between">
              <span className="text-xs text-slate-600 font-medium">En yakın eşleşen dükkanla iletişime geçin</span>
              <button className="bg-emerald-700 hover:bg-emerald-800 text-white font-medium px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all">
                <Navigation className="w-3.5 h-3.5" /> Yol Tarifi
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}