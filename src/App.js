import React from "react";

import PuzzleContextProvider from "./common/services/PuzzleContext";

import Routes from "./Routes";

const App = () => {
  return (
      <PuzzleContextProvider>
        <Routes />
      </PuzzleContextProvider>
  );
};

export default App;
