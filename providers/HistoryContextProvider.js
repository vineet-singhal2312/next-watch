import { createContext, useContext, useState } from "react";

const HistoryContext = createContext();

export function HistoryProvider({ children }) {
  const [historyData, setHistoryData] = useState([]);

  return (
    <HistoryContext.Provider value={{ historyData, setHistoryData }}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  return useContext(HistoryContext);
}
