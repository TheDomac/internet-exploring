import React, { useContext } from "react";

import { Link } from "react-router-dom";

import { Container } from "../../common/components/Container.styled";
import { Button } from "../../common/components/Button.styled";

import ArrowBack from "../../common/components/ArrowBack";
import LoginCorner from "../../common/components/LoginCorner";
import { PaymentContext } from "../../common/services/PaymentContext";
import { AuthContext } from "../../common/services/AuthContext";
import { FREE_RIDDLE_ID } from "../../common/consts";

const PlayPage = () => {
  const { upgradeModal } = useContext(PaymentContext);
  const { upgradedUser } = useContext(AuthContext);

  return (
    <>
      <LoginCorner />
      <Container>
        {upgradedUser.isOn ? (
          <>
            <Link to="/play/puzzles" style={{ marginBottom: "40px" }}>
              <Button style={{ maxWidth: "100%" }}>Riddles</Button>
            </Link>
            <Link to="/play/workshop">
              <Button style={{ maxWidth: "100%" }}>Workshop</Button>
            </Link>
            <Link to="/">
              <ArrowBack />
            </Link>
          </>
        ) : (
          <>
            <Link
              to={`/play/puzzles/${FREE_RIDDLE_ID}`}
              style={{ marginBottom: "40px" }}
            >
              <Button style={{ maxWidth: "100%" }}>Play a Free Riddle</Button>
            </Link>
            <Button
              onClick={upgradeModal.setOn}
              style={{ maxWidth: "100%", marginBottom: "40px" }}
            >
              Riddles
              <br />
              <span style={{ fontSize: "14px" }}>Upgrade to Play</span>
            </Button>
            <Button onClick={upgradeModal.setOn} style={{ maxWidth: "100%" }}>
              Workshop
              <br />
              <span style={{ fontSize: "14px" }}>Upgrade to Play</span>
            </Button>
            <Link to="/">
              <ArrowBack />
            </Link>
          </>
        )}
      </Container>
    </>
  );
};

export default PlayPage;
