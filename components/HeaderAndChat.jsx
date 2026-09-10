'use client';

import React, { useState } from 'react';
import { User, Search, MessageSquare, LogOut, Settings, ShieldCheck, Headphones } from 'lucide-react';

export default function HeaderAndChat() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'login', 'chat', null
  const [userRole, setUserRole] = useState('guest'); // 'guest', 'user', 'shop', 'admin'
  const [chatMessages, setChatMessages] = useState([
    { sender: 'shop', text: 'Merhaba! Stok durumu sormak istediğiniz ürünü belirtebilirsiniz.' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    setChatMessages([...chatMessages, { sender: 'user', text: inputMessage }]);
    setInputMessage('');
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen font-sans">
      {/* ÜST BAR (HEADER) */}
      <header className="w-full bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        {/* LOGO */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-10 h-10 bg-emerald-700 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
            Y
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">YerelStok</span>
        </div>

        {/* ARAMA ÇUBUĞU */}
        <div className="flex-1 max-w-xl mx-6 relative">
          <input
            type="text"
            placeholder="Ürün adı, stok kodu veya marka arayın..."
            className="w-full pl-11 pr-4 py-2.5 bg-slate-100 border border-slate-200 rounded-full text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all text-sm"
          />
          <Search className="absolute left-4 top-3 text-slate-400 w-4 h-4" />
        </div>

        {/* SAĞ PROFİL İKONU VE MENÜ */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center hover:bg-emerald-50 hover:border-emerald-300 transition-all text-slate-700"
          >
            <User className="w-5 h-5" />
          </button>

          {/* PROFİL AÇILIR MENÜSÜ (DROPDOWN) */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in duration-150">
              {userRole === 'guest' ? (
                <>
                  <button
                    onClick={() => { setActiveModal('login'); setIsProfileOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 font-medium flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-emerald-700" /> Müşteri Girişi / Kayıt
                  </button>
                  <button
                    onClick={() => { setActiveModal('login'); setIsProfileOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 font-medium flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-700" /> Esnaf Girişi / Dükkan Aç
                  </button>
                </>
              ) : (
                <>
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs text-slate-400 font-semibold uppercase">Oturum Açıldı</p>
                    <p className="text-sm font-bold text-slate-800 capitalize">{userRole} Hesabı</p>
                  </div>
                  <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                    <Settings className="w-4 h-4" /> Ayarlar
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                    <Headphones className="w-4 h-4" /> İletişim & Destek
                  </button>
                  <button
                    onClick={() => setUserRole('guest')}
                    className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium"
                  >
                    <LogOut className="w-4 h-4" /> Çıkış Yap
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </header>

      {/* ÖRNEK DEMO İÇERİK & CANLI STOK SOR BUTONU */}
      <main className="max-w-5xl mx-auto p-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Örnek Dükkan: Yılmaz Sanayi Cıvata</h2>
            <p className="text-sm text-slate-500">Şu An Açık • Kapanış 19:00</p>
          </div>
          <button
            onClick={() => setActiveModal('chat')}
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-medium px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md active:scale-95 text-sm"
          >
            <MessageSquare className="w-4 h-4" /> Canlı Stok Sor
          </button>
        </div>
      </main>

      {/* MODAL: CANLI STOK CHAT PENCERESİ */}
      {activeModal === 'chat' && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-100 flex flex-col h-[500px] overflow-hidden">
            {/* CHAT HEADER */}
            <div className="bg-emerald-800 text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm">Yılmaz Sanayi Cıvata</h3>
                <p className="text-xs text-emerald-200">Canlı Stok İletişim Hattı</p>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-white/80 hover:text-white font-bold">✕</button>
            </div>

            {/* CHAT MESAJLARI */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${msg.sender === 'user' ? 'bg-emerald-700 text-white rounded-br-none' : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* MESAJ YAZMA ALANI */}
            <div className="p-3 bg-white border-t border-slate-200 flex gap-2">
              <input
                type="text"
                placeholder="Mesajınızı yazın..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 bg-slate-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 text-slate-700"
              />
              <button onClick={handleSendMessage} className="bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-emerald-800 transition-all">
                Gönder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: GİRİŞ YAP & KAYIT OL */}
      {activeModal === 'login' && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 border border-slate-100 relative">
            <button onClick={() => setActiveModal(null)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 font-bold">✕</button>
            <h3 className="text-xl font-bold text-slate-800 mb-1">Hesap Girişi</h3>
            <p className="text-xs text-slate-500 mb-4">Giriş türünü seçerek devam edin.</p>
            
            <div className="space-y-3">
              <button onClick={() => { setUserRole('user'); setActiveModal(null); }} className="w-full py-3 bg-emerald-700 text-white font-medium rounded-xl hover:bg-emerald-800 transition-all text-sm shadow-md">
                Müşteri Olarak Giriş Yap
              </button>
              <button onClick={() => { setUserRole('shop'); setActiveModal(null); }} className="w-full py-3 bg-slate-800 text-white font-medium rounded-xl hover:bg-slate-900 transition-all text-sm shadow-md">
                Esnaf Panelini Aç
              </button>
              <button onClick={() => { setUserRole('admin'); setActiveModal(null); }} className="w-full py-3 bg-amber-600 text-white font-medium rounded-xl hover:bg-amber-700 transition-all text-sm shadow-md">
                Yönetici (Admin) Girişi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}