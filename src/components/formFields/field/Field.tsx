import { useState, useEffect, useMemo, forwardRef } from "react";
import { FieldFix } from "./Field-Fix";
import styled from "styled-components";
import { InFieldFloat, outFieldFloat, outlineFieldFloat } from "./FieldStyles";
import { themeOrDefault } from "../../../utils/theme-utils";
import { classnames } from "../../../utils/component-utils";
import { useUID, useUIDSeed } from "react-uid";

const TextFieldWrapper = styled.div<FieldProps>`
  position: relative;
  padding: 1rem 0;
  margin: 1rem 0;
  width: 100%;

  label {
    position: absolute;
    margin: 0;
    left: 1.4rem;
    top: 1.5rem;
    font-size: 1.6rem;
    pointer-events: none;
    transform-origin: left top;
    transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
      transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
      max-width 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  }

  &.float-label.filled label,
  &.focused.float-label label,
  &.has-placeholder label {
    opacity: 1 !important;
    background: transparent;
  }

  &.filled label {
    opacity: 0;
  }

  &.focused,
  &.focused input {
    z-index: 2;
  }

  &.focused label,
  &.focused.filled label,
  &.float-label.filled label {
    opacity: 0;
  }

  input {
    border-radius: 1.4rem;
    border: none;
    width: 100%;
    font-size: 1.6rem;
    height: 4.4rem;
    font-family: inherit;
    padding: 0 1.6rem;
  }

  textarea {
    border: none;
    width: 100%;
    font-size: 1.6rem;
    font-family: inherit;
    resize: vertical;
    min-height: 4.4rem;
    padding: 0;
    max-height: 10rem;
  }

  .wrapper-textarea {
    border-radius: 1.4rem;
    min-height: 4.4rem;
    padding: 1rem 1.7rem;
  }

  /* .no-outline input {
    border: none;
  }

  .square input {
    border-radius: 4px;
  } */

  input:focus,
  textarea:focus {
    outline: 0;
  }

  /* prefix  */

  .field__prefix {
    position: relative;
  }

  .field__prefix img {
    position: absolute;
    left: 1rem;
    top: 0.3rem;
  }

  &.has-prefix input {
    padding-left: 3rem;
  }

  /* Error  */
  .error {
    padding-top: 0.5rem;
    padding-left: 1.6rem;

    &--msg {
      transform-origin: 0 0;
      transform: rotateX(270deg);
      transition: transform 200ms ease;
      position: absolute;
    }
  }

  &.has-error .error--msg {
    transform: rotateX(360deg);
  }

  /* Theme */
  input,
  textarea,
  .wrapper-textarea {
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.primary.contrastText};
  }

  label {
    color: ${({ theme }) => theme.palette.primary.contrastText};

    .required {
      color: ${({ theme }) =>
        theme &&
        themeOrDefault(theme.formField.errorfg, theme.palette.error.main)};
    }
  }

  ${({ theme, fieldStyle }) => selectFieldStyle(theme, fieldStyle)}

  // Error Theme
  &.has-error label {
    color: ${({ theme }) =>
      theme &&
      themeOrDefault(theme.formField.errorfg, theme.palette.error.main)};
  }

  &.has-error input,
  &.has-error .wrapper-textarea {
    outline: 2px solid
      ${({ theme }) =>
        theme &&
        themeOrDefault(theme.formField.errorfg, theme.palette.error.main)};
  }

  &.has-error input,
  &.has-error textarea {
    caret-color: ${({ theme }) =>
      theme &&
      themeOrDefault(theme.formField.errorfg, theme.palette.error.main)};
  }

  .error--msg {
    color: ${({ theme }) =>
      theme &&
      themeOrDefault(theme.formField.errorfg, theme.palette.error.main)};
  }
`;

const selectFieldStyle = (theme: any, fieldParam: any) =>
  switchFieldStyle((theme && theme.formField.style) || fieldParam);

const switchFieldStyle = (fieldStyle: string) => {
  switch (fieldStyle) {
    case "outlineFloat":
      return outlineFieldFloat;
    case "outsideFloat":
      return outFieldFloat;
    default:
      return InFieldFloat;
  }
};

const generateFieldKey = (() => {
  let count = 0;
  return () => `field-control-${++count}`;
})();

export interface FieldProps {
  id?: string;
  labelId?: string;
  name?: any;
  value?: any;
  floatLabel?: boolean;
  floatLabelAlways?: boolean;
  prefix?: any;
  children: any;
  placeholder?: string;
  type?: string;
  suffix?: any;
  className?: string;
  props?: any;
  onBlur?: any;
  onChange?: any;
  onFocus?: any;
  onClick?: any;
  errorLabel?: any;
  required?: boolean;
  fieldErrors?: any;
  autocomplete?: any;
  onKeyDown?: any;
  onKeyUp?: any;
  fieldStyle?: "inFieldFloat" | "outlineFloat" | "outsideFloat";
}

export const Field = forwardRef(
  (
    {
      id = "field",
      name,
      value,
      floatLabel,
      floatLabelAlways,
      prefix,
      children,
      placeholder,
      type = "text",
      suffix,
      className,
      onBlur,
      onChange,
      onFocus,
      onClick,
      onKeyDown,
      onKeyUp,
      errorLabel,
      fieldErrors,
      required,
      fieldStyle,
      labelId = "",
      ...props
    }: FieldProps,
    ref: any
  ) => {
    const seed = useUIDSeed();
    let fieldId = seed(id);

    const [isFocused, setFocus] = useState(false);

    const onChangeHandler = (e: any) => onChange && onChange(e);
    const onKeyUpHandler = (e: any) => onKeyUp && onKeyUp(e);
    const onKeyDownHandler = (e: any) => onKeyDown && onKeyDown(e);

    const onBlurHandler = (e: any) => {
      setFocus(false);
      onBlur && onBlur(e);
    };
    const onFocusHandler = (e: any) => {
      setFocus(true);
      onFocus && onFocus(e);
    };

    const field =
      type === "textarea" ? (
        <div className="wrapper-textarea">
          <textarea
            name={name}
            ref={ref}
            id={id}
            cols={30}
            rows={2}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            onFocus={onFocusHandler}
            {...props}
          ></textarea>
        </div>
      ) : (
        <input
          name={name}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          onFocus={onFocusHandler}
          onKeyDown={onKeyDownHandler}
          onKeyUp={onKeyUpHandler}
          placeholder={placeholder}
          type={type}
          ref={ref}
          id={fieldId}
          autoComplete={props.autocomplete ? "on" : "off"}
          {...props}
        />
      );

    const textFieldClasses = classnames(
      {
        focused: isFocused || floatLabelAlways,
        "float-label": floatLabel,
        filled:
          ref &&
          ref.current &&
          ref.current.value &&
          ref.current.value.length > 0,
        "has-placeholder": placeholder,
        "has-prefix": prefix,
        "has-error": fieldErrors,
      },
      className
    );

    return (
      <>
        <TextFieldWrapper
          className={textFieldClasses}
          fieldStyle={fieldStyle}
          {...props}
        >
          <FieldFix type="prefix">{prefix}</FieldFix>
          {field}
          <label id={labelId} htmlFor={fieldId}>
            {children}
            {required && <span className="required">*</span>}
          </label>
          <div></div>
          <FieldFix type="suffix">{suffix}</FieldFix>
          <div className="error">
            <span className="error--msg">{errorLabel}</span>
          </div>
        </TextFieldWrapper>
      </>
    );
  }
);
