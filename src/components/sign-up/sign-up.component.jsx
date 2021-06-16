import React, { useState } from "react";
import { connect } from "react-redux";
import FromInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-buttom.component";
import { emailSignUpStart } from "../../redux/user/user.actions";
//import { auth, creatUserProfileDocument } from "../../firebase/firebase.utils";
import "./sign-up.component.style.scss";

const SignUp = ({ emailSignUpStart }) => {
  const [userCredential, setCredential] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { displayName, email, password, confirmPassword } = userCredential;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert(" password don't match");
      return;
    }
    emailSignUpStart({ displayName, email, password });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredential({ ...userCredential, [name]: value }); // name === input elements name attritube when u need multiple input be controlled.
  };

  return (
    <div className="sign-up">
      <h2 className="title"> I don't have a account</h2>
      <span> Sign up with your email and password</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FromInput
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          label="Display Name"
          autoComplete="name"
          required
        />
        <FromInput
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          label="email"
          autoComplete="email"
          required
        />
        <FromInput
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="password"
          autoComplete="new-password"
          required
        />
        <FromInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          label="confirm Password"
          autoComplete="new-password"
          required
        />
        <CustomButton type="submit"> SIGN UP</CustomButton>
      </form>
    </div>
  );
};

const mapDispatchToProps = (ditpatch) => ({
  emailSignUpStart: (userCredentials) =>
    ditpatch(emailSignUpStart(userCredentials)),
});

export default connect(null, mapDispatchToProps)(SignUp);
