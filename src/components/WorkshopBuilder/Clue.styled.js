import styled from "styled-components";

export const ClueWrapper = styled.div`
  cursor: pointer;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 5px;
  transition: 300ms;
  position: relative;
  margin: 5px;
  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }

  ${({ $isSelected }) => ($isSelected ? "background: rgba(0,0,0,0.4)" : "")}
  ${({ $isDependencySelectActive }) =>
    $isDependencySelectActive ? "background: rgba(255,255,255,0.4)" : ""}
`;
