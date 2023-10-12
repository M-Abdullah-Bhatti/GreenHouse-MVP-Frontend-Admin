import React from "react";
import { useStepsContext } from "../../Context/StateContext";

const Step1 = () => {
  const { setStep } = useStepsContext();
  return (
    <div className="grid w-full min-h-[86vh] ">
      <div className="w-1/2 mx-auto flex justify-center items-center flex-col">
        <img src="/assets/step_1.svg" alt="logo" className="mb-3" />
        <h1 className="text-[#6C727580] font-bold text-2xl mb-1">
          Just empty boxes here
        </h1>
        <p className="text-[#6c72757f] mb-7">
          Upload source file to generate greenwashing reports.
        </p>
        <button
          onClick={() => setStep("step2")}
          className="bg-[#3FDD78] text-lg rounded-2xl py-3 px-4 border-none outline-none text-[#fff] "
        >
          Upload data source
        </button>
      </div>
    </div>
  );
};

export default Step1;
