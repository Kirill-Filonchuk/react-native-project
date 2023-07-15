import auth from "../../firebase/config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { authSlice } from "./authReducer.js";
// console.log(db);
// console.log("db", createUserWithEmailAndPassword());
// const auth = getAuth();
//login equil nickName
export const authSignUpUser =
  ({ email, password, login }) =>
  async (dispatch, getState) => {
    console.log("{ email, password, login }", { email, password, login });
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: login,
      });
      // await auth.currentUser ?! BUT work without await in this !!!
      const { displayName, uid } = auth.currentUser;

      const updateUserProfile = {
        userId: uid,
        nickName: displayName,
      };
      console.log("updateUSER authSignUpUser ->", updateUserProfile);

      dispatch(authSlice.actions.updateUserProfile(updateUserProfile));
    } catch (error) {
      console.log("error message", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("authSignIn", user);
    } catch (error) {
      console.log("error message", error.message);
      console.log("error code", error.code);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(authSlice.actions.authSignOut());
  } catch (error) {
    console.log("error message", error.message);
    console.log("error code", error.code);
  }
};

//роверяет не выходилили мы ранее из приложения
export const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      const updateUserProfile = {
        userId: user.uid,
        nickName: user.displayName,
      };
      dispatch(authSlice.actions.updateUserProfile(updateUserProfile));
      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
    }
  });
};

// export { authSignUpUser, authSignInUser, authSignOutUser };
