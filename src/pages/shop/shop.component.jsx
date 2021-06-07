import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import {
  firestore,
  convertCollectionSnapshotToMap,
} from "../../firebase/firebase.utils";
import { updateCollections } from "../../redux/shop/shop.actions";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview); //HOC for loading
const CollectionPageWithSpinner = WithSpinner(CollectionPage); //HOC for loading

class ShopPage extends React.Component {
  //we don't need construtor && super to keep this because react help us to do it.
  state = {
    loading: true,
  };

  // now we need to retrieve shopdata from firebase
  unsubscribeFromSnapshot = null;
  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionsRef = firestore.collection("collections"); // path collections
    this.unsubscribeFromSnapshot = collectionsRef.onSnapshot(
      async (snapshot) => {
        //snapshot is actually object we can see inside. like doc(),empty()...
        const collectionsMap = convertCollectionSnapshotToMap(snapshot);
        updateCollections(collectionsMap);
        this.setState({ loading: false });
      }
    );
  }
  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`} /* component={CollectionsOverview}*/
          render={(props) => (
            <CollectionOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          /*component={CollectionPage}*/
          render={(props) => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);

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
