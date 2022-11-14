import styled from "styled-components";
import { Link } from "react-router-dom";

import { Button } from "../../common/components/Button.styled";

export const Subtitle1 = styled.p`
  margin-top: -20px;
  margin-bottom: 7px;
  font-size: 28px;
  text-align: center;

  @media (max-height: 732px) {
    font-size: 20px;
    margin-top: 0;
    padding: 0 10px 0 10px;
  }

  @media (max-width: 625px) {
    font-size: 20px;
    margin-top: 0;
    padding: 0 10px 0 10px;
  }
`;

export const Subtitle2 = styled.p`
  margin-top: 0px;
  margin-bottom: 40px;
  font-size: 18px;
  text-align: center;

  @media (max-height: 732px) {
    font-size: 16px;
  }
  @media (max-width: 625px) {
    font-size: 16px;
  }
`;

export const Logo = styled.img`
  max-width: 100%;
  @media (max-height: 732px) {
    max-height: 300px;
  }
`;

export const HomeButton = styled(Button)`
  max-width: 100%;
  ${({ $primary }) => ($primary ? "background-color: #309d6d;" : "")}
  @media (max-height: 732px) {
    max-width: 300px;
  }
  @media (max-width: 625px) {
    max-width: 300px;
  }
`;
export const StyledLink = styled(Link)`
  @media (max-height: 732px) {
    max-width: 300px;
  }
  @media (max-width: 625px) {
    max-width: 300px;
  }
`;

export const ScrollDiv = styled.div`
  height: 515px;
  box-sizing: border-box;
  overflow-y: auto;
  margin-bottom: 30px;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 5px;
  width: 700px;

  @media (max-height: 732px) {
    height: 300px;
  }
`;
