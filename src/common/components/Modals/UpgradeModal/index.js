import { useContext, useEffect, useState } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import Modal from "../../Modal";

import upgradeImage from "./upgradeImage.png";
import { useToggle } from "../../../services/useToggle";
import { Button } from "../../Button.styled";
import { AuthContext } from "../../../services/AuthContext";
import { PaymentContext } from "../../../services/PaymentContext";
import LoginForm from "../../LoginForm";
import { env, statuses } from "../../../consts";
import puzzles from "../../../data/puzzles";
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
    if (user) {
      loginStep.setOff();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (upgradedUser.isOn) {
    return null;
  }

  return (
    <Modal isModalShown>
      <div style={{ textAlign: "center" }}>
        {loginStep.isOn ? (
          <LoginForm />
        ) : (
          <>
            <img src={upgradeImage} alt="upgrade_img" />

            <p>
              Buying the full game ($3.90) gives you access to the following:
            </p>
            <p>
            {puzzles.length * 4} unique riddles ({puzzles.length} * 4) as well as all future
              riddles that will be added to the list.
            </p>
            <p>
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
                  : "Buy ($3.90)"}
              </Button>
            ) : (
              <Button
                type="button"
                style={{ maxWidth: "100%", width: "100%", marginBottom: 20 }}
                onClick={loginStep.setOn}
              >
                Sign in to continue
              </Button>
            )}
          </>
        )}

        <Button
          style={{ maxWidth: "100%", width: "100%" }}
          onClick={upgradeModal.setOff}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default UpgradeModal;
