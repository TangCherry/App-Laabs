import React, { useCallback } from "react";
import firebase from "../firebase/Firebase"
import { auth, app, db } from "../firebase/Firebase";

import "../../assets/styles/social.css";

function Google({ history }) {
  const signUpGoogle = useCallback(() => {
    const providerGoogle = new app.auth.GoogleAuthProvider();
    app
      .auth()
      .signInWithPopup(providerGoogle)
      .then(function (result) {
        const token = result.credential.accessToken;
        const user = result.user;
        history.push("/Profile")
        console.log('te registraste :p')
        db.collection('user').doc(user.uid).set({
          email: user.email,
          uid: user.uid,
          name: user.displayName,
          userName: user.displayName,
          photo: user.photoURL
        })       
      })
      .catch(function (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
      });
  }, []);

  return (
    <div>   
      <button
        id="googleSignIn"
        className="button is-medium is-google"
        onClick={(e) => signUpGoogle()}
      >
        <span className="icon">
          <i className="fab fa-google">
          </i>
        </span>
        <span>Enlazar a Google</span>
      </button>
    </div>
  );
}

export default Google;