'use client';

import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { Lock, CheckCircle2, Clock, MapPin, Store, Camera, Navigation, AlertCircle, X } from 'lucide-react';

// İki koordinat arasındaki mesafeyi metre cinsinden hesaplayan Haversine Formülü
function getDistanceInMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Dünya yarıçapı (metre)
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function RewardDashboard() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId] = useState('user_123'); // Gerçek kullanıcı ID'si

  // Modal Durumları
  const [selectedShop, setSelectedShop] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [photo, setPhoto] = useState(null);
  const [verifying, setVerifying] = useState(false);

  const fetchShops = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'shops'));
      const shopList = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
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

  const getShopStatus = (shop) => {
    const now = new Date().getTime();

    if (shop.lastVisitedAt) {
      const lastVisitTime = shop.lastVisitedAt.seconds * 1000;
      const hoursSinceVisit = (now - lastVisitTime) / (1000 * 60 * 60);
      if (hoursSinceVisit < 24) {
        const remainingHours = Math.ceil(24 - hoursSinceVisit);
        return { status: 'VISITED', message: `Ziyaret Edildi (${remainingHours}s kilitli)`, isLocked: true };
      }
    }

    if (shop.reservedAt && shop.reservedBy) {
      const reserveTime = shop.reservedAt.seconds * 1000;
      const hoursSinceReserve = (now - reserveTime) / (1000 * 60 * 60);
      if (hoursSinceReserve < 2) {
        if (shop.reservedBy === currentUserId) {
          return { status: 'MY_RESERVATION', message: 'Sizin Rezervasyonunuz', isLocked: false };
        }
        return { status: 'RESERVED', message: 'Başka Bir Primci Yolda', isLocked: true };
      }
    }

    return { status: 'AVAILABLE', message: 'Ziyarete Açık', isLocked: false };
  };

  const handleReserve = async (shopId) => {
    try {
      const shopRef = doc(db, 'shops', shopId);
      await updateDoc(shopRef, {
        reservedBy: currentUserId,
        reservedAt: Timestamp.now(),
      });
      alert('Dükkan 2 saatliğine sizin için rezerve edildi!');
      fetchShops();
    } catch (error) {
      console.error('Rezervasyon hatası:', error);
    }
  };

  // Ziyaret Tamamlama Modalanı Aç ve Anlık GPS Konumunu Al
  const openCompleteModal = (shop) => {
    setSelectedShop(shop);
    setPhoto(null);
    setLocationError('');
    setUserLocation(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setLocationError('GPS konumunuz alınamadı. Lütfen konum iznini açın.');
        },
        { enableHighAccuracy: true }
      );
    } else {
      setLocationError('Cihazınız GPS konum servisini desteklemiyor.');
    }
  };

  // Fotoğraf Seçimi (Canlı Kamera)
  const handlePhotoCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Ziyaret Doğrulama ve Kaydetme
  const handleVerifyAndComplete = async () => {
    if (!photo) {
      alert('Lütfen dükkanın dışarıdan çekilmiş canlı fotoğrafını ekleyin.');
      return;
    }

    if (!userLocation) {
      alert('Konumunuz belirlenemedi. GPS izni verdiğinizden emin olun.');
      return;
    }

    // Esnafın varsayılan koordinatı (Yoksa İstanbul Sanayi varsayılanı alınır)
    const shopLat = selectedShop.latitude || 41.0082;
    const shopLng = selectedShop.longitude || 28.9784;

    const distance = getDistanceInMeters(
      userLocation.lat,
      userLocation.lng,
      shopLat,
      shopLng
    );

    // 100 Metre Sınırı Kontrolü
    if (distance > 100) {
      alert(
        `Konum Doğrulanamadı! Dükkandan yaklaşık ${Math.round(
          distance
        )} metre uzaktasınız. Onay için 100 metre mesafede olmalısınız.`
      );
      return;
    }

    try {
      setVerifying(true);
      const shopRef = doc(db, 'shops', selectedShop.id);
      await updateDoc(shopRef, {
        lastVisitedAt: Timestamp.now(),
        reservedBy: null,
        reservedAt: null,
        lastPhotoUrl: photo, // Canlı fotoğraf kaydedilir
      });

      alert('Tebrikler! Konum ve fotoğraf doğrulandı. Prim bakiyenize eklendi.');
      setSelectedShop(null);
      fetchShops();
    } catch (error) {
      console.error('Ziyaret doğrulama hatası:', error);
      alert('İşlem sırasında bir hata oluştu.');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Store className="w-6 h-6 text-emerald-700" /> Saha Ziyareti & GPS Doğrulama
        </h1>
        <p className="text-slate-500 text-xs mt-1">
          Dükkan ziyareti tamamlamak için dükkanın 100m yakınında olmalı ve canlı fotoğraf çekmelisiniz.
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
                      onClick={() => openCompleteModal(shop)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Camera className="w-4 h-4" /> Ziyareti Onayla & Foto Çek
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

      {/* KAMERA VE GPS DOĞRULAMA MODALI */}
      {selectedShop && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 relative shadow-2xl">
            <button
              onClick={() => setSelectedShop(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-bold text-slate-800 text-base flex items-center gap-2">
              <Camera className="w-5 h-5 text-emerald-700" />
              Saha Ziyaret Doğrulaması
            </h2>

            {/* GPS DURUMU */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <div className="flex items-center gap-2 text-slate-700 font-semibold">
                <Navigation className="w-4 h-4 text-blue-600 animate-pulse" />
                GPS Konum Durumu:
              </div>
              {userLocation ? (
                <p className="text-emerald-700 font-medium">✓ Anlık konum alındı (Yüksek Hassasiyet)</p>
              ) : locationError ? (
                <p className="text-rose-600">{locationError}</p>
              ) : (
                <p className="text-slate-400">Konumunuz hesaplanıyor...</p>
              )}
            </div>

            {/* FOTOĞRAF ÇEKME ALANI */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                Dükkan Dış Cephe Fotoğrafı (Canlı Kamera)
              </label>
              
              <input
                type="file"
                accept="image/*"
                capture="environment" // Doğrudan arka kamerayı açar
                onChange={handlePhotoCapture}
                className="hidden"
                id="cameraInput"
              />

              <label
                htmlFor="cameraInput"
                className="border-2 border-dashed border-slate-300 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-emerald-600 transition-colors bg-slate-50"
              >
                {photo ? (
                  <img src={photo} alt="Çekilen Fotoğraf" className="max-h-40 rounded-lg object-cover" />
                ) : (
                  <>
                    <Camera className="w-8 h-8 text-slate-400" />
                    <span className="text-xs text-slate-600 font-medium">Fotoğraf Çekmek İçin Tıklayın</span>
                  </>
                )}
              </label>
            </div>

            {/* ONAY BUTONU */}
            <button
              onClick={handleVerifyAndComplete}
              disabled={verifying}
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
            >
              {verifying ? 'Doğrulanıyor...' : 'Konum ve Fotoğrafı Onayla'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}