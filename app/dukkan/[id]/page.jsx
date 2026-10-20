'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { db } from '../../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Store, MapPin, Phone, Package, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ShopDetailPage() {
  const params = useParams();
  const shopId = params.id;
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const list = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(list);
      } catch (error) {
        console.error('Stok çekme hatası:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Link
        href="/arama"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Aramaya Dön
      </Link>

      {/* DÜKKAN BAŞLIK KARTI */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xl">
              <Store className="w-6 h-6 text-emerald-700" />
               Örnek Dükkan (ID: {shopId})
            </div>
            <p className="text-slate-500 text-sm flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400" /> Sanayi Sitesi 12. Blok No: 45, İstanbul
            </p>
          </div>
          <a
            href="tel:05555555555"
            className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl font-medium text-xs flex items-center gap-2 hover:bg-emerald-100 transition-colors"
          >
            <Phone className="w-4 h-4" /> Esnafı Ara
          </a>
        </div>
      </div>

      {/* STOK LİSTESİ */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="font-bold text-slate-800 flex items-center gap-2">
          <Package className="w-5 h-5 text-emerald-700" />
          Dükkandaki Canlı Stoklar
        </h2>

        {loading ? (
          <p className="text-sm text-slate-400">Stoklar yükleniyor...</p>
        ) : (
          <div className="divide-y divide-slate-100">
            {products.map((item) => (
              <div key={item.id} className="py-3 flex justify-between items-center text-sm">
                <div>
                  <p className="font-semibold text-slate-700">{item.name}</p>
                  <p className="text-xs text-slate-400">Kod: {item.code}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 rounded-full font-bold text-xs">
                    {item.stock} Adet Stokta
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}