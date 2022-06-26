/* eslint-disable no-restricted-globals */
import React from "react";
import { Link } from "react-router-dom";

import { Button } from "../../common/components/Button.styled";
import { Container } from "../../common/components/Container.styled";

import Logo from "../../images/Logo.png";
import buyMeACoffeeLogo from "../../images/buyMeACoffee.svg";
import patreonLogo from "../../images/patreonLogo.png";
import redditLogo from "../../images/redditLogo.png";

const Home = () => {
  return (
    <Container>
      <div style={{ position: "relative"}}>
      <img
        src={Logo}
        alt="logo"
        style={{ marginBottom: "10px", maxWidth: "100%" }}
      />
      <span
          style={{
            position: "absolute",
            color: "rgb(198, 98, 98)",
            bottom: "7%",
            right: "17%",
            fontSize: "32px",
          }}
        >Beta</span>

      </div>
      <p style={{ marginTop: "-20px", marginBottom: "7px", fontSize: "28px" }}>
        What if the Internet was your escape room?
      </p>
      <p style={{ marginTop: "0", fontSize: "18px" }}>
        Solve riddles whose clues and answers are hidden online.
      </p>

      <Link to="/play" style={{ marginBottom: "20px", maxWidth: "80%" }}>
        <Button style={{ maxWidth: "100%" }}>Play</Button>
      </Link>
      <Link to="/tutorial" style={{ marginBottom: "20px", maxWidth: "80%" }}>
        <Button style={{ maxWidth: "100%" }}>Tutorial</Button>
      </Link>
      <div style={{ display: "flex", width: "500px", maxWidth: "500px"}}>
      <a
        rel="noreferrer"
        href="https://www.buymeacoffee.com/internetexp"
        target="_blank"
        style={{ display:"inline-block", width: "100%", marginRight: "20px"}}
      >
        <Button style={{ width: "100%", maxWidth: "100%", padding: "12px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginRight: "-20px"}}>
          <span>Buy me a coffee</span>
          <img src={buyMeACoffeeLogo} alt="buyMeACoffee" />
          </div>
          </Button>
      </a>
      <a
        rel="noreferrer"
        href="https://www.patreon.com/internetexploring"
        target="_blank"
        style={{ display:"inline-block", width: "100%",  marginRight: "20px"}}
      >
        <Button style={{ width: "100%", maxWidth: "100%", padding: "12px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginRight: "-20px"}}>
          <span>Become a patron</span>
          <img style={{ display: "inline-block", marginLeft: 7}} src={patreonLogo} alt="patreon" />
          </div>
          </Button>
      </a>
      <a
        rel="noreferrer"
        href="https://www.reddit.com/r/internetexploring/"
        target="_blank"
        style={{ display:"inline-block", width: "100%"}}
      >
        <Button style={{ width: "100%", maxWidth: "100%", padding: "12px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginRight: "-20px"}}>
          <span>Join on Reddit</span>
          <img style={{ display: "inline-block", marginLeft: 7, marginRight: 3}} src={redditLogo} alt="reddit" />
          </div>
          </Button>
      </a>

      </div>
    </Container>
  );
};

export default Home;
