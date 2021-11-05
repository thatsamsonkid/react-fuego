import React from "react";
import styled, { css } from "styled-components";
import device from "../../utils/breakpoints";

const rounded = css`
  border-radius: 3rem;
`;

const squared = css`
  border-radius: 1rem;
`;

const fullWidthBtn = css`
  @media ${device.tabletAndbelow} {
    width: 100%;
  }
`;

const ButtonWrapper = styled.button<ButtonProps>`
  padding: 1.5rem 3rem;
  transition: background-color 0.2s, color 0.2s, border 0.2s;
  font-weight: 600;
  font-size: 1.4rem;
  letter-spacing: 0.3px;
  line-height: 12px;

  ${({ corners }) => (corners === "rounded" ? rounded : squared)}

  ${({ fullWidth }) => fullWidth && fullWidthBtn}

  // Need to block level css
  color: ${({ theme, level }: any) =>
    theme.buttons[level] && theme.buttons[level].fg};

  background-color: ${({ theme, level }: any) =>
    theme.buttons[level] && theme.buttons[level].bg};

  border: ${({ level, theme }) =>
    level === "tertiary" ? `2px solid ${theme.buttons[level].accent}` : "none"};

  &:hover {
    color: ${({ theme, level }: any) =>
      theme.buttons[level] && theme.buttons[level].hfg};

    background-color: ${({ theme, level }: any) =>
      theme.buttons[level] && theme.buttons[level].hbg};

    border: ${({ level, theme }) =>
      level === "tertiary"
        ? `2px solid ${theme.buttons[level].haccent}`
        : "none"};
  }
`;

interface ButtonProps {
  level: "primary" | "secondary" | "tertiary";
  // size?: "sm" | "md" | "lg";
  label: string;
  corners?: "squared" | "rounded";
  href?: "";
  linkCmp?: any;
  loading?: boolean;
  loader?: any;
  theme?: any;
  fullWidth?: boolean;
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  level = "primary",
  // size = "md",
  corners = "squared",
  label,
  /* Next JS Link or other framework Link */
  linkCmp,
  loading = false,
  loader = <div></div>,
  ...props
}: ButtonProps) => {
  const buttonContent = loading ? loader : label;
  return (
    <ButtonWrapper
      as={props.href ? linkCmp : "button"}
      level={level}
      theme={props.theme}
      corners={corners}
      $loading={loading}
      loader={loader}
      {...props}
    >
      {buttonContent}
    </ButtonWrapper>
  );
};
