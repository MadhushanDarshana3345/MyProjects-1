// Import the functions you need from the SDKs you need
import firebaseConfig from "../../../firebaseconfig";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(firebaseConfig);

/*create variables */
export const GoogleAuth = getAuth(app)

/*popup and google registration function */
const Googleprovider = new GoogleAuthProvider()
export const SignInWithGoogle = () => {
  signInWithPopup(GoogleAuth, Googleprovider)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
/*popup and google registration function */

/*popup and Facebook registration function */
const Facebookprovider = new FacebookAuthProvider();
export const SignInWithFacebook = () => {
  signInWithPopup(GoogleAuth, Facebookprovider)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
/*popup and Facebook registration function */

export default app;