import ShopActionTypes from "./shop.types";
import {
  firestore,
  convertCollectionSnapshotToMap,
} from "../../firebase/firebase.utils";

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_STARTS,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

export const fetchCollectionsStartAsync = () => {
  // that how thunk doing, handle asynchronuous function to dispatch action.
  return (dispatch) => {
    const collectionsRef = firestore.collection("collections");
    dispatch(fetchCollectionsStart()); // step:1 fetching api
    collectionsRef
      .get()
      .then((snapshot) => {
        const collectionsMap = convertCollectionSnapshotToMap(snapshot);
        dispatch(fetchCollectionsSuccess(collectionsMap)); // step:2  success to access data
      })
      .catch((error) => dispatch(fetchCollectionsFailure(error.message))); // step:2  catch if fetch failure,
  };
};
