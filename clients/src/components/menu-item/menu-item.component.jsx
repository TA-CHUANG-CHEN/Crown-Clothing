import React from "react";
import { withRouter } from "react-router-dom";
import { MenuItemCopoment, BackgroundImage, Content } from "./menu-item.style";

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
  <MenuItemCopoment
    onClick={() => history.push(`${match.url}${linkUrl}`)}
    /* 
    1. history.push: Pushes a new entry onto the history stack.
    2. In APP.js component homepage's url is '/', so if click menu-item id:'1',  URL would be match.url:'/' +linkUrl:'shop/hats'.
    */
  >
    <BackgroundImage
      style={{ backgroundImage: `url(${imageUrl})` }}
    ></BackgroundImage>
    <Content className="content">
      <h1 className="title">{title.toUpperCase()}</h1>
      <span className="subtitle">SHOP NOW</span>
    </Content>
  </MenuItemCopoment>
);

export default withRouter(MenuItem); // WithRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
