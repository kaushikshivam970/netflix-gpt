import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
//   import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";

export const signupNewUser = (email, password, name) => {
  try {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        updateProfile(user, {
          displayName: name,
        });
        return {
          isUserSignedUp: true,
          userInfo: user,
          message: "User Signed Up Successfully",
        };
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return { isUserSignedUp: false, message: errorMessage };
      });
    // console.log("FIREBASE SIGNUP RESPONSE",res)
  } catch (error) {
    console.log(error);
  }
};

export const signinUser =  (email, password) => {
  try {
    return signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials)=>{
      const user = userCredentials.user;
      return {
      isUserSignedIn: true,
      userInfo: user,
      message: "User Signed In Successfully",
    };
    })
    .catch((error)=>{
      const errorCode = error.code;
      const errorMessage = error.message;
      return { isUserSignedIn: false, message: errorMessage };
    })
  } catch (error) {
    console.log(error.errors);
  }
};
