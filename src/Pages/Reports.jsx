import React from "react";
import Step1 from "../Components/Reports/Step1";
import { useStepsContext } from "../Context/StateContext";
import Step2 from "../Components/Reports/Step2";
import AllReports from "../Components/Reports/AllReports";
import SpecificReport from "../Components/Reports/SpecificReport";
import RoughSpecificReport from "../Components/Reports/RoughSpecificReport";

const Reports = () => {
  const { step } = useStepsContext();

  return (
    <div>
      {step === "step1" && <Step1 />}
      {step === "step2" && <Step2 />}
      {/* <AllReports /> */}
      {step === "all_reports" && <AllReports />}
      {step === "specific_report" && <SpecificReport />}
      {step === "rough_specific_report" && <RoughSpecificReport />}
      {/* <SpecificReport /> */}
    </div>
  );
};

export default Reports;
