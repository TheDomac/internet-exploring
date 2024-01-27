import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Fragment } from "react";
import { useLocation } from "react-router";

import ArrowBack from "../../common/components/ArrowBack";
import {
  PuzzleBox,
  Wrapper,
  PuzzleLink,
} from "../../common/components/PuzzleList.styled";
import { EMAIL, LOCAL_STORAGE_KEYS, REDDIT_URL } from "../../common/consts";
import Alert from "../../common/components/Alert.styled";
import { PuzzleContext } from "../../common/services/PuzzleContext";

export const TextLink = styled.a`
  color: #309d6d;
  -webkit-text-stroke: 0.5px white;
  text-decoration: none;
`;

const addHttps = (url) => (url.startsWith("https") ? url : `https://${url}`);

const Workshop = () => {
  const { allPuzzles } = useContext(PuzzleContext);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const successAlertStatus = params.get("successStatus");

  const workshopSolvedPuzzlesIDs =
    localStorage.getItem(LOCAL_STORAGE_KEYS.WORKSHOP_SOLVED_PUZZLES_IDS) ||
    "[]";
  const workshopSolvedPuzzlesIDsParsed = JSON.parse(workshopSolvedPuzzlesIDs);

  if (!allPuzzles) {
    return null;
  }

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
          <p>
            Have an idea for a riddle? Send an email to{" "}
            <TextLink href={`mailto:${EMAIL}`} target="_blank">
              {EMAIL}
            </TextLink>{" "}
            or a message on{" "}
            <TextLink href={REDDIT_URL} target="_blank" rel="noreferrer">
              Reddit
            </TextLink>
            .
          </p>
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
          {allPuzzles.workshopPuzzles.map((puzzle) => (
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
