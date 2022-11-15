import React from "react";
import styled from "styled-components";

const StyledImage = styled.img`
  display: block;
  margin: 0 auto;
  max-width: 100%;
  transition: 300ms;
`;

const Image = ({ fileName, className }) => {
  let image;
  if (fileName.startsWith("blob") || fileName.startsWith("https")) {
    image = fileName;
  } else {
    try {
      image = require(`../../images/${fileName}`); // example: /static/media/0fa45b480cf079599522.png
    } catch (e) {}
  }

  return <StyledImage className={className} src={image} alt="No Image" />;
};

export default Image;
