import firebaseConfig from "./firebase.config";
import firebase from "firebase/app";
import "firebase/auth";
import { useContext } from "react";
import { UserCotex } from "./App";

firebase.initializeApp(firebaseConfig);

const GoogleProvider = new firebase.auth.GoogleAuthProvider();

export const handleGoogleSignIn = () => {
    firebase.auth()
        .signInWithPopup(GoogleProvider)
        .then((result) => {
            const users = result.user;
            const newUser = {...users};
            console.log(newUser);
            return newUser;
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
}


