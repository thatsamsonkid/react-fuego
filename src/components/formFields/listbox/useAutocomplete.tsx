import React, {
  forwardRef,
  KeyboardEvent,
  useMemo,
  useState,
  createRef,
} from "react";

function useAutocomplete() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [fieldRef, setFieldRef] = useState(null);

  const showDropdown = () => setExpanded(true);
  const hideDropdown = () => setExpanded(false);
  const selectItem = (item: any) => {
    if (item) {
      //   ref.value = item.innerText;
      hideDropdown();
    }
  };

  const checkSelection = () => {
    if (activeIndex < 0) {
      return;
    }
    // var activeItem = getItemAt(activeIndex);
    // selectItem(activeItem);
  };

  //   const getItemAt = (index: number) => suggestionRefs[index];

  return {
    activeIndex,
    setActiveIndex,
    expanded,
    setExpanded,
    suggestions,
    setSuggestions,
    showDropdown,
    hideDropdown,
    fieldRef,
    setFieldRef,
  };
}

export default useAutocomplete;
