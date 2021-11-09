import { useState, forwardRef } from "react";
import FieldFix from "./Field-Fix";
import styled from "styled-components";

const TextFieldWrapper = styled.div`
  &.sm-form-field {
    position: relative;
    padding: 1rem 0.5rem;
    margin: 1rem 0;
    width: 100%;
  }

  &.sm-form-field label {
    position: absolute;
    margin: 0;
    left: 1.4rem;
    top: 1.5rem;
    font-size: 1.6rem;
  }

  &.sm-form-field.float-label.filled label,
  &.sm-form-field.focused.float-label label,
  &.sm-form-field.has-placeholder label {
    /* top: -0.85rem; */
    top: 0.15rem;
    opacity: 1 !important;
    background-color: #fff;
    padding: 0 0.6rem;
  }

  &.sm-form-field.focused label,
  &.sm-form-field.focused.filled label,
  &.sm-form-field.float-label.filled label {
    opacity: 0;
  }

  &.sm-form-field input {
    border-radius: 1.4rem;
    border: 2px solid var(--secondary-color);
    padding: 0.4rem 0.7rem;
    width: 100%;
    font-size: 1.6rem;
    height: 4.4rem;
    /* max-width: 32rem; */
  }

  &.sm-form-field.sm-form-field--no-outline input {
    border: none;
  }

  &.sm-form-field.sm-form-field--square input {
    border-radius: 4px;
  }

  &.sm-form-field input:focus {
    outline: 0;
    border: 2px solid var(--secondary-color);
  }

  /* prefix  */

  &.sm-form-field .sm-form-field__prefix {
    position: relative;
  }

  &.sm-form-field .sm-form-field__prefix img {
    position: absolute;
    left: 1rem;
    top: 0.3rem;
  }

  &.sm-form-field.has-prefix input {
    padding-left: 3rem;
  }
`;

interface FieldProps {
  name: any;
  value?: any;
  floatLabel?: boolean;
  floatLabelAlways?: boolean;
  prefix?: any;
  children: any;
  placeholder?: string;
  type: string;
  suffix?: any;
  className?: string;
  props?: any;
  fieldName?: any;
  onBlur?: any;
  onChange?: any;
  onFocus?: any;
}

let fieldId = 0;

const Field = forwardRef(
  (
    {
      name,
      value,
      floatLabel,
      floatLabelAlways,
      prefix,
      children,
      placeholder,
      type,
      suffix,
      className,
      fieldName = `field-control-${fieldId++}`,
      onBlur,
      onChange,
      onFocus,
      ...props
    }: FieldProps,
    ref: any
  ) => {
    const [isFocused, setFocus] = useState(false);
    // const onBlur = (e: any) => {
    //   setFocus(false);
    //   onBlurHandler && onBlurHandler(e);
    // };
    // const onFocus = (e: any) => {
    //   setFocus(true);
    //   onFocusHandler && onFocusHandler(e);
    // };

    // const onChange = (e: any) => {
    //   onChangeHandler && onChangeHandler(e);
    // };

    return (
      <TextFieldWrapper
        className={`sm-form-field ${
          isFocused || floatLabelAlways ? "focused" : ""
        } ${floatLabel ? "float-label" : ""} ${value ? "filled" : ""} ${
          placeholder ? "has-placeholder" : ""
        } ${prefix ? "has-prefix" : ""} ${className}`}
      >
        <label htmlFor={fieldName}>{children}</label>
        <FieldFix type="prefix">{prefix}</FieldFix>

        <input
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder={placeholder}
          type={type}
          value={value}
          ref={ref}
          id={fieldName}
        />
        <FieldFix type="suffix">{suffix}</FieldFix>
      </TextFieldWrapper>
    );
  }
);

export default Field;
