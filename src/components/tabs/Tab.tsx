import React, { forwardRef, useEffect } from "react";
import styled from "styled-components";
import { classnames } from "../../utils/component-utils";

export interface ITab {
  children?: any;
  onTabClick?: any;
  label: string;
  disabled?: boolean;
  id?: string;
  className?: string;
  activeTab?: string;
  tabId?: string;
  tabPanelId?: string;
}

/**
 * TODO:
 * 
 * Disabled View
 * 
 */

const TabWrapper = styled.button`
border: none;
padding: 1rem 2rem;
min-width: 9rem;
min-height: 4.8rem;
`;

export const Tab = forwardRef(
  (
    {
      onTabClick,
      label = "",
      disabled = false,
      id = "",
      className,
      activeTab,
      children,
      tabId = "",
      tabPanelId = "",
      ...props
    }: ITab,
    ref: any
  ) => {

    const isActiveTab = () => activeTab === label ? true : false;
    const tabClasses = classnames(
      {
        "sm-tab--active": isActiveTab(),
      },
      `sm-tab ${className}`
    );



    useEffect(() => {
      console.log(ref);
    }, [ref, activeTab]);


    return (
      <TabWrapper role="tab"
        id={tabId}
        ref={ref}
        aria-controls={tabPanelId}
        aria-selected={isActiveTab()}
        className={tabClasses}
        onClick={() => !disabled && onTabClick(tabId)}
      >
        <span>{label}</span>
      </TabWrapper>
    );
  });

