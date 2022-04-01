import React, { useCallback, useEffect, useRef, useState } from "react";
import { useUID, useUIDSeed } from "react-uid";
import styled, { css } from "styled-components";
import debounce from "lodash.debounce";
import { classnames } from "../../utils/component-utils";
import { Draggable } from "../draggable/Draggble";
import { Tab } from "./Tab";

type Direction = "up" | "left" | "right" | "down";

export interface ITabs {
  children?: any;
  tabIndex?: number;
  fullWidth?: boolean;
  scrollable?: boolean;
  className?: string;
  alignment?: "center" | "right" | "left";
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
  direction: Direction;
  disabled?: boolean;
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
interface ITabsList {
  ref: any;
}

const TabsList = styled.div<ITabsList>`
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
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;

    ::-webkit-scrollbar {
      display: none;
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
  bottom: 0;
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

const ArrowDisabled = css`
  &:hover,
  &:focus {
    background-color: ${({ theme }) =>
      theme && theme.tabs && theme.tabs.bg} !important;
  }

  &::before {
    display: none;
  }
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

    ${({ direction }) =>
      direction === "right" ? RightScrollArrowStyles : LeftScrollArrowStyles}
  }

  ${({ disabled }) => disabled && ArrowDisabled}

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
  alignment = "center",
}: ITabs) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);
  const [ids, setIds] = useState<Array<TabIdProps>>([]);

  const [hightlightWidth, setHighlightWidth] = useState(90);
  const [highlightOffset, sethighlightOffset] = useState(0);

  const [isDragging, setIsDragging] = useState(false);
  const tabScrollArea = useRef<HTMLDivElement>();
  const draggableRef = useRef<HTMLDivElement>();

  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScrollLeft, setMaxScrollLeft] = useState(0);
  const [showArrows, setShowArrows] = useState(true);

  const tabRefs = useRef<HTMLElement[]>([]);
  const pushTabRef = (el: any, index: number) => {
    if (el && tabRefs && tabRefs.current) {
      tabRefs.current[index] = el;
    }
  };

  const onTabSelection = (tabId: string) => {
    const activeTab = tabRefs.current.find((tab) => tab?.id === tabId);
    activeTab && activeTab.scrollIntoView();
    !isDragging && setActiveTab(tabId);
  };

  const id = useUID();
  const seed = useUIDSeed();

  const updateTabHighlightPosition = (activeTab: string) => {
    if (tabRefs && tabRefs.current.length > 0) {
      // console.log(tabRefs);

      const activeTabRef = tabRefs.current.find(
        (tab: any) => tab && tab.id === activeTab
      );

      // console.log(activeTabRef);
      if (activeTabRef) {
        const offset = activeTabRef.offsetLeft;
        sethighlightOffset(offset);
        setHighlightWidth(activeTabRef.offsetWidth);
      }
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
  const setDefaultTab = (tabIds: Array<TabIdProps>) =>
    setActiveTab(tabIds[0].tabId);

  const tabClasses = classnames(
    {
      scrollable: scrollable,
    },
    className
  );

  // scrollable
  const scrollTab = (direction: Direction) => {
    // Need to get direction
    // need to disable buttons
    // scroll
    if (tabScrollArea && tabScrollArea.current) {
      const boundingBox = tabScrollArea.current.getBoundingClientRect();
      // const scrollableAreaWidth = draggableRef.current?.offsetWidth || 0;
      const scrollWindowWidth = boundingBox.width;
      const scrollPosition = tabScrollArea.current.scrollLeft;

      switch (direction) {
        case "right":
          if (scrollPosition + scrollWindowWidth > maxScrollLeft) {
            tabScrollArea.current.scrollLeft = maxScrollLeft;
            setScrollPosition(maxScrollLeft);
          } else {
            tabScrollArea.current.scrollLeft =
              tabScrollArea.current.scrollLeft + scrollWindowWidth;
            setScrollPosition(
              tabScrollArea.current.scrollLeft + scrollWindowWidth
            );
          }
          break;
        case "left":
          if (scrollPosition - scrollWindowWidth > 0) {
            tabScrollArea.current.scrollLeft = 0;
            setScrollPosition(0);
          } else {
            tabScrollArea.current.scrollLeft =
              tabScrollArea.current.scrollLeft - scrollWindowWidth;
            setScrollPosition(
              tabScrollArea.current.scrollLeft - scrollWindowWidth
            );
          }
          break;
        default:
          break;
      }
    }
  };

  const handleDrag = useCallback(
    debounce(({ translation, clientX, clientY, id }) => {
      // console.log(tabRefs);
      // origin and translation based on viewport/window not parent div
      // Need to ensure to subsctract parent offset

      // console.log(tabScrollArea);
      setIsDragging(true);

      if (tabScrollArea && tabScrollArea.current) {
        // console.log(tabScrollArea);

        // const boundingBox = tabScrollArea.current.getBoundingClientRect();
        // const tabScrollOffset = tabScrollArea.current.offsetLeft;
        // const parentOffset = tabScrollArea.current.offsetParent;

        // const originOffset = clientX - boundingBox.x;
        // console.log(originOffset);
        const scrollPosition = tabScrollArea.current.scrollLeft;
        // console.log("scrollpos", scrollPosition);
        // console.log("dx", translation.x);
        // console.log("chnage -minus offset", translation.x - boundingBox.left);
        // console.log("scroll", tabScrollArea.current.scrollLeft - translation.x);

        tabScrollArea.current.scrollLeft =
          tabScrollArea.current.scrollLeft - translation.x;

        // console.log("after", tabScrollArea.current.scrollLeft);
        if (scrollPosition !== tabScrollArea.current.scrollLeft) {
          updateTabHighlightPosition(activeTab);
        }
        // }
      }
    }, 2),
    []
  );

  const handleDragEnd = useCallback(() => {
    setTimeout(() => setIsDragging(false), 100);
  }, []);

  const onScroll = () => {
    setScrollPosition(tabScrollArea.current?.scrollLeft || scrollPosition);
  };

  // TODO: Need to change this
  const onWindowResize = debounce((e) => {
    console.log("window resize");
    console.log(e);
    // console.log(draggableRef.current.offsetWidth);
    if (
      draggableRef.current &&
      draggableRef.current.offsetWidth &&
      draggableRef.current.offsetWidth > e.target.innerWidth
    ) {
      console.log("Enable Scrolling");
      setShowArrows(true);
    } else {
      setShowArrows(false);
    }
  }, 50);

  const scrollDisable = (direction: Direction) => {
    if (tabScrollArea && tabScrollArea.current) {
      return (tabScrollArea.current.scrollLeft <= 0 && direction === "left") ||
        (tabScrollArea.current.scrollLeft >= maxScrollLeft &&
          direction === "right")
        ? true
        : false;
    }
    return false;
  };

  useEffect(() => {
    const cachedTabIds = generateIDS();
    setDefaultTab(cachedTabIds);
  }, []);

  useEffect(() => {
    updateTabHighlightPosition(activeTab);
  }, [fullWidth, activeTab]);

  // Listener for on scroll
  useEffect(() => {
    tabScrollArea.current?.addEventListener("scroll", onScroll);
    return tabScrollArea.current?.removeEventListener("scroll", () => {});
  }, [tabScrollArea]);

  // Listener for on window resize
  useEffect(() => {
    window.addEventListener("resize", onWindowResize);
    return window.removeEventListener("resize", () => {});
  }, [tabScrollArea]);

  useEffect(() => {
    if (tabScrollArea && tabScrollArea.current && draggableRef) {
      const boundingBox = tabScrollArea.current.getBoundingClientRect();
      const scrollableAreaWidth = draggableRef.current?.offsetWidth || 0;
      const scrollWindowWidth = boundingBox.width;
      if (scrollableAreaWidth > 0 && scrollWindowWidth > 0) {
        const maxScroll = scrollableAreaWidth - scrollWindowWidth || 0;
        setMaxScrollLeft(maxScroll);
      }
    }
  }, [draggableRef, tabScrollArea]);

  const scrollButton = (direction: Direction) => {
    return (
      <ScrollArrow
        direction={direction}
        disabled={scrollDisable(direction)}
        onClick={() => scrollTab(direction)}
      ></ScrollArrow>
    );
  };

  return (
    <TabsContainer id={id} className={tabClasses}>
      <div
        className={`${scrollable ? "scrollable-area" : ""} ${
          alignment === "center" ? "justify-content-center" : ""
        }`}
      >
        {scrollable && showArrows && scrollButton("left")}
        <TabsList
          ref={tabScrollArea}
          role="tablist"
          className={`${fullWidth ? "flex-grow-1" : ""}`}
        >
          <Draggable
            draggableRef={draggableRef}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          >
            {children.map((child: any, index: number) => {
              const { label } = child.props;
              return (
                <Tab
                  className={`sm-tab--dark-blue ${
                    fullWidth ? "flex-grow-1" : ""
                  }`}
                  id={id}
                  ref={(ref) => pushTabRef(ref, index)}
                  activeTab={activeTab}
                  key={label}
                  label={label}
                  onTabClick={onTabSelection}
                  {...ids[index]}
                />
              );
            })}
          </Draggable>
          {scrollable && (
            <TabHighlight
              leftOffset={highlightOffset}
              width={hightlightWidth}
            />
          )}
        </TabsList>
        {scrollable && showArrows && scrollButton("right")}
      </div>
      {!scrollable && (
        <TabHighlight leftOffset={highlightOffset} width={hightlightWidth} />
      )}
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
