import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Puzzle from "./components/Puzzle";
import PuzzleList from "./components/PuzzleList";
import PlayPage from "./components/PlayPage";
import WorkshopPage from "./components/Workshop";
import WorkshopMyRiddlesPage from "./components/WorkshopMyRiddles";
import WorkshopBuilderCreatePage from "./components/WorkshopBuilderCreate";
import WorkshopBuilderEditPage from "./components/WorkshopBuilderEdit";

import PuzzleContextProvider from "./common/services/PuzzleContext";
import AuthProvider from "./common/services/AuthContext";

import TutorialPage from "./components/Tutorial";
import TempPage from "./components/Temp";

import WorkshopContextProvider from "./common/services/WorkshopContext";
import WorkshopPlayPage from "./components/WorkshopPlay";
import PaymentProvider from "./common/services/PaymentContext";

const App = () => {
  return (
    <AuthProvider>
    <PaymentProvider>
      <WorkshopContextProvider>
        <PuzzleContextProvider>
          <Router>
            <Routes>
              <Route path="/play/puzzles/:puzzleId" element={<Puzzle />} />
              <Route path="/play/puzzles" element={<PuzzleList />} />
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
              <Route path="/play" element={<PlayPage />} />
              <Route path="/tutorial" element={<TutorialPage />} />
              <Route path="/temp" element={<TempPage />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </Router>
        </PuzzleContextProvider>
      </WorkshopContextProvider>
    </PaymentProvider>
    </AuthProvider>
  );
};

export default App;
