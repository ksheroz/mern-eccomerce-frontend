import firebase from "firebase/app";
import "firebase/auth";

//config
const firebaseConfig = {
  apiKey: "AIzaSyCuF88Rskn3_VJRjqxASZ3hByXEqOh69Xk",
  authDomain: "mern-eccomerce-applicati-f3442.firebaseapp.com",
  projectId: "mern-eccomerce-applicati-f3442",
  storageBucket: "mern-eccomerce-applicati-f3442.appspot.com",
  messagingSenderId: "508174304611",
  appId: "1:508174304611:web:8a8911de048b0f6e8cff56",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
