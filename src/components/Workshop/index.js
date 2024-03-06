import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Fragment } from "react";

import ArrowBack from "../../common/components/ArrowBack";
import {
  PuzzleBox,
  Wrapper,
  PuzzleLink,
} from "../../common/components/PuzzleList.styled";
import { LOCAL_STORAGE_KEYS, REDDIT_URL } from "../../common/consts";
import { PuzzleContext } from "../../common/services/PuzzleContext";
import useIsWeb from "../../common/services/useIsWeb";

export const TextLink = styled.a`
  color: #309d6d;
  -webkit-text-stroke: 0.5px white;
  text-decoration: none;
`;

const addHttps = (url) => (url.startsWith("https") ? url : `https://${url}`);

const Workshop = () => {
  const { allPuzzles } = useContext(PuzzleContext);

  const isWeb = useIsWeb();

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
            Have an idea for a riddle? Send a message on{" "}
            {!isWeb && "a subreddit "}
            <TextLink
              href={isWeb ? REDDIT_URL : undefined}
              target="_blank"
              rel="noreferrer"
            >
              {isWeb ? "Reddit" : "r/InternetExploring"}
            </TextLink>
            .
          </p>
        </div>

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
                {puzzle.userSocialMediaURL && isWeb ? (
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
