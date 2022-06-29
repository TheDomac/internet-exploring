import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useContext } from "react";
import { motion } from "framer-motion";

import { Button } from "../../common/components/Button.styled";
import { CheckboxButton } from "../../common/components/CheckboxButton.styled";
import ArrowBack from "../../common/components/ArrowBack";
import { WorkshopContext } from "../../common/services/WorkshopContext";
import { AuthContext } from "../../common/services/AuthContext";
import { PuzzleBox, Wrapper } from "../../common/components/PuzzleList.styled";
import Loading from "../../common/components/Loading.styled";
import Alert from "../../common/components/Alert.styled";

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

const Workshop = () => {
  const navigate = useNavigate();
  const {
    setWorkshopPlayPuzzle,
    workshopPuzzles,
    fetchWorkshopPuzzles,
    workshopPuzzlesError,
    workshopPuzzlesLoading,
  } = useContext(WorkshopContext);
  const { handleLogOutClick, user } = useContext(AuthContext);

  useEffect(() => {
    if (!workshopPuzzles) {
      fetchWorkshopPuzzles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePuzzleClick = (puzzle) => () => {
    setWorkshopPlayPuzzle(puzzle);
    navigate(`/play/workshop/${puzzle.id}`);
  };

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
            <CheckboxButton $isChecked style={{ width: 245 }}>
              Workshop
            </CheckboxButton>
          </Link>
          <Link to="/play/workshop/my-riddles">
            <CheckboxButton style={{ width: 245 }}>My riddles</CheckboxButton>
          </Link>
        </div>

        {workshopPuzzlesError.isOn && (
          <Alert>Sorry, something went wrong.</Alert>
        )}
        {workshopPuzzlesLoading.isOn && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Loading />
          </div>
        )}

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {workshopPuzzles?.map((puzzle) => (
            <PuzzleBox
              onClick={handlePuzzleClick(puzzle)}
              key={puzzle.id}
              title={puzzle.name}
            >
              <span style={{ wordBreak: "break-word" }}>
                {puzzle.name.length > 65
                  ? `${puzzle.name.slice(0, 65)}...`
                  : puzzle.name}
              </span>
            </PuzzleBox>
          ))}
        </div>
      </Wrapper>
    </>
  );
};

export default Workshop;
