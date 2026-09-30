"use client";

import React, { useState } from "react";

interface RequestItem {
  id: number;
  customerName: string;
  question: string;
  answered?: boolean;
}

export default function RequestsPanel({ onToast }: { onToast: (msg: string) => void }) {
  const [requests, setRequests] = useState<RequestItem[]>([
    { id: 1, customerName: "Mert A.", question: "Honda Civic 2012 için ön fren balatası var mı?" },
    { id: 2, customerName: "Selin K.", question: "10 mm matkap ucu seti bugün teslim alınabilir mi?" },
  ]);

  const handleAnswer = (id: number) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, answered: true } : req))
    );
    onToast("Müşteriye stok yanıtı iletildi.");
  };

  return (
    <section className="bg-white rounded-2xl border border-[#dfe8f1] p-5 shadow-sm">
      <h2 className="font-extrabold text-2xl text-[#12355b]">Canlı Gelen Talepler</h2>
      <p className="text-sm text-[#5b6f82] mt-1">
        Müşterilerin stok sorularını tek dokunuşla yanıtlayın.
      </p>

      <div className="mt-5 space-y-3">
        {requests.map((req) => (
          <div
            key={req.id}
            className={`rounded-2xl border border-slate-200 p-4 transition-opacity ${
              req.answered ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <h3 className="text-sm font-bold text-[#18314c]">{req.customerName}</h3>
            <p className="text-xs text-[#5b6f82] mt-1">{req.question}</p>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <button
                onClick={() => handleAnswer(req.id)}
                className="bg-[#12805c] hover:bg-[#0f6b4d] text-white rounded-xl py-2 text-xs font-extrabold transition-colors"
                type="button"
              >
                VAR
              </button>
              <button
                onClick={() => handleAnswer(req.id)}
                className="bg-[#d92d20] hover:bg-[#b42318] text-white rounded-xl py-2 text-xs font-extrabold transition-colors"
                type="button"
              >
                YOK
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}