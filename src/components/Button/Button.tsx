import React from "react";
import styled, { css } from "styled-components";

// const primaryBtn = css`

// `;

const ButtonWrapper = styled.button`
  padding: 1.5rem 3rem;
  border: none;
  border-radius: 1rem;

  // Need to block level css
  color: ${({ theme, level }: any) =>
    theme.palette[level] && theme.palette[level].contrastText};

  background-color: ${({ theme, level }: any) =>
    theme.palette[level] && theme.palette[level].main};
`;

interface ButtonProps {
  level: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg";
  label: string;
  corners?: "squared" | "rounded";
  href?: "";
  linkCmp?: any;
  loading?: boolean;
  loader?: any;
  theme?: any;
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  level = "primary",
  size = "md",
  corners = "squared",
  label,
  /* Next JS Link or other framework Link */
  linkCmp,
  loading,
  loader = <div></div>,
  ...props
}: ButtonProps) => {
  return (
    <ButtonWrapper
      as={props.href ? linkCmp : "button"}
      level={level}
      theme={props.theme}
      {...props}
    >
      {label}
    </ButtonWrapper>
  );
};
