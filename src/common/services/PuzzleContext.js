import { useState, useEffect, createContext } from "react";
import { useToggle } from "./useToggle";
import confetti from "canvas-confetti";
import getIsSolved from "./getIsSolved";
import { LOCAL_STORAGE_KEYS } from "../consts";

export const PuzzleContext = createContext();

const initialAreAnswersHidden = localStorage.getItem(
  LOCAL_STORAGE_KEYS.ARE_ANSWERS_HIDDEN
);
const initialAreAnswersHiddenParsed = initialAreAnswersHidden === "true";

const initialPuzzlesSolvingSync = localStorage.getItem(
  LOCAL_STORAGE_KEYS.SOLVED_PUZZLES
);

const initialPuzzlesSolvingSyncParsed =
  JSON.parse(initialPuzzlesSolvingSync) || {};

const getInitialPuzzleSolvingState = (puzzle) =>
  puzzle.rebuses.map((r) => ({
    ...(r.solutionInfo.possibleSolutions.length > 0 ? { solution: null } : {}),
    clues: r.clues.reduce(
      (prev, c) => ({
        ...(c.solutionInfo.possibleSolutions.length > 0
          ? { ...prev, [c.id]: null }
          : { ...prev }),
      }),
      {}
    ),
  }));

const PuzzleContextProvider = ({ children }) => {
  const [puzzle, setPuzzle] = useState(null);
  const [puzzlesSolvingSync, setPuzzlesSolvingSync] = useState(
    initialPuzzlesSolvingSyncParsed
  );
  // puzzle solving state is used for tracking correctly solved rebuses and clues - solutions are put in this object
  const [puzzleSolvingState, setPuzzleSolvingState] = useState(null);
  // stateMaintenance is used for tracking the state of a particular input in rebus/clue
  const [stateMaintenance, setStateMaintenance] = useState(null);
  const [selectedRebusIndex, setSelectedRebusIndex] = useState(0);
  const helpClicked = useToggle();
  const areSolutionsHidden = useToggle(initialAreAnswersHiddenParsed);
  const [viewedHelpClueIds, setViewedHelpClueIds] = useState([]);
  const [helpModalText, setHelpModalText] = useState(null);
  const [copyNotification, setCopyNotification] = useState(null);

  const handleCopyClick = async (copyInfo) => {
    try {
      await navigator.clipboard.writeText(copyInfo.text);
      setCopyNotification(copyInfo);
    } catch (error) {}
  };

  const initPuzzle = (newPuzzle, selectedRebusIndexParam) => {
    const areAllPreviousRebusesSolved = newPuzzle.rebuses.every((r, i) => {
      if (i === newPuzzle.rebuses.length - 1) {
        return true;
      }
      return (
        puzzlesSolvingSync[newPuzzle.id] &&
        puzzlesSolvingSync[newPuzzle.id].includes(r.id)
      );
    });

    const rebusIndexIsValid = newPuzzle.rebuses[selectedRebusIndexParam];
    const lastRebusIndexIsNotAllowed =
      selectedRebusIndexParam === newPuzzle.rebuses.length - 1 &&
      !areAllPreviousRebusesSolved;

    let startingRebusIndex = 0;
    if (rebusIndexIsValid) {
      startingRebusIndex = selectedRebusIndexParam;
    }
    if (lastRebusIndexIsNotAllowed) {
      startingRebusIndex = 0;
    }

    setSelectedRebusIndex(startingRebusIndex);
    helpClicked.setOff();
    setViewedHelpClueIds([]);
    setHelpModalText(null);

    const initialPuzzleSolvingState = getInitialPuzzleSolvingState(newPuzzle);
    setPuzzleSolvingState(initialPuzzleSolvingState);
    setStateMaintenance(initialPuzzleSolvingState);

    setPuzzle(newPuzzle);
  };

  const checkEscKeydown = (e) => {
    if (e.key === "Escape") {
      helpClicked.setOff();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", checkEscKeydown);

    return () => {
      window.removeEventListener("keydown", checkEscKeydown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClueHelpClick = (clue) => {
    helpClicked.setOff();
    setHelpModalText(clue.helperText);
    setViewedHelpClueIds(viewedHelpClueIds.concat(clue.id));
  };

  const closeHelpModal = () => {
    setHelpModalText(null);
  };

  const handleNextClick = () => {
    const newSelectedRebusIndex = selectedRebusIndex + 1;
    setSelectedRebusIndex(newSelectedRebusIndex);
    helpClicked.setOff();
  };

  const markRebusAsSolved = (rebusId, solution) => {
    const rebusIndex = puzzle.rebuses.findIndex((r) => r.id === rebusId);

    const newRebusInSolvingState = {
      ...puzzleSolvingState[rebusIndex],
      solution,
    };
    const newPuzzleSolvingState = [
      ...puzzleSolvingState.slice(0, rebusIndex),
      newRebusInSolvingState,
      ...puzzleSolvingState.slice(rebusIndex + 1),
    ];

    setPuzzleSolvingState(newPuzzleSolvingState);
  };

  const markClueAsSolved = (clueId, solution) => {
    const newRebusInSolvingState = {
      ...puzzleSolvingState[selectedRebusIndex],
      clues: {
        ...puzzleSolvingState[selectedRebusIndex].clues,
        [clueId]: solution,
      },
    };

    const newPuzzleSolvingState = [
      ...puzzleSolvingState.slice(0, selectedRebusIndex),
      newRebusInSolvingState,
      ...puzzleSolvingState.slice(selectedRebusIndex + 1),
    ];

    setPuzzleSolvingState(newPuzzleSolvingState);
  };

  const updateRebusMaintenance = (rebusId, value) => {
    const rebusIndex = puzzle.rebuses.findIndex((r) => r.id === rebusId);
    const newRebusInMaintenance = {
      ...stateMaintenance[rebusIndex],
      solution: value,
    };
    const newMaintenance = [
      ...stateMaintenance.slice(0, rebusIndex),
      newRebusInMaintenance,
      ...stateMaintenance.slice(rebusIndex + 1),
    ];
    setStateMaintenance(newMaintenance);
  };

  const updateClueMaintenance = (clueId, value) => {
    const newRebusInMaintenance = {
      ...stateMaintenance[selectedRebusIndex],
      clues: {
        ...stateMaintenance[selectedRebusIndex].clues,
        [clueId]: value,
      },
    };

    const newMaintenance = [
      ...stateMaintenance.slice(0, selectedRebusIndex),
      newRebusInMaintenance,
      ...stateMaintenance.slice(selectedRebusIndex + 1),
    ];
    setStateMaintenance(newMaintenance);
  };

  useEffect(() => {
    const areAllSolved = puzzleSolvingState?.every((r, i) => {
      const { cluesSolvedSolution, rebusSolvedSolution } = getIsSolved(
        puzzleSolvingState,
        i
      );
      return Boolean(cluesSolvedSolution || rebusSolvedSolution);
    });

    if (areAllSolved) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [puzzleSolvingState]);

  const handleToggleAreSolutionsHidden = () => {
    const newAreSolutionsHidden = !areSolutionsHidden.isOn;
    areSolutionsHidden.set(newAreSolutionsHidden);
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.ARE_ANSWERS_HIDDEN,
      newAreSolutionsHidden
    );
  };

  const value = {
    puzzle,
    initPuzzle,
    puzzleSolvingState,
    selectedRebusIndex,
    markClueAsSolved,
    handleNextClick,
    markRebusAsSolved,
    helpClicked,
    handleClueHelpClick,
    viewedHelpClueIds,
    helpModalText,
    closeHelpModal,
    setSelectedRebusIndex,
    copyNotification,
    rebus: puzzle?.rebuses[selectedRebusIndex],
    handleCopyClick,
    setCopyNotification,
    project: process.env.REACT_APP_PROJECT,
    puzzlesSolvingSync,
    setPuzzlesSolvingSync,
    stateMaintenance,
    updateClueMaintenance,
    updateRebusMaintenance,
    areSolutionsHidden,
    handleToggleAreSolutionsHidden,
  };

  return (
    <PuzzleContext.Provider value={value}>{children}</PuzzleContext.Provider>
  );
};

export default PuzzleContextProvider;
