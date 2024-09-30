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
import { BUY_ME_A_COFFEE_URL, REDDIT_PROFILE_URL } from "../../common/consts";
import { PuzzleContext } from "../../common/services/PuzzleContext";

export const TextLink = styled.a`
  color: #309d6d;
  -webkit-text-stroke: 0.5px white;
  text-decoration: none;
`;

const PlayPage = () => {
  const { allPuzzles } = useContext(PuzzleContext);

  const solvedPuzzlesIds = localStorage.getItem("solved") || "[]";
  const solvedPuzzlesIDsParsed = JSON.parse(solvedPuzzlesIds);

  return (
    <>
      <Link to="/">
        <ArrowBack />
      </Link>
      <Wrapper>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {allPuzzles.map((puzzle) => (
            <div key={puzzle.id}>
              <PuzzleLink to={`/play/${puzzle.id}`}>
                <PuzzleBox
                  $isSolved={solvedPuzzlesIDsParsed.includes(puzzle.id)}
                  title={puzzle.name}
                >
                  <span style={{ wordBreak: "break-word" }}>
                    {puzzle.name.length > 65
                      ? `${puzzle.name.slice(0, 65)}...`
                      : puzzle.name}
                  </span>
                </PuzzleBox>
              </PuzzleLink>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: 15,
            fontSize: 20,
          }}
        >
          <p style={{ textAlign: "center" }}>
            Feel free to reach out with suggestions or ideas via{" "}
            <TextLink
              href={REDDIT_PROFILE_URL}
              target="_blank"
              rel="noreferrer"
            >
              Reddit
            </TextLink>
            .<br />
            To keep this game alive, please consider{" "}
            <TextLink
              href={BUY_ME_A_COFFEE_URL}
              target="_blank"
              rel="noreferrer"
            >
              buying me a beer
            </TextLink>
            .
          </p>
        </div>
      </Wrapper>
    </>
  );
};

export default PlayPage;
