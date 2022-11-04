import styled from "styled-components";

import { PuzzleLink } from "../../common/components/PuzzleList.styled";

export const PuzzleRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & ${PuzzleLink}:last-child {
    margin-left: 30px;
  }
`;

export const PuzzleTitle = styled.div`
  font-size: 30px;
  width: 200px;
  margin-right: 11px;
`;

export const TextLink = styled.span`
  color: #309d6d;
  -webkit-text-stroke: 0.5px white;
`;

export const BlurredWrapper = styled.div`
filter: blur(20px);
`
