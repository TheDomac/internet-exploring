import styled from "styled-components";

export const WrapperForm = styled.form`
  width: 100%;
  transition: 300ms;

  ${({ $isWrongAnswer }) =>
    $isWrongAnswer
      ? `
      transform: scale(110%);
        color: #ff423f;

`
      : ""};
`;

export const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 17px;
`;

export const Number = styled.div`
  display: flex;
  justify-content: center;
  align-items: ${({ $bottom }) => ($bottom ? "flex-end" : "center")};
  ${({ $notClickable }) =>
    $notClickable
      ? ""
      : `
  cursor: pointer;
  &:hover {
    background: rgba(255,255,255, 0.2);
  }

  `}
  width: 30px;
  height: 30px;
  border-radius: 3px;
  margin-right: 5px;
  border: 1px solid transparent;
  transition: 300ms;
  ${({ $selected }) => ($selected ? "border: 1px solid white;" : "")}

  &:last-child {
    margin-right: 0;
  }
`;

export const ClickableNumber = styled.button`
  margin-right: 5px;
  cursor: pointer;
  width: 32px;
  height: 32px;

  &:last-child {
    margin-right: 0;
  }
`;

export const InputWrapper = styled.div`
  transition: 300ms;
  ${({ $isInputShown }) =>
    $isInputShown
      ? ""
      : "opacity: 0; visibility: hidden; pointer-events: none;"}
`;
