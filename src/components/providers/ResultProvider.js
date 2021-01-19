import React from "react";

const ResultContext = React.createContext();

const useResult = () => {
  const context = React.useContext(ResultContext);
  if (!context) {
    throw new Error("useResult must be used within a ResultProvider");
  }
  return context;
};

const ResultProvider = (props) => {
  const [result, setResult] = React.useState({
    results: 0,
    skip: 0,
    limit: 5, // TODO: increase this for real use
    sets: [],
  });
  const value = React.useMemo(() => [result, setResult], [result]);
  return <ResultContext.Provider value={value} {...props} />;
};

export { ResultProvider, useResult };
