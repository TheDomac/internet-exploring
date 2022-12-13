import { useState, createContext } from "react";
import { v4 as uuidv4 } from "uuid";

import { solutionTypes } from "../consts";

// import initialPuzzle from "../data/temp.json"
// const initialRebusId = initialPuzzle.rebuses[0].id;

const initialRebusId = uuidv4();

const initialPuzzle = {
  name: "",
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
  };

  return (
    <WorkshopContext.Provider value={value}>
      {children}
    </WorkshopContext.Provider>
  );
};

export default WorkshopContextProvider;
