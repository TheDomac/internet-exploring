import styled from "styled-components";

export const SolvedBox = styled.div`
  background: #309d6d;
  color: white;
  border: 2px solid #fff;
  display: block;
  width: 100%;
  margin: 0 auto;
  border-radius: 5px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px,
    rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
  position: relative;
  word-break: break-word;
  margin-top: 14px;
  text-align: center;

  ${({ $small }) =>
    $small
      ? `
    max-width: 315px;
    font-size: 16px;
    padding: 7px;
    `
      : `
    font-size: 24px;
    padding: 10px;
    `}

  & > span {
    position: relative;
    display: inline-block;
    max-width: 150px;
  }

  & > svg {
    position: absolute;
    right: 7px;
    top: 50%;
    transform: translateY(-50%);

    ${({ $centeredCheck }) =>
      $centeredCheck
        ? `
    right: 50%;
    transform: translate(50%, -50%);
  `
        : ""}
  }
`;
