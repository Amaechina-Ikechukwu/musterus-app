import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: 'AIzaSyD2GAl1HkpnV0mujt3j63OtW9MoWj7dY6Q',
  authDomain: 'musterus-api.firebaseapp.com',
  projectId: 'musterus-api',
  storageBucket: 'musterus-api.appspot.com',
  messagingSenderId: '286455810620',
  appId: '1:286455810620:web:4c99980b809ac7dabdd139',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const storage = getStorage(app);
