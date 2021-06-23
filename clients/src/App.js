import React, { useEffect, lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { GlobalStyle } from "./global.styles";
import Header from "./components/header/header.component";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.actions";
import HomePage from "./pages/homepage/homepage.component";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
/* import {
  auth,
  creatUserProfileDocument,
  /* addCollectionAndDocuments, //this is for store shop data at a time in firebase 
} from "./firebase/firebase.utils"; */
//wer don't need firebase utility func anymore because we move to saga
//import { setCurrentUser } from "./redux/user/user.actions";  move to saga
//import { selectCollectionsForPreview } from "./redux/shop/shop.selector";
const ShopPage = lazy(() => import("./pages/shop/shop.component.jsx"));
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"));
const SignInSignUpPage = lazy(() =>
  import("./pages/sing-in-sign-up/sign-in-sign-up.component")
);

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]); //if u want to unmount it, using return user = 'null'

  /*  componentDidMount() {
    // const setCurrentUser = this.props.setCurrentUser; same
    const { setCurrentUser, collectionArray } = this.props; //this props dispatch from mapDispatchtoProps setCurrentUser
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
         addCollectionAndDocuments(
        "collections",
        collectionArray.map(({ title, items }) => ({ title, items })) // we only want title/items
      ); 
    });
  }
 */
  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            {/* 1. Switch will render the first child <Route> or <Redirect> that matches the location */}
            <Route exact path="/" component={HomePage} />
            <Route path="/shop" component={ShopPage} />
            <Route exact path="/checkout" component={CheckoutPage} />
            <Route
              exact
              path="/signin"
              render={() =>
                currentUser ? <Redirect to="/" /> : <SignInSignUpPage />
              }
            />
            {/* 
        1. All route props (match, location and history) are available to Homepages 
        2. Routes without a path always match, path='/' means when homepage will be render URL with /. like http://www.test.com/ <- start from here.
        3. When exact == true, will only match if the path matches the location.pathname exactly.
        */}
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser, // replace (rootreducer == state) => currentUser: state.user.currentUser
  //collectionArray: selectCollectionsForPreview,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()), //action -> saga detect -> execute saga -> reducer (async)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
/*
About mapStatetoProps

1.It is called every time the store state changes.
2.It receives the entire store state, and should return an object of data this component needs, so that why we need reselector.


const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

About mapDispatchToProps
React Redux gives you two ways to let components dispatch actions:
(dispatch is a function of the Redux store. You call store.dispatch to dispatch an action. This is the only way to trigger a state change)
1. By default, a connected component receives props.dispatch and can dispatch actions itself.
2. connect can accept an argument called mapDispatchToProps, which lets you create functions that dispatch when called, 
   and pass those functions as props to your component.
   ( if you define your own mapDispatchToProps, the connected component will no longer receive dispatch.)
*/
/* In conclusion,  mapStateToProps can receive props into state everywhere ,mapDispatchToProps is the only way pass state props */
