import React from "react";

import { Container } from "../../common/components/Container.styled";

import Modal, { ModalInfo } from "../../common/components/Modal";
import Alert from "../../common/components/Alert.styled";
import { useToggle } from "../../common/services/useToggle";
import isMobile from "../../common/services/isMobile";
import { BuyMeACoffeeLogo } from "./BuyMeACoffeeLogo";
// import { testAdd } from "../../common/firebase";
import Logo from "./Logo";

import { BUY_ME_A_COFFEE_URL } from "../../common/consts";
import WhyInternetExploring from "./WhyInternetExploring";
import LatestNews from "./LatestNews";
import {
  Subtitle1,
  Subtitle2,
  HomeButton,
  StyledLink,
  StyledA,
} from "./index.styled";

const Home = () => {
  const whyInternetExploringModal = useToggle();
  const latestNewsModal = useToggle();

  return (
    <>
      <Modal
        isModalShown={latestNewsModal.isOn}
        widthLimit={false}
        onClose={latestNewsModal.setOff}
      >
        <ModalInfo onClose={latestNewsModal.setOff} buttonText="Close">
          <LatestNews />
        </ModalInfo>
      </Modal>
      <Modal
        isModalShown={whyInternetExploringModal.isOn}
        widthLimit={false}
        onClose={whyInternetExploringModal.setOff}
      >
        <ModalInfo
          onClose={whyInternetExploringModal.setOff}
          buttonText="Close"
        >
          <WhyInternetExploring />
        </ModalInfo>
      </Modal>

      <Container>
        {isMobile && (
          <Alert>This game is not recommended for mobile devices.</Alert>
        )}
        <Logo />
        <Subtitle1>What if the Internet was your escape room?</Subtitle1>
        <Subtitle2>
          Solve riddles whose clues and answers are hidden online
        </Subtitle2>

        <StyledLink to="/play" style={{ marginBottom: "20px" }}>
          <HomeButton $primary>Play</HomeButton>
        </StyledLink>

        <StyledLink to="/tutorial" style={{ marginBottom: "20px" }}>
          <HomeButton>Tutorial</HomeButton>
        </StyledLink>

        <StyledA rel="noreferrer" href={BUY_ME_A_COFFEE_URL} target="_blank">
          <HomeButton
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "14px 20px",
            }}
          >
            <span style={{ display: "inline-block", marginRight: 7 }}>
              Buy me a beer
            </span>
            <BuyMeACoffeeLogo />
          </HomeButton>
        </StyledA>

        <StyledA onClick={latestNewsModal.setOn}>
          <HomeButton>Latest news </HomeButton>
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
        </div>
      </Container>
    </>
  );
};

export default Home;
