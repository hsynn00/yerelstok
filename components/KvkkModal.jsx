'use client';

import { ShieldCheck, X } from 'lucide-react';

export default function KvkkModal({ isOpen, onClose, title, content }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm p-4 flex items-center justify-center">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 max-h-[85vh] flex flex-col">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3 shrink-0">
          <h3 className="font-extrabold text-sm text-[#12355b] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#12805c]" /> {title || 'KVKK Aydınlatma Metni'}
          </h3>
          <button onClick={onClose} className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-y-auto space-y-3 text-xs text-[#5b6f82] leading-relaxed pr-1">
          <p>
            <strong>Veri Sorumlusu:</strong> Var Mı Platformu olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, veri sorumlusu sıfatıyla kişisel verilerinizi aşağıda açıklanan kapsamda işlemekteyiz.
          </p>
          <p>
            <strong>İşlenen Veriler ve Amaçları:</strong> Esnaf ve saha kullanıcılarımızın konum bilgileri, telefon numaraları, VKN ve görsel doğrulamaları; platform içi güvenlik, sahtecilik önleme (anti-fraud) ve stok sorgulama hizmetlerinin kesintisiz yürütülmesi amacıyla işlenmektedir.
          </p>
          <p>
            <strong>Haklarınız:</strong> KVKK'nın 11. maddesi gereğince veri sahibi olarak haklarınızı kullanmak için destek@varmi.com adresinden bizimle iletişime geçebilirsiniz.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#12355b] hover:bg-[#0d2744] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shrink-0"
        >
            Anladım / Kapat
        </button>
      </div>
    </div>
  );
}