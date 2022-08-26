import { useContext, useEffect, useState } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import Modal from "../../Modal";

import upgradeImage from "./upgradeImage.png";
import { useToggle } from "../../../services/useToggle";
import { Button } from "../../Button.styled";
import { AuthContext } from "../../../services/AuthContext";
import { PaymentContext } from "../../../services/PaymentContext";
import LoginForm from "../../LoginForm";
import {env, statuses} from "../../../consts"

const UpgradeModal = () => {
  const [upgradeStatus, setUpgradeStatus] = useState(statuses.IDLE);
  const { user, upgradedUser } = useContext(AuthContext);
  const { upgradeModal } = useContext(PaymentContext);
  const loginStep = useToggle();

  const handlePaymentClick = async () => {
    setUpgradeStatus(statuses.LOADING);
    try {
      const functions = getFunctions();
      const createStripeCheckout = httpsCallable(functions, 'createStripeCheckout');
      const response = await createStripeCheckout({ env, userId: user.uid })
      setUpgradeStatus(statuses.SUCCESS)
      window.location.href = response.data.url
    } catch (error) {
      setUpgradeStatus(statuses.ERROR)
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

            <p>By upgrading ($3.90) you get the following:</p>
            <p>
              Access to all existing riddles (20 at the moment) as well as all
              future riddles that will be added to the list.
            </p>
            <p>
              Access to Workshop where you can play riddles made by other
              players or create your own.
            </p>

            {user ? (
              <Button
                type="button"
                style={{ maxWidth: "100%", width: "100%", marginBottom: 20 }}
                onClick={handlePaymentClick}
                disabled={upgradeStatus === statuses.LOADING}
              >
                {upgradeStatus === statuses.LOADING ? "Loading..." : "Upgrade ($3.90)"}
              </Button>
            ) : (
              <Button
                type="button"
                style={{ maxWidth: "100%", width: "100%", marginBottom: 20 }}
                onClick={loginStep.setOn}
              >
                Log in to continue
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
      </div>{" "}
    </Modal>
  );
};

export default UpgradeModal;
