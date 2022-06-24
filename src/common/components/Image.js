import React from "react";
import styled from "styled-components";

const StyledImage = styled.img`
  display: block;
  margin: 0 auto;
  max-width: 100%;
`;

const Image = ({ fileName, className }) => {
  let image;
  if (fileName.startsWith("blob")) {
    image = fileName;
  } else {
    try {
      image = require(`../../images/${fileName}`);
    } catch (e) {}
  }

  return <StyledImage className={className} src={image} alt="No Image" />;
};

export default Image;
