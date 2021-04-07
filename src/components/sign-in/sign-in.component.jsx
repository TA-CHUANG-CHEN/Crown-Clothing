import React from "react";
import "./sign-in.component.style.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-buttom.component";
import { signInWithGoogle } from "../../firebase/firebase.utils";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault(); //cancel all pre default action
    this.setState({ email: "", password: "" });
  };
  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            id="email"
            type="email"
            label="email"
            value={this.state.email}
            autoComplete="email"
            handleChange={this.handleChange}
            required
          />
          <FormInput
            name="password"
            id="password"
            type="password"
            label="password"
            value={this.state.password}
            autoComplete="password"
            handleChange={this.handleChange}
            required
          />
          <div className="buttons">
            <CustomButton type="submit">Sign in</CustomButton>
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
              {""}Sign in with Google{""}
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
