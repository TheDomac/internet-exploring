import styled from "styled-components";

export const Input = styled.input`
  background: transparent;
  color: white;
  border: 2px solid white;
  width: 100%;
  display: block;
  margin: 0 auto;
  max-width: ${({ $small }) => ($small ? "315px" : "100%")};
  padding: ${({ $small }) => ($small ? "7px" : "10px")};
  border-radius: 5px;
  text-align: center;
  font-size: ${({ $small }) => ($small ? "16px" : "20px")};
  font-family: "Fredoka";
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px,
    rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
  box-sizing: border-box;
  margin-top: 14px;
  transition: 300ms;

  & > option {
    color: #082347;

    &:disabled {
      color: #939191;
    }
  }

  &:focus-visible {
    outline: none;
  }
`;
