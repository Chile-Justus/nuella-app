// src/context/SalesContext.jsx
import React, { createContext, useContext, useState } from "react";

const SalesContext = createContext();

export const SalesProvider = ({ children }) => {
  const [sales, setSales] = useState([
    {
      id: 1,
      date: "2025-09-14",
      customer: "John Doe",
      product: "A4 Paper",
      description: "Pack of 500 sheets",
      quantity: 3,
      amount: 120.5,
    },
    {
      id: 2,
      date: "2025-09-14",
      customer: "Mary Jane",
      product: "Printing Ink",
      description: "Black Ink Cartridge",
      quantity: 1,
      amount: 540.0,
    },
  ]);

  // Add sale
  const addSale = (sale) =>
    setSales((prev) => [...prev, { id: prev.length + 1, ...sale }]);

  // Delete sale
  const deleteSale = (id) =>
    setSales((prev) => prev.filter((sale) => sale.id !== id));

  return (
    <SalesContext.Provider value={{ sales, addSale, deleteSale }}>
      {children}
    </SalesContext.Provider>
  );
};

export const useSales = () => useContext(SalesContext);
