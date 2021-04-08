import React from "react";
import "./custom-buttom.style.scss";

const CustomButton = ({ children, isGoogleSignIn, ...otherProps }) => (
  <button
    className={`${isGoogleSignIn ? "google-sign-in" : ""} custom-button`} // if true google-sign-in will work
    {...otherProps}
  >
    {children}
  </button> // /* props.children === <CustomButton> children </CustomButton> */
);

export default CustomButton;
