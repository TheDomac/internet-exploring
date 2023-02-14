import React from "react";

import { Container } from "../../common/components/Container.styled";
import LoginCorner from "../../common/components/LoginCorner";
import { REDDIT_URL, STEAM_URL } from "../../common/consts";

import LogoImg from "../../images/Logo.png";
import redditLogo from "../../images/redditLogo.png";
import steamLogo from "../../images/steamLogo.png";
import Modal, { ModalInfo } from "../../common/components/Modal";
import Alert from "../../common/components/Alert.styled";
import { useToggle } from "../../common/services/useToggle";
import isMobile from "../../common/services/isMobile";

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
        {isMobile && (
          <Alert>This game is not recommended for mobile devices.</Alert>
        )}
        <Logo src={LogoImg} alt="logo" />
        <Subtitle1>What if the Internet was your escape room?</Subtitle1>
        <Subtitle2>
          Solve riddles whose clues and answers are hidden online.
        </Subtitle2>

        <StyledLink to="/play" style={{ marginBottom: "20px" }}>
          <HomeButton $primary>Play</HomeButton>
        </StyledLink>

        <StyledLink to="/tutorial" style={{ marginBottom: "20px" }}>
          <HomeButton>Tutorial</HomeButton>
        </StyledLink>
        <div style={{ display: "flex", width: "500px" }}>
          <StyledA
            rel="noreferrer"
            href={STEAM_URL}
            target="_blank"
            style={{ width: "100%", marginRight: "15px" }}
          >
            <HomeButton
              style={{
                width: "100%",
                padding: "12px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span>Play on Steam</span>
              <img
                style={{
                  display: "inline-block",
                  marginLeft: 7,
                  marginRight: 3,
                }}
                src={steamLogo}
                alt="reddit"
              />
            </HomeButton>
          </StyledA>
          <StyledA
            rel="noreferrer"
            href={REDDIT_URL}
            target="_blank"
            style={{ width: "100%" }}
          >
            <HomeButton
              style={{
                width: "100%",
                padding: "12px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span>Latest news</span>
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
        </div>
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
