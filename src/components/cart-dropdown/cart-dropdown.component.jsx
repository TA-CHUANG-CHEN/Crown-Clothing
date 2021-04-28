import React from "react";
import { connect } from "react-redux";
import CartItem from "../cart-item/cart-item.component";
import CustomButtom from "../custom-button/custom-buttom.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import "./cart-dropdown.component.style.scss";
import { createStructuredSelector } from "reselect";

const Cartdropdown = ({ cartItems }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span className="empty-message">Your cart is empty</span>
      )}
    </div>
    <CustomButtom>GO TO CHECKOUT</CustomButtom>
  </div>
);
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});
export default connect(mapStateToProps)(Cartdropdown);
