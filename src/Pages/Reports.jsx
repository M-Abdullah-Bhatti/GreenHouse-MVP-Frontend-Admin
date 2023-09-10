import React from "react";
import Step1 from "../Components/Reports/Step1";
import { useStepsContext } from "../Context/StateContext";
import Step2 from "../Components/Reports/Step2";
import AllReports from "../Components/Reports/AllReports";
import SpecificReport from "../Components/Reports/SpecificReport";
import SendToRegulators from "../Components/Reports/SendToRegulators";

const Reports = () => {
  const { step } = useStepsContext();

  return (
    <div>
      {step === "step1" && <Step1 />}
      {step === "step2" && <Step2 />}
      {/* <AllReports /> */}
      {step === "all_reports" && <AllReports />}
      {step === "specific_report" && <SpecificReport />}
      {step === "send_to_regulators" && <SendToRegulators />}
      {/* <SpecificReport /> */}
    </div>
  );
};

export default Reports;
