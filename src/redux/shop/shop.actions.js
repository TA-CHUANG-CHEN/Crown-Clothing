import ShopActionType from "./shop.types";

export const updateCollections = (collectionsMap) => ({
  type: ShopActionType.UPDATE_COOLECTIONS,
  payload: collectionsMap,
});
