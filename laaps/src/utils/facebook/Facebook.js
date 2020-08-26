import React, { useCallback } from "react";
import { auth, app } from "../firebase/Firebase";

import "../../assets/styles/social.css";

function Facebook() {
  const signUpFacebook = useCallback(() => {
    const providerFb = new app.auth.FacebookAuthProvider();
    app
      .auth()
      .signInWithPopup(providerFb)
      .then(function (result) {
        const token = result.credential.accessToken;
        const user = result.user;
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
        id="facebookSignIn"
        className="button is-medium is-facebook"
        // onClick={() => signUpFacebook()}
      >
        <span className="icon">
          <i className="fab fa-facebook"> </i>
        </span>
        <span>Enlazar a Facebook</span>
      </button>
    </div>
  );
}

export default Facebook;