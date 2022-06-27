import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

import { Button } from "../../common/components/Button.styled";
import { Container } from "../../common/components/Container.styled";
import ArrowBack from "../../common/components/ArrowBack";
import { useToggle } from "../../common/services/useToggle";
import { db} from "../../common/firebase";
import { WorkshopContext } from "../../common/services/WorkshopContext";
import { AuthContext } from "../../common/services/AuthContext";


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


const Workshop = () => {
  const navigate = useNavigate();
  const { setWorkshopPlayPuzzle } = useContext(WorkshopContext);
  const {handleLogOutClick, user} = useContext(AuthContext);
  const loading = useToggle();
  const error = useToggle();
  const [fetchedPuzzles, setFetchedPuzzles] = useState(null);


  useEffect(() => {
    let unsubscribe;
    try {
      loading.setOn();
      const q = query(collection(db, "workshopPuzzles"), orderBy("updatedAt", "desc"));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const newFetchedPuzzles = [];
        querySnapshot.forEach((doc) => {
            newFetchedPuzzles.push({ id: doc.id, ...doc.data() });
        });
        setFetchedPuzzles(newFetchedPuzzles)
      });
    } catch (err) {
      error.setOn();
      loading.setOff();
    }

    return () => {
      unsubscribe && unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePuzzleClick = (puzzle) => () => {
    setWorkshopPlayPuzzle(puzzle);
    navigate(`/play/workshop/${puzzle.id}`);
  };

  return (
    <Container>
      <Link to="/play/workshop/new">
        <Button style={{ maxWidth: "100%" }}>Create new riddle</Button>
      </Link>
      Workshop riddles
      <Link to="/play">
        <ArrowBack />
      </Link>
      {user && <LogOutButton onClick={handleLogOutClick}>Log out</LogOutButton>}
      <Link to="/play/workshop/my-riddles">My riddles</Link>
      {fetchedPuzzles?.map((puzzle) => (
        <div onClick={handlePuzzleClick(puzzle)} key={puzzle.id}>
          {puzzle.name}
        </div>
      ))}
    </Container>
  );
};

export default Workshop;
