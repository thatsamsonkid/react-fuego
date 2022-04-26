import React, {
  cloneElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useUID, useUIDSeed } from "react-uid";
import styled, { css } from "styled-components";
import debounce from "lodash.debounce";
import { classnames } from "../../utils/component-utils";
import { Draggable } from "../draggable/Draggble";

type Direction = "left" | "right";
type Alignment = "left" | "center" | "right";

export interface ITabs {
  children?: any;
  tabIndex?: number;
  fullWidth?: boolean;
  scrollable?: boolean;
  className?: string;
  alignment?: Alignment;
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
 * Minor issue, on tab click, full tab not necessarily moved into view
 * on window resize, lmaxsize is out of date
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
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScrollLeft, setMaxScrollLeft] = useState(0);
  const [showArrows, setShowArrows] = useState(true);
  const [arrowState, setArrowState] = useState({
    left: true,
    right: false,
  });

  const tabScrollArea = useRef<HTMLDivElement>();
  const draggableRef = useRef<HTMLDivElement>();
  const tabRefs = useRef<HTMLElement[]>([]);

  const id = useUID();
  const seed = useUIDSeed();

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

  const pushTabRef = (el: any, index: number) => {
    if (el && tabRefs && tabRefs.current) {
      tabRefs.current[index] = el;
    }
  };

  const onTabSelection = (tabId: string) => setActiveTab(tabId);

  // scrollable
  const scrollTab = (direction: Direction) => {
    if (tabScrollArea && tabScrollArea.current) {
      const boundingBox = tabScrollArea.current.getBoundingClientRect();
      const scrollWindowWidth = boundingBox.width;
      const scrollPosition = tabScrollArea.current.scrollLeft;
      let newScrollPosition;
      switch (direction) {
        case "right":
          if (scrollPosition + scrollWindowWidth > maxScrollLeft) {
            tabScrollArea.current.scrollLeft = maxScrollLeft;
            newScrollPosition = maxScrollLeft;
            setScrollPosition(maxScrollLeft);
          } else {
            newScrollPosition =
              tabScrollArea.current.scrollLeft + scrollWindowWidth;
            tabScrollArea.current.scrollLeft = newScrollPosition;
            setScrollPosition(newScrollPosition);
          }
          break;
        case "left":
          if (scrollPosition - scrollWindowWidth > 0) {
            tabScrollArea.current.scrollLeft = 0;
            newScrollPosition = 0;
            setScrollPosition(0);
          } else {
            newScrollPosition =
              tabScrollArea.current.scrollLeft - scrollWindowWidth;
            tabScrollArea.current.scrollLeft = newScrollPosition;
            setScrollPosition(newScrollPosition);
          }
          break;
        default:
          break;
      }

      // Need to check with scroll post this scroll
      updateScrollArrowState(maxScrollLeft, newScrollPosition);
    }
  };

  const handleDrag = useCallback(({ translation }) => {
    if (tabScrollArea && tabScrollArea.current) {
      tabScrollArea.current.scrollLeft =
        tabScrollArea.current.scrollLeft - translation.x;
    }
  }, []);

  const calculateMaxLeftScroll = () => {
    if (tabScrollArea && tabScrollArea.current && draggableRef) {
      const boundingBox = tabScrollArea.current.getBoundingClientRect();
      const scrollableAreaWidth = draggableRef.current?.offsetWidth || 0;
      const scrollWindowWidth = boundingBox.width;
      if (scrollableAreaWidth > 0 && scrollWindowWidth > 0) {
        const maxScroll = scrollableAreaWidth - scrollWindowWidth || 0;
        setMaxScrollLeft(maxScroll);
      }
    }
  };

  /**
   * Call on ScrollTab, called on window resize
   * @param lmaxScrollLeft
   * @param scrollPosition
   */
  const updateScrollArrowState = (
    lmaxScrollLeft: number,
    scrollPosition?: number
  ) => {
    if (tabScrollArea && tabScrollArea.current && lmaxScrollLeft > 0) {
      const currentScroll = scrollPosition || tabScrollArea.current.scrollLeft;
      const newState = { left: false, right: false };

      if (currentScroll <= 0) {
        newState.left = true;
      }

      if (currentScroll >= lmaxScrollLeft) {
        newState.right = true;
      }
      setArrowState(newState);
    }
  };

  const onTabListScroll = () => {
    setScrollPosition(tabScrollArea.current?.scrollLeft || scrollPosition);
    updateScrollArrowState(maxScrollLeft);
  };

  const scrollButton = (direction: Direction) => {
    return (
      <ScrollArrow
        direction={direction}
        disabled={arrowState[direction]}
        onClick={() => scrollTab(direction)}
      ></ScrollArrow>
    );
  };

  // End declarations

  const tabIds = ids && ids.length > 0 ? ids : generateIDS();

  const tabClasses = classnames(
    {
      scrollable: scrollable,
    },
    className
  );

  // Listener for on window resize
  useEffect(() => {
    const onWindowResize = debounce((e) => {
      if (
        draggableRef.current &&
        draggableRef.current.offsetWidth &&
        draggableRef.current.offsetWidth > e.target.innerWidth
      ) {
        setShowArrows(true);
      } else {
        setShowArrows(false);
      }
      // TODO: this one has the issue of caching
      updateScrollArrowState(maxScrollLeft);
    }, 50);

    window.addEventListener("resize", onWindowResize, { passive: true });
    return window.removeEventListener("resize", onWindowResize);
  }, [maxScrollLeft]);

  // On Active Tab Change
  useEffect(() => {
    if (activeTab && tabScrollArea && tabScrollArea.current) {
      const rightBoundScrollArea =
        tabScrollArea.current?.offsetWidth + scrollPosition;
      const rightBoundCoordinateOfButton =
        activeTab.offsetLeft + activeTab.offsetWidth;
      if (rightBoundScrollArea < rightBoundCoordinateOfButton) {
        const portionOfTabViewable =
          (activeTab.offsetLeft - rightBoundScrollArea) * -1;
        const delta = activeTab.offsetWidth - portionOfTabViewable;
        const newPosition = (tabScrollArea.current.scrollLeft =
          tabScrollArea.current.scrollLeft + delta);
        setScrollPosition(newPosition);
      }

      if (scrollPosition > activeTab.offsetLeft) {
        const delta = scrollPosition - activeTab.offsetLeft;
        const newPosition = (tabScrollArea.current.scrollLeft =
          tabScrollArea.current.scrollLeft - delta);
        setScrollPosition(newPosition);
      }
    }

    const updateTabHighlightPosition = (activeTab: string) => {
      if (tabRefs && tabRefs.current.length > 0) {
        const activeTabRef = tabRefs.current.find(
          (tab: any) => tab && tab.id === activeTab
        );

        if (activeTabRef) {
          const offset = activeTabRef.offsetLeft;
          sethighlightOffset(offset);
          setHighlightWidth(activeTabRef.offsetWidth);
        }
      }
    };

    updateTabHighlightPosition(activeTab);
  }, [activeTab]);

  useEffect(() => {
    calculateMaxLeftScroll();
  }, [draggableRef, tabScrollArea]);

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
          onScroll={onTabListScroll}
          className={`${fullWidth ? "flex-grow-1" : ""}`}
        >
          <Draggable
            draggableRef={draggableRef}
            onDrag={handleDrag}
            onDragEnd={() => {}}
          >
            {children.map((child: any, index: number) => {
              const { label, className = "" } = child.props;
              const newProps = {
                className: `${fullWidth ? "flex-grow-1" : ""} ${className}`,
                id: tabIds[index].tabId,
                ref: (ref: any) => pushTabRef(ref, index),
                activeTab: { activeTab },
                key: tabIds[index].tabId,
                label: label,
                onTabClick: onTabSelection,
                ...tabIds[index],
              };
              return cloneElement(child, { ...newProps });
            })}
          </Draggable>
          <TabHighlight leftOffset={highlightOffset} width={hightlightWidth} />
        </TabsList>
        {scrollable && showArrows && scrollButton("right")}
      </div>
      {children.map((child: any, index: number) => {
        return (
          <TabPanel
            tabIndex={0}
            role="tabpanel"
            key={tabIds[index].tabPanelId}
            id={tabIds[index].tabPanelId}
            aria-labelledby={tabIds[index].tabId}
            className={`${activeTab !== tabIds[index].tabId ? "hidden" : ""}`}
          >
            {child.props.children}
          </TabPanel>
        );
      })}
    </TabsContainer>
  );
};
