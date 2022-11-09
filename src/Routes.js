import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./components/Home";
import Puzzle from "./components/Puzzle";
import PuzzleList from "./components/PuzzleList";
import PlayPage from "./components/PlayPage";
import WorkshopPage from "./components/Workshop";
import WorkshopMyRiddlesPage from "./components/WorkshopMyRiddles";
import WorkshopBuilderCreatePage from "./components/WorkshopBuilderCreate";
import WorkshopBuilderEditPage from "./components/WorkshopBuilderEdit";

import TutorialPage from "./components/Tutorial";
import TempPage from "./components/Temp";

import WorkshopPlayPage from "./components/WorkshopPlay";

const RoutesGroup = () => {

  return (
    <Router>
      <Routes>
            <Route
              path="/play/workshop/new"
              element={<WorkshopBuilderCreatePage />}
            />
            <Route
              path="/play/workshop/edit/:riddleId"
              element={<WorkshopBuilderEditPage />}
            />
            <Route path="/play/workshop" element={<WorkshopPage />} />
            <Route
              path="/play/workshop/my-riddles"
              element={<WorkshopMyRiddlesPage />}
            />
            <Route
              path="/play/workshop/:riddleId"
              element={<WorkshopPlayPage />}
            />
        
        <Route path="/play/puzzles/:puzzleId" element={<Puzzle />} />
        <Route path="/play/puzzles" element={<PuzzleList />} />
        <Route path="/play" element={<PlayPage />} />
        <Route path="/tutorial" element={<TutorialPage />} />
        <Route path="/temp" element={<TempPage />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default RoutesGroup;
