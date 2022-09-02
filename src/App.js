import React from "react";

import Modals from "./common/components/Modals";
import PuzzleContextProvider from "./common/services/PuzzleContext";
import AuthProvider from "./common/services/AuthContext";

import WorkshopContextProvider from "./common/services/WorkshopContext";
import PaymentProvider from "./common/services/PaymentContext";
import Routes from "./Routes";

const App = () => {
  return (
    <AuthProvider>
      <PaymentProvider>
        <WorkshopContextProvider>
          <PuzzleContextProvider>
            <Modals />
            <Routes />
          </PuzzleContextProvider>
        </WorkshopContextProvider>
      </PaymentProvider>
    </AuthProvider>
  );
};

export default App;
