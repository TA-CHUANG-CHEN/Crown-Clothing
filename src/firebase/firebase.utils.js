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
  //userAuth get back from Auth
  if (!userAuth) return; // if there is no userAuth exist then return.
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  /* 
  queries method, doc() from firebase NoSQL cloud databasse collection/documentID 
  here is user.uid whatever uid exist or not google will give u one
  */
  const snapshot = await userRef.get(); // (CRUD) Read = retrive contents from users/userAuth.uid(userRef)
  if (!snapshot.exists) {
    // if doc.users.userAuth.uid return false(dont exist) then create.
    const { displayName, email, photoURL } = userAuth; // get userdata from userauth (google, email/password...)
    const createdAt = new Date();
    try {
      await userRef.set({
        // set == create doc.users.displayname...
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
// Initialize Firebase
firebase.initializeApp(config);

export const auth = firebase.auth(); //The Firebase Auth service interface.
export const firestore = firebase.firestore(); //The Cloud Firestore service interface.

const provider = new firebase.auth.GoogleAuthProvider(); //Interface that represents an auth provider.
provider.setCustomParameters({ prompt: "select_account" }); // The authorization server prompts the user to select a user account
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
