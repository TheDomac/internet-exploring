/* eslint-disable no-restricted-globals */
import React from "react";
import { Link } from "react-router-dom";

import { Button } from "../../common/components/Button.styled";
import { Container } from "../../common/components/Container.styled";
import LoginCorner from "../../common/components/LoginCorner";
import {
  REDDIT_URL,
} from "../../common/consts";

import Logo from "../../images/Logo.png";
import redditLogo from "../../images/redditLogo.png";

const Home = () => {
  return (
    <Container>
      <LoginCorner />
        <img
          src={Logo}
          alt="logo"
          style={{ marginBottom: "10px", maxWidth: "100%" }}
        />
      <p style={{ marginTop: "-20px", marginBottom: "7px", fontSize: "28px" }}>
        What if the Internet was your escape room?
      </p>
      <p style={{ marginTop: "0", fontSize: "18px", marginBottom: 40 }}>
        Solve riddles whose clues and answers are hidden online.
      </p>

      <Link to="/play" style={{ marginBottom: "20px", maxWidth: "80%" }}>
        <Button style={{ maxWidth: "100%" }}>Play</Button>
      </Link>
      <Link to="/tutorial" style={{ marginBottom: "20px", maxWidth: "80%" }}>
        <Button style={{ maxWidth: "100%" }}>Tutorial</Button>
      </Link>
      <div style={{ display: "flex", width: "500px", maxWidth: "500px" }}>
        <a
          rel="noreferrer"
          href={REDDIT_URL}
          target="_blank"
          style={{ display: "inline-block", width: "100%" }}
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
    </Container>
  );
};

export default Home;
