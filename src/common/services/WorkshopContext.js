import { useState, createContext, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { collection, query, orderBy, where, getDocs } from "firebase/firestore";

import { solutionTypes } from "../consts";
import { useToggle } from "./useToggle";
import { db } from "../firebase";
import { AuthContext } from "./AuthContext";
// import initialPuzzle from "../data/tutorial.json"
// const initialRebusId = initialPuzzle.rebuses[0].id;

const initialRebusId = uuidv4();

const initialPuzzle = {
  name: "",
  order: 0,
  rebuses: [
    {
      id: initialRebusId,
      clues: [],
      style: {},
      solutionInfo: {
        type: solutionTypes.TEXT,
        possibleSolutions: [],
        solvedText: "",
      },
    },
  ],
};

export const WorkshopContext = createContext();

const WorkshopContextProvider = ({ children }) => {
  const [puzzle, setPuzzle] = useState(null);
  const [selectedRebusId, setSelectedRebusId] = useState(null);
  const [workshopPlayPuzzle, setWorkshopPlayPuzzle] = useState(null);
  const { user } = useContext(AuthContext);

  const [workshopPuzzles, setWorkshopPuzzles] = useState(null);
  const workshopPuzzlesLoading = useToggle();
  const workshopPuzzlesError = useToggle();

  const [myWorkshopPuzzles, setMyWorkshopPuzzles] = useState(null);
  const myWorkshopPuzzlesLoading = useToggle();
  const myWorkshopPuzzlesError = useToggle();

  useEffect(() => {
    if (!user) {
      setMyWorkshopPuzzles(null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchWorkshopPuzzles = async () => {
    try {
      workshopPuzzlesLoading.setOn();

      const q = query(
        collection(db, "workshopPuzzles"),
        where("status", "==", "done"),
        orderBy("updatedAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      const newFetchedPuzzles = [];
      querySnapshot.forEach((doc) => {
        newFetchedPuzzles.push({ id: doc.id, ...doc.data() });
      });
      setWorkshopPuzzles(newFetchedPuzzles);
      workshopPuzzlesLoading.setOff();
    } catch (err) {
      workshopPuzzlesError.setOn();
      workshopPuzzlesLoading.setOff();
    }
  };

  const fetchMyWorkshopPuzzles = async () => {
    try {
      myWorkshopPuzzlesLoading.setOn();

      const q = query(
        collection(db, "workshopPuzzles"),
        where("uid", "==", user.uid)
      );

      const querySnapshot = await getDocs(q);
      const newFetchedPuzzles = [];
      querySnapshot.forEach((doc) => {
        newFetchedPuzzles.push({ id: doc.id, ...doc.data() });
      });
      setMyWorkshopPuzzles(newFetchedPuzzles);
      myWorkshopPuzzlesLoading.setOff();
    } catch (err) {
      myWorkshopPuzzlesError.setOn();
      myWorkshopPuzzlesLoading.setOff();
    }
  };

  const initPuzzle = (puzzleId) => {
    if (puzzleId) {
      // handle logic for fetching puzzzle
    } else {
      setSelectedRebusId(initialRebusId);
      setPuzzle(initialPuzzle);
    }
  };

  const value = {
    puzzle,
    setPuzzle,
    selectedRebusId,
    setSelectedRebusId,
    initPuzzle,
    workshopPlayPuzzle,
    setWorkshopPlayPuzzle,
    workshopPuzzles,
    workshopPuzzlesError,
    workshopPuzzlesLoading,
    fetchWorkshopPuzzles,
    myWorkshopPuzzles,
    myWorkshopPuzzlesError,
    myWorkshopPuzzlesLoading,
    fetchMyWorkshopPuzzles,
  };

  return (
    <WorkshopContext.Provider value={value}>
      {children}
    </WorkshopContext.Provider>
  );
};

export default WorkshopContextProvider;
