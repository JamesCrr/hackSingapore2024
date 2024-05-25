import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAk2R-O_xwYt4mesgemPyINewa2_tJ6JBA",
    authDomain: "hacksingapore-994e9.firebaseapp.com",
    projectId: "hacksingapore-994e9",
    storageBucket: "hacksingapore-994e9.appspot.com",
    messagingSenderId: "88119683880",
    appId: "1:88119683880:web:32b8cd6e198c4eade97e1d"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
