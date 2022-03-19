import React, {
  forwardRef,
  KeyboardEvent,
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  SyntheticEvent,
} from "react";
import { Field } from "../field/Field";
import styled from "styled-components";
import { Keys } from "../../../utils/keycodes";
import { classnames } from "../../../utils/component-utils";
import { useUIDSeed } from "react-uid";
import { themeOrDefault } from "../../../utils/theme-utils";

interface IListbox {
  id?: string;
  label?: string;
  children?: any;
  autocomplete?: any;
  options?: Array<any>;
  loading?: boolean;
  loadingTemplate?: any;
  onSelection?: any;
  onChange?: any;
  fieldSize?: "small" | "regular";
}

const ListboxWrapper = styled.div<IListbox>`
  position: relative;
  .combobox-wrapper {
    border-radius: 7px;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    position: absolute;
    top: ${({ fieldSize }) => (fieldSize === "small" ? "2.6rem" : "3rem")};
    width: 100%;
    border-top: none !important;
    z-index: 1;
    padding-top: ${({ fieldSize }) =>
      fieldSize === "small" ? "1rem" : "2rem"};

    &.hidden {
      display: none;
    }

    & > ul {
      list-style: none;
      padding: 0;
      margin: 0;

      &.loader li {
        color: ${({ theme }) =>
          theme &&
          themeOrDefault(
            theme.listbox.hfg,
            theme.palette.primary.contrastText
          )};
        background-color: ${({ theme }) =>
          theme &&
          themeOrDefault(theme.listbox.hbg, theme.palette.primary.main)};
      }

      li {
        padding: ${({ fieldSize }) =>
          fieldSize === "small" ? "0.8rem 1rem" : "1.4rem 1rem"};

        ${({ theme }) =>
          theme.formField.bg === theme.backgroundColor &&
          `border-bottom: 2px solid ${theme.formField.outline};`}

        &:first-child {
          padding-top: 1.8rem;
        }

        &:last-child {
          border-bottom-left-radius: 0.4rem;
          border-bottom-right-radius: 0.4rem;
          border-bottom: none;
        }
      }
    }
  }

  // theme
  .combobox-wrapper {
    ${({ theme }) =>
      theme.formField.bg === theme.backgroundColor &&
      `
    outline: 2px solid ${theme.formField.outline};
  `}

    & > ul {
      & li {
        color: ${({ theme }) =>
          theme &&
          themeOrDefault(theme.formField.fg, theme.palette.primary.main)};
        background-color: ${({ theme }) =>
          theme && themeOrDefault(theme.formField.bg, theme.backgroundColor)};

        &:hover,
        &.focused {
          color: ${({ theme }) =>
            theme &&
            themeOrDefault(
              theme.listbox.hfg,
              theme.palette.primary.contrastText
            )};
          background-color: ${({ theme }) =>
            theme &&
            themeOrDefault(theme.listbox.hbg, theme.palette.primary.main)};
        }
      }
    }
  }
`;

