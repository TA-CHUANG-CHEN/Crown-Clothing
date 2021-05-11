import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase.utils";
import { ReactComponent as Logo } from "../../asset/crown.svg";
import CartIcon from "../cart-icon/cart-icon.component";
import Cartdropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
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

const mapStateToProps = createStructuredSelector({
  // createStructuredSelector will pass High level state into it, so it can replace (state)=>currentUser: selectCurrentUser(state),
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});
//我硬舉練完當下，下背沒有酸或是疼痛，但是隔天開始大概都會痠兩天正常嗎?1RM是240  大概過程是120*5 /144*5.../215*3
export default connect(mapStateToProps)(Header);
