import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import "./directory.component.scss";
import MenuItem from "../menu-item/menu-item.component";
import { selectDirectorySections } from "../../redux/directory/directory.selectors";
const Directory = ({ sections }) => (
  <div className="directory-menu">
    {sections.map(({ id, ...othersectionprops }) => (
      <MenuItem key={id} {...othersectionprops} />
    ))}
  </div>
);

const mapStatetoProps = createStructuredSelector({
  sections: selectDirectorySections,
});

export default connect(mapStatetoProps)(Directory);
