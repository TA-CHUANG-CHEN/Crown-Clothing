import React from "react";
import {
  SpinnerContainer,
  SpinnerOverlay,
} from "./with-spinner.component.styles";

const WithSpinner = (WrappedComponent) => {
  const Spinner = ({ isFetching, ...otherProps }) => {
    return isFetching ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };
  return Spinner;
};

export default WithSpinner;
