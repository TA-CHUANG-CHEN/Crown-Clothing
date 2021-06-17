import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  //Your web app's Firebase configuration
  apiKey: "AIzaSyBDeW4okDdFyONHAkEVX0p2kCWCQAVrcE4",
  authDomain: "crown-db-37538.firebaseapp.com",
  projectId: "crown-db-37538",
  storageBucket: "crown-db-37538.appspot.com",
  messagingSenderId: "982516620431",
  appId: "1:982516620431:web:bbb8ab26ece7cddd5ee4fa",
  measurementId: "G-9420K6Q3GK",
};

export const creatUserProfileDocument = async (userAuth, additionalData) => {
  //userAuth from Auth, it will return a UID
  if (!userAuth) return; // if there is no user ID exist then return.
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  /* 
  Even we don't give a explicit path like userAuth.uid, doc will still create a new random uid to return (NoSQL). 
  queries method, doc() from firebase NoSQL cloud databasse collection/documentID 
  here is user.uid whatever uid exist or not google will give u one
  */
  const snapshot = await userRef.get();
  /* 
  (CRUD) Read = retrive contents from users/userAuth.uid(userRef)
  */
  if (!snapshot.exists) {
    // if doc.users.userAuth.uid return false(dont exist) then create.
    const { displayName, email, photoURL } = userAuth; // get userdata from userauth (google, email/password...)
    const createdAt = new Date();
    try {
      await userRef.set({
        // set == create doc.users.dis playname...
        displayName,
        email,
        createdAt,
        photoURL,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef; //if doc.user.don't have data then create, if exist, return doc.user.displayname...
};

// shop.data.js is replace by addCollectionAndDocuments
/* export const addCollectionAndDocuments = async (CollectionKey, objectToAdd) => {
  const collectionRef = firestore.collection(CollectionKey); // path, but it probably doesn't exist.
  console.log(collectionRef);
  const batch = firestore.batch(); // set things at a time
  objectToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc(); // we create collections path and then we create doc path.
    console.log(newDocRef);
    batch.set(newDocRef, obj); //path and things your want to store in firestore
  });

  return await batch.commit();
}; */

export const convertCollectionSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    // return new array
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      // firestore don't have routename casue we only upload item/title from shopdata
      id: doc.id,
      title,
      items,
    };
  });
  return transformedCollection.reduce((accumlator, collection) => {
    accumlator[collection.title.toLowerCase()] = collection;
    /*{
      jackets :{ 
      routeName: 
      id: doc.id,
      title,
      items}
    }*/
    return accumlator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((res, rej) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      res(userAuth);
    }, rej);
  });
};

// Initialize Firebase
firebase.initializeApp(config);

export const auth = firebase.auth(); //The Firebase Auth service interface.
export const firestore = firebase.firestore(); //The Cloud Firestore service interface.

export const googleProvider = new firebase.auth.GoogleAuthProvider(); //Interface that represents an auth provider.
googleProvider.setCustomParameters({ prompt: "select_account" });
//provider.setCustomParameters({ prompt: "select_account" }); // The authorization server prompts the user to select a user account
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
