// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mernblog-4f4c4.firebaseapp.com",
  projectId: "mernblog-4f4c4",
  storageBucket: "mernblog-4f4c4.appspot.com",
  messagingSenderId: "142806682711",
  appId: "1:142806682711:web:e23876df0b789889e06712"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);