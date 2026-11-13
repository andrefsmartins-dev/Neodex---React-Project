// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: "neodex-5ca12.firebasestorage.app",
    messagingSenderId: "1049788928177",
    appId: "1:1049788928177:web:9484d6dac808191e61d290",
    measurementId: "G-Q4599EP824"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Autenticação
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Firestore
const db = getFirestore(app);

export { auth, provider, db };
export default app;
