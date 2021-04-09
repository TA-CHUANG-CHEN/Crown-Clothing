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
  if (!userAuth) return; // if there is no userAuth exist then return.
  const userRef = firestore.doc(`users/${userAuth.uid}`); //  The user's ID, from firebase NoSQL cloud databasse collection/documentID (user.uid)
  const snapshot = await userRef.get(); // retrive uid from users/userAuth.uid
  if (!snapshot.exists) {
    const { displayName, email, photoURL } = userAuth; //snapshot =>
    const createdAt = new Date();
    try {
      await userRef.set({
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
  return userRef;
};
// Initialize Firebase
firebase.initializeApp(config);

export const auth = firebase.auth(); //The Firebase Auth service interface.
export const firestore = firebase.firestore(); //The Cloud Firestore service interface.

const provider = new firebase.auth.GoogleAuthProvider(); //Interface that represents an auth provider.
provider.setCustomParameters({ prompt: "select_account" }); // The authorization server prompts the user to select a user account
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
