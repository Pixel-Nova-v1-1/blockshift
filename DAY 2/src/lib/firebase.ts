// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzy6n_66HJR02SP-6pR-X0rhPHQ2WPJnw",
  authDomain: "blockshift01.firebaseapp.com",
  projectId: "blockshift01",
  storageBucket: "blockshift01.firebasestorage.app",
  messagingSenderId: "734359208284",
  appId: "1:734359208284:web:569081c162d4320c454199",
  measurementId: "G-7ZFYP6F8GM",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const initAnalytics = async () => {
  if (typeof window !== "undefined") {
    const supported = await isSupported();
    if (supported) {
      return getAnalytics(app);
    }
  }
  return null;
};

export { app };
