import React from "react";
import "./form-input.component.style.scss";

const FormInput = ({ handleChange, label, id, ...otherProps }) => (
  <div className="group">
    <input
      id={id}
      className="form-input"
      onChange={handleChange}
      {...otherProps}
    />
    {label ? (
      <label
        htmlFor={id} // equal to for
        className={`${otherProps.value.length ? "shrink" : ""}form-input-label`}
      >
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
