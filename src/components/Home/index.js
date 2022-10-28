/* eslint-disable no-restricted-globals */
import React, { useContext } from "react";

import { PaymentContext } from "../../common/services/PaymentContext";
import { AuthContext } from "../../common/services/AuthContext";
import { Container } from "../../common/components/Container.styled";
import LoginCorner from "../../common/components/LoginCorner";
import { REDDIT_URL } from "../../common/consts";

import LogoImg from "../../images/Logo.png";
import redditLogo from "../../images/redditLogo.png";
import Modal, { ModalInfo } from "../../common/components/Modal";
import { useToggle } from "../../common/services/useToggle";
import { FREE_RIDDLE_ID } from "../../common/consts";

import TermsOfService from "./TermsOfService";
import PrivacyPolicy from "./PrivacyPolicy";
import WhyInternetExploring from "./WhyInternetExploring";
import {
  Subtitle1,
  Subtitle2,
  Logo,
  HomeButton,
  StyledLink,
  StyledA,
} from "./index.styled";

const Home = () => {
  const termsModal = useToggle();
  const privacyPolicyModal = useToggle();
  const whyInternetExploringModal = useToggle();
  const { upgradeModal } = useContext(PaymentContext);
  const { upgradedUser } = useContext(AuthContext);

  return (
    <>
      <Modal
        isModalShown={whyInternetExploringModal.isOn}
        widthLimit={false}
        onClose={whyInternetExploringModal.setOff}
      >
        <ModalInfo onClose={whyInternetExploringModal.setOff}>
          <WhyInternetExploring />
        </ModalInfo>
      </Modal>
      <Modal
        isModalShown={termsModal.isOn}
        widthLimit={false}
        onClose={termsModal.setOff}
      >
        <ModalInfo onClose={termsModal.setOff}>
          <TermsOfService />
        </ModalInfo>
      </Modal>
      <Modal
        isModalShown={privacyPolicyModal.isOn}
        widthLimit={false}
        onClose={privacyPolicyModal.setOff}
      >
        <ModalInfo onClose={privacyPolicyModal.setOff}>
          <PrivacyPolicy />
        </ModalInfo>
      </Modal>

      <Container>
        <LoginCorner redirectAfterLogout={false} />
        <Logo src={LogoImg} alt="logo" />
        <Subtitle1>What if the Internet was your escape room?</Subtitle1>
        <Subtitle2>
          Solve riddles whose clues and answers are hidden online.
        </Subtitle2>

        {upgradedUser.isOn ? (
          <StyledLink to="/play" style={{ marginBottom: "20px" }}>
            <HomeButton $primary>Play</HomeButton>
          </StyledLink>
        ) : (
          <>
            <StyledLink
              to={`/play/puzzles/${FREE_RIDDLE_ID}`}
              style={{ marginBottom: "20px" }}
            >
              <HomeButton $primary style={{ maxWidth: "100%" }}>
                Play a Free Riddle
              </HomeButton>
            </StyledLink>
            <HomeButton
              onClick={upgradeModal.setOn}
              style={{ marginBottom: "20px" }}
            >
              Riddles
            </HomeButton>
          </>
        )}
        <StyledLink to="/tutorial" style={{ marginBottom: "20px" }}>
          <HomeButton>Tutorial</HomeButton>
        </StyledLink>
        <StyledA rel="noreferrer" href={REDDIT_URL} target="_blank">
          <HomeButton
            style={{
              padding: "12px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span>View latest news</span>
            <img
              style={{
                display: "inline-block",
                marginLeft: 7,
                marginRight: 3,
              }}
              src={redditLogo}
              alt="reddit"
            />
          </HomeButton>
        </StyledA>
        <div
          style={{
            display: "flex",
            fontSize: 12,
            paddingBottom: 20,
            justifyContent: "space-around",
            width: "500px",
            maxWidth: "100%",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              cursor: "pointer",
              marginRight: "10px",
              marginBottom: "10px",
            }}
            onClick={whyInternetExploringModal.setOn}
          >
            Why Internet Exploring?
          </div>
          <div
            style={{ cursor: "pointer", marginRight: "10px" }}
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
