import React, { forwardRef } from "react";
import styled, { css } from "styled-components";
import { device } from "../../utils/breakpoints";

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

  // check for explicit setting, else follow theme
  ${({ corners, theme }) =>
    theme.buttons?.corners === "rounded" || corners === "rounded"
      ? rounded
      : squared}

  ${({ fullWidth }) => fullWidth && fullWidthBtn}

  // Need to block level css
  color: ${({ level, theme }) =>
    level && theme && theme.buttons[level] && theme.buttons[level].fg};

  background-color: ${({ theme, level }: any) =>
    theme.buttons[level] && theme.buttons[level].bg};

  border: ${({ level, theme }) =>
    level === "tertiary" ? `2px solid ${theme.buttons[level].accent}` : "none"};

  &:hover {
    color: ${({ theme, level }: any) =>
      theme?.buttons[level] && theme?.buttons[level].hfg};

    background-color: ${({ theme, level }: any) =>
      theme.buttons[level] && theme.buttons[level].hbg};

    border: ${({ level, theme }) =>
      level === "tertiary"
        ? `2px solid ${theme.buttons[level].haccent}`
        : "none"};
  }
`;

export interface ButtonProps
  extends React.HTMLProps<HTMLButtonElement | HTMLAnchorElement> {
  level?: "primary" | "secondary" | "tertiary";
  corners?: "squared" | "rounded";
  as?: any;
  linkCmp?: any;
  loading?: boolean;
  loader?: any;
  fullWidth?: boolean;
}

export const Button = forwardRef(
  (
    {
      level = "primary",
      corners,
      children = "",
      loading = false,
      loader = <div></div>,
      ...props
    }: ButtonProps,
    ref
  ) => {
    const buttonContent = loading ? loader : children;

    return (
      <ButtonWrapper
        as={props.href ? "a" : "button"}
        level={level}
        corners={corners}
        $loading={loading}
        loader={loader}
        ref={ref}
        {...props}
      >
        {buttonContent}
      </ButtonWrapper>
    );
  }
);
