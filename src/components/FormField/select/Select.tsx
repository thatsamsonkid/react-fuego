import React from "react";
import Selectr from "react-select";
import { ThemeLevel, ThemeValue } from "../../../models/themeModel";
import { FieldStyle } from "../FieldModels";
import { useTheme } from "styled-components";

// (provided, state)
const invisibleSelect = {
  control: (provided: any) => ({
    ...provided,
    border: "none",
    borderRadius: "0px",
    margin: "0 1.2rem",
    minHeight: "1.4rem",
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    padding: "0px 8px",
  }),
  indicatorsContainer: () => ({
    display: "none",
  }),
};

function getInvisibleSelectStyle(theme: any) {
  // Get default, add mods and return
  return {
    menu: (provided: any) => ({
      ...provided,
      margin: "0 0 1rem",
    }),
    control: (provided: any) => ({
      ...provided,
      border: "none",
      borderRadius: "0px",
      margin: "0 1.2rem",
      minHeight: "1.4rem",
      backgroundColor: theme && theme.formField && theme.formField.bg,
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      margin: "0px 1rem",
    }),
    indicatorsContainer: () => ({
      display: "none",
    }),
  };
}

function getDefaultStyle(theme: any) {
  return {
    option: (provided: any, state: any) => ({
      ...provided,
      color:
        state.isSelected || state.isFocused
          ? ThemeValue(theme, ["formField", "hfg"])
          : ThemeValue(theme, ["formField", "fg"]),
      backgroundColor:
        state.isSelected || state.isFocused
          ? ThemeValue(theme, ["formField", "hbg"])
          : ThemeValue(theme, ["formField", "bg"]),
      "&:hover": {
        backgroundColor: ThemeValue(theme, ["formField", "hbg"]),
        color: ThemeValue(theme, ["formField", "hfg"]),
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      margin: "0.2rem 0 1rem",
      padding: "1rem 0 0",
      top: "60%",
      zIndex: "1",
      backgroundColor: ThemeValue(theme, ["formField", "bg"]),
      color: ThemeValue(theme, ["formField", "fg"]),
    }),
    control: (provided: any) => ({
      ...provided,
      borderColor: "transparent",
      borderRadius: "1.4rem",
      minHeight: "3.8rem",
      backgroundColor: ThemeValue(theme, ["formField", "bg"]),
      color: ThemeValue(theme, ["formField", "fg"]),
      zIndex: "2",
      boxShadow: "none",
      "&:hover": {
        borderColor: ThemeValue(theme, ["formField", "fg"]),
      },
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      margin: "0px 1rem",
      backgroundColor: ThemeValue(theme, ["formField", "bg"]),
      color: ThemeValue(theme, ["formField", "fg"]),
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: ThemeValue(theme, ["formField", "fg"]),
    }),
    indicatorsContainer: () => ({
      padding: "0px 8px",
    }),
    dropdownIndicator: (provided: any, state: any) => ({
      padding: "0",
      color: ThemeValue(theme, ["formField", "fg"]),
      transition: "all .2s ease",
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
    }),
  };
}

// const defaultStyle = {
//   control: (provided: any) => ({
//     ...provided,
//     border: "1px solid var(--royal-blue);",
//     borderRadius: "1.4rem",
//     minHeight: "1.4rem",
//   }),
//   valueContainer: (provided: any) => ({
//     ...provided,
//     padding: "0px 8px",
//   }),
//   indicatorsContainer: () => ({
//     padding: "0px 8px",
//   }),
//   dropdownIndicator: () => ({
//     padding: "0",
//     color: "var(--seafoam)",
//   }),
// };

const noOutline = {
  // ...defaultStyle,
  control: (provided: any) => ({
    ...provided,
    border: "none",
    minHeight: "1.4rem",
  }),
};

export interface ISelect {
  theme?: any;
  fieldStyle?: FieldStyle;
  placeholder?: string;
  onChange?: any;
  options: Array<any>;
  className?: string;
}

export const Select = ({
  placeholder,
  onChange,
  options,
  className,
  ...props
}: ISelect) => {
  const theme = useTheme();
  function getSelectStyle(theme: any) {
    switch (theme) {
      case "invisible":
        return getInvisibleSelectStyle(theme);
      case "noOutline":
        return noOutline;
      default:
        return getDefaultStyle(theme);
    }
  }
  console.log(theme);
  const selectStyle = getSelectStyle(theme);
  return (
    <Selectr
      styles={selectStyle}
      placeholder={placeholder}
      onChange={onChange}
      options={options}
    />
  );
};
