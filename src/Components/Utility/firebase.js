// import firebase from "firebase/app"
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8ONxJAw_SUAP0Q6Q8a_eq5-1qYv8E184",
  authDomain: "project-f9575.firebaseapp.com",
  projectId: "project-f9575",
  storageBucket: "project-f9575.appspot.com",
  messagingSenderId: "925692439589",
  appId: "1:925692439589:web:d38c8202404818d118a3cc",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = app.firestore()
// const authentication=firebase.auth()
// const firestore= firebase.firestore()
