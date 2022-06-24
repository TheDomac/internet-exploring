import styled from "styled-components";

export const StyledSidebar = styled.div`
  min-height: 100vh;
  min-width: 20%;
  padding: 10px;
  box-sizing: border-box;
  border-left: 2px solid #355e65;
`;

export const SaveButton = styled.button`
  width: 100%;
  padding: 15px;
  font-family: "Fredoka";
  text-align: center;
  color: white;
  border: 2px solid white;
  border-radius: 5px;
  background: #309d6d;
  cursor: pointer;
  font-size: 20px;
  transition: 300ms;
  margin: 2.5px;

  &:hover {
    background: #237551;
  }
`;

export const PreviewButton = styled.button`
  width: 100%;
  padding: 15px;
  font-family: "Fredoka";
  text-align: center;
  color: #252a31;
  border: 2px solid #252a31;
  border-radius: 5px;
  background: white;
  cursor: pointer;
  font-size: 20px;
  margin: 2.5px;
  transition: 300ms;
  &:hover {
    background: #aaa;
  }
`;

export const ExitButton = styled.button`
  width: 100%;
  padding: 15px;
  font-family: "Fredoka";
  text-align: center;
  color: white;
  border: 2px solid white;
  border-radius: 5px;
  background: #b74848;
  cursor: pointer;
  font-size: 20px;
  transition: 300ms;
  margin: 2.5px;
  &:hover {
    background: #9f2a2a;
  }
`;
