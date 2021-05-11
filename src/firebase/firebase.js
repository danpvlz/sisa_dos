import firebase from "firebase/app";
import "firebase/database";

let config = {
  apiKey: "AIzaSyCOSJhqP8Y8vNo63WljzO4R-yntOmGT8WA",
  authDomain: "notificacionescclam.firebaseapp.com",
  databaseURL: "https://notificacionescclam-default-rtdb.firebaseio.com",
  projectId: "notificacionescclam",
  storageBucket: "notificacionescclam.appspot.com",
  messagingSenderId: "26097583979",
  appId: "1:26097583979:web:fed41f322f520c8d6f6e2e",
  measurementId: "G-PRXYCLT00D"
};

firebase.initializeApp(config);

export default firebase.database();