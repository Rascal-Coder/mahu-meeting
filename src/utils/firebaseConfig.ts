import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';
const apiKey = import.meta.env.PUBLIC_FIREBASE_API_KEY;
const firebaseConfig = {
  apiKey,
  authDomain: 'mahu-meeting.firebaseapp.com',
  projectId: 'mahu-meeting',
  storageBucket: 'mahu-meeting.appspot.com',
  messagingSenderId: '110764292498',
  appId: '1:110764292498:web:759e4b395b3e636ab3e94b',
  measurementId: 'G-NT3V5M5JZC',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);
// users表和mettings表
export const usersRef = collection(firebaseDB, 'users');
export const meetingsRef = collection(firebaseDB, 'meetings');
