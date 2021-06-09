import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import CheckoutPage from "./pages/checkout/checkout.component";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInSignUpPage from "./pages/sing-in-sign-up/sign-in-sign-up.component";
import {
  auth,
  creatUserProfileDocument,
  /* addCollectionAndDocuments, //this is for store shop data at a time in firebase */
} from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";
//import { selectCollectionsForPreview } from "./redux/shop/shop.selector";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    // const setCurrentUser = this.props.setCurrentUser; same
    const { setCurrentUser /* collectionArray */ } = this.props; //this props dispatch from mapDispatchtoProps setCurrentUser
    // we need react to listening user state.
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      //auth() The Firebase Auth service interface listening auth state like sign-in props is user.
      //creatUserProfileDocument(user);user(props) => creatUserProfileDocument
      if (userAuth) {
        const userRef = await creatUserProfileDocument(userAuth); // if don't exist create do or return user directly.
        userRef.onSnapshot((snapShot) => {
          // const snapshot = await userRef.get(); / retrive uid from users/userAuth.uid
          setCurrentUser({
            id: snapShot.id, //  userRef.get().id...
            ...snapShot.data(), //use data() retrived property from  userRef.get().data().
          });
        });
      }
      setCurrentUser(userAuth); // CurrentUser is null.
      /*   addCollectionAndDocuments(
        "collections",
        collectionArray.map(({ title, items }) => ({ title, items })) // we only want title/items
      ); */
    });
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          {/* 1. Switch will render the first child <Route> or <Redirect> that matches the location */}
          <Route exact path="/" component={HomePage} />
          {/* 
        1. All route props (match, location and history) are available to Homepages 
        2. Routes without a path always match, path='/' means when homepage will be render URL with /. like http://www.test.com/ <- start from here.
        3. When exact == true, will only match if the path matches the location.pathname exactly.
        */}
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser, // replace (rootreducer == state) => currentUser: state.user.currentUser
  //collectionArray: selectCollectionsForPreview,
});
/*
About mapStatetoProps

1.It is called every time the store state changes.
2.It receives the entire store state, and should return an object of data this component needs, so that why we need reselector.

*/
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
/*
About mapDispatchToProps
React Redux gives you two ways to let components dispatch actions:
(dispatch is a function of the Redux store. You call store.dispatch to dispatch an action. This is the only way to trigger a state change)
1. By default, a connected component receives props.dispatch and can dispatch actions itself.
2. connect can accept an argument called mapDispatchToProps, which lets you create functions that dispatch when called, 
   and pass those functions as props to your component.
   ( if you define your own mapDispatchToProps, the connected component will no longer receive dispatch.)
*/
/* In conclusion,  mapStateToProps can receive props into state everywhere ,mapDispatchToProps is the only way pass state props */
export default connect(mapStateToProps, mapDispatchToProps)(App);
