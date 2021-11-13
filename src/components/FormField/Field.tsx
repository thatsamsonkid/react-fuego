import { useState, useEffect, forwardRef } from "react";
import FieldFix from "./Field-Fix";
import styled, { css } from "styled-components";

const InFieldFloat = css`
  &.sm-form-field label {
    top: 2.3rem;
    left: 1.6rem;
  }

  &.sm-form-field.float-label.filled label,
  &.sm-form-field.focused.float-label label,
  &.sm-form-field.has-placeholder label {
    transform: translate(0, -0.8rem) scale(0.75);
    opacity: 1 !important;
  }

  &.sm-form-field input {
    padding-top: 1.5rem;
  }

  &.sm-form-field input:focus {
    outline: 2px solid
      ${({ theme }) => theme && theme.palette.primary.contrastText};
  }

  // Error Theme
  &.sm-form-field.has-error label {
    color: ${({ theme }) => theme && theme.palette.error.main};
  }

  &.sm-form-field.has-error input {
    outline: 2px solid ${({ theme }) => theme && theme.palette.error.main};
  }

  &.sm-form-field .sm-form-field-error {
    padding-top: 0.5rem;
    padding-left: 1.6rem;

    &--msg {
      transform-origin: 0 0;
      transform: rotateX(270deg);
      transition: transfrom 2s ease;
      position: absolute;
      color: ${({ theme }) => theme && theme.palette.error.main};
    }
  }

  &.sm-form-field.has-error .sm-form-field-error {
    &--msg {
      transform: rotateX(360deg);
    }
  }
`;

const TextFieldWrapper = styled.div<FieldProps>`
  &.sm-form-field {
    position: relative;
    padding: 1rem 0;
    margin: 1rem 0;
    width: 100%;
  }

  &.sm-form-field label {
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

  &.sm-form-field.float-label.filled label,
  &.sm-form-field.focused.float-label label,
  &.sm-form-field.has-placeholder label {
    opacity: 1 !important;
    background: transparent;
  }

  &.sm-form-field.focused label,
  &.sm-form-field.focused.filled label,
  &.sm-form-field.float-label.filled label {
    opacity: 0;
  }

  &.sm-form-field input {
    border-radius: 1.4rem;
    border: none;
    width: 100%;
    font-size: 1.6rem;
    height: 4.4rem;
    font-family: inherit;
    padding: 0 1.6rem;
  }

  &.sm-form-field.sm-form-field--no-outline input {
    border: none;
  }

  &.sm-form-field.sm-form-field--square input {
    border-radius: 4px;
  }

  &.sm-form-field input:focus {
    outline: 0;
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

  /* Theme */
  &.sm-form-field input {
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.primary.contrastText};
  }

  &.sm-form-field label {
    color: ${({ theme }) => theme.palette.primary.contrastText};
  }

  ${({ theme, floatStyle }) => floatStyle === "inFieldFloat" && InFieldFloat}
`;

interface FieldProps {
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
  fieldName?: any;
  onBlur?: any;
  onChange?: any;
  onFocus?: any;
  onClick?: any;
  errorLabel?: any;
  required?: boolean;
  fieldErrors?: any;
  autocomplete?: any;
  floatStyle?: "inFieldFloat" | "onOutlineFloat" | "outsideFloat";
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
      type = "text",
      suffix,
      className,
      fieldName = `field-control-`,
      onBlur,
      onChange,
      onFocus,
      onClick,
      errorLabel,
      fieldErrors,
      required,
      floatStyle = "inFieldFloat",
      ...props
    }: FieldProps,
    ref: any
  ) => {
    const [id, setId] = useState(fieldName);
    const [currentVal, setCurrentVal] = useState(value);
    const [isFocused, setFocus] = useState(false);
    const onBlurHandler = (e: any) => {
      setFocus(false);
      onBlur && onBlur(e);
    };
    const onFocusHandler = (e: any) => {
      setFocus(true);
      onFocus && onFocus(e);
    };

    const onChangeHandler = (e: any) => {
      onChange && onChange(e);
      setCurrentVal(e.target.value);
    };

    useEffect(() => {
      setId(fieldName + fieldId++);
    }, []);

    useEffect(() => {
      console.log(fieldErrors);
    }, [fieldErrors]);

    const field =
      type === "textarea" ? (
        <textarea
          ref={ref}
          id={id}
          cols={30}
          rows={2}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          onFocus={onFocusHandler}
        ></textarea>
      ) : (
        <input
          name={name}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          onFocus={onFocusHandler}
          placeholder={placeholder}
          type={type}
          ref={ref}
          id={id}
          {...props}
        />
      );

    return (
      <>
        <TextFieldWrapper
          className={`sm-form-field ${
            isFocused || floatLabelAlways ? "focused" : ""
          } ${floatLabel ? "float-label" : ""} ${currentVal ? "filled" : ""} ${
            placeholder ? "has-placeholder" : " "
          } ${prefix ? "has-prefix" : ""} 
          ${className ? className : ""} ${fieldErrors ? "has-error" : ""}`}
          floatStyle={floatStyle}
          {...props}
        >
          <FieldFix type="prefix">{prefix}</FieldFix>
          {field}
          <label htmlFor={fieldName}>
            {children}
            {required && <span className="sm-form-field-required">*</span>}
          </label>
          <FieldFix type="suffix">{suffix}</FieldFix>
          <div className="sm-form-field-error">
            <span className="sm-form-field-error--msg">{errorLabel}</span>
          </div>
        </TextFieldWrapper>
      </>
    );
  }
);

export default Field;
