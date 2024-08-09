import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyC7Va6r7PL9JZrTz8jn1Lwqwr_yhSAs2do',
	authDomain: 'tcl-76-smart-shopping-list.firebaseapp.com',
	projectId: 'tcl-76-smart-shopping-list',
	storageBucket: 'tcl-76-smart-shopping-list.appspot.com',
	messagingSenderId: '283403874585',
	appId: '1:283403874585:web:ec2053accd744733f51588',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
