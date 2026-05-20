import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut 
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJiC8tSaaWxL-uKTyFiwFZc4GrbBzymPU",
  authDomain: "kinbo-f25e0.firebaseapp.com",
  projectId: "kinbo-f25e0",
  storageBucket: "kinbo-f25e0.firebasestorage.app",
  messagingSenderId: "120151065252",
  appId: "1:120151065252:web:35d7aad21b0276a635dc31",
  measurementId: "G-ENKEGQQMRC"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
};

export const logout = async () => {
  await signOut(auth);
};
