import React from "react";

export interface ITab {
  children?: any;
  onTabClick?: any;
  label: string;
  className?: string;
  activeTab?: string;
}

export const Tab = ({
  onTabClick,
  label = "",
  className = "",
  activeTab = "",
  children,
}: ITab) => {
  return (
    <li
      className={`sm-tab ${className} ${activeTab === label ? "sm-tab--active" : ""
        }`}
      onClick={() => onTabClick(label)}
    >
      <span>{label}</span>
    </li>
  );
};

