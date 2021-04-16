import React from "react";

import CustomButtom from "../custom-button/custom-buttom.component";

import "./cart-dropdown.component.style.scss";

const Cartdropdown = () => (
  <div className="cart-dropdown">
    <div className="cart-items" />
    <CustomButtom>GO TO CHECKOUT</CustomButtom>
  </div>
);

export default Cartdropdown;
