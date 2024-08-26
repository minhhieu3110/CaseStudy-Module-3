// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB8G1zpHnT8kjIKuf1L4xsvJZ1Y0jWYG4o",
    authDomain: "case-study-module-3.firebaseapp.com",
    projectId: "case-study-module-3",
    storageBucket: "case-study-module-3.appspot.com",
    messagingSenderId: "251708724561",
    appId: "1:251708724561:web:ffadae25bb66b8d5a62f70",
    measurementId: "G-43G4FSJWBC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);