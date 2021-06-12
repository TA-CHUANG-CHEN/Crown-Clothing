import { takeLatest, put, all, call } from "redux-saga/effects";
import UserActionTypes from "./user.types";
import { googleSignInSuccess, googleSignInFailure } from "./user.actions";
import {
  auth,
  googleProvider,
  creatUserProfileDocument,
} from "../../firebase/firebase.utils";

export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    const userRef = yield call(creatUserProfileDocument, user);
    const userSnopshot = yield userRef.get();
    yield put(
      googleSignInSuccess({ id: userSnopshot, ...userSnopshot.data() })
    );
  } catch (error) {
    yield put(googleSignInFailure(error));
  }
}

export function* onGoolgeSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* userSagas() {
  yield all([call(onGoolgeSignInStart)]);
}
