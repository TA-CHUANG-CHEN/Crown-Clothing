import React from "react";
import { CustomButtonContainer } from "./custom-buttom.component.styles.jsx";

const CustomButton = ({ children, ...props }) => (
  //  props.children === <CustomButton> children </CustomButton>
  <CustomButtonContainer {...props}>{children}</CustomButtonContainer>
);

export default CustomButton;
