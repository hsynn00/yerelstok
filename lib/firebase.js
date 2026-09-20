import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Gerçek Firebase Konfigürasyonunuz
const firebaseConfig = {
  apiKey: "AIzaSyBFbyKkfkEtPMIE9xZL-dPr9j1wePTbZU4",
  authDomain: "yerelstok.firebaseapp.com",
  projectId: "yerelstok",
  storageBucket: "yerelstok.firebasestorage.app",
  messagingSenderId: "357434195955",
  appId: "1:357434195955:web:fcf778dda24a8a545ddc86",
  measurementId: "G-6C61TXH30G"
};

// Çift başlatmayı önleyen güvenli başlatma
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;