/* eslint-disable no-restricted-globals */
import React from "react";
import { Link } from "react-router-dom";

import { Button } from "../../common/components/Button.styled";
import { Container } from "../../common/components/Container.styled";

import Logo from "../../images/Logo.png";

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
      <p style={{ marginTop: "-20px", fontSize: "28px" }}>
        What if the Internet was your escape room?
      </p>

      <Link to="/play" style={{ marginBottom: "20px", maxWidth: "80%" }}>
        <Button style={{ maxWidth: "100%" }}>Play</Button>
      </Link>
      <Link to="/tutorial" style={{ marginBottom: "20px", maxWidth: "80%" }}>
        <Button style={{ maxWidth: "100%" }}>Tutorial</Button>
      </Link>
      <a
        rel="noreferrer"
        href="https://www.buymeacoffee.com/internetexp"
        target="_blank"
      >
        <Button style={{ maxWidth: "100%" }}>Buy me a coffee</Button>
      </a>
    </Container>
  );
};

export default Home;
