import React, { useState } from 'react';
import { Tab } from './Tab';

export interface ITabs {
  children?: any;
  tabIndex?: number;
}

export const Tabs = ({ children }: ITabs) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);
  const onClickTabItem = (tabIndex: number) => setActiveTab(tabIndex);
  return (
    <div className="sm-tabs">
      <ol className="sm-tabs__list">
        {children.map((child: any) => {
          const { label } = child.props;
          return <Tab className="sm-tab--dark-blue" activeTab={activeTab} key={label} label={label} onTabClick={onClickTabItem} />;
        })}
      </ol>
      <div className="sm-tabs__content">
        {children.map((child: any) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
};
