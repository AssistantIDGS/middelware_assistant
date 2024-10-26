// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0nRgK7clK8gPRMYMpugQ7jS3Ec-9rij8",
  authDomain: "iac-assistant.firebaseapp.com",
  projectId: "iac-assistant",
  storageBucket: "iac-assistant.appspot.com",
  messagingSenderId: "19534948400",
  appId: "1:19534948400:web:a45bddf93695bf89b165f5"
};

// Initialize Firebase
const appAuth = initializeApp(firebaseConfig);

const auth = getAuth(appAuth);

export const UserRegister = async(auth, email, password) =>{
    const user = await createUserWithEmailAndPassword(auth, email, password)
  
} 
