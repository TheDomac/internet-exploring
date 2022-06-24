import styled from "styled-components";

export const PuzzleWrapper = styled.div`
  width: 280px;
  margin: 0 auto;
  margin-bottom: 11px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;

  &:not(:last-child) {
    border-bottom: 1px solid black;
  }
  &:nth-child(3n + 3):not(:last-child) {
    border-bottom: 2px solid black !important;
  }
`;

export const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  font-size: 16px;
  transition: 300ms;

  background: ${(props) => props.backgroundColor};
  ${(props) => (props.isHighlighted ? "box-shadow: inset 0 0 8px #000" : "")};
  color: ${(props) => (props.isPrefilled ? "#082347" : "#303F9F")};

  &:hover {
    cursor: pointer;
  }

  &:nth-child(3n + 3):not(:last-child) {
    border-right: 2px solid black;
  }
  &:not(:last-child) {
    border-right: 1px solid black;
  }
`;
