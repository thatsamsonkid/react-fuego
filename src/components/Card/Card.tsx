import styled from "styled-components";
import { ThemeLevel } from "../../models/themeModel";

const CardWrapper = styled.section`
  padding: 2.5rem;
  min-height: 3.4rem;
  position: relative;
  box-shadow: ${({ theme }: any) => theme.card && theme.card.border};
  border-radius: 4px;
  color: ${({ theme, level = "primary" }: any) =>
    theme && theme.card && theme.card[level].fg};
  background-color: ${({ theme, level = "primary" }: any) =>
    theme && theme.card && theme.card[level].bg};
`;

export interface ICard {
  level?: ThemeLevel;
  children: any;
}

export function Card({ children, ...props }: ICard) {
  return <CardWrapper {...props}>{children}</CardWrapper>;
}
