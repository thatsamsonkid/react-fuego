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

interface IArrowButton {
  direction: "up" | "left" | "right" | "down";
  onClick?: any;
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
const TabsList = styled.div`
 display: flex;
`;

const TabsContainer = styled.div`
  position: relative;

  &.scrollable {
    overflow: hidden;
  }

  ${TabsList} {
    position: relative;
    display: inline-block;
    flex: 1 1 auto;
    white-space: nowrap;
    scrollbar-width: none;
    overflow-x: auto;
    overflow-y: hidden;

    &::-webkit-scrollbar {
      width: 0;
    }
  }

  .scrollable-area {
    display: flex;
  }
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

/**
 * TODO: Move to a separate file to separate from tabs
 */
const RightScrollArrowStyles = css`
transform: rotate(45deg);
right: 12px;
`;

const LeftScrollArrowStyles = css`
transform: rotate(225deg);
right: 8px;
`;

const ScrollArrow = styled.button<IArrowButton>`
  border: none;
  min-width: 3rem;
  position: relative;

  &::before {
    content: "";
    display: block;
    width: 10px;
    height: 10px;
    border: 1px solid ${({ theme }) => theme && theme.tabs && theme.tabs.fg};
    border-bottom: none;
    border-left: none;
    position: absolute;
    right: 12px;
    top: 20px;

    ${({ direction }) => (direction === "right" ? RightScrollArrowStyles : LeftScrollArrowStyles)}

  }

  // theme
  background-color: ${({ theme }) => theme && theme.tabs && theme.tabs.bg};

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme && theme.tabs && theme.tabs.hbg};
    color: ${({ theme }) => theme && theme.tabs && theme.tabs.hfg};

    &::before {
      border: 1px solid ${({ theme }) => theme && theme.tabs && theme.tabs.hfg};
      border-bottom: none;
      border-left: none;
    }
  }
`;

export const Tabs = ({
  children,
  fullWidth = false,
  className,
  scrollable = false,
}: ITabs) => {
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
  const scrollTab = (direction: string) => {
    console.log(direction);

  }

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
        {scrollable && <ScrollArrow direction="left" onClick={() => scrollTab("left")}></ScrollArrow>}
        <TabsList role="tablist">
          {children.map((child: any, index: number) => {
            const { label } = child.props;
            return (
              <Tab
                className={`sm-tab--dark-blue ${fullWidth ? "flex-grow-1" : ""
                  }`}
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
        {scrollable && <ScrollArrow direction="right" onClick={() => scrollTab("right")}></ScrollArrow>}
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
