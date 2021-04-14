import React from "react";
import "./custom-buttom.style.scss";

const CustomButton = ({ children, isGoogleSignIn, ...otherProps }) => (
  //  props.children === <CustomButton> children </CustomButton>
  <button
    className={`${isGoogleSignIn ? "google-sign-in" : ""} custom-button`} // if true google-sign-in will work
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
