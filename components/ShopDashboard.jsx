'use client';

import React, { useState, useEffect } from 'react';
import { Store, Plus, FileSpreadsheet, CreditCard, Eye, Lock, CheckCircle2, Clock, Trash2 } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

export default function ShopDashboard() {
  const [isPublished, setIsPublished] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', code: '', stock: '' });
  const [loading, setLoading] = useState(true);

  // VERİTABANINDAN ÜRÜNLERİ ÇEKME (READ)
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productList);
    } catch (error) {
      console.error("Veri çekme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // VERİTABANINA YENİ ÜRÜN EKLEME (CREATE)
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.stock) return;

    try {
      const docRef = await addDoc(collection(db, "products"), {
        name: newProduct.name,
        code: newProduct.code,
        stock: Number(newProduct.stock),
        createdAt: new Date()
      });
      setProducts([...products, { id: docRef.id, ...newProduct }]);
      setNewProduct({ name: '', code: '', stock: '' });
    } catch (error) {
      console.error("Ürün ekleme hatası:", error);
    }
  };

  // VERİTABANINDAN ÜRÜN SİLME (DELETE)
  const handleDeleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error("Ürün silme hatası:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* ÜST BİLGİ & DURUM BARI */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center font-bold">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-800">Yılmaz Sanayi Cıvata</h1>
              {isPublished ? (
                <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Yayında (Aktif)
                </span>
              ) : (
                <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Taslak Modu
                </span>
              )}
            </div>
            <p className="text-sm text-slate-500 mt-0.5">Çalışma Saatleri: 08:30 - 19:00</p>
          </div>
        </div>

        {!isPublished ? (
          <button
            onClick={() => setShowPaymentModal(true)}
            className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2"
          >
            <CreditCard className="w-4 h-4" /> Dükkanı Yayınla (55 $ / Aylık)
          </button>
        ) : (
          <button className="bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-sm font-medium border border-slate-200 flex items-center gap-2 cursor-default">
            <Eye className="w-4 h-4" /> Dükkan Müşterilere Açık
          </button>
        )}
      </div>

      {/* STOK EKLEME VE LİSTELEME */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="font-bold text-slate-800 text-base">Yeni Ürün Ekle</h2>
          
          <form onSubmit={handleAddProduct} className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-600">Ürün Adı</label>
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                placeholder="Örn: M8 Çelik Somun"
                className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-semibold text-slate-600">Stok Kodu</label>
                <input
                  type="text"
                  value={newProduct.code}
                  onChange={(e) => setNewProduct({ ...newProduct, code: e.target.value })}
                  placeholder="STK-102"
                  className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600">Stok Adedi</label>
                <input
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  placeholder="100"
                  className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-slate-800 hover:bg-slate-900 text-white font-medium py-2.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Veritabanına Kaydet
            </button>
          </form>
        </div>

        {/* CANLI STOK LİSTESİ TABLOSU */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="font-bold text-slate-800 text-base mb-4">Canlı Veritabanı Stok Listesi</h2>
          
          {loading ? (
            <p className="text-xs text-slate-400">Veriler yükleniyor...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-400 font-semibold text-xs uppercase border-b border-slate-100">
                  <tr>
                    <th className="p-3">Ürün Adı</th>
                    <th className="p-3">Stok Kodu</th>
                    <th className="p-3 text-center">Adet</th>
                    <th className="p-3 text-right">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="p-4 text-center text-xs text-slate-400">
                        Henüz eklenmiş ürün yok. Soldan yeni ürün ekleyebilirsiniz.
                      </td>
                    </tr>
                  ) : (
                    products.map((prod) => (
                      <tr key={prod.id} className="hover:bg-slate-50/50">
                        <td className="p-3 font-medium text-slate-800">{prod.name}</td>
                        <td className="p-3 text-slate-500 font-mono text-xs">{prod.code || '-'}</td>
                        <td className="p-3 text-center font-bold text-emerald-700">{prod.stock}</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => handleDeleteProduct(prod.id)}
                            className="text-rose-500 hover:text-rose-700 p-1.5 hover:bg-rose-50 rounded-lg transition-all flex items-center gap-1 ml-auto text-xs font-medium"
                          >
                            <Trash2 className="w-4 h-4" /> Sil
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}