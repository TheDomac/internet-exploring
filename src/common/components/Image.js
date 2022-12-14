import React from "react";
import styled from "styled-components";
import { INTERNET_EXPLORING_URL } from "../consts";

const StyledImage = styled.img`
  display: block;
  margin: 0 auto;
  max-width: 100%;
  transition: 300ms;
`;

const Image = ({ fileName, className }) => {
  let file;
  if (fileName.startsWith("http") || fileName.startsWith("blob")) {
    file = fileName
  } else if (fileName.startsWith("workshop")) {
    const splitted = fileName.split("/")
    file = `${INTERNET_EXPLORING_URL}/static/media/${splitted[splitted.length - 1]}`
  } else {
    file = `${INTERNET_EXPLORING_URL}/static/media/${fileName}`
  }

  return <StyledImage className={className} src={file} alt="No Image" />;
};

export default Image;
