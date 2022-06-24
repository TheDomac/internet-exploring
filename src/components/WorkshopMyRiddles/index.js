import { Link } from "react-router-dom";
import { useContext } from "react";

import { Button } from "@rebus-mono/common/src/components/Button.styled";
import { AuthContext } from "@rebus-mono/common/src/services/AuthContext";

import { Container } from "@rebus-mono/common/src/components/Container.styled";
import ArrowBack from "@rebus-mono/common/src/components/ArrowBack";
import List from "./List";

const WorkshopMyRiddles = () => {
  const { user, handleLoginClick } = useContext(AuthContext);

  return (
    <Container>
      <Link to="/play/workshop/new">
        <Button style={{ maxWidth: "100%" }}>Create new riddle</Button>
      </Link>
      My riddles
      <Link to="/play">
        <ArrowBack />
      </Link>
      <Link to="/play/workshop">Workshop</Link>
      {user ? (
        <List />
      ) : (
        <Button onClick={handleLoginClick} style={{ maxWidth: "100%" }}>
          Log in
        </Button>
      )}
    </Container>
  );
};

export default WorkshopMyRiddles;
