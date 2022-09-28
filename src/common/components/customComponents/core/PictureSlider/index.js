import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  ${({ $show }) =>
    `opacity: ${$show ? "1" : "0"}; visibility: ${
      $show ? "visible" : "hidden"
    }; display: ${$show ? "block" : "none"};`}
  ${({ $height, $width }) => `width: ${$width}px; height: ${$height}px`};
  margin: 0 auto;
  margin-bottom: 45px;
`;

const Image = styled.img`
  position: absolute;
  transition: 300ms;
  ${({ $canClickImage }) =>
    $canClickImage
      ? `&:hover {
    cursor: pointer;
    filter: brightness(120%);
  }`
      : ""}
  ${({ $left, $top }) =>
    `
    top: ${$top}px;
    left: ${$left}px;`}
`;

const SolutionScreen = styled.div`
  ${({ $show }) =>
    `opacity: ${$show ? "1" : "0"}; visibility: ${
      $show ? "visible" : "hidden"
    }; display: ${$show ? "block" : "none"};`}
`;

const PictureSlider = ({
  collection,
  rows,
  columns,
  tileSizeX,
  tileSizeY,
  finishedScreen,
  initialSlider,
  initialHoleLocation,
  correctSlider,
  onFinish,
  isMarkedAsSolved,
  stateMaintenanceValue,
  updateMaintenance,
  id,
}) => {
  const [slider, setSlider] = useState(
    stateMaintenanceValue?.slider || initialSlider
  );
  const holeLocation = useRef(
    stateMaintenanceValue?.holeLocation || initialHoleLocation
  );

  const handlePictureClick = (imgX, imgY) => () => {
    const holeIsBottom =
      imgX === holeLocation.current[0] && imgY + 1 === holeLocation.current[1];
    if (holeIsBottom) {
      const sliderIndex = slider.findIndex(
        (s) => s[0] === imgX && s[1] === imgY
      );
      const newSlider = [
        ...slider.slice(0, sliderIndex),
        [imgX, imgY + 1],
        ...slider.slice(sliderIndex + 1),
      ];
      holeLocation.current = [imgX, imgY];
      setSlider(newSlider);
      updateMaintenance(id, { slider: newSlider, holeLocation: [imgX, imgY] });
      return;
    }

    const holeIsTop =
      imgX === holeLocation.current[0] && imgY - 1 === holeLocation.current[1];
    if (holeIsTop) {
      const sliderIndex = slider.findIndex(
        (s) => s[0] === imgX && s[1] === imgY
      );
      const newSlider = [
        ...slider.slice(0, sliderIndex),
        [imgX, imgY - 1],
        ...slider.slice(sliderIndex + 1),
      ];
      holeLocation.current = [imgX, imgY];
      setSlider(newSlider);
      updateMaintenance(id, { slider: newSlider, holeLocation: [imgX, imgY] });
      return;
    }

    const holeIsLeft =
      imgX - 1 === holeLocation.current[0] && imgY === holeLocation.current[1];
    if (holeIsLeft) {
      const sliderIndex = slider.findIndex(
        (s) => s[0] === imgX && s[1] === imgY
      );
      const newSlider = [
        ...slider.slice(0, sliderIndex),
        [imgX - 1, imgY],
        ...slider.slice(sliderIndex + 1),
      ];
      holeLocation.current = [imgX, imgY];
      setSlider(newSlider);
      updateMaintenance(id, { slider: newSlider, holeLocation: [imgX, imgY] });
      return;
    }

    const holeIsRight =
      imgX + 1 === holeLocation.current[0] && imgY === holeLocation.current[1];
    if (holeIsRight) {
      const sliderIndex = slider.findIndex(
        (s) => s[0] === imgX && s[1] === imgY
      );
      const newSlider = [
        ...slider.slice(0, sliderIndex),
        [imgX + 1, imgY],
        ...slider.slice(sliderIndex + 1),
      ];
      holeLocation.current = [imgX, imgY];
      setSlider(newSlider);
      updateMaintenance(id, { slider: newSlider, holeLocation: [imgX, imgY] });
      return;
    }
  };

  const isSolvedBySlider = slider.every(
    (sliderValue, i) =>
      sliderValue[0] === correctSlider[i][0] &&
      sliderValue[1] === correctSlider[i][1]
  );

  useEffect(() => {
    if (isSolvedBySlider) {
      onFinish();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSolvedBySlider]);

  const isSolved = isSolvedBySlider || isMarkedAsSolved;

  return (
    <>
      <Wrapper
        $width={tileSizeX * columns}
        $height={tileSizeY * rows}
        $show={!isSolved}
      >
        {collection.map((img, i) => {
          const imgX = slider[i][0];
          const imgY = slider[i][1];

          const canClickImage =
            (imgX === holeLocation.current[0] + 1 &&
              imgY === holeLocation.current[1]) ||
            (imgX === holeLocation.current[0] - 1 &&
              imgY === holeLocation.current[1]) ||
            (imgX === holeLocation.current[0] &&
              imgY === holeLocation.current[1] + 1) ||
            (imgX === holeLocation.current[0] &&
              imgY === holeLocation.current[1] - 1);

          return (
            <Image
              src={img}
              key={i}
              $left={imgX * tileSizeX}
              $top={imgY * tileSizeY}
              onMouseDown={handlePictureClick(imgX, imgY)}
              $canClickImage={canClickImage}
            />
          );
        })}
      </Wrapper>
      <SolutionScreen $show={isSolved}>{finishedScreen}</SolutionScreen>
    </>
  );
};

export default PictureSlider;
