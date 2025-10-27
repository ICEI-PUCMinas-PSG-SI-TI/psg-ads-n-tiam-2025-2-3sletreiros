import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBrhEsA-e-P-nCOdHVRB3sE3bPVsMyTkYo",
  authDomain: "tiam-c383c.firebaseapp.com",
  projectId: "tiam-c383c",
  storageBucket: "tiam-c383c.firebasestorage.app",
  messagingSenderId: "1044295244240",
  appId: "1:1044295244240:web:8d2a430c35355ab0d901d5"
};


const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
