import React from "react";
import styled from "styled-components";
import { shell } from "electron";

const StyledImage = styled.img`
  display: block;
  margin: 0 auto;
  max-width: 100%;
  transition: 300ms;
  cursor: pointer;

  &:hover {
    filter: brightness(120%);
  }
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

  const handleClick = () => {
    const isLocalImage = image.startsWith("/static") // set in require statement
    const isLink = image.startsWith("https")
    
    if (isLocalImage || isLink) {
      shell.openExternal(`https://internetexploring.io/images/${encodeURIComponent(image)}`);

    }
  }
  return <StyledImage className={className} onClick={handleClick} src={image} alt="No Image" />;
};

export default Image;
