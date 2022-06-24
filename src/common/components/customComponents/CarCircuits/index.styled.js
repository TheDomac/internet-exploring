import styled from "styled-components";

export const TileRow = styled.div`
  width: ${({ $width }) => $width}px;
  display: flex;
  flex-direction: row;
`;

export const StyledTile = styled.div`
  width: ${({ $width }) => $width}px;
  height: ${({ $width }) => $width}px;
  position: relative;
  transition: 300ms;
  border-radius: 5px;
  ${({ $withHover }) =>
    $withHover
      ? `
  cursor: pointer;
  &:hover { background: rgba(255,255,255, 0.2); }
  `
      : ""};
`;

export const StyledLight = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

export const StyledLine = styled.div`
  position: absolute;
  width: 50%;
  height: 2px;
  background: white;
  transition: 300ms;
  ${({ $isLit }) => ($isLit ? "box-shadow: 0 0 10px yellow" : "")}
`;
