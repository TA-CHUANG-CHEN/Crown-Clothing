import React from "react";
import CollectionItem from '../collections-item/collection-item.component'
import "./collections-preview.component.scss";

const CollectionsPreview = ({ title, items }) => (
  <div className="collection-preview">
    <h1 className="title">{title.toUpperCase()}</h1>
    <div className="preview">
      {items.filter((item, idx) => idx < 4)
        .map(({ id, ...itemProps }) => (
          <CollectionItem key={id}{...itemProps} />
        ))}
    </div>
  </div>
);

export default CollectionsPreview;
