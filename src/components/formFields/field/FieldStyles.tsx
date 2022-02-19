import { css } from "styled-components";
import { themeOrDefault } from "../../../utils/theme-utils";

export type FieldStyle = "default" | "outline" | "invisible";
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

  input {
    outline: 2px solid
      ${({ theme }) =>
        theme &&
        themeOrDefault(
          theme.formField.inputbg,
          theme.palette.primary.contrastText
        )};
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

  &.focused .field-contents {
    outline: 2px solid
      ${({ theme }) =>
        theme &&
        themeOrDefault(
          theme.formField.focusOutline,
          theme.palette.primary.contrastText
        )};
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
  }

  textarea {
    background-color: ${({ theme }) => theme.backgroundColor};
  }
`;

// Default
export const InFieldFloat = css`
  label {
    top: 1.4rem;
  }

  .field-contents {
    padding-top: 1.2rem;
    padding-bottom: 1.2rem;
  }

  &.float-label {
    .field-contents {
      padding-top: 1.8rem;
      padding-bottom: 0.6rem;
    }
  }

  &.float-label.filled label,
  &.focused.float-label label,
  &.has-placeholder label {
    transform: translate(0, -0.8rem) scale(0.75);
    opacity: 1 !important;
    top: 1.2rem;
  }

  &.filled input,
  &.focused label {
    padding-top: 0;
  }

  // Ensures if background of formfiled is same as main background to include an outline
  .field-contents {
    ${({ theme }) =>
      theme.formField.bg === theme.backgroundColor &&
      `
    outline: 2px solid ${theme.formField.outline};
  `}
  }

  &.focused .field-contents {
    outline: 2px solid
      ${({ theme }) =>
        theme &&
        themeOrDefault(
          theme.formField.outline,
          theme.palette.primary.contrastText
        )};
  }
`;
