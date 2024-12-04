// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeHRI-jdf3WSsdUplU0zCKkO-HpOBKuP0",
  authDomain: "finanztracker-5ae31.firebaseapp.com",
  projectId: "finanztracker-5ae31",
  storageBucket: "finanztracker-5ae31.firebasestorage.app",
  messagingSenderId: "1025336609350",
  appId: "1:1025336609350:web:84b78ed08ba2051c411847"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);