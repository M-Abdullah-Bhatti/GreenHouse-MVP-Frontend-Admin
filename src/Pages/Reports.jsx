import React from "react";
import Step1 from "../Components/Reports/Step1";
import { useStepsContext } from "../Context/StateContext";
import Step2 from "../Components/Reports/Step2";

const Reports = () => {
  const { step } = useStepsContext();
  console.log(step);

  return (
    <div>
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
    </div>
  );
};

export default Reports;
