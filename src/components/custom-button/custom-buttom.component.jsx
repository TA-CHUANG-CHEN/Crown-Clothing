import React from "react";
import "./custom-buttom.style.scss";

const CustomButton = ({
  children,
  isGoogleSignIn,
  inverted,
  ...otherProps
}) => (
  //  props.children === <CustomButton> children </CustomButton>
  <button
    className={`${inverted ? "inverted" : ""}${
      isGoogleSignIn ? "google-sign-in" : ""
    } custom-button`} // if true google-sign-in will work
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
