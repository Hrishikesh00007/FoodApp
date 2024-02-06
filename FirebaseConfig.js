import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCEFqLpeoXFvX7HbTlU284DFLmpkyA8FQ4",
    authDomain: "foodapp-843a2.firebaseapp.com",
    projectId: "foodapp-843a2",
    storageBucket: "foodapp-843a2.appspot.com",
    messagingSenderId: "54309618798",
    appId: "1:54309618798:web:b12144345cb43204e8927f"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase }