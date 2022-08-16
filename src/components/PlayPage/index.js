import React, { useContext } from "react";

import { Link } from "react-router-dom";

import { Container } from "../../common/components/Container.styled";
import { Button } from "../../common/components/Button.styled";

import ArrowBack from "../../common/components/ArrowBack";
import LoginCorner from "../../common/components/LoginCorner";
import { PaymentContext } from "../../common/services/PaymentContext";

const LITTLE_RED_RUNNING_THROUGH_ID = "V18JHJt5sqivrWhaJ6w6";

const IS_PAID_USER = false;

const PlayPage = () => {
  const { upgradeModal } = useContext(PaymentContext);

  return (
    <>
      <LoginCorner />
      <Container>
        <Link
          to={`/play/puzzles/${LITTLE_RED_RUNNING_THROUGH_ID}`}
          style={{ marginBottom: "40px" }}
        >
          <Button style={{ maxWidth: "100%" }}>Play a Free Riddle</Button>
        </Link>
        {IS_PAID_USER ? (
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
            <Button
              onClick={upgradeModal.setOn}
              style={{ maxWidth: "100%", marginBottom: "40px" }}
            >
              Riddles
              {!IS_PAID_USER && (
                <>
                  <br />
                  <span style={{ fontSize: "14px" }}>Upgrade to Play</span>
                </>
              )}
            </Button>
            <Button onClick={upgradeModal.setOn} style={{ maxWidth: "100%" }}>
              Workshop
              {!IS_PAID_USER && (
                <>
                  <br />
                  <span style={{ fontSize: "14px" }}>Upgrade to Play</span>
                </>
              )}
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
