import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useContext, useState, useRef } from "react";
import {
  collection,
  query,
  orderBy,
  where,
  getDocs,
  limit,
  startAfter,
} from "firebase/firestore";

import { motion } from "framer-motion";

import { Button } from "../../common/components/Button.styled";
import { CheckboxButton } from "../../common/components/CheckboxButton.styled";
import ArrowBack from "../../common/components/ArrowBack";
import { WorkshopContext } from "../../common/services/WorkshopContext";
import { AuthContext } from "../../common/services/AuthContext";
import { useToggle } from "../../common/services/useToggle";
import { PuzzleBox, Wrapper } from "../../common/components/PuzzleList.styled";
import Loading from "../../common/components/Loading.styled";
import Alert from "../../common/components/Alert.styled";
import { LOCAL_STORAGE_KEYS, workshopCollectionName } from "../../common/consts";
import { db } from "../../common/firebase";

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
  const { setWorkshopPlayPuzzle, initPuzzle } = useContext(WorkshopContext);
  const { handleLogOutClick, user } = useContext(AuthContext);

  const [workshopPuzzles, setWorkshopPuzzles] = useState(null);
  const workshopPuzzlesLoading = useToggle();
  const workshopPuzzlesError = useToggle();
  const workshopPuzzlesLastRef = useRef(null);
  const isLoadMoreButtonShown = useToggle(true);

const LIMIT = 15;

  const fetchWorkshopPuzzles = async () => {
    try {
      workshopPuzzlesLoading.setOn();
      const q = workshopPuzzlesLastRef.current ? 
      query(
        collection(db, workshopCollectionName),
        where("status", "==", "done"),
        orderBy("updatedAt", "desc"),
        startAfter(workshopPuzzlesLastRef.current),
        limit(LIMIT),
      ) :
      query(
        collection(db, workshopCollectionName),
        where("status", "==", "done"),
        orderBy("updatedAt", "desc"),
        limit(LIMIT),
      );

      const querySnapshot = await getDocs(q);
      const newFetchedPuzzles = [];
      querySnapshot.forEach((doc) => {
        newFetchedPuzzles.push({ id: doc.id, ...doc.data() });
      });

      workshopPuzzlesLastRef.current =
        querySnapshot.docs[querySnapshot.docs.length - 1];

      const newWorkshopPuzzles = (workshopPuzzles || []).concat(
        newFetchedPuzzles
      );
      setWorkshopPuzzles(newWorkshopPuzzles);
      workshopPuzzlesLoading.setOff();

      if (newFetchedPuzzles.length < LIMIT) {
        isLoadMoreButtonShown.setOff();
      }
    } catch (error) {
      console.log(error)
      workshopPuzzlesError.setOn();
      workshopPuzzlesLoading.setOff();
    }
  };

  useEffect(() => {
    fetchWorkshopPuzzles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePuzzleClick = (puzzle) => () => {
    setWorkshopPlayPuzzle(puzzle);
    navigate(`/play/workshop/${puzzle.id}`);
  };

  const handleCreateNewRiddleClick = () => {
    initPuzzle();
    navigate("/play/workshop/new");
  };

  const workshopSolvedPuzzlesIDs =
    localStorage.getItem(LOCAL_STORAGE_KEYS.WORKSHOP_SOLVED_PUZZLES_IDS) ||
    "[]";
  const workshopSolvedPuzzlesIDsParsed = JSON.parse(workshopSolvedPuzzlesIDs);

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
          <Button
            style={{ maxWidth: "100%" }}
            onClick={handleCreateNewRiddleClick}
          >
            Create new riddle
          </Button>
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
          {!workshopPuzzlesLoading.isOn && workshopPuzzles && (
            <>
              {workshopPuzzles.map((puzzle) => (
                <PuzzleBox
                  $isSolved={workshopSolvedPuzzlesIDsParsed.includes(puzzle.id)}
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
              {isLoadMoreButtonShown.isOn && (
                <div
                  style={{
                    display: "flex",
                    marginTop: "15px",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Button onClick={fetchWorkshopPuzzles}>Load more</Button>
                </div>
              )}
            </>
          )}
        </div>
      </Wrapper>
    </>
  );
};

export default Workshop;
