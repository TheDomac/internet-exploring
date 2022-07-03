import { useState, createContext } from "react";
import { v4 as uuidv4 } from "uuid";

import { solutionTypes } from "../consts";
import { db } from "../../common/firebase";

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

  const initPuzzle = async (fetchedPuzzle) => {
    if (fetchedPuzzle) {
      setSelectedRebusId(fetchedPuzzle.rebuses[0].id);
      setPuzzle(fetchedPuzzle);
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
  };

  return (
    <WorkshopContext.Provider value={value}>
      {children}
    </WorkshopContext.Provider>
  );
};

export default WorkshopContextProvider;
