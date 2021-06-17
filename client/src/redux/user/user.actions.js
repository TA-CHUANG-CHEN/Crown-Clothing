import UserActionTypes from "./user.types";

/* export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER, //tell  reducer what action it should take,
  payload: user, // the data that your reducer will use to update the state
}); */

export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START,
});
export const emailSignInStart = (userCredentials) => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: userCredentials,
});
export const emailSignUpStart = (emailAndPassword) => ({
  type: UserActionTypes.EMAIL_SIGN_UP_START,
  payload: emailAndPassword,
});
export const SignUpSuccess = ({ user, additionalData }) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: { user, additionalData },
});
export const SignUpFailure = (error) => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error,
});
export const SignInSuccess = (user) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user,
});
export const SignInFailure = (error) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION,
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START,
});
export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
});
export const signOutFailure = (error) => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});
