import React from "react";
import PuzzleContextProvider from "./common/services/PuzzleContext";

import WorkshopContextProvider from "./common/services/WorkshopContext";
import Routes from "./Routes";

const App = () => {
  return (
        <WorkshopContextProvider>
          <PuzzleContextProvider>
            <Routes />
          </PuzzleContextProvider>
        </WorkshopContextProvider>
  );
};

export default App;
