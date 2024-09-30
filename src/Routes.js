import {
  Routes,
  HashRouter as Router,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./components/Home";
import Puzzle from "./components/Puzzle";
import PlayPage from "./components/PlayPage";

import TutorialPage from "./components/Tutorial";
import TempPage from "./components/Temp";

const RoutesGroup = () => {
  return (
    <Router>
      <Routes>
        <Route path="/play/:puzzleId" element={<Puzzle />} />
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
