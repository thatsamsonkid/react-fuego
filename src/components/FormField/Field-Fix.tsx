import React from "react";

const FieldFix = ({ children, type }: any) => {
  if (children) {
    return (
      <div
        className={`sm-form-field${
          type === "suffix" ? "__suffix" : "__prefix"
        }`}
      >
        {children}
      </div>
    );
  }
  return null;
};

export default FieldFix;
