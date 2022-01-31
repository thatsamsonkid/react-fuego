import React from "react";

const Tab = ({
  onTabClick = (label) => {},
  label = "",
  className = "",
  activeTab = "",
  children,
}) => {
  return (
    <li
      className={`sm-tab ${className} ${
        activeTab === label ? "sm-tab--active" : ""
      }`}
      onClick={() => onTabClick(label)}
    >
      <span>{label}</span>
    </li>
  );
};

export default Tab;
