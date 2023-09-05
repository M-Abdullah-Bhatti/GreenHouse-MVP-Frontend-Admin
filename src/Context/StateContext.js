import React, { createContext, useContext, useState } from "react";

// Create the context
const StepsContext = createContext();

// Create a provider component
export function StepsProvider({ children }) {
  const [step, setStep] = useState("step1");
  const [processing, setProcessing] = useState(false);
  const [showAllReports, setShowAllReports] = useState(false);
  const [rows, setRows] = useState();

  return (
    <StepsContext.Provider
      value={{
        step,
        setStep,
        processing,
        setProcessing,
        showAllReports,
        setShowAllReports,
        rows,
        setRows,
      }}
    >
      {children}
    </StepsContext.Provider>
  );
}

// Custom hook to access the context
export function useStepsContext() {
  return useContext(StepsContext);
}
