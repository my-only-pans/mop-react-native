// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyA3mE3d886UCR207HwzkVloYnvOyzJSEGA",
  authDomain: "myonlypans.firebaseapp.com",
  projectId: "myonlypans",
  storageBucket: "myonlypans.appspot.com",
  messagingSenderId: "954313515532",
  appId: "1:954313515532:web:251326e168e67d9e264429",
  measurementId: "G-6PGMS5DNMP",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
