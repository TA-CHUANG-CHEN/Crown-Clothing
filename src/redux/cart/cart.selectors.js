import { createSelector } from "reselect";

const selectCart = (state) => state.cart; //state is receive from mapstatetoprops

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
      (accualatedQuantity, cartItem) => accualatedQuantity + cartItem.quantity,
      0
    )
);
