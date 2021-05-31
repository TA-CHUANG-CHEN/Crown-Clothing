import React from "react";
import { Route } from "react-router-dom";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

const ShopPage = ({ match }) => (
  <div className="shop-page">
    <Route exact path={`${match.path}`} component={CollectionsOverview} />
    <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
  </div>
);

export default ShopPage;

// import SHOP_DATA from "./shop.data"; //json.file

/* class ShopPage extends React.Component {
  constructor(props) {
    super(props);
    /*
    props can initial this.prop, this will be direct to class ShopPage, 
    In most cases, the value of this is determined by how a function is called (bind or call/apply) or runtime like windows.
    this.state = {
      collections: SHOP_DATA,
    
      SHOP_DATA will trun into 
      collections: [
       {
        id: 1,
        title: "Hats",
        routeName: "hats",
        items: [..]
        ...
       }
      ],...
    };
    
  } */
/* 
  render() {
    const { collections } = this.state;
    /* 
    1. Braces {} are used during the declaration of Object Literals, or to enclose blocks of code, 
       but const { collections } = this.state is use for Destructuring assignment.
    2. Parenthesis () in JavaScript are used for function calls.
    3. Brackets [] are typically mostly used for accessing the properties of an Object (or the elements of an Array), 
       so mylist[3] fetches the fourth element in the Array.
    */
//{match} = path from app.js /shop

/*  /shop/ match has parameter path/params/url/exist... */
