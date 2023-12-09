import { useState, useContext, createContext } from "react";

const SearchDisableContext = createContext();
const SearchDisableProvider = ({ children }) => {
  const [isSearchDisabled, setIsSearchDisabled] = useState(false);

  return (
    <SearchDisableContext.Provider
      value={[isSearchDisabled, setIsSearchDisabled]}
    >
      {children}
    </SearchDisableContext.Provider>
  );
};

// custom hook
const useSearchDisable = () => useContext(SearchDisableContext);

export { useSearchDisable, SearchDisableProvider };
