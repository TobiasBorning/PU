// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9ZaFa2SIpqztp33Vkc4wLdvIeQUEeXC8",
  authDomain: "moviemate-ee6ad.firebaseapp.com",
  projectId: "moviemate-ee6ad",
  storageBucket: "moviemate-ee6ad.appspot.com",
  messagingSenderId: "419945655984",
  appId: "1:419945655984:web:4438f1af3b03ea060f1575",
  measurementId: "G-2LY2B4JPQJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

