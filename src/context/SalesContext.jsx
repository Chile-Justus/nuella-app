// src/context/SalesContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const SalesContext = createContext();

export function SalesProvider({ children }) {
  const [sales, setSales] = useState(() => {
    // ✅ Load initial state from localStorage
    const saved = localStorage.getItem("salesData");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Keep localStorage in sync whenever sales change
  useEffect(() => {
    localStorage.setItem("salesData", JSON.stringify(sales));
  }, [sales]);

  const addSale = (sale) => {
    setSales((prev) => [...prev, sale]);
  };

  const deleteSale = (id) => {
    setSales((prev) => prev.filter((sale) => sale.id !== id));
  };

  return (
    <SalesContext.Provider value={{ sales, addSale, deleteSale }}>
      {children}
    </SalesContext.Provider>
  );
}

export function useSales() {
  return useContext(SalesContext);
}
