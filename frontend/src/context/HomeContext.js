import { useState, useContext, createContext } from "react";

const HomeContext = createContext();
const HomeProvider = ({ children }) => {
  const [checkHome, setCheckHome] = useState(false);

  return (
    <HomeContext.Provider value={[checkHome, setCheckHome]}>
      {children}
    </HomeContext.Provider>
  );
};

// custom hook
const useHome = () => useContext(HomeContext);

export { useHome, HomeProvider };
