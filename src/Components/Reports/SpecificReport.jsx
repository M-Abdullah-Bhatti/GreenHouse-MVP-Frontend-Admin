import React, { useRef, useEffect, useState } from "react";
import BackButton from "../Shared/BackButton";
import { useStepsContext } from "../../Context/StateContext";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
const SpecificReport = () => {
  const { setStep, currentCountry, description } = useStepsContext();
  const [predict, setPredict] = useState();
  const printRef = useRef();
  const handlePrintReport = useReactToPrint({
    content: () => printRef.current,
  });

  useEffect(() => {
    const loadData = () => {
      try {
        console.log("yess");

        const response = axios
          .post("https://vast-rose-bonobo-tux.cyclic.cloud/api/gpt/prompt", {
            targetCompanyName: currentCountry,
            description: description,
          })
          .then((res) => {
            console.log("respoonse: ", res);
            setPredict(res.data.response);
          })
          .catch((err) => console.log("err: ", err));
      } catch (error) {
        console.log("error: ", error);
      }
    };
    loadData();
  }, []);

  return (
    <div>
      <BackButton setStep={() => setStep("all_reports")} />
      <div
        ref={printRef}
        style={{
          boxShadow:
            "0px 33px 32px -16px rgba(0, 0, 0, 0.10), 0px 0px 16px 4px rgba(0, 0, 0, 0.04)",
        }}
        className="w-[80%] mx-auto my-10 p-5 rounded-xl"
      >
        {/* Top */}

        <div className="mb-7">
          <p className="mb-2 text-sm text-[#2c2d2e] font-semibold">
            Aug, 24, 2023
          </p>
          <h1 className="mb-5 text-[#000] text-2xl font-bold">
            {currentCountry}
          </h1>
          <p className="text-[#6C7275] text-base mb-1 font-semibold">
            Jurisdiction :
            <span className="text-[#000] font-semibold ml-2">Ireland</span>
          </p>

          <p className="text-[#6C7275] text-base font-semibold">
            Data sources: :
            <span className="text-[#000] font-semibold ml-2">
              2022 Sustainability Report, Twitter post 2021
            </span>
          </p>
        </div>

        {/* Verdict */}
        <div className="bg-[#F3F5F7] p-3 rounded-md mb-7">
          <p className="text-[#6C7275] mb-3 font-semibold">Verdict:</p>
          <p className="font-semibold">{predict}</p>
        </div>

        {/* Stats */}
        <div className="mb-7">
          <div className="flex justify-start items-center mb-2">
            <p className="text-[#6C7275] mr-3 font-semibold">
              Potential reenwashing:
            </p>

            <input
              type="radio"
              id="potentialgreenwashing"
              name="potentialgreenwashing"
              value="Low"
              className="cursor-pointer custom-radio"
            />
            <label htmlFor="potentialgreenwashing" className="ml-2">
              Low
            </label>
          </div>

          <div className="flex justify-start items-center mb-7">
            <p className="text-[#6C7275] mr-3 font-semibold">Freshness:</p>

            <input
              type="radio"
              id="freshness"
              name="freshness"
              value="Low"
              className="cursor-pointer custom-radio"
            />
            <label htmlFor="freshness" className="ml-2">
              Fresh
            </label>
          </div>
          {/* Buttons */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={handlePrintReport}
              className="bg-[#3FDD78] rounded-lg  py-3 px-3 border-none outline-none text-[#fff] "
            >
              Send to regulator
            </button>

            <button className="bg-[#000000] rounded-lg  py-3 px-3 border-none outline-none text-[#fff] ">
              Modify
            </button>
          </div>
          <hr className="bg-[#E8ECEF]" />
        </div>

        {/* Claims */}
        <div>
          <p className="text-[#6C7275] font-semibold mb-3">
            Sustainability claims:
          </p>
          <p className="font-semibold text-[#000]">
            In 2019 we made €5 b available for green projects and last year we
            set a target for 70% of our lending to be green by 2030. We also
            became the first Irish bank to pledge to operate as carbon neutral
            by 2030
          </p>
          <p className="text-[#6C7275] text-sm mt-3 font-semibold">
            Data source:
            <span className="text-[#000] font-semibold ml-2">Twitter</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpecificReport;
