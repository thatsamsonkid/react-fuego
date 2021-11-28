import { css } from "styled-components";

const themeOrDefault = (fieldThemeOverride: any, fieldThemeDefault: any) => {
  return fieldThemeOverride || fieldThemeDefault;
};

export const outFieldFloat = css`
  label {
    top: 2.3rem;
    left: 1.6rem;
  }

  &.float-label.filled label,
  &.focused.float-label label,
  &.has-placeholder label {
    transform: translate(0, -0.8rem) scale(0.75);
    opacity: 1 !important;
    top: -0.25rem;
    left: 1.5rem;
  }

  input,
  .wrapper-textarea {
    outline: 2px solid
      ${({ theme }) =>
        theme &&
        themeOrDefault(
          theme.formField.inputbg,
          theme.palette.primary.contrastText
        )};
  }

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

  .error--msg {
    color: ${({ theme }) =>
      theme &&
      themeOrDefault(theme.formField.errorfg, theme.palette.error.main)};
  }
`;

export const outlineFieldFloat = css`
  label {
    top: 2.3rem;
    left: 1.6rem;
  }

  &.float-label.filled label,
  &.focused.float-label label,
  &.has-placeholder label {
    transform: translate(0, -0.8rem) scale(0.75);
    opacity: 1 !important;
    background-color: ${({ theme }) =>
      theme && themeOrDefault(theme.formField.labelbg, theme.backgroundColor)};
    top: 1rem;
    left: 0.9rem;
    padding: 0 0.75rem;
  }

  input {
    background-color: ${({ theme }) => theme.backgroundColor};
    outline: 2px solid
      ${({ theme }) =>
        theme &&
        themeOrDefault(
          theme.formField.outline,
          theme.palette.primary.contrastText
        )};

    &:focus {
      padding: 0 1.45rem;
      outline: 2px solid
        ${({ theme }) =>
          theme &&
          themeOrDefault(
            theme.formField.focusOutline,
            theme.palette.primary.contrastText
          )};
    }
  }

  textarea {
    background-color: ${({ theme }) => theme.backgroundColor};
  }

  .wrapper-textarea {
    background-color: ${({ theme }) => theme.backgroundColor};
    outline: 2px solid
      ${({ theme }) =>
        theme &&
        themeOrDefault(
          theme.formField.outline,
          theme.palette.primary.contrastText
        )};
  }

  &.focused .wrapper-textarea {
    outline: 2px solid
      ${({ theme }) =>
        theme &&
        themeOrDefault(
          theme.formField.focusOutline,
          theme.palette.primary.contrastText
        )};
  }

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

  .error--msg {
    color: ${({ theme }) =>
      theme &&
      themeOrDefault(theme.formField.errorfg, theme.palette.error.main)};
  }
`;

// Default
export const InFieldFloat = css`
  label {
    top: 2.3rem;
    left: 1.6rem;
  }

  &.float-label.filled label,
  &.focused.float-label label,
  &.has-placeholder label {
    transform: translate(0, -0.8rem) scale(0.75);
    opacity: 1 !important;
  }

  input {
    padding-top: 1.5rem;

    :focus {
      outline: 2px solid
        ${({ theme }) => theme && theme.palette.primary.contrastText};
    }
  }

  &.focused .wrapper-textarea {
    outline: 2px solid
      ${({ theme }) => theme && theme.palette.primary.contrastText};
  }

  input {
    padding-top: 1.5rem;
  }

  .wrapper-textarea {
    padding-top: 2rem;
  }

  &.has-error label {
    color: ${({ theme }) =>
      theme &&
      themeOrDefault(theme.formField.errorfg, theme.palette.error.main)};
  }

  // Error Theme
  &.has-error input,
  &.has-error .wrapper-textarea {
    outline: 2px solid
      ${({ theme }) =>
        theme &&
        themeOrDefault(theme.formField.errorfg, theme.palette.error.main)};
  }

  .error--msg {
    color: ${({ theme }) =>
      theme &&
      themeOrDefault(theme.formField.errorfg, theme.palette.error.main)};
  }
`;
