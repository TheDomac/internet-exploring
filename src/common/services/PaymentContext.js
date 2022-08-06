import React, { createContext } from "react";

export const PaymentContext = createContext({ stripePromise: null});


const PaymentProvider = ({ children }) => {

  const value = { stripePromise: {} };

  return <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>;
};

export default PaymentProvider;
