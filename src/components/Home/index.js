import React, { useEffect } from "react";
import { ipcRenderer, shell } from "electron";

import { Container } from "../../common/components/Container.styled";
import { REDDIT_URL } from "../../common/consts";

import LogoImg from "../../images/Logo.png";
import redditLogo from "../../images/redditLogo.png";
import Modal, { ModalInfo } from "../../common/components/Modal";
import { useToggle } from "../../common/services/useToggle";

import TermsOfService from "./TermsOfService";
import PrivacyPolicy from "./PrivacyPolicy";
import WhyInternetExploring from "./WhyInternetExploring";
import {
  Subtitle1,
  Subtitle2,
  Logo,
  HomeButton,
  StyledLink,
} from "./index.styled";

const Home = () => {
  const termsModal = useToggle();
  const privacyPolicyModal = useToggle();
  const whyInternetExploringModal = useToggle();
  const fullScreen = useToggle();

  const checkForFullScrenChange = () => {
    const isFullScreen =
      // eslint-disable-next-line no-restricted-globals
      window.innerHeight === screen.height &&
      // eslint-disable-next-line no-restricted-globals
      window.innerWidth === screen.width;
    fullScreen.set(isFullScreen);
  };

  useEffect(() => {
    window.addEventListener("resize", checkForFullScrenChange);

    return () => {
      window.removeEventListener("resize", checkForFullScrenChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleQuitClick = () => {
    ipcRenderer.send("close-me");
  };
  const handleFullScreenClick = () => {
    ipcRenderer.send("fullscreen-click");
  };
  const handleRedditClick = () => {
    shell.openExternal(REDDIT_URL);
  };

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
        <HomeButton
          $primary={fullScreen.isOn}
          onClick={handleFullScreenClick}
          style={{ marginBottom: "20px" }}
        >
          Fullscreen
        </HomeButton>
        <HomeButton onClick={handleQuitClick} style={{ marginBottom: "20px" }}>
          Exit game
        </HomeButton>
        <HomeButton
          onClick={handleRedditClick}
          style={{
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "25px",
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
