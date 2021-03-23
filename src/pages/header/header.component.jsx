import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../asset/crown.svg";
import "./header.component.style.scss";

const Header = () => (
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
    </div>
  </nav>
);

export default Header;
