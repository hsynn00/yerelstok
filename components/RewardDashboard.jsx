'use client';

import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { Lock, CheckCircle2, Clock, MapPin, Store, AlertCircle } from 'lucide-react';

export default function RewardDashboard() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId] = useState('user_123'); // İleride gerçek kullanıcı ID'si gelecek

  // Firestore'dan dükkanları ve ziyaret durumlarını çek
  const fetchShops = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'shops'));
      const shopList = querySnapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data()
      }));
      setShops(shopList);
    } catch (error) {
      console.error('Dükkanlar yüklenirken hata oluştu:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  // Dükkan Durumunu Hesapla (Açık, Rezerve, Kilitli)
  const getShopStatus = (shop) => {
    const now = new Date().getTime();

    // 1. Ziyaret Tamamlanmış ve 24 saatlik Cooldown süresi dolmamış
    if (shop.lastVisitedAt) {
      const lastVisitTime = shop.lastVisitedAt.seconds * 1000;
      const hoursSinceVisit = (now - lastVisitTime) / (1000 * 60 * 60);
      if (hoursSinceVisit < 24) {
        const remainingHours = Math.ceil(24 - hoursSinceVisit);
        return { status: 'VISITED', message: `Ziyaret Edildi (${remainingHours}s kilitli)`, isLocked: true };
      }
    }

    // 2. Bir primci tarafımdan 2 saatliğine rezerve edilmiş
    if (shop.reservedAt && shop.reservedBy) {
      const reserveTime = shop.reservedAt.seconds * 1000;
      const hoursSinceReserve = (now - reserveTime) / (1000 * 60 * 60);
      if (hoursSinceReserve < 2) {
        if (shop.reservedBy === currentUserId) {
          return { status: 'MY_RESERVATION', message: 'Sizin Rezervasyonunuz (Süre: <2s)', isLocked: false };
        }
        return { status: 'RESERVED', message: 'Başka Bir Primci Yolda', isLocked: true };
      }
    }

    // 3. Ziyarete Açık
    return { status: 'AVAILABLE', message: 'Ziyarete Açık', isLocked: false };
  };

  // Görev Kapma / Rezerve Etme
  const handleReserve = async (shopId) => {
    try {
      const shopRef = doc(db, 'shops', shopId);
      await updateDoc(shopRef, {
        reservedBy: currentUserId,
        reservedAt: Timestamp.now()
      });
      alert('Dükkan 2 saatliğine sizin için rezerve edildi! Lütfen adrese gidip ziyareti tamamlayın.');
      fetchShops();
    } catch (error) {
      console.error('Rezervasyon hatası:', error);
    }
  };

  // Ziyaret Tamamlama
  const handleCompleteVisit = async (shopId) => {
    try {
      const shopRef = doc(db, 'shops', shopId);
      await updateDoc(shopRef, {
        lastVisitedAt: Timestamp.now(),
        reservedBy: null,
        reservedAt: null
      });
      alert('Ziyaret başarıyla onaylandı ve prim hesabınıza aktarıldı. Dükkan 24 saat kilitlendi.');
      fetchShops();
    } catch (error) {
      console.error('Ziyaret tamamlama hatası:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Store className="w-6 h-6 text-emerald-700" /> Saha Ziyareti & Prim Görevleri
        </h1>
        <p className="text-slate-500 text-xs mt-1">
          Esnafları ziyaret ederek canlı stok kontrolü yapın ve prim kazanın. Aynı dükkana birden fazla primci gidemez.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400 text-sm">Ziyaret noktaları yükleniyor...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shops.map((shop) => {
            const { status, message, isLocked } = getShopStatus(shop);

            return (
              <div
                key={shop.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isLocked
                    ? 'bg-slate-50 border-slate-200 opacity-75'
                    : 'bg-white border-slate-200 hover:border-emerald-500 shadow-sm'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-slate-800">{shop.name || 'Örnek Esnaf Dükkanı'}</h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5" /> {shop.address || 'Sanayi Sitesi No: 12'}
                    </p>
                  </div>

                  {/* Rozetler */}
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                      status === 'VISITED'
                        ? 'bg-slate-200 text-slate-700'
                        : status === 'RESERVED'
                        ? 'bg-amber-100 text-amber-800'
                        : status === 'MY_RESERVATION'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {isLocked ? <Lock className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    {message}
                  </span>
                </div>

                {/* Buton İşlemleri */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                  {status === 'AVAILABLE' && (
                    <button
                      onClick={() => handleReserve(shop.id)}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      Görevi Kap (2s Rezerve Et)
                    </button>
                  )}

                  {status === 'MY_RESERVATION' && (
                    <button
                      onClick={() => handleCompleteVisit(shop.id)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Ziyareti Tamamla
                    </button>
                  )}

                  {isLocked && (
                    <button
                      disabled
                      className="px-4 py-2 bg-slate-200 text-slate-400 rounded-xl text-xs font-semibold cursor-not-allowed flex items-center gap-1.5"
                    >
                      <Lock className="w-3.5 h-3.5" /> Ziyarete Kapalı
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}