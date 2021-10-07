import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [lists, setLists] = useLocalStorage("listName", []);
  const [cards, setCards] = useLocalStorage("card", new Map());
  return (
    <GlobalContext.Provider value={{ lists, setLists, cards, setCards }}>
      {children}
    </GlobalContext.Provider>
  );
};
