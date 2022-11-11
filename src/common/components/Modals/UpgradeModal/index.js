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
import { env, statuses } from "../../../consts";
import puzzles from "../../../data/puzzles";
import { analytics } from "../../../firebase";

export const Wrapper = styled.div`
  text-align: center;
  @media (max-height: 732px) {
    max-height: 410px;
    overflow-y: auto;
  }
`;

const UpgradeModal = () => {
  const [upgradeStatus, setUpgradeStatus] = useState(statuses.IDLE);
  const { user, upgradedUser } = useContext(AuthContext);
  const { upgradeModal } = useContext(PaymentContext);
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
            <p>
              Buying the full game ($2.99) gives you access to the following:
            </p>
            <p
              style={{
                padding: "10px",
                border: "1px solid #1a744a",
                borderRadius: "5px",
              }}
            >
              All {puzzles.length * 4} unique riddles ({puzzles.length} * 4) as
              well as all future riddles that will be added to the list.
            </p>
            <p
              style={{
                padding: "10px",
                border: "1px solid #1a744a",
                borderRadius: "5px",
              }}
            >
              Workshop where you can play riddles made by other players or
              create your own.
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
                  : "Buy ($3.49)"}
              </Button>
            ) : (
              <>
                <p>In order to buy, you must sign in first.</p>
                <Button
                  type="button"
                  style={{ maxWidth: "100%", width: "100%", marginBottom: 20 }}
                  onClick={loginStep.setOn}
                >
                  Sign in
                </Button>
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
