import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { logEvent } from "firebase/analytics";

import { getFunctions, httpsCallable } from "firebase/functions";
import Modal from "../../Modal";

import { useToggle } from "../../../services/useToggle";
import { Button } from "../../Button.styled";
import { AuthContext } from "../../../services/AuthContext";
import { PaymentContext } from "../../../services/PaymentContext";
import LoginForm from "../../LoginForm";
import { env, PRICE, statuses, STEAM_URL } from "../../../consts";
import { analytics } from "../../../firebase";
import { PuzzleContext } from "../../../services/PuzzleContext";
import steamLogo from "../../../../images/steamLogo.png";

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
  const [upgradeStatus, setUpgradeStatus] = useState(statuses.IDLE);
  const { user, upgradedUser } = useContext(AuthContext);
  const { upgradeModal } = useContext(PaymentContext);
  const { allPuzzles } = useContext(PuzzleContext);
  const loginStep = useToggle();

  const handlePaymentClick = async () => {
    setUpgradeStatus(statuses.LOADING);
    try {
      const functions = getFunctions();
      const createStripeCheckout = httpsCallable(
        functions,
        "createStripeCheckout"
      );
      const response = await createStripeCheckout({ env, userId: user.uid });
      window.location.href = response.data.url;
    } catch (error) {
      setUpgradeStatus(statuses.ERROR);
    }
  };

  useEffect(() => {
    logEvent(analytics, "upgrade_modal_shown");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) {
      loginStep.setOff();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (upgradedUser.isOn) {
    return null;
  }

  return (
    <Modal isModalShown onClose={upgradeModal.setOff}>
      <Wrapper>
        {loginStep.isOn ? (
          <LoginForm />
        ) : (
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

            {user ? (
              <Button
                type="button"
                style={{ maxWidth: "100%", width: "100%", marginBottom: 20 }}
                onClick={handlePaymentClick}
                disabled={upgradeStatus === statuses.LOADING}
              >
                {upgradeStatus === statuses.LOADING
                  ? "Loading..."
                  : `Buy (${PRICE})`}
              </Button>
            ) : (
              <>
                <p>
                  In order to purchase the full game, you must sign in first.
                </p>

                <Button
                  type="button"
                  style={{ maxWidth: "100%", width: "100%" }}
                  onClick={loginStep.setOn}
                >
                  Sign in
                </Button>
                <p>or</p>
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
            )}
          </>
        )}

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
