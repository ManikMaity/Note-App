import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API,
    authDomain: "opendoor-db7d9.firebaseapp.com",
    projectId: "opendoor-db7d9",
    storageBucket: "opendoor-db7d9.appspot.com",
    messagingSenderId: "28724812891",
    appId: "1:28724812891:web:dfe6bd9850fb76dca8f37e"
  };


  const app = initializeApp(firebaseConfig);

  export default app;