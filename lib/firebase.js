import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDummyKeyForYerelStokProject",
  authDomain: "yerelstok.firebaseapp.com",
  projectId: "yerelstok",
  storageBucket: "yerelstok.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Firebase uygulamasını tekrar tekrar başlatmayı önleme
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };