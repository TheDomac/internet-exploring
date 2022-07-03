import styled from "styled-components";

const backgrounds = {
  success: "#309d6d",
};

const Alert = styled.div`
  padding: 10px;
  box-sizing: border-box;
  color: white;
  background: ${({ $type }) => backgrounds[$type] || "#b74848"};
  border-radius: 5px;
`;

export default Alert;
