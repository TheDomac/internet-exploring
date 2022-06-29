import React from "react";
import { Link } from "react-router-dom";

import { Container } from "../../common/components/Container.styled";
import { Button } from "../../common/components/Button.styled";

import ArrowBack from "../../common/components/ArrowBack";

const PlayPage = () => {
  return (
    <Container>
      <Link to="/play/puzzles" style={{ marginBottom: "40px" }}>
        <Button style={{ maxWidth: "100%" }}>Riddles</Button>
      </Link>
      <Link to="/play/workshop">
        <Button /*disabled*/ style={{ maxWidth: "100%" }}>
          Workshop
          {/* <br />
        <span style={{ fontSize: "14px" }}>Coming soon</span> */}
        </Button>
      </Link>
      <Link to="/">
        <ArrowBack />
      </Link>
    </Container>
  );
};

export default PlayPage;
