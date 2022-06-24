import styled from "styled-components";
import { CODES } from "./codes";

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 10px auto 0 auto;
  transition: 300ms;

  ${({ $isWrongAnswer }) =>
    $isWrongAnswer
      ? `
      transform: scale(110%);
`
      : ""};
  width: ${({ $COLUMNS }) => $COLUMNS * (42 + 2 * 2)}px;
`;

export const StyledCell = styled.div`
  background-color: ${({ cellCode }) => {
    switch (cellCode) {
      case CODES.NOTHING:
      case CODES.MINE:
        return "lightskyblue";
      case CODES.FLAG:
      case CODES.MINE_FLAG:
        return "#F1C40F";
      case CODES.QUESTION:
      case CODES.MINE_QUESTION:
        return "#44D580";
      default:
        return "#e5f4fe";
    }
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 5px;
  box-sizing: border-box;
  color: ${({ cellCode }) => {
    switch (cellCode) {
      case 1:
        return "#0984E3";
      case 2:
        return "#00B894";
      case 3:
        return "#D63031";
      case 4:
        return "#223DAA";
      case 5:
        return "#D35400";
      case 6:
        return "#8E44AD";
      case 7:
        return "#904323";
      case 8:
        return "#FC427B";
      default:
        return "black";
    }
  }};
  font-size: ${({ cellCode }) => (cellCode > 0 ? 20 : 18)}px;
  font-weight: bold;
  margin: 2px;
  outline: none;
  width: 42px;
  height: 42px;
`;
