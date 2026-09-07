import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDzy6n_66HJR02SP-6pR-X0rhPHQ2WPJnw",
  authDomain: "blockshift01.firebaseapp.com",
  projectId: "blockshift01",
  storageBucket: "blockshift01.firebasestorage.app",
  messagingSenderId: "734359208284",
  appId: "1:734359208284:web:569081c162d4320c454199",
  measurementId: "G-7ZFYP6F8GM"
};

// Initialize Firebase (avoid re-initialization on hot reloads)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// Initialize analytics safely in browser environment
let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, db, analytics };
