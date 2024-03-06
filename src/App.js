import React from "react";

import Modals from "./common/components/Modals";
import PuzzleContextProvider from "./common/services/PuzzleContext";

import WorkshopContextProvider from "./common/services/WorkshopContext";
import Routes from "./Routes";
import ModalsProvider from "./common/services/ModalsContext";

const App = () => {
  return (
    <ModalsProvider>
      <WorkshopContextProvider>
        <PuzzleContextProvider>
          <Modals />
          <Routes />
        </PuzzleContextProvider>
      </WorkshopContextProvider>
    </ModalsProvider>
  );
};

export default App;
