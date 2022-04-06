// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhL79bcaBcn9mUTvzoWmhwcXQoPuZ3Bg0",
  authDomain: "aprta-react-basic.firebaseapp.com",
  projectId: "aprta-react-basic",
  storageBucket: "aprta-react-basic.appspot.com",
  messagingSenderId: "688012679863",
  appId: "1:688012679863:web:95a2f6dd64df57785e4b32",
  measurementId: "G-F3M9F2T9KV"
};

initializeApp(firebaseConfig);
// Initialize Firebase
// const app = initializeApp(firebaseConfig);

export const db = getFirestore();