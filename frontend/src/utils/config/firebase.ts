import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "budget-tracker-a6e01.firebaseapp.com",
    projectId: "budget-tracker-a6e01",
    storageBucket: "budget-tracker-a6e01.appspot.com",
    messagingSenderId: "764522575457",
    appId: "1:764522575457:web:2c7a52afa5360d2813dc20",
    measurementId: "G-T3564JHRG5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };