import { useState, useContext, createContext } from "react";

const SearchContext = createContext();
const SearchProvider = ({ children }) => {
  const [searchedProduct, setSearchedProduct] = useState([]);

  return (
    <SearchContext.Provider value={[searchedProduct, setSearchedProduct]}>
      {children}
    </SearchContext.Provider>
  );
};

// custom hook
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
