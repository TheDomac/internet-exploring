import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useContext, Fragment } from "react";

import { motion } from "framer-motion";

import { Button } from "../../common/components/Button.styled";
import { CheckboxButton } from "../../common/components/CheckboxButton.styled";
import ArrowBack from "../../common/components/ArrowBack";
import { WorkshopContext } from "../../common/services/WorkshopContext";
import {
  PuzzleBox,
  Wrapper,
  PuzzleLink,
} from "../../common/components/PuzzleList.styled";
import workshopPuzzles from "../../common/data/workshopPuzzles.json";
import { LOCAL_STORAGE_KEYS } from "../../common/consts";
import LoginCorner from "../../common/components/LoginCorner";


export const TextLink = styled.a`
  color: #309d6d;
  -webkit-text-stroke: 0.5px white;
  text-decoration: none;
`;

const addHttps = (url) => (url.startsWith("https") ? url : `https://${url}`);

const Workshop = () => {
  const navigate = useNavigate();
  const { initPuzzle } = useContext(WorkshopContext);

  const handleCreateNewRiddleClick = () => {
    initPuzzle();
    navigate("/play/workshop/new");
  };

  const workshopSolvedPuzzlesIDs =
    localStorage.getItem(LOCAL_STORAGE_KEYS.WORKSHOP_SOLVED_PUZZLES_IDS) ||
    "[]";
  const workshopSolvedPuzzlesIDsParsed = JSON.parse(workshopSolvedPuzzlesIDs);

  return (
    <>
      <Link to="/play">
        <ArrowBack />
      </Link>
      <LoginCorner />
      <Wrapper
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 15,
          }}
        >
          <Button
            style={{ maxWidth: "100%" }}
            onClick={handleCreateNewRiddleClick}
          >
            Create new riddle
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 15,
          }}
        >
          <Link to="/play/workshop">
            <CheckboxButton $isChecked style={{ width: 245 }}>
              Workshop
            </CheckboxButton>
          </Link>
          <Link to="/play/workshop/my-riddles">
            <CheckboxButton style={{ width: 245 }}>My riddles</CheckboxButton>
          </Link>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {workshopPuzzles.map((puzzle) => (
            <div key={puzzle.id}>
              <PuzzleLink to={`/play/workshop/${puzzle.id}`}>
                <PuzzleBox
                  $isSolved={workshopSolvedPuzzlesIDsParsed.includes(puzzle.id)}
                  title={puzzle.name}
                >
                  <span style={{ wordBreak: "break-word" }}>
                    {puzzle.name.length > 65
                      ? `${puzzle.name.slice(0, 65)}...`
                      : puzzle.name}
                  </span>
                </PuzzleBox>
              </PuzzleLink>
              <p
                title={puzzle.userNickname}
                style={{
                  textAlign: "center",
                  maxWidth: "160px",
                  margin: "10px",
                  wordBreak: "break-word",
                }}
              >
                By{" "}
                {puzzle.userSocialMediaURL ? (
                  <TextLink
                    href={addHttps(puzzle.userSocialMediaURL)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {puzzle.userNickname.length > 30
                      ? `${puzzle.userNickname.slice(0, 30)}...`
                      : puzzle.userNickname}
                  </TextLink>
                ) : puzzle.userNickname.length > 30 ? (
                  `${puzzle.userNickname.slice(0, 30)}...`
                ) : (
                  puzzle.userNickname
                )}
              </p>
            </div>
          ))}
        </div>
      </Wrapper>
    </>
  );
};

export default Workshop;
