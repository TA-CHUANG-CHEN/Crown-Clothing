import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);
export const selectCartHidden = createSelector(
  selectCart,
  (cart) => cart.hidden
);
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accualatedQuantity, cartItem) => accualatedQuantity + cartItem.quantity,  //first time will be 0 + cartItem.quantity(1)( {name,photo,price,quantity}= cartItem),
      0
    )
);
