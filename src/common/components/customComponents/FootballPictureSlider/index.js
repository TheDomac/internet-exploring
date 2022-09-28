import React from "react";
import { motion } from "framer-motion";

import { SolvedBox } from "../../SolvedBox.styled";
import Check from "../../Check";

import PictureSlider from "../core/PictureSlider";

import img1 from "./images/1.png";
import img2 from "./images/2.png";
import img3 from "./images/3.png";
import img4 from "./images/4.png";
import img5 from "./images/5.png";
import img6 from "./images/6.png";
import img8 from "./images/8.png";
import img9 from "./images/9.png";
import finalPicture from "./images/finalPicture.png";

const collection = [img1, img2, img3, img4, img5, img6, img8, img9];

const correctSlider = [
  [0, 0],
  [1, 0],
  [2, 0],
  [0, 1],
  [1, 1],
  [2, 1],
  [1, 2],
  [2, 2],
];

// use this one for one tile move solved
// const initialSlider = [
//   [0, 0],
//   [1, 0],
//   [2, 0],
//   [0, 2],
//   [1, 1],
//   [2, 1],
//   [1, 2],
//   [2, 2],
// ];
// const initialHoleLocation = [0, 1];

// otherwise use these
const initialSlider = [
  [0, 0],
  [1, 1],
  [0, 1],
  [1, 2],
  [2, 2],
  [1, 0],
  [2, 1],
  [2, 0],
];
const initialHoleLocation = [0, 2];

const FirstPictureSlider = ({
  id,
  markAsSolved,
  solved,
  stateMaintenanceValue,
  updateMaintenance,
}) => {
  const onFinish = () => {
    markAsSolved(id, true);
  };

  return (
    <PictureSlider
      collection={collection}
      tileSizeX={183}
      tileSizeY={146}
      rows={3}
      columns={3}
      onFinish={onFinish}
      isMarkedAsSolved={solved}
      stateMaintenanceValue={stateMaintenanceValue}
      updateMaintenance={updateMaintenance}
      id={id}
      finishedScreen={
        <>
          <img src={finalPicture} alt="finished_image" />
          <SolvedBox
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            $centeredCheck
            $small
          >
            <span />
            <Check />
          </SolvedBox>
        </>
      }
      initialSlider={initialSlider}
      initialHoleLocation={initialHoleLocation}
      correctSlider={correctSlider}
    />
  );
};

export default FirstPictureSlider;
