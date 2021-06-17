import React from "react";
import CollectionItem from "../collections-item/collection-item.component";
import "./collections-preview.component.scss";

const CollectionPreview = ({ title, items }) => (
  <div className="collection-preview">
    <h1 className="title">{title.toUpperCase()}</h1>
    <div className="preview">
      {items
        .filter((item, idx) => idx < 4)
        .map((item) => (
          <CollectionItem key={item.id} item={item} /> //item = id/name/imageURL/price
        ))}
    </div>
  </div>
);

export default CollectionPreview;