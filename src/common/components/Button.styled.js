import styled from "styled-components";

export const Button = styled.button`
  max-width: 500px;
  width: 500px;
  max-width: 80%;
  padding: 20px;
  background: transparent;
  border-radius: 5px;
  border: 2px solid white;
  color: white;
  font-size: 20px;
  cursor: pointer;
  transition: 300ms;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px,
    rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
  font-family: "Fredoka";
  box-sizing: border-box;

  ${({ marginBottom }) =>
    marginBottom ? `margin-bottom: ${marginBottom};` : ""}

  &:hover:enabled {
    background: rgba(255, 255, 255, 0.5);
    color: #082347;
  }
  &:focus-visible {
    outline: none;
  }

  &:disabled {
    color: #666;
    border: 2px solid #666;
    cursor: not-allowed;
  }
`;
