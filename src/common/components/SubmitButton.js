import React from "react";
import styled from "styled-components";

export const Button = styled.button`
  ${({ $isStatic }) =>
    $isStatic
      ? `
position: relative;
margin-top: 14px;
border-radius: 5px;


`
      : `
position: absolute;
right: 2px;
top: 2px;
bottom: 2px;
`};

  border: ${({ $isBorderShown }) =>
    $isBorderShown
      ? `
  2px solid white;
  &:hover {
    border: 2px solid #2b8068;
  
  }
  `
      : "none"};

  background: transparent;

  cursor: pointer;
  transition: 300ms;

  ${({ $small }) =>
    $small
      ? `
  width: 38px;
  min-width: 38px;
  max-width: 38px;
  `
      : `
  width: 45px;
  min-width: 45px;
  max-width: 45px;
  min-height: 38px;
  `};

  &:hover {
    svg {
      fill: #2b8068;
    }
  }
`;

const Svg = styled.svg`
  fill: white;
  transition: 300ms;

  ${({ $small }) =>
    $small
      ? `
  width: 20px;
  height: 20px;
  `
      : `
  width: 24px;
  hight: 24px;
  `};

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SubmitButton = ({ small, isStatic, isBorderShown }) => {
  return (
    <Button
      type="submit"
      $small={small}
      $isStatic={isStatic}
      $isBorderShown={isBorderShown}
    >
      <Svg
        $small={small}
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
      >
        <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"></path>
      </Svg>
    </Button>
  );
};

export default SubmitButton;
