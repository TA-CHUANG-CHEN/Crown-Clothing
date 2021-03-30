import React from "react";
import { Route, Switch } from "react-router-dom"; //
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./pages/header/header.component";
import SignInSignUpPage from "./pages/sing-in-sign-up/sign-in-sign-up.component";
import { auth } from "./firebase/firebase.utils";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
    };
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      this.setState({ currentUser: user });
      console.log(user);
    });
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
          <SignInSignUpPage path="/signin" component={SignInSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
