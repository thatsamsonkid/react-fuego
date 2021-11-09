import React from "react";
import styled from "styled-components";

const TextImageWrapper = styled.section`
  color: ${({ theme }) => theme.palette && theme.palette.primary.contrastText};
`;
const SectionTextContent = styled.div`
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`;

const SectionHeading = styled.h2`
  font-size: 4rem;
  margin-bottom: 4rem;
`;

const SectionText = styled.div`
  p {
    font-size: 2rem;
    line-height: 1.5;
  }
`;

interface ITextImage {
  children: any;
  title?: string;
  titleChild?: any;
  img?: string;
  imgAlt?: string;
  imgChild?: any;
  orderReverse?: boolean;
}

function TextImage({
  children,
  title = "",
  img = "",
  imgAlt = "",
  orderReverse = false,
  ...props
}: ITextImage) {
  const rowClassName = orderReverse ? "row" : "row flex-md-row-reverse";
  const titleEl = props.titleChild ? (
    props.titleChild
  ) : (
    <SectionHeading>{title}</SectionHeading>
  );

  const imgEl = props.imgChild ? (
    props.imgChild
  ) : (
    <img className="img-fluid mb-5 mb-md-0" src={img} alt={imgAlt} />
  );

  return (
    <TextImageWrapper className="py-5 my-5">
      <div className="container">
        <div className={rowClassName}>
          <div className="col-12 col-md">{imgEl}</div>
          <div className="col-12 col-md">
            <SectionTextContent>
              {titleEl}
              <SectionText>{children}</SectionText>
            </SectionTextContent>
          </div>
        </div>
      </div>
    </TextImageWrapper>
  );
}

export default TextImage;
