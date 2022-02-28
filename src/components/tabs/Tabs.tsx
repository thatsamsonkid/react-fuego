import React, { useEffect, useState } from 'react';
import { useUID, useUIDSeed } from 'react-uid';
import styled, { css } from "styled-components";
import { Tab } from './Tab';

export interface ITabs {
  children?: any;
  tabIndex?: number;
}

/**
 * TODO:
 * 
 * Integrate Theming
 * WAI-ARIA Create Manual and Automatic Selection
 * Make a pill variation
 * Make a draggable
 * Make or get a generic hidden style and visually hidden
 */

const TabsContainer = styled.div``;
const TabsList = styled.div`
display: flex;
position: relative;

`;

const TabPanel = styled.div`
padding: 2.4rem;
&.hidden {
  display:none;
}
`;

const TabHighlight = styled.span<HighlightProps>`
width: 9rem;
height: 2px;
position: absolute;
transition: width 0.3s, left 0.3s;

background-color: black;

left:${({ leftOffset }) => leftOffset ? leftOffset : 0}
`;

interface HighlightProps {
  leftOffset?: number;
}

export interface TabIdProps {
  tabId: string;
  tabPanelId: string;
}

export const Tabs = ({ children }: ITabs) => {

  const [activeTab, setActiveTab] = useState(children[0].props.label);
  const [ids, setIds] = useState<Array<TabIdProps>>([]);
  const [highlightOffset, sethighlightOffset] = useState(0);
  let tabRefs: Array<HTMLButtonElement> = [];


  const onTabSelection = (tabId: string) => {
    setActiveTab(tabId)
    console.log(tabId);
    updateTabHighlightPosition(tabId);
  };

  const id = useUID();
  const seed = useUIDSeed();

  const updateTabHighlightPosition = (activeTab: string) => {
    const activeTabRef = tabRefs.find((tab: any) => tab.id === activeTab);
    console.log(tabRefs)
    console.log(activeTabRef);
    if (activeTabRef) {
      const leftOffset = activeTabRef.offsetLeft;
      sethighlightOffset(leftOffset);
    }
  };

  const generateIDS = () => {
    const tabIds = children.map((childTab: any, index: number) => {
      const tabId = seed(`tab-${index}`);
      const tabPanelId = seed(`tabPanel-${index}`);
      return {
        tabId,
        tabPanelId,
      }
    });
    setIds(tabIds);
  }

  // TODO: Add logic for setting a differnt default tab
  const setDefaultTab = () => {
    setActiveTab(ids[0].tabId);
  }

  useEffect(() => {
    generateIDS();
    setDefaultTab();
  }
    , []);

  return (
    <TabsContainer id={id}>
      <TabsList role="tablist">
        {children.map((child: any, index: number) => {
          const { label } = child.props;
          return <Tab className="sm-tab--dark-blue" id={id} ref={(el) => tabRefs.push(el)} activeTab={activeTab} key={label} label={label} onTabClick={onTabSelection} {...ids[index]} />;
        })}
      </TabsList>
      <TabHighlight leftOffset={highlightOffset} />
      {children.map((child: any, index: number) => {
        const tabId = ids[index] && ids[index].tabId ? ids[index].tabId : "";
        const tabPanelId = ids[index] && ids[index].tabPanelId ? ids[index].tabPanelId : "";
        return (
          <TabPanel tabIndex={0} role="tabpanel" id={tabPanelId} aria-labelledby={tabId} className={`${activeTab !== tabId ? 'hidden' : ''}`}>
            {child.props.children}
          </TabPanel>)
      })}
    </TabsContainer>
  );
};
