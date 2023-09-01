import React, { useContext, useEffect, useState } from "react";

import { useLocation } from "react-router";

import { PuzzleWrapper, HelpButton } from "./index.styled";
import HelpModal from "./HelpModal";
import ImagesLoader from "./ImagesLoader";
import CopyNotification from "./CopyNotification";
import { PuzzleContext } from "../../services/PuzzleContext";
import Breadcrumbs from "../Breadcrumbs";
import Rebus from "../Rebus";
import { FadeInDiv, FadeInP } from "../FadeIn";
import Loading from "../Loading.styled";
import { Container } from "../Container.styled";
import Alert from "../Alert.styled";
import { clueTypes } from "../../consts";

const Puzzle = ({ selectedPuzzle, handleFinishClick, loading, error }) => {
  const [loadedImages, setLoadedImages] = useState([]);
  const location = useLocation();
  const { puzzle, initPuzzle, helpClicked, rebus } = useContext(PuzzleContext);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const selectedRebusIndexParam = params.get("selectedRebusIndex");
    initPuzzle(selectedPuzzle, Number(selectedRebusIndexParam));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const imagesToLoad =
    rebus?.clues.reduce((prev, clue) => {
      const imagesInClue = clue.clueValues
        .filter((cv) => cv.type === clueTypes.IMAGE)
        .map((cv) => cv.value);
      return prev.concat(imagesInClue);
    }, []) || [];

  const areAllImagesLoaded = imagesToLoad.every((img) =>
    loadedImages.includes(img),
  );
  const isLoading = loading || !areAllImagesLoaded;

  if (isLoading) {
    return (
      <Container style={{ height: "100vh" }}>
        <ImagesLoader
          setLoadedImages={setLoadedImages}
          imagesToLoad={imagesToLoad}
          loadedImages={loadedImages}
        />
        <Loading />
      </Container>
    );
  }

  if (error) {
    return (
      <Container style={{ height: "100vh" }}>
        <Alert>Sorry, something went wrong while fetching the riddle.</Alert>
      </Container>
    );
  }

  return (
    puzzle && (
      <PuzzleWrapper style={rebus.style}>
        <Breadcrumbs />
        <HelpModal />
        <Rebus handleFinishClick={handleFinishClick} />
        <CopyNotification />
        <HelpButton onClick={helpClicked.toggle}>
          {helpClicked.isOn ? (
            <FadeInP>X</FadeInP>
          ) : (
            <FadeInDiv>
              <p>?</p>
            </FadeInDiv>
          )}
        </HelpButton>
      </PuzzleWrapper>
    )
  );
};

export default Puzzle;
