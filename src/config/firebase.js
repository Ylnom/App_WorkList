
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth,GoogleAuthProvider} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDC8rIfT3X6xoJrZbV7d13x25vBbKhgAAs", 
            authDomain: "worklist-9cba9.firebaseapp.com", 
            projectId: "worklist-9cba9", 
            storageBucket: "worklist-9cba9.appspot.com", 
            messagingSenderId: "380809590188", 
            appId: "1:380809590188:web:b2c8e6571e1b58cc033609", 
            measurementId: "G-N1RMSTHFEM" 
          };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth,provider};