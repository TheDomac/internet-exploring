import styled from "styled-components";

export const Circle = styled.div`
  border-radius: 50%;
  border: 3px solid white;
  width: 11px;
  height: 11px;
`;

export const Square = styled.div`
  border: 3px solid white;
  width: 11px;
  height: 11px;
`;
export const Triangle = styled.div`
  position: relative;
  transform: scale(var(--ggs, 1));
  width: 22px;
  height: 17px;
  border-left: 3px solid transparent;
  border-bottom: 3px solid;
  display: block;
  box-sizing: border-box;
  border-right: 3px solid transparent;

  &::before {
    display: block;
    box-sizing: border-box;
    border-right: 3px solid transparent;

    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    border-left: 3px solid;
    border-top: 3px solid;
    border-bottom: 3px solid transparent;
    transform: rotate(45deg) skew(10deg, 10deg);
    left: -2px;
    bottom: -13px;
  }
`;
