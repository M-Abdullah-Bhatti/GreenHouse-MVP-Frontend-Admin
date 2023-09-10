import React from "react";
import BackButton from "../Shared/BackButton";
import { useStepsContext } from "../../Context/StateContext";

const SendToRegulators = () => {
  const { setStep, currentCountry, specificData } = useStepsContext();

  return (
    <div>
      <BackButton setStep={() => setStep("all_reports")} />

      {/* Specific Report */}
      <div
        style={{
          boxShadow:
            "0px 33px 32px -16px rgba(0, 0, 0, 0.10), 0px 0px 16px 4px rgba(0, 0, 0, 0.04)",
        }}
        className="w-[80%] mx-auto my-10 p-5 rounded-xl"
      >
        {/* Top */}

        <div className="mb-7">
          <div className="flex justify-between items-center">
            <p className="mb-2 text-sm text-[#2c2d2e] font-semibold">
              Sep 8, 2023
            </p>
            <img src="./assets/regulator__status.png" alt="logo" />
          </div>
          <h1 className="mb-5 text-[#000] text-2xl font-bold">
            {currentCountry}
          </h1>
          <p className="text-[#6C7275] text-base mb-1 font-semibold">
            Jurisdiction :
            <span className="text-[#000] font-semibold ml-2">
              {" "}
              {specificData?.jurisdiction || "Ireland"}
            </span>
          </p>

          <p className="text-[#6C7275] text-base font-semibold">
            Data sources:
            <span className="text-[#000] font-semibold ml-2">
              Sustainability Report, Twitter
            </span>
          </p>

          <p className="text-[#6C7275] text-base font-semibold">
            Timestamp:
            <span className="text-[#000] font-semibold ml-2">
              Sep-8-2023 12:40:00 AM
            </span>
          </p>

          <p className=" text-[#6C7275] text-base font-semibold">
            <span className="font-bold"> Hash: </span>
            <a
              href={`https://gateway.pinata.cloud/ipfs/${
                specificData?.hash ||
                "QmWX2Y31vu94XquQsgjzEdXpDtT4fnJZKETxM2fEseoWiU"
              }`}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-sm  text-[#3FDD78]"
            >
              {specificData?.hash ||
                "QmWX2Y31vu94XquQsgjzEdXpDtT4fnJZKETxM2fEseoWiU"}
            </a>
          </p>
          {/* <p className="text-[#6C7275] text-base font-semibold">
            <span className="font-bold"> Etherscan URL: </span>
            <a
              href={specificData?.etherscanURL || ""}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-sm  text-[#3FDD78]"
            >
              {specificData?.etherscanURL ||
                "https://sepolia.etherscan.io/tx/0x475fca847e2b37be5ee38c94761573f13ce723f7288a8e636a199a03f7fa5e7c"}
            </a>
          </p> */}
        </div>

        {/* Verdict */}
        <div className="bg-[#F3F5F7] p-3 rounded-md mb-7">
          <p className="text-[#6C7275] mb-3 font-semibold">Verdict:</p>
          <p className="font-semibold">
            {specificData?.prediction ||
              "A/B Group PLC provide contradictory statements as it claim to be green, carbon-neutral or Net Zero by 2030. The three concepts are either ambiguous (i.e. green) or contradictory, as the scope of Net Zero differs from the one of carbon neutral."}
          </p>
        </div>

        {/* Stats */}
        <div className="mb-7">
          <div className="flex justify-start items-center mb-2">
            <p className="text-[#6C7275] mr-1 font-semibold">Age:</p>

            <label htmlFor="potentialgreenwashing" className="ml-2">
              Recent
            </label>
          </div>

          <div className="flex justify-start items-center mb-7">
            <p className="text-[#6C7275] mr-1 font-semibold">Priority:</p>

            <div
              className={`w-[17px] h-[17px] rounded-full ${
                currentCountry === "AIB group plc"
                  ? "bg-[#db0a0a]"
                  : currentCountry === "Bank of America"
                  ? "bg-[#fff900]"
                  : "bg-[#fff900]"
              } ml-2 inline-block`}
            ></div>

            <label htmlFor="freshness" className="ml-2">
              {specificData?.priority || " Fresh"}
            </label>
          </div>

          <hr className="bg-[#E8ECEF]" />
        </div>

        {/* Claims */}
        <div>
          <p className="text-[#6C7275] font-semibold mb-3">
            Sustainability claims #1:
          </p>
          <p className="font-semibold text-[#000]">
            {specificData?.claims[0] ||
              "In 2019 we made €5 b available for green projects and last year we             set a target for 70% of our lending to be green by 2030. We also             became the first Irish bank to pledge to operate as carbon neutral by 2030 "}
          </p>
          <p className="text-[#6C7275] text-sm mt-1  mb-5 font-semibold">
            Data source:
            <span className="text-[#000] font-semibold ml-2">
              Sustainability Report
            </span>
          </p>

          <p className="text-[#6C7275] font-semibold mb-3">
            Sustainability claims #2:
          </p>

          <p className="font-semibold text-[#000]">
            {specificData?.claims[1] ||
              "In 2019 we made €5 b available for green projects and last year we             set a target for 70% of our lending to be green by 2030. We also             became the first Irish bank to pledge to operate as carbon neutral by 2030 "}
          </p>
          <p className="text-[#6C7275] text-sm mt-1 font-semibold">
            Data source:
            <span className="text-[#000] font-semibold ml-2">Twitter</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SendToRegulators;
