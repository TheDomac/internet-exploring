import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
`;

export const WeighWrapper = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%)
    ${({ tilt }) => (tilt ? `rotate(${tilt}deg)` : "")};
  transition: 300ms;
`;
export const LeftWeighWrapper = styled.div`
  position: absolute;
  left: -47px;
  top: 10px;
  transition: 300ms;
`;

export const RightWeighWrapper = styled.div`
  position: absolute;
  right: -52px;
  top: 10px;
  transition: 300ms;
`;

export const StyledBall = styled.div`
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ $isPicture }) => ($isPicture ? "#952727" : "#1a744a")};
  border-radius: 50%;
  transition: 300ms;
  margin-right: 5px;
  flex-direction: column;
  font-size: 16px;
  border: 2px solid transparent;
  cursor: pointer;
`;

export const EmptyBall = styled.div`
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: 2px solid #6c6c6c;
  border-radius: 50%;
  transition: 300ms;
  margin-right: 5px;
  flex-direction: column;
  font-size: 20px;
`;

export const StyledLeftBalls = styled.div`
  position: absolute;
  bottom: 12%;
  left: 5px;
  display: flex;
  flex-direction: row;
  transition: 300ms;
  padding: 10px;
  border-radius: 5px;
`;
export const StyledRightBalls = styled.div`
  position: absolute;
  bottom: 12%;
  left: 5px;
  display: flex;
  flex-direction: row;
  transition: 300ms;
  padding: 10px;
`;
export const StyledBottomBalls = styled.div`
  width: 70%;
  margin: 0 auto;
  min-height: 60px;
  transition: 300ms;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;
