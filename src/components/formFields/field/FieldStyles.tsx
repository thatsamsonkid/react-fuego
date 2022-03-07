import { css } from "styled-components";
import { themeOrDefault } from "../../../utils/theme-utils";

export type FieldStyle = "default" | "outline" | "invisible";
export const outFieldFloat = css`
  &.float-label {
    .field-contents {
      padding-top: 1.2rem;
      padding-bottom: 1.2rem;
    }

    &.fue-field--sm {
      .field-contents {
        padding-top: 0.8rem;
        padding-bottom: 0.8rem;
      }
    }
  }

  &.float-label.filled label,
  &.focused.float-label label,
  &.has-placeholder label {
    transform: translate(0, -0.8rem) scale(0.75);
    opacity: 1 !important;
    top: -1.25rem;
  }
`;

export const outlineFieldFloat = css`
  &.float-label {
    .field-contents {
      padding-top: 1.2rem;
      padding-bottom: 1.2rem;
    }
  }

  &.float-label.filled label,
  &.focused.float-label label,
  &.has-placeholder label {
    transform: translate(-0.5rem, -2rem) scale(0.75);
    background-color: ${({ theme }) =>
      theme && themeOrDefault(theme.formField.labelbg, theme.backgroundColor)};
    padding: 0 0.75rem;
  }
`;

// Default
export const InFieldFloat = css`
  label {
    top: 1.4rem;
  }

  &.fue-field--sm {
    label {
      top: 0.8rem;
    }

    // Non Float Label
    .field-contents {
      padding-top: 0.6rem;
      padding-bottom: 0.6rem;
    }
  }

  // Non Float Label
  .field-contents {
    padding-top: 1.2rem;
    padding-bottom: 1.2rem;
  }

  &.float-label {
    .field-contents {
      padding-top: 1.8rem;
      padding-bottom: 0.6rem;
    }

    &.fue-field--sm {
      .field-contents {
        padding-top: 1.4rem;
        padding-bottom: 0;
      }
    }
  }

  &.float-label.filled label,
  &.focused.float-label label,
  &.has-placeholder label {
    &.fue-field--sm {
      .label {
        transform: translate(0, -0.8rem) scale(0.65);
      }
    }
  }
`;

export const BaseFieldStyles = css`
  label {
    top: 1.4rem;
  }

  &.fue-field--sm {
    label {
      top: 0.8rem;
    }

    // Non Float Label
    .field-contents {
      padding-top: 0.6rem;
      padding-bottom: 0.6rem;
    }
  }

  // Non Float Label
  .field-contents {
    padding-top: 1.2rem;
    padding-bottom: 1.2rem;
  }

  &.float-label {
    .field-contents {
      padding-top: 1.8rem;
      padding-bottom: 0.6rem;
    }

    &.fue-field--sm {
      .field-contents {
        padding-top: 1.4rem;
        padding-bottom: 0;
      }
    }
  }

  &.float-label.filled label,
  &.focused.float-label label,
  &.has-placeholder label {
    transform: translate(0, -0.8rem) scale(0.75);
    opacity: 1 !important;
    top: 1.2rem;

    &.fue-field--sm {
      .label {
        transform: translate(0, -0.8rem) scale(0.65);
      }
    }
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
