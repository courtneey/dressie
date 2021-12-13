import { initializeApp } from "firebase/app";
import "@firebase/auth";
import "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import secrets from "../../secrets";

const firebaseConfig = {
  apiKey: secrets.API_KEY,
  authDomain: secrets.AUTH_DOMAIN,
  projectId: secrets.PROJECT_ID,
  storageBucket: secrets.STORAGE_BUCKET,
  messagingSenderId: secrets.MESSAGING_SENDER_ID,
  appId: secrets.APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
