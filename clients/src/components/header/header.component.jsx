import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
//import { auth } from "../../firebase/firebase.utils";
import { ReactComponent as Logo } from "../../asset/crown.svg";
import CartIcon from "../cart-icon/cart-icon.component";
import Cartdropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { signOutStart } from "../../redux/user/user.actions";
import {
  HeaderComponent,
  LogoContainer,
  OptionContainer,
  OptionLink,
} from "./header.styles";

const Header = ({ currentUser, hidden, signOutStart }) => (
  <HeaderComponent>
    <LogoContainer to="/">
      <Logo />
    </LogoContainer>
    <OptionContainer>
      <OptionLink to="/shop">SHOP</OptionLink>
      <OptionLink to="/shop">CONTACT·</OptionLink>
      {currentUser ? (
        <OptionLink as="div" onClick={signOutStart}>
          SIGN OUT
        </OptionLink>
      ) : (
        <OptionLink to="/signin">SIGN IN</OptionLink>
      )}
      <CartIcon />
    </OptionContainer>
    {hidden ? null : <Cartdropdown />}
  </HeaderComponent>
);

const mapStateToProps = createStructuredSelector({
  // createStructuredSelector will pass High level state into it, so it can replace (state)=>currentUser: selectCurrentUser(state),
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});
const mapDistpatchToProps = (dispatch) => ({
  signOutStart: () => {
    dispatch(signOutStart());
  },
});
export default connect(mapStateToProps, mapDistpatchToProps)(Header);
