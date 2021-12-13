import { initializeApp } from "firebase/app";
import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";
import secrets from "../../secrets";

const firebaseConfig = {
  apiKey: secrets.API_KEY,
  authDomain: secrets.AUTH_DOMAIN,
  projectId: secrets.PROJECT_ID,
  storageBucket: secrets.STORAGE_BUCKET,
  messagingSenderId: secrets.MESSAGING_SENDER_ID,
  appId: secrets.APP_ID,
};

// Initialize Firebase
if (!firebaseConfig.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
