import styled from "styled-components";
import { RIDDLE_STATUSES } from "../../common/consts";

const backgrounds = {
  [RIDDLE_STATUSES.DENIED]: "#b74848",
  [RIDDLE_STATUSES.NEEDS_APPROVAL]: "#1d93c1",
  [RIDDLE_STATUSES.DONE]: "#309d6d",
};

export const CornerIcons = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  display: flex;
`;

export const CornerIcon = styled.div`
  width: 25px;
  height: 25px;
  font-family: "Fredoka";
  font-size: 16px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 300ms;
  background: ${({ $status }) => backgrounds[$status] || "#CCC"};
  color: #333;
  border: 1px solid white;

  &:not(:last-child) {
    margin-right: 5px;
  }
`;

export const MessageWrapper = styled.div`
  box-sizing: border-box;
  padding: 10px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  margin-bottom: 15px;
`;
