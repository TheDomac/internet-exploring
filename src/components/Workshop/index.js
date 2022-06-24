import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { collection, getDocs, query } from "firebase/firestore";

import { Button } from "@rebus-mono/common/src/components/Button.styled";
import { Container } from "@rebus-mono/common/src/components/Container.styled";
import ArrowBack from "@rebus-mono/common/src/components/ArrowBack";
import { useToggle } from "@rebus-mono/common/src/services/useToggle";
import { db } from "@rebus-mono/common/src/firebase";

import { WorkshopContext } from "../../services/WorkshopContext";

const Workshop = () => {
  const navigate = useNavigate();
  const { setWorkshopPlayPuzzle } = useContext(WorkshopContext);
  const loading = useToggle();
  const error = useToggle();
  const [data, setData] = useState(null);

  const fetchWorkshopRiddles = async () => {
    try {
      loading.setOn();
      const q = query(collection(db, "workshopPuzzles"));
      const querySnapshot = await getDocs(q);
      let fetchedPuzzles = [];
      querySnapshot.forEach((doc) => {
        fetchedPuzzles.push({ id: doc.id, ...doc.data() });
      });

      setData(fetchedPuzzles);
      loading.setOff();
      return fetchedPuzzles;
    } catch (err) {
      error.setOn();
      loading.setOff();
    }
  };

  useEffect(() => {
    fetchWorkshopRiddles();
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
      <Link to="/play/workshop/my-riddles">My riddles</Link>
      {data?.map((puzzle) => (
        <div onClick={handlePuzzleClick(puzzle)} key={puzzle.id}>
          {puzzle.name}
        </div>
      ))}
    </Container>
  );
};

export default Workshop;
