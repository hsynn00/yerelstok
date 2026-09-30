"use client";

import React from "react";
import Image from "next/image";
import { Pencil, Package } from "lucide-react";

interface ProductProps {
  id: string;
  name: string;
  code: string;
  count: number;
  unit?: string;
  imageUrl?: string;
  onEdit: (product: any) => void;
}

export default function StockCard({
  id,
  name,
  code,
  count,
  unit = "adet",
  imageUrl,
  onEdit,
}: ProductProps) {
  return (
    <article className="stock-row rounded-2xl bg-white border border-[#dfe8f1] p-3 flex items-center gap-3 transition-all hover:shadow-sm">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="w-14 h-14 rounded-xl object-cover"
          loading="lazy"
        />
      ) : (
        <span className="w-14 h-14 rounded-xl bg-[#eaf1f7] text-[#12355b] grid place-items-center">
          <Package className="w-6 h-6" />
        </span>
      )}

      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-bold text-[#18314c] truncate">{name}</h3>
        <p className="text-xs text-[#5b6f82] mt-1">Kod: {code || "—"}</p>
      </div>

      <span className="rounded-lg bg-[#effaf5] text-[#12805c] px-2.5 py-1 text-xs font-bold whitespace-nowrap">
        {count} {unit}
      </span>

      <button
        onClick={() => onEdit({ id, name, code, count, unit, imageUrl })}
        className="w-9 h-9 rounded-xl bg-[#eaf1f7] text-[#12355b] hover:bg-[#d8e5f0] transition-colors grid place-items-center"
        type="button"
        aria-label={`${name} düzenle`}
      >
        <Pencil className="w-4 h-4" />
      </button>
    </article>
  );
}