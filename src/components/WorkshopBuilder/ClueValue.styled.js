import styled from "styled-components";

export const ClueValuesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 5px;
  box-sizing: border-box;
  align-items: center;
  margin: 5px;
`;

export const StyledClueValue = styled.div`
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.2);
  padding: 10px;
  border-radius: 5px;
  position: relative;
  transition: 300ms;
  margin: 5px;
`;

export const StyledFileInputLabel = styled.label`
  border: none;
  font-family: "Fredoka";
  text-align: center;
  color: white;
  cursor: pointer;
  display: block;
  padding: 7px;
  font-size: 12px;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.2);
  transition: 300ms;
  width: 100%;
  box-sizing: border-box;
`;
