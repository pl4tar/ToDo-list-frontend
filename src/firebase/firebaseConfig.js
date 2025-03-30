import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAUzErCBu9TqJbOA-WV1jEcIXtQaIzLUe4',
  authDomain: 'todolist-30e16.firebaseapp.com',
  projectId: 'todolist-30e16',
  storageBucket: 'todolist-30e16.firebasestorage.app',
  messagingSenderId: '339577235021',
  appId: '1:339577235021:web:ef235ff33a72b74a515e04',
  measurementId: 'G-NBY9GD40X6',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
