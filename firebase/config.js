// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import * as firebase from "firebase/app";
// import "firebase/auth";

import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGIN_SENDER_ID,
  APP_ID,
} from "@env";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// console.log(API_KEY);
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${API_KEY}`,
  authDomain: `${AUTH_DOMAIN}`,
  projectId: `${PROJECT_ID}`,
  storageBucket: `${STORAGE_BUCKET}`,
  messagingSenderId: `${MESSAGIN_SENDER_ID}`,
  appId: `${APP_ID}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export default firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
