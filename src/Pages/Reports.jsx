import React from "react";
import Step1 from "../Components/Reports/Step1";
import { useStepsContext } from "../Context/StateContext";
import Step2 from "../Components/Reports/Step2";
import AllReports from "../Components/Reports/AllReports";

const Reports = () => {
  const { step } = useStepsContext();

  return (
    <div>
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {/* <AllReports /> */}
    </div>
  );
};

export default Reports;
