import UserActionTypes from "./user.types";

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER, //tell  reducer what action it should take,
  payload: user, // the data that your reducer will use to update the state
});

export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START,
});

export const googleSignInSuccess = (user) => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_SUCCESS,
  payload: user,
});
export const googleSignInFailure = (error) => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_FAILURE,
  payload: error,
});

export const emailSignInStart = ({ emailAndPassword }) => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START,
  payload: emailAndPassword,
});

export const emailSignInSuccess = (user) => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_SUCCESS,
  payload: user,
});
export const emailSignInFailure = (error) => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_FAILURE,
  payload: error,
});
