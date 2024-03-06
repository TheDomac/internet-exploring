import { useContext, useEffect } from "react";
import styled from "styled-components";
import { logEvent } from "firebase/analytics";

import Modal from "../../Modal";

import { Button } from "../../Button.styled";
import { STEAM_URL } from "../../../consts";
import { analytics } from "../../../firebase";
import { PuzzleContext } from "../../../services/PuzzleContext";
import steamLogo from "../../../../images/steamLogo.png";
import { ModalsContext } from "../../../services/ModalsContext";

export const Wrapper = styled.div`
  text-align: center;
  @media (max-height: 732px) {
    max-height: 410px;
    overflow-y: auto;
  }
`;

export const TextLink = styled.a`
  color: #309d6d;
  text-decoration: none;
`;

const UpgradeModal = () => {
  const { upgradeModal } = useContext(ModalsContext);
  const { allPuzzles } = useContext(PuzzleContext);

  useEffect(() => {
    logEvent(analytics, "upgrade_modal_shown");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal isModalShown onClose={upgradeModal.setOff}>
      <Wrapper>
        <>
          <p
            style={{
              padding: "20px",
              border: "1px solid #1a744a",
              borderRadius: "5px",
              fontSize: 20,
            }}
          >
            Support Internet Exploring and gain access to all{" "}
            {allPuzzles ? allPuzzles.puzzles.length * 4 : ""}{" "}
            {allPuzzles && `(${allPuzzles.puzzles.length} * 4)`} unique and
            challenging riddles.
          </p>

          <>
            <p>You can get the full version of the game on Steam.</p>

            <a rel="noreferrer" href={STEAM_URL} target="_blank">
              <Button
                type="button"
                style={{
                  maxWidth: "100%",
                  width: "100%",
                  marginBottom: 40,
                }}
              >
                <img
                  style={{
                    display: "inline-block",
                    marginRight: 7,
                    marginLeft: -10,
                    marginBottom: -10,
                  }}
                  src={steamLogo}
                  alt="steam"
                />
                Play on Steam
              </Button>
            </a>
          </>
        </>

        <Button
          style={{ maxWidth: "100%", width: "100%" }}
          onClick={upgradeModal.setOff}
        >
          Close
        </Button>
      </Wrapper>
    </Modal>
  );
};

export default UpgradeModal;
