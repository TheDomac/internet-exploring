import { Link } from "react-router-dom";
import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Button } from "../../common/components/Button.styled";
import { AuthContext } from "../../common/services/AuthContext";
import { CheckboxButton } from "../../common/components/CheckboxButton.styled";
import { Wrapper } from "../../common/components/PuzzleList.styled";

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
`;

const WorkshopMyRiddles = () => {
  const { user, handleLoginClick, handleLogOutClick } = useContext(AuthContext);

  return (
    <>
      <Link to="/play">
        <ArrowBack />
      </Link>
      {user && <LogOutButton onClick={handleLogOutClick}>Log out</LogOutButton>}
      <Wrapper
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 15,
          }}
        >
          <Link to="/play/workshop/new">
            <Button style={{ maxWidth: "100%" }}>Create new riddle</Button>
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 15,
          }}
        >
          <Link to="/play/workshop">
            <CheckboxButton style={{ width: 245 }}>Workshop</CheckboxButton>
          </Link>
          <Link to="/play/workshop/my-riddles">
            <CheckboxButton $isChecked style={{ width: 245 }}>
              My riddles
            </CheckboxButton>
          </Link>
        </div>
        {user ? (
          <List />
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={handleLoginClick} style={{ maxWidth: "100%" }}>
              Log in to see your riddles
            </Button>
          </div>
        )}
      </Wrapper>
    </>
  );
};

export default WorkshopMyRiddles;