export const Listbox = forwardRef<unknown, any>(
  (
    {
      label = "",
      children = null,
      autocomplete = false,
      options = [],
      loading = false,
      loadingTemplate = null,
      onSelection,
      onChange,
      fieldSize = "regular",
      ...props
    }: IListbox,
    ref: any
  ) => {
    const seed = useUIDSeed();
    let id = `${seed("Listbox")}`;

    const labelId = `${id}-label`;
    const listId = `${id}-list`;

    let suggestionRefs: Array<any> = [];

    const [activeIndex, setActiveIndex] = useState(-1);
    const [expanded, setExpanded] = useState(false);
    const [suggestions, setSuggestions] = useState(options);
    const [activedescendant, setActivedescendant] = useState("");
    const [clickedOutside, setClickedOutside] = useState(false);

    const fieldRef = useRef<any>();
    useImperativeHandle(ref, () => fieldRef.current);

    const listboxRef = useRef<any>();

    const handleClickOutside = (e: any) => {
      if (!listboxRef.current.contains(e.target)) {
        setClickedOutside(true);
      } else {
        setClickedOutside(false);
      }
    };

    const showDropdown = () => setExpanded(true);
    const hideDropdown = () => setExpanded(false);

    // Gives time for click events for selections to propogate
    const delayedHideDropdown = () => setTimeout(() => hideDropdown(), 10);

    const onChangeHandler = (e: Event) => {
      !expanded && setExpanded(true);
      onChange && onChange(e);
    };

    const onBlurHandler = (e: Event) => checkSelection();

    const onSelectionHandler = (e: SyntheticEvent, selection: any) => {
      fieldRef.current.value = selection.label;
      onSelection && onSelection(selection);
      setClickedOutside(false);
      delayedHideDropdown();
    };

    const selectItem = (selection: any) => {
      if (selection) {
        fieldRef.current.value = selection.label;
        setClickedOutside(false);
        delayedHideDropdown();
      }
    };

    const checkSelection = () => {
      if (activeIndex < 0) {
        return;
      }
      var activeItem = getItemAt(activeIndex);
      selectItem(activeItem);
    };

    const getItemAt = (index: number) => suggestions[index];

    const setActiveItem = (evt: KeyboardEvent) => {
      var key = evt.key;

      if (key === Keys.ESC) {
        hideDropdown();
        setTimeout(() => {
          // On Firefox, input does not get cleared here unless wrapped in
          // a setTimeout
          fieldRef.current.value = "";
        }, 1);
        return;
      }

      var activeItem;
      switch (key as Keys) {
        case Keys.UP:
          if (activeIndex <= 0) {
            setActiveIndex(suggestions.length - 1);
          } else {
            setActiveIndex(activeIndex - 1);
          }
          break;
        case Keys.DOWN:
          if (activeIndex === -1 || activeIndex >= suggestions.length - 1) {
            setActiveIndex(0);
          } else {
            setActiveIndex(activeIndex + 1);
          }
          break;
        case Keys.ENTER:
          evt.preventDefault();
          activeItem = getItemAt(activeIndex);
          selectItem(activeItem);
          return;
        case Keys.TAB:
          checkSelection();
          hideDropdown();
          return;
        default:
          return;
      }

      evt.preventDefault();

      activeItem = getItemAt(activeIndex);
      if (fieldRef && fieldRef.current) {
        if (activeItem) {
          setActivedescendant("suggestion-" + activeIndex);
        } else {
          setActivedescendant("");
        }
      }
    };

    const checkKey = (evt: KeyboardEvent) => {
      var key = evt.key;
      switch (key as Keys) {
        case Keys.UP:
        case Keys.DOWN:
        case Keys.ESC:
        case Keys.ENTER:
          evt.preventDefault();
          return;
        default:
          return;
      }
    };

    useEffect(() => setSuggestions(options), [options]);

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    });

    useEffect(() => {
      if (clickedOutside) {
        hideDropdown();
      }
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [clickedOutside]);

    const defaultLoader = (
      <ul className="loader">
        <li>...Loading</li>
      </ul>
    );

    const loader = loadingTemplate ? loadingTemplate : defaultLoader;

    const listRender = loading ? (
      loader
    ) : (
      <ul aria-labelledby={labelId} role="listbox" id={listId}>
        {suggestions.map(({ id, label, value }, index) => {
          return (
            <li
              id={`suggestion-${index}`}
              key={id}
              ref={(el) => suggestionRefs.push(el)}
              className={classnames({ focused: activeIndex === index })}
              aria-selected={activeIndex === index}
              onClick={(e) => onSelectionHandler(e, { label, value })}
            >
              {label}
            </li>
          );
        })}
      </ul>
    );

    // Have an option for static options and also a function to pass and format suggestions
    return (
      <ListboxWrapper
        ref={listboxRef}
        role="combobox"
        aria-expanded={expanded}
        aria-owns={listId}
        aria-haspopup="listbox"
        id={id}
        fieldSize={fieldSize}
      >
        <Field
          ref={fieldRef}
          id={id}
          labelId={labelId}
          floatLabel={false}
          onFocus={showDropdown}
          onBlur={onBlurHandler}
          onKeyUp={checkKey}
          onKeyDown={setActiveItem}
          onChange={onChangeHandler}
          size={fieldSize}
          aria-activedescendant={activedescendant}
        >
          {label}
        </Field>
        <div className={`combobox-wrapper ${expanded ? "" : "hidden"}`}>
          {listRender}
        </div>
      </ListboxWrapper>
    );
  }
);
