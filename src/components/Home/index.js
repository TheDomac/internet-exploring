/* eslint-disable no-restricted-globals */
import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { PaymentContext } from "../../common/services/PaymentContext";
import { AuthContext } from "../../common/services/AuthContext";
import { Button } from "../../common/components/Button.styled";
import { Container } from "../../common/components/Container.styled";
import LoginCorner from "../../common/components/LoginCorner";
import { REDDIT_URL } from "../../common/consts";
import puzzles from "../../common/data/puzzles";

import Logo from "../../images/Logo.png";
import redditLogo from "../../images/redditLogo.png";
import Modal, { ModalInfo } from "../../common/components/Modal";
import { useToggle } from "../../common/services/useToggle";
import { FREE_RIDDLE_ID } from "../../common/consts";

import TermsOfService from "./TermsOfService";
import PrivacyPolicy from "./PrivacyPolicy";

const Home = () => {
  const termsModal = useToggle();
  const privacyPolicyModal = useToggle();
  const { upgradeModal } = useContext(PaymentContext);
  const { upgradedUser } = useContext(AuthContext);

  return (
    <>
      <Modal isModalShown={termsModal.isOn} widthLimit={false}>
        <ModalInfo onClose={termsModal.setOff}>
          <TermsOfService />
        </ModalInfo>
      </Modal>
      <Modal isModalShown={privacyPolicyModal.isOn} widthLimit={false}>
        <ModalInfo onClose={privacyPolicyModal.setOff}>
          <PrivacyPolicy />
        </ModalInfo>
      </Modal>

      <Container>
        <LoginCorner redirectAfterLogout={false} />
        <img
          src={Logo}
          alt="logo"
          style={{ marginBottom: "10px", maxWidth: "100%" }}
        />
        <p
          style={{ marginTop: "-20px", marginBottom: "7px", fontSize: "28px" }}
        >
          What if the Internet was your escape room?
        </p>
        <p style={{ marginTop: "0", fontSize: "18px", marginBottom: 40 }}>
          Solve riddles whose clues and answers are hidden online.
        </p>

        {upgradedUser.isOn ? (
          <Link to="/play" style={{ marginBottom: "20px", maxWidth: "80%" }}>
            <Button style={{ maxWidth: "100%" }}>Play</Button>
          </Link>
        ) : (
          <>
            <Link
              to={`/play/puzzles/${FREE_RIDDLE_ID}`}
              style={{ marginBottom: "20px", maxWidth: "80%" }}
            >
              <Button style={{ maxWidth: "100%" }}>Play a Free Riddle</Button>
            </Link>
            <Button
              onClick={upgradeModal.setOn}
              style={{ maxWidth: "100%", marginBottom: "20px" }}
            >
              Riddles ({puzzles.length * 4})
            </Button>
          </>
        )}
        <Link to="/tutorial" style={{ marginBottom: "20px", maxWidth: "80%" }}>
          <Button style={{ maxWidth: "100%" }}>Tutorial</Button>
        </Link>
        <div style={{ display: "flex", width: "500px", maxWidth: "500px" }}>
          <a
            rel="noreferrer"
            href={REDDIT_URL}
            target="_blank"
            style={{
              display: "inline-block",
              width: "100%",
              marginBottom: "25px",
            }}
          >
            <Button
              style={{ width: "100%", maxWidth: "100%", padding: "12px 20px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "-20px",
                }}
              >
                <span>Join on Reddit</span>
                <img
                  style={{
                    display: "inline-block",
                    marginLeft: 7,
                    marginRight: 3,
                  }}
                  src={redditLogo}
                  alt="reddit"
                />
              </div>
            </Button>
          </a>
        </div>
        <div style={{ display: "flex", fontSize: 12, paddingBottom: 20 }}>
          <div
            style={{ cursor: "pointer", marginRight: 40 }}
            onClick={termsModal.setOn}
          >
            Terms of Service
          </div>
          <div style={{ cursor: "pointer" }} onClick={privacyPolicyModal.setOn}>
            Privacy Policy
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
