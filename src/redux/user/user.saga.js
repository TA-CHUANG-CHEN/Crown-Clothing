import { takeLatest, put, all, call } from "redux-saga/effects";
import UserActionTypes from "./user.types";
import {
  SignInSuccess,
  SignInFailure,
  signOutSuccess,
  signOutFailure,
} from "./user.actions";
import {
  auth,
  googleProvider,
  creatUserProfileDocument,
  getCurrentUser,
} from "../../firebase/firebase.utils";

export function* getsnapshotFromUserAuth(userAuth) {
  try {
    const userRef = yield call(creatUserProfileDocument, userAuth);
    const userSnapshot = yield userRef.get();
    yield put(SignInSuccess({ id: userSnapshot, ...userSnapshot.data() }));
  } catch (error) {
    yield put(SignInFailure(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getsnapshotFromUserAuth(user);
  } catch (error) {
    yield put(SignInFailure(error));
  }
}

export function* SignInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getsnapshotFromUserAuth(user);
  } catch (error) {
    yield put(SignInFailure(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getsnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(SignInFailure(error));
  }
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onGoolgeSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, SignInWithEmail);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield all([
    call(onGoolgeSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
  ]);
}
