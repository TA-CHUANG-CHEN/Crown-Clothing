import React, { useState } from "react";
import { connect } from "react-redux";
import "./sign-in.component.style.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-buttom.component";
// import { signInWithGoogle, auth } from "../../firebase/firebase.utils";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/user/user.actions";

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
  const [userCredential, setCredential] = useState({ email: "", password: "" });
  const { email, password } = userCredential;

  const handleSubmit = async (e) => {
    e.preventDefault(); //cancel all pre default action
    emailSignInStart(email, password);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setCredential({ ...userCredential, [name]: value });
  };
  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          id="email"
          type="email"
          label="email"
          value={email}
          autoComplete="email"
          handleChange={handleChange}
          required
        />
        <FormInput
          name="password"
          id="password"
          type="password"
          label="password"
          value={password}
          autoComplete="password"
          handleChange={handleChange}
          required
        />
        <div className="buttons">
          <CustomButton type="submit">Sign in</CustomButton>
          <CustomButton
            type="button"
            onClick={googleSignInStart}
            isGoogleSignIn /* isGoogleSignIn is customized boolean value*/
          >
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
