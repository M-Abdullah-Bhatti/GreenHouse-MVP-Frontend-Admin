import React, { createContext, useContext, useState } from "react";

// Create the context
const StepsContext = createContext();

// Create a provider component
export function StepsProvider({ children }) {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step === 1) return;
    setStep(step - 1);
  };

  return (
    <StepsContext.Provider value={{ handleNext, handlePrevious, step }}>
      {children}
    </StepsContext.Provider>
  );
}

// Custom hook to access the context
export function useStepsContext() {
  return useContext(StepsContext);
}
