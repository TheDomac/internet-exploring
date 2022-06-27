import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";

import { useToggle } from "../../common/services/useToggle";
import { WorkshopContext } from "../../common/services/WorkshopContext";
import { db} from "../../common/firebase";
import { AuthContext } from "../../common/services/AuthContext";

const List = () => {
  const navigate = useNavigate();
  const { setWorkshopPlayPuzzle } = useContext(WorkshopContext);
  const loading = useToggle();
  const error = useToggle();
  const [fetchedPuzzles, setFetchedPuzzles] = useState(null);
  const { user } = useContext(AuthContext)

  const handlePuzzleClick = (puzzle) => () => {
    setWorkshopPlayPuzzle(puzzle);
    navigate(`/play/workshop/${puzzle.id}`);
  };

  useEffect(() => {
    let unsubscribe;
    try {
      loading.setOn();
      const q = query(collection(db, "workshopPuzzles"), where('uid', '==', user.uid));
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


  return <div>
          {fetchedPuzzles?.map((puzzle) => (
        <div onClick={handlePuzzleClick(puzzle)} key={puzzle.id}>
          {puzzle.name}
        </div>
      ))}

  </div>;
};

export default List;
