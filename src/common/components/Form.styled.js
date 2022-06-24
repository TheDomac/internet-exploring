import styled from "styled-components";

import { Input } from "./Input.styled";

export const Form = styled.form`
  position: relative;
  transition: 150ms;
  ${({ $small }) => ($small ? "max-width: 315px;" : "")}
  width: 100%;
  display: block;
  margin: 0 auto;

  ${({ $isWrongAnswer }) =>
    $isWrongAnswer
      ? `
      transform: scale(110%);

      & ${Input} {

border: 2px solid #ff423f;
color: #ff423f;
      }

`
      : ""};
`;
