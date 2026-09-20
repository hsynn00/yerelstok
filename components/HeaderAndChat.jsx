'use client';

import { useState } from 'react';
import { MessageSquare, Send, Bot, X } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function HeaderAndChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Merhaba! Ben YerelStok Asistanı. Hangi ürünü veya dükkanı arıyorsunuz?' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: userMessage }]);
    setInput('');
    setLoading(true);

    try {
      // Firebase Firestore'dan stokları çekip arama yapıyoruz
      const querySnapshot = await getDocs(collection(db, 'products'));
      const products = querySnapshot.docs.map(doc => doc.data());
      
      const matched = products.filter(p => 
        p.name?.toLowerCase().includes(userMessage.toLowerCase()) ||
        p.code?.toLowerCase().includes(userMessage.toLowerCase())
      );

      let replyText = '';
      if (matched.length > 0) {
        replyText = `Sistemde aradığınız ürünle eşleşen ${matched.length} stok bulundu:\n` + 
          matched.map(m => `• ${m.name} (${m.stock} Adet Stokta)`).join('\n');
      } else {
        replyText = `"${userMessage}" kelimesiyle eşleşen canlı stok kaydı bulunamadı. Lütfen farklı bir ürün adı veya stok kodu deneyin.`;
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: replyText }]);
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: 'Stoklar kontrol edilirken bir hata oluştu.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-emerald-700 hover:bg-emerald-800 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center justify-center"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="bg-white w-80 sm:w-96 rounded-2xl shadow-2xl border border-slate-200 flex flex-col h-[450px] overflow-hidden">
          {/* BOT HEADER */}
          <div className="bg-emerald-800 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <span className="font-bold text-sm">YerelStok AI Asistan</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* SOHBET AKIŞI */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-emerald-700 text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200 shadow-sm rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-slate-400 italic text-[11px]">Stoklar taranıyor...</div>
            )}
          </div>

          {/* SOHBET GİRİŞ ALANI */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input
              type="text"
              placeholder="Ürün veya stok sor..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 text-xs bg-slate-100 border-none rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-600 outline-none"
            />
            <button
              type="submit"
              className="bg-emerald-700 text-white p-2 rounded-xl hover:bg-emerald-800 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}