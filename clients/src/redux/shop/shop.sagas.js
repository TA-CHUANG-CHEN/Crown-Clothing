import { takeEvery, call, put, all } from "redux-saga/effects";
import {
  firestore,
  convertCollectionSnapshotToMap,
} from "../../firebase/firebase.utils";
import ShopActionTypes from "./shop.types";
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from "./shop.actions";

export function* fetchCollectionsAsync() {
  try {
    const collectionsRef = firestore.collection("collections");
    const snapshot = yield collectionsRef.get();
    const collectionsMap = yield call(convertCollectionSnapshotToMap, snapshot); //call is effect , invoke function, sec will be parameter.
    yield put(fetchCollectionsSuccess(collectionsMap)); // put create/(disptach) action
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
  /* collectionsRef
    .get()
    .then((snapshot) => {
      const collectionsMap = convertCollectionSnapshotToMap(snapshot);
      dispatch(fetchCollectionsSuccess(collectionsMap)); // step:2  success to access data
    })
    .catch((error) => dispatch(fetchCollectionsFailure(error.message))); // step:2  catch if fetch failure, */
}
export function* fetchCollectionsStart() {
  yield takeEvery(
    //listening action
    ShopActionTypes.FETCH_COLLECTIONS_STARTS,
    fetchCollectionsAsync
  );
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}
