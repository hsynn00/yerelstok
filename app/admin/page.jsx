'use client';

import { useState } from 'react';
import AdminModal from '@/components/AdminModal';
import { ShieldCheck, Lock } from 'lucide-react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Varsayılan yönetici şifresi: admin123
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      {!isAuthenticated ? (
        <div className="bg-white p-6 rounded-2xl border border-[#dfe8f1] shadow-sm max-w-sm w-full space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="p-2.5 bg-[#12355b] text-white rounded-xl">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-[#12355b]">Yönetici Girişi</h2>
              <p className="text-xs text-[#5b6f82]">Yalnızca yetkili personel erişebilir.</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-3 text-xs">
            <div>
              <label className="block text-[#18314c] font-bold mb-1">Yönetici Şifresi</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#12355b]"
              />
            </div>

            {error && (
              <p className="text-rose-600 font-bold text-[11px]">Hatalı şifre! Lütfen tekrar deneyin.</p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-[#12355b] hover:bg-[#0d2744] text-white font-bold rounded-xl transition-colors cursor-pointer"
            >
              Paneli Aç
            </button>
          </form>
        </div>
      ) : (
        <AdminModal
          isOpen={true}
          onClose={() => setIsAuthenticated(false)}
          onToast={(msg) => alert(msg)}
        />
      )}
    </div>
  );
}