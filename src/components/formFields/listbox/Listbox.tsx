import React, {
  forwardRef,
  KeyboardEvent,
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  SyntheticEvent,
  BaseSyntheticEvent,
} from "react";
import { Field } from "../field/Field";
import styled from "styled-components";
import { Keys } from "../../../utils/keycodes";
import { classnames } from "../../../utils/component-utils";
import { useUIDSeed } from "react-uid";
import { useOutsideAlerter } from "../../../hooks/useClickOutside";

interface IListbox {
  id?: string;
  label: string;
  children?: any;
  autocomplete?: any;
  options?: Array<any>;
  loading?: boolean;
  loadingTemplate?: any;
  onSelection?: any;
  onChange?: any;
}

const ListboxWrapper = styled.div`
  position: relative;
  .combobox-wrapper {
    border-radius: 7px;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    position: absolute;
    top: 2.6rem;
    width: 100%;
    border: 1px solid #212121;
    border-top: none;
    z-index: 1;
    padding-top: 2rem;

    &.hidden {
      display: none;
    }

    & > ul {
      list-style: none;
      padding: 0;
      margin: 0;

      &.loader {
        li {
          cursor: pointer;
          &:hover,
          &.focused {
            background-color: #121212;
          }
        }
      }

      li {
        padding: 0.8rem 1rem;
        color: white;
        background-color: #121212;

        &:hover,
        &.focused {
          background-color: #212121;
        }

        &:first-child {
          padding-top: 1.8rem;
        }

        &:last-child {
          border-bottom-left-radius: 0.6rem;
          border-bottom-right-radius: 0.6rem;
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
    }: IListbox,
    ref: any
  ) => {
    const seed = useUIDSeed();
    let id = `${seed("Listbox")}`;

    const labelId = `${id}-label`;
    const listId = `${id}-list`;

    const [activeIndex, setActiveIndex] = useState(-1);
    const [expanded, setExpanded] = useState(false);
    const [suggestions, setSuggestions] = useState(options);
    const [activedescendant, setActivedescendant] = useState("");
    let suggestionRefs: Array<any> = [];

    const defaultLoader = (
      <ul className="loader">
        <li>...Loading</li>
      </ul>
    );
    const loader = loadingTemplate ? loadingTemplate : defaultLoader;
    const listboxRef = useRef<any>();

    const [clickedOutside, setClickedOutside] = useState(false);

    const handleClickOutside = (e: any) => {
      if (!listboxRef.current.contains(e.target)) {
        setClickedOutside(true);
      } else {
        setClickedOutside(false);
      }
    };

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    });

    useEffect(() => {
      console.log(clickedOutside);
      if (clickedOutside) {
        hideDropdown();
      }
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [clickedOutside]);

    const handleClickInside = () => setClickedOutside(false);

    const fieldRef = useRef<any>();
    useImperativeHandle(ref, () => fieldRef.current);

    const showDropdown = () => setExpanded(true);
    const hideDropdown = () => setExpanded(false);

    const delayedHideDropdown = () => {
      // Gives time for click events for selections to propogate
      setTimeout(() => setExpanded(false), 10);
    };

    const onChangeHandler = (e: Event) => {
      !expanded && setExpanded(true);
      onChange && onChange(e);
    };

    const onSelectionHandler = (e: SyntheticEvent, selection: any) => {
      fieldRef.current.value = selection.label;
      onSelection && onSelection(selection);
      setClickedOutside(false);
      delayedHideDropdown();
    };

    const selectItem = (selection: any) => {
      if (selection) {
        fieldRef.current.value = selection.label;
        fieldRef.current.focus();
        setClickedOutside(false);
        // delayedHideDropdown();
      }
    };

    const checkSelection = () => {
      if (activeIndex < 0) {
        return;
      }
      var activeItem = getItemAt(activeIndex);
      selectItem(activeItem);
    };

    // const onBlurHandler = (event: any) => {
    //   console.log(event);
    //   if (!event.currentTarget.contains(event.relatedTarget)) {
    //     hideDropdown();
    //   }
    // };

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

    useEffect(() => {
      setSuggestions(options);
    }, [options]);
    // useEffect(() => {
    //   console.log(activeIndex);
    //   console.log(suggestionRefs);
    //   console.log(fieldRef);
    //   console.log(activedescendant);
    // }, [activeIndex, suggestionRefs, fieldRef, activedescendant]);

    // Have an option for static options and also a function to pass and format suggestions
    return (
      <ListboxWrapper
        ref={listboxRef}
        role="combobox"
        aria-expanded={expanded}
        aria-owns={listId}
        aria-haspopup="listbox"
        id={id}
      >
        <Field
          ref={fieldRef}
          id={id}
          labelId={labelId}
          floatLabel={false}
          onFocus={showDropdown}
          onKeyUp={checkKey}
          onKeyDown={setActiveItem}
          onChange={onChangeHandler}
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
