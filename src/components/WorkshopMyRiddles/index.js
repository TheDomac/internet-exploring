import { Link } from "react-router-dom";
import { useContext } from "react";
import styled from "styled-components"

import { Button } from "../../common/components/Button.styled";
import { AuthContext } from "../../common/services/AuthContext";

import { Container } from "../../common/components/Container.styled";
import ArrowBack from "../../common/components/ArrowBack";
import List from "./List";

const LogOutButton = styled.button`
cursor: pointer;
position: fixed;
top: 10px;
right: 10px;
border: none;
background: transparent;
  color: white;
  padding: 10px;
  font-family: "Fredoka";
  box-sizing: border-box;
`


const WorkshopMyRiddles = () => {
  const { user, handleLoginClick, handleLogOutClick } = useContext(AuthContext);

  return (
    <Container>
      <Link to="/play/workshop/new">
        <Button style={{ maxWidth: "100%" }}>Create new riddle</Button>
      </Link>
      My riddles
      <Link to="/play">
        <ArrowBack />
      </Link>
      {user && <LogOutButton onClick={handleLogOutClick}>Log out</LogOutButton>}
      <Link to="/play/workshop">Workshop</Link>
      {user ? (
        <List />
      ) : (
        <Button onClick={handleLoginClick} style={{ maxWidth: "100%" }}>
          Log in to see your riddles
        </Button>
      )}
    </Container>
  );
};

export default WorkshopMyRiddles;
