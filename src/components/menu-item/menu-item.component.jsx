import React from "react";
import { withRouter } from "react-router-dom";
import "./menu-item.component.scss";

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
  <div
    className={`menu-item ${size ? size : ""}`}
    onClick={() => history.push(`${match.url}${linkUrl}`)}
    /* 
    1. history.push: Pushes a new entry onto the history stack.
    2. In APP.js component homepage's url is '/', so if click menu-item id:'1',  URL would be match.url:'/' +linkUrl:'shop/hats'.
    */
  >
    <div
      className="background-image"
      style={{ backgroundImage: `url(${imageUrl})` }}
    ></div>
    <div className="content">
      <h1 className="title">{title.toUpperCase()}</h1>
      <span className="subtitle">SHOP NOW</span>
    </div>
  </div>
);

export default withRouter(MenuItem); // WithRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
