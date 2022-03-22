import React, { useEffect, useRef, useState } from "react";
import { useUID, useUIDSeed } from "react-uid";
import styled, { css } from "styled-components";
import { classnames } from "../../utils/component-utils";
import { Tab } from "./Tab";

export interface ITabs {
  children?: any;
  tabIndex?: number;
  fullWidth?: boolean;
  scrollable?: boolean;
  className?: string;
}
export interface TabIdProps {
  tabId: string;
  tabPanelId: string;
}

interface HighlightProps {
  leftOffset?: number;
  width?: number;
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

const TabsContainer = styled.div`
  position: relative;

&.scrollable {
  overflow: hidden;
}

.scrollable-area {
  display: flex;
}
`;
const TabsList = styled.div`
  display: flex;
`;

const TabPanel = styled.div`
  padding: 2.4rem;
  &.hidden {
    display: none;
  }
`;

const TabHighlight = styled.span<HighlightProps>`
  width: ${({ width }) => (width ? `${width}px` : "9rem")};
  height: 2px;
  position: absolute;
  transition: width 0.3s, left 0.3s;
  left: ${({ leftOffset }) => (leftOffset ? `${leftOffset}px` : 0)};

  // theme
  background-color: ${({ theme }) => theme && theme.tabs && theme.tabs.accent};
`;

const ScrollArrow = styled.button`
  border:none;

  &::before {
    content:"";
    display: block;
    width: 10px;
    height:10px;
    transform: rotate(45deg);
    border: 1px solid ${({ theme }) => theme && theme.tabs && theme.tabs.fg};
    border-bottom: none;
    border-left: none;
  }

  // theme
  background-color: ${({ theme }) => theme && theme.tabs && theme.tabs.bg};
`;


export const Tabs = ({ children, fullWidth = false, className, scrollable = false }: ITabs) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);
  const [ids, setIds] = useState<Array<TabIdProps>>([]);

  const [hightlightWidth, setHighlightWidth] = useState(90);
  const [highlightOffset, sethighlightOffset] = useState(0);

  let tabRefs: Array<HTMLButtonElement> = [];

  const onTabSelection = (tabId: string) => {
    setActiveTab(tabId);
  };

  const id = useUID();
  const seed = useUIDSeed();

  const updateTabHighlightPosition = (activeTab: string) => {
    const activeTabRef = tabRefs.find((tab: any) => tab.id === activeTab);
    if (activeTabRef) {
      sethighlightOffset(activeTabRef.offsetLeft);
      setHighlightWidth(activeTabRef.offsetWidth);
    }
  };

  const generateIDS = () => {
    const tabIds = children.map((childTab: any, index: number) => {
      const tabId = seed(`tab-${index}`);
      const tabPanelId = seed(`tabPanel-${index}`);
      return {
        tabId,
        tabPanelId,
      };
    });
    setIds(tabIds);
    return tabIds;
  };

  // TODO: Add logic for setting a differnt default tab
  const setDefaultTab = (tabIds: Array<TabIdProps>) => {
    setActiveTab(tabIds[0].tabId);
  };

  const tabClasses = classnames(
    {
      scrollable: scrollable,
    },
    className
  );


  // scrollable


  useEffect(() => {
    const cachedTabIds = generateIDS();
    setDefaultTab(cachedTabIds);
  }, []);

  useEffect(() => {
    updateTabHighlightPosition(activeTab);
  }, [fullWidth, activeTab]);

  return (
    <TabsContainer id={id} className={tabClasses}>
      <div className={`${scrollable ? "scrollable-area" : ""}`}>
        {scrollable && (<ScrollArrow></ScrollArrow>)}
        <TabsList role="tablist">
          {children.map((child: any, index: number) => {
            const { label } = child.props;
            return (
              <Tab
                className={`sm-tab--dark-blue ${fullWidth ? "flex-grow-1" : ""}`}
                id={id}
                ref={(el: HTMLButtonElement) => tabRefs.push(el)}
                activeTab={activeTab}
                key={label}
                label={label}
                onTabClick={onTabSelection}
                {...ids[index]}
              />
            );
          })}
        </TabsList>
        {scrollable && (<ScrollArrow></ScrollArrow>)}
      </div>
      <TabHighlight leftOffset={highlightOffset} width={hightlightWidth} />
      {children.map((child: any, index: number) => {
        const tabId = ids[index] && ids[index].tabId ? ids[index].tabId : "";
        const tabPanelId =
          ids[index] && ids[index].tabPanelId ? ids[index].tabPanelId : "";
        return (
          <TabPanel
            tabIndex={0}
            role="tabpanel"
            id={tabPanelId}
            aria-labelledby={tabId}
            className={`${activeTab !== tabId ? "hidden" : ""}`}
          >
            {child.props.children}
          </TabPanel>
        );
      })}
    </TabsContainer>
  );
};
