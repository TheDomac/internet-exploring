import React from "react";
import PuzzleContextProvider from "./common/services/PuzzleContext";
import AuthProvider from "./common/services/AuthContext";

import WorkshopContextProvider from "./common/services/WorkshopContext";
import Routes from "./Routes";

const App = () => {
  return (
    <AuthProvider>
      <WorkshopContextProvider>
        <PuzzleContextProvider>
          <Routes />
        </PuzzleContextProvider>
      </WorkshopContextProvider>
    </AuthProvider>
  );
};

export default App;
