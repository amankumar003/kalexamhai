// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwhfZVmW52Q9qQKmrXv16LuUxTFncgU1E",
  authDomain: "kalexamhai-1e960.firebaseapp.com",
  projectId: "kalexamhai-1e960",
  storageBucket: "kalexamhai-1e960.appspot.com",
  messagingSenderId: "313692430123",
  appId: "1:313692430123:web:5e8da4d2fefad5049f2f6e",
  measurementId: "G-9Z4H9RYQ69",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, app, db, storage };
