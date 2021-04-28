import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInSignUpPage from "./pages/sing-in-sign-up/sign-in-sign-up.component";
import { auth, creatUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
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
      setCurrentUser(userAuth); // CurrentUser is no.
    });
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div>
        <Header />
        <Switch>
          {/* 1. Renders the first child <Route> or <Redirect> that matches the location, here will be /SHOP unless page in root directory */}
          <Route exact path="/" component={HomePage} />
          {/* 
        1. All route props (match, location and history) are available to Homepages 
        2. Routes without a path always match, path='/' means when homepage will be render URL with /. like http://www.test.com/ <- start from here.
        3. When exact == true, will only match if the path matches the location.pathname exactly.
        */}
          <Route path="/shop" component={ShopPage} />
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
  currentUser: selectCurrentUser,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
