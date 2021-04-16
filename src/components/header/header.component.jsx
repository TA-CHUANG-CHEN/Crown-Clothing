import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase.utils";
import { ReactComponent as Logo } from "../../asset/crown.svg";
import CartIcon from "../cart-icon/cart-icon.component";
import Cartdropdown from "../cart-dropdown/cart-dropdown.component";
import "./header.component.style.scss";

const Header = ({ currentUser, hidden }) => (
  <nav className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/shop">
        CONTACT
      </Link>
      {currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )}
      <CartIcon />
    </div>
    {hidden ? null : <Cartdropdown />}
  </nav>
);

const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
  hidden,
  currentUser,
});

export default connect(mapStateToProps)(Header);
