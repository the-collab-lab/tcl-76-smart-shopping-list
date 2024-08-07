import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'FILL_ME_IN',
	authDomain: 'FILL_ME_IN',
	projectId: 'FILL_ME_IN',
	storageBucket: 'FILL_ME_IN',
	messagingSenderId: 'FILL_ME_IN',
	appId: 'FILL_ME_IN',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
