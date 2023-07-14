import auth from "../../firebase/config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
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
      const updateUser = auth.currentUser;
      console.log("updateUSER authSignUpUser ->", updateUser);
      const { displayName, uid } = updateUser;

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          nickName: displayName,
        })
      );
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

export const authSignOutUser = () => async (dispatch, getState) => {};

//роверяет не выходилили мы ранее из приложения
export const authStateChangeUser = () => async (dispatch, getState) => {};

// export { authSignUpUser, authSignInUser, authSignOutUser };
