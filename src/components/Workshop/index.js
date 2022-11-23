import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Fragment } from "react";
import { shell } from "electron";
import { useLocation } from "react-router";

import ArrowBack from "../../common/components/ArrowBack";
import { Button } from "../../common/components/Button.styled";
import { WorkshopContext } from "../../common/services/WorkshopContext";
import {
  PuzzleBox,
  Wrapper,
  PuzzleLink,
} from "../../common/components/PuzzleList.styled";
import Alert from "../../common/components/Alert.styled";
import workshopPuzzles from "../../common/data/workshopPuzzles.js";
import { LOCAL_STORAGE_KEYS } from "../../common/consts";

export const TextLink = styled.span`
  color: #309d6d;
  -webkit-text-stroke: 0.5px white;
  cursor: pointer;
`;

const addHttps = (url) => (url.startsWith("https") ? url : `https://${url}`);

const Workshop = () => {
  const { initPuzzle } = useContext(WorkshopContext);
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const successAlertStatus = params.get("successStatus");

  const handleCreateNewRiddleClick = () => {
    initPuzzle();
    navigate("/play/workshop/new");
  };

  const handleUsernameClick = (userSocialMediaURL) => () => {
    shell.openExternal(addHttps(userSocialMediaURL));
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
      <Wrapper>
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
        {successAlertStatus && (
          <Alert
            style={{ marginBottom: 15, textAlign: "center" }}
            $type="success"
          >
            Thank you for submitting your mockup! You will receive a message on
            the contact info that you submitted soon!
          </Alert>
        )}

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
                    onClick={handleUsernameClick(puzzle.userSocialMediaURL)}
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
