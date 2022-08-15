import React, { createContext, useEffect, useState } from "react";

// import { getProducts } from "@stripe/firestore-stripe-payments";
// import { payments } from "../firebase";

export const PaymentContext = createContext({ priceId: null});

const PRICE_ID = "price_1LT247LXhirpsqdUFcn17mew";
const PaymentProvider = ({ children }) => {
  // const [products, setProducts] = useState(null)
  // const fetchProducts = async () => {
  //   const newProducts = await getProducts(payments, {
  //     includePrices: true,
  //     activeOnly: true,
  //   });
  //   console.log(newProducts)
  //   setProducts(newProducts)
  // }

  // useEffect(() => {
  //   fetchProducts()
  // }, [])

  const value = { priceId: PRICE_ID };

  return <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>;
};

export default PaymentProvider;
