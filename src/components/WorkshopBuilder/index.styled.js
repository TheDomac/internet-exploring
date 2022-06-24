import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Content = styled.div`
  flex: 1;
`;

export const RebusTabsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;

export const RebusTab = styled.div`
  flex: 1;
  padding: 15px;
  text-align: center;
  font-size: 30px;
  margin: 5px;
  transition: 300ms;
  position: relative;
  background: rgba(
    255,
    255,
    255,
    ${({ $isSelected }) => ($isSelected ? 0.3 : 0.1)}
  );
  border-radius: 3px;

  ${({ $disabled }) =>
    $disabled
      ? "background: rgba(0,0,0,0.2); cursor: not-allowed; color: #CCC"
      : `

cursor: pointer;
&:hover {
    background: rgba(255,255,255, 0.3);
}
`}
`;

export const DeleteButton = styled.button`
  position: absolute;
  font-family: "Fredoka";
  background: transparent;
  cursor: pointer;
  color: white;
  border: none;
  transition: 300ms;
  border-radius: 3px;
  &:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`;

export const StyledInput = styled.input`
  background: transparent;
  color: white;
  padding: 10px 10px 10px 0;
  font-family: "Fredoka";
  display: block;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 2px solid #355e65;
  margin-bottom: 7px;
`;

export const StyledSelect = styled.select`
  background: transparent;
  color: white;
  padding: 10px 10px 10px 0;
  font-family: "Fredoka";
  display: block;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 2px solid #355e65;
  margin-bottom: 7px;
`;

export const AddClueButtonWrapper = styled.div`
  width: 33%;
`;
export const AddClueButton = styled.div`
  cursor: pointer;
  ${({ size }) => `width: ${size}px; height: ${size}px;`}
  margin: 0 auto;
  border-radius: 50%;
  border: 2px solid #999;
  color: #999;
  position: relative;
  font-size: 50px;
  transition: 300ms;
  margin: 10px auto;

  &:hover {
    background: rgba(0, 0, 0, 0.4);
    border: 2px solid white;
    color: white;
  }
  & span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -57%);
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
`;

export const Button = styled.button`
  border: none;
  font-family: "Fredoka";
  text-align: center;
  color: white;
  cursor: pointer;
  display: block;
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.2);
  transition: 300ms;
  width: 100%;

  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }
  ${({ $isSelected }) => ($isSelected ? "background: rgba(0,0,0,0.4);" : "")}
`;

export const HelpText = styled.p`
  cursor: help;
`;
