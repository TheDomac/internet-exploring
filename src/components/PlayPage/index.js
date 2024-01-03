import React from "react";

import { Link } from "react-router-dom";

import { Container } from "../../common/components/Container.styled";
import { Button } from "../../common/components/Button.styled";

import ArrowBack from "../../common/components/ArrowBack";
import LoginCorner from "../../common/components/LoginCorner";

const PlayPage = () => {
  return (
    <>
      <LoginCorner />
      <Container style={{ height: "100vh" }}>
        <Link to="/play/puzzles" style={{ marginBottom: "40px" }}>
          <Button style={{ maxWidth: "100%" }}>Riddles</Button>
        </Link>

        <Link to="/play/workshop">
          <Button style={{ maxWidth: "100%" }}>Workshop</Button>
        </Link>
        <Link to="/">
          <ArrowBack />
        </Link>
      </Container>
    </>
  );
};

export default PlayPage;
