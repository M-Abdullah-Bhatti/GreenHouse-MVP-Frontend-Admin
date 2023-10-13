import React, { createContext, useContext, useState } from "react";

// Create the context
const StepsContext = createContext();

// Create a provider component
export function StepsProvider({ children }) {
  const [step, setStep] = useState("step1");
  // const [step, setStep] = useState("step1");
  const [specificReportDetailsID, setSpecificReportDetailsID] = useState("");
  const [processing, setProcessing] = useState(false);
  const [showAllReports, setShowAllReports] = useState(false);
  const [rows, setRows] = useState();
  const [currentCompany, setCurrentCompany] = useState();
  const [currentCountry, setCurrentCountry] = useState();

  const [description, setDescription] = useState();
  const [sheet, setSheet] = useState();
  const [filteredCompanyData, setFilteredCompanyData] = useState();

  return (
    <StepsContext.Provider
      value={{
        step,
        setStep,
        specificReportDetailsID,
        setSpecificReportDetailsID,
        processing,
        setProcessing,
        showAllReports,
        setShowAllReports,
        rows,
        setRows,
        currentCompany,
        setCurrentCompany,
        description,
        setDescription,
        sheet,
        setSheet,
        filteredCompanyData,
        setFilteredCompanyData,
        currentCountry,
        setCurrentCountry,
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
