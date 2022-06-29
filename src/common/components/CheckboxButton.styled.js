import styled from "styled-components";

export const CheckboxButton = styled.button`
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid white;
  color: white;
  font-family: "Fredoka";
  box-sizing: border-box;
  background: transparent;
  margin: 5px;
  transition: 300ms;

  ${({ $isChecked }) =>
    $isChecked
      ? `
background: rgba(255,255,255,0.5);
color: #082347;
`
      : ""}
`;
