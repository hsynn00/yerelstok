import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Sana özel Firebase Yapılandırması
const firebaseConfig = {
  apiKey: "AIzaSyBFbyKkfkEtPMIE9xZL-dPr9j1wePTbZU4",
  authDomain: "yerelstok.firebaseapp.com",
  projectId: "yerelstok",
  storageBucket: "yerelstok.firebasestorage.app",
  messagingSenderId: "357434195955",
  appId: "1:357434195955:web:fcf778dda24a8a545ddc86",
  measurementId: "G-6C61TXH30G"
};

// Firebase'i Başlat
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);