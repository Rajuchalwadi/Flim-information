import { initializeApp } from "firebase/app";
import {getFirestore , collection} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyBS3AdZ1w5AYOEKHFGejdGKJqnlT5xm8TE",
  authDomain: "flim-information.firebaseapp.com",
  projectId: "flim-information",
  storageBucket: "flim-information.appspot.com",
  messagingSenderId: "527836139433",
  appId: "1:527836139433:web:f1869d41449710dd72feb8"
};

 
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const coll = collection(db,"Movie")
export const rev = collection(db,"Review")
export const Sig = collection(db,"Signup")
export default app;