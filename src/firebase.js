// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCWq2nRiL-FFCE2zkFfMCP8ZQ0-QWILQRM",
    authDomain: "likey-603a7.firebaseapp.com",
    projectId: "likey-603a7",
    storageBucket: "likey-603a7.appspot.com",
    messagingSenderId: "731942506943",
    appId: "1:731942506943:web:6538bc43ccccf15947910a",
    measurementId: "G-L0B33FMX1Z"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);