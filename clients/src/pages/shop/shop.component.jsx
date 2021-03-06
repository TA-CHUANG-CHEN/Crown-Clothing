import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import Spinner from "../../components/spinner/spinner.component";

//import CollectionPageContainer from "./../collection/collection.container";
//mport CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";

/* const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview); //HOC for loading
const CollectionPageWithSpinner = WithSpinner(CollectionPage); //HOC for loading
 */
const CollectionsOverviewContainer = React.lazy(() =>
  import("../../components/collections-overview/collections-overview.container")
);
const CollectionPageContainer = React.lazy(() =>
  import("../collection/collection.container")
);

const ShopPage = ({ fetchCollectionsStart, match }) => {
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]); // we dispatch so we don't need to worry rerender again, it can use empty array[] too.
  /*  //we don't need construtor && super to keep this because react help us to do it.
  state = {
    loading: true,
  };

  // now we need to retrieve shopdata from firebase
  unsubscribeFromSnapshot = null; */
  /*  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionsRef = firestore.collection("collections"); //  ath collections

    fetch way!  eight level nesting omg!
     fetch(  
      "https://firestore.googleapis.com/v1/projects/crown-db-37538/databases/(default)/documents/collections"
    )
      .then((res) => res.json())
      .then((collections) => console.log(collections)); 
    collectionsRef.get().then((snapshot) => {
      //snapshot is actually object we can see inside. like doc(),empty()...
      const collectionsMap = convertCollectionSnapshotToMap(snapshot);
      console.log(snapshot);
      updateCollections(collectionsMap);
      this.setState({ loading: false });
    });
    2. this.unsubscribeFromSnapshot = collectionsRef.onSnapshot(
      async (snapshot) => {
        //snapshot is actually object we can see inside. like doc(),empty()...
        const collectionsMap = convertCollectionSnapshotToMap(snapshot);
        updateCollections(collectionsMap);
        this.setState({ loading: false });
      }
    );
  } */
  return (
    <React.Suspense fallback={<Spinner />}>
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`} /* component={CollectionsOverview}*/
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer} //we use container pattern && compose(Redux) to isolate component
          // render={(props) => (
          //   <CollectionPageWithSpinner
          //     isLoading={CollectionPageContainer} //return false will become true.
          //     {...props}
          //   />
          // )}
        />
      </div>
    </React.Suspense>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});
/* const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});
 */
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
