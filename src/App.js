import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";

function App() {
  return (
    <div>
      <Switch>
      {/* 1. Renders the first child <Route> or <Redirect> that matches the location, here will be /SHOP. */}
        <Route exact path="/" component={HomePage}/>   
        {/* 
        1. All route props (match, location and history) are available to Homepages 
        2. Routes without a path always match, path='/' means when homepage will be render URL with /. like http://www.test.com/ <- start from here.
        3. When exact == true, will only match if the path matches the location.pathname exactly.
        */}
        <Route path="/shop" component={ShopPage} /> 
      </Switch>
    </div>
  );
}

export default App;
