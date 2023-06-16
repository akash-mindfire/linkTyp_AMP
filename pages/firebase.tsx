import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyBewhWQStyvDHv2VvigEtcdxzuDHZ51-LI",
  authDomain: "linktyp.firebaseapp.com",
  projectId: "linktyp",
  storageBucket: "linktyp.appspot.com",
  messagingSenderId: "129994287826",
  appId: "1:129994287826:web:aa6c2e086f2bbe8fe69b0b",
  measurementId: "G-STF0N630ED"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();