import app from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import 'firebase/storage';

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBoW19eP8q0wierHFbYwHw0clhw9b3PzLs",
    authDomain: "app-labs-ad87f.firebaseapp.com",
    databaseURL: "https://app-labs-ad87f.firebaseio.com",
    projectId: "app-labs-ad87f",
    storageBucket: "app-labs-ad87f.appspot.com",
    messagingSenderId: "76663318652",
    appId: "1:76663318652:web:be205f6cff445e899641f9",
    measurementId: "G-WRNSP87WG5"
  };
  // Initialize Firebase
app.initializeApp(firebaseConfig);
// app.analytics()
const db = app.firestore();
const auth = app.auth();
const storage = app.storage();

export { db, auth, app, storage };