import HeaderAndChat from '../components/HeaderAndChat';
import MapSearch from '../components/MapSearch';
import ShopDashboard from '../components/ShopDashboard';
import RewardDashboard from '../components/RewardDashboard';

export default function Home() {
  return (
    <main className="space-y-6 bg-slate-50 min-h-screen pb-12">
      {/* 1. Üst Bar ve Profil Girişleri */}
      <HeaderAndChat />

      {/* 2. Harita & Konum Bazlı Arama Modülü */}
      <MapSearch />

      {/* 3. Esnaf Yönetim Paneli (Stok Ekleme & 55$ Ödeme) */}
      <ShopDashboard />

      {/* 4. Kullanıcı Reklam & Prim Paneli (10 Reklam + IBAN) */}
      <RewardDashboard />
    </main>
  );
}