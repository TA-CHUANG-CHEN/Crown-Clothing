import React from "react";
import { ErrorImageContainer } from "./error-boundary.styles";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <ErrorImageContainer img={"https://i.imgur.com/FOeYt4E.png"}>
          <h1>where am I? who I am? </h1>
        </ErrorImageContainer>
      );
    }
    console.log(this.props.children);
    return this.props.children;
  }
}

export default ErrorBoundary;
