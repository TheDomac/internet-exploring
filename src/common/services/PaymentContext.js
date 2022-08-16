import React, { createContext } from "react";
import { useToggle } from "./useToggle";

export const PaymentContext = createContext({ priceId: null});

const PRICE_ID = "price_1LT247LXhirpsqdUFcn17mew";
const PaymentProvider = ({ children }) => {

  const upgradeModal = useToggle();
  const loginModal = useToggle();

  const value = { priceId: PRICE_ID, upgradeModal, loginModal };

  return <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>;
};

export default PaymentProvider;
