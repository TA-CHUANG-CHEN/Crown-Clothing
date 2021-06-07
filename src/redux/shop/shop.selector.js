import { createSelector } from "reselect";
// import memoize from 'lodash.memoize'

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections // shop.data is Object now!
);

export const selectCollectionsForPreview = createSelector(
  selectCollections,
  (collections) => Object.keys(collections).map((key) => collections[key])
  // collections[hats] == collections.hats
  // for...in can literate keys include prototype but won't take Object to Array
);

export const selectCollection = (collectionUrlParam) =>
  createSelector(
    [selectCollections],
    (collections) => collections[collectionUrlParam]
  );

/* 
if we use data normaliztion , then we don't need below
const COLLECTION_ID_MAP = {
  hats: 1,
  sneakers: 2,
  jackets: 3,
  womens: 4,
  mens: 5,
}; 

1. older version, no effiecient. casue find method will compare all array.
export const selectCollection = (collectionUrlParam) =>
  createSelector([selectorCollections], (collections) =>
    collections.find(
      (collection) => collection.id === COLLECTION_ID_MAP[collectionUrlParam]  we don't store collections from  collectionUrlParam
    )
  );

2. if we want to store we are using lodas_memoize to do it 
export const selectCollection = memoize((collectionUrlParam) =>
  createSelector(
    [selectorCollections],
    (collections) => collections[collectionUrlParam]
  )
); */
