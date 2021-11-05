import styled from "styled-components";

const CardWrapper = styled.section`
  padding: 2.5rem;
  min-height: 3.4rem;
  position: relative;
  box-shadow: ${({ theme }: any) => theme.card && theme.card.border};
  border-radius: 4px;
  color: ${({ theme }: any) =>
    theme.palette && theme.palette.primary.contrastText};
  background-color: ${({ theme }: any) =>
    theme.palette && theme.palette.primary.light};
`;

interface ICard {
  children: any;
}

function Card({ children, ...props }: ICard) {
  return <CardWrapper {...props}>{children}</CardWrapper>;
}

export default Card;
