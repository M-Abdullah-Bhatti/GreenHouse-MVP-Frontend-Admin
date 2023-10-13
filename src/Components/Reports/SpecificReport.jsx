import React, { useEffect, useState } from "react";
import BackButton from "../Shared/BackButton";
import { useStepsContext } from "../../Context/StateContext";
import { create } from "ipfs-http-client";
import axios from "axios";
import { toast } from "react-toastify";
import { smartContract } from "../../Constants";
import { ethers } from "ethers";

import apiUrl from "../../utils/baseURL";
import { formattedDate } from "../../utils/date";
import PriorityColor from "./PriorityColor";
import { domToPng } from "modern-screenshot";
import { useAddress } from "@thirdweb-dev/react";

// IPFS
const projectId = "2V6620s2FhImATdUuY4dwIAqoI0";
const projectSecret = "2dcb0a633ee912e06834a43a3083248e";

const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

// ----------------------------
const SpecificReport = () => {
  const walletAddress = useAddress();

  const [showStep0, setShowStep0] = useState(true);
  const [showStep1Modify, setShowStep1Modify] = useState(false);
  const {
    setStep,
    currentCompany,
    description,
    filteredCompanyData,
    currentCountry,
  } = useStepsContext();

  // state variables:
  const [predict, setPredict] = useState(
    "Please wait a few seconds while the model predicts contradiction."
  );

  // Print Report
  const [hash, setHash] = useState("");
  const [etherscanURL, setEtherscanURL] = useState("");

  const handleSendToRegulators = async () => {
    if (!walletAddress) {
      return toast.error("Please connect your wallet first");
    }

    try {
      const element = document.querySelector("#element-to-convert");
      const dataUrl = await domToPng(element);

      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], "file.png", { type: "image/png" });
      const imghash = await ipfs.add(file);
      setHash(imghash.path);
      console.log(`https://ipfs.io/ipfs/${imghash.path}`);

      // Making connection to the blockchain, getting signer wallet address and connecting to our smart contract
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        smartContract.address,
        smartContract.abi,
        signer
      );

      // calling our smart contract function
      const tx = await contract.addImageHash(
        `https://ipfs.io/ipfs/${imghash.path}`
      );
      const receipt = await tx.wait();
      const txHash = receipt.transactionHash;
      const etherscanUrl = `https://sepolia.etherscan.io/tx/${txHash}`;
      setEtherscanURL(etherscanUrl);

      // Sending to regulators
      axios
        .post(`${apiUrl}/api/report/updateSendToRegulators`, {
          companyName: currentCompany,
          contradiction: predict,
          claims: JSON.stringify(filteredCompanyData),
          age: reportDataUpdate.age,
          priority: reportDataUpdate.priority,
          sentToRegulators: "true",
          sendToRegulatorsTimeStamp: formattedDate,
          IPFSHash: imghash.path,
          etherscanURL: etherscanUrl,
          jurisdiction: currentCountry,
          dataSources: Object.keys(filteredCompanyData)
            .filter((key) => filteredCompanyData[key])
            .join(", "),
        })
        .then((res) => {
          console.log("res: ", res);
          toast.success("Report has been sent to regulators");
          setStep("all_reports");
        })
        .catch((err) => {
          console.log("err: ", err);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  // update report age priority

  const [reportDataUpdate, setReportDataUpdate] = useState({
    priority: "Low",
    age: "Recent",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setReportDataUpdate((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    console.log("final: ", reportDataUpdate);
  };

  // ===================================

  // // GPT Response
  useEffect(() => {
    const loadData = async () => {
      try {
        console.log("yess");

        const gptPrompt = await axios.get(`${apiUrl}/api/prompt`);
        console.log("gpt prompt: ", gptPrompt?.data?.result?.prompt);
        console.log("filteredCompanyData: ", filteredCompanyData);

        let prompt = (gptPrompt?.data?.result?.prompt).toString();
        let concatenatedData = `${prompt}\n \n${JSON.stringify(
          filteredCompanyData
        )}`;

        if (prompt) {
          console.log("exist", concatenatedData);
          const response = axios
            .post(`${apiUrl}/api/gpt/prompt`, {
              targetCompanyName: currentCompany,
              description: concatenatedData,
            })
            .then((res) => {
              console.log("response: ", res);
              setPredict(res.data.response);
            })
            .catch((err) => console.log("err: ", err));
        } else {
          console.log("no exist");
        }
      } catch (error) {
        console.log("error: ", error);
      }
    };
    loadData();
  }, [currentCompany, description]);

  return (
    <div>
      <BackButton setStep={() => setStep("all_reports")} />

      {/* Specific Report */}
      <div
        id="element-to-convert"
        style={{
          boxShadow:
            "0px 33px 32px -16px rgba(0, 0, 0, 0.10), 0px 0px 16px 4px rgba(0, 0, 0, 0.04)",
        }}
        className="w-[80%] mx-auto my-10 p-5 rounded-xl"
      >
        {/* Top */}

        <div className="mb-5">
          <p className="mb-2 text-sm text-[#2c2d2e] font-semibold">
            {formattedDate}
          </p>
          <h1 className="mb-5 text-[#000] text-2xl font-bold">
            {currentCompany}
          </h1>
          <p className="text-[#6C7275] text-base mb-1 font-semibold">
            Jurisdiction :
            <span className="text-[#000] font-semibold ml-2">
              {currentCountry}
            </span>
          </p>

          <p className="text-[#6C7275] text-base font-semibold">
            Data sources:
            <span className="text-[#000] font-semibold ml-2">
              {filteredCompanyData &&
                Object.keys(filteredCompanyData)
                  .filter((key) => filteredCompanyData[key])
                  .join(", ")}
            </span>
          </p>

          {/* Links */}
          <div className="mb-5 mt-2">
            {hash && (
              <>
                <p className="mb-1  text-[#6C7275] text-base font-semibold">
                  <span className="font-bold"> Hash: </span>
                  <a
                    // href={`https://gateway.pinata.cloud/ipfs/${hash}`}
                    href={`https://ipfs.io/ipfs/${hash}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#3FDD78] cursor-pointer"
                  >
                    {" "}
                    {hash}
                  </a>
                </p>
                <p className=" text-[#6C7275] text-base font-semibold">
                  <span className="font-bold"> Etherscan URL: </span>
                  <a
                    href={etherscanURL}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#3FDD78]"
                  >
                    {" "}
                    {etherscanURL}{" "}
                  </a>
                </p>
              </>
            )}
          </div>
        </div>

        {/* Verdict */}
        <div className="bg-[#F3F5F7] p-3 rounded-md mb-5">
          <p className="text-[#6C7275] mb-3 font-semibold">
            Summary of conclusions:
          </p>
          <p className="font-semibold text-[15px]">{predict}</p>
        </div>

        {/* Stats */}
        {showStep0 && (
          <div className="mb-7">
            <div className="flex justify-start items-center mb-2">
              <p className="text-[#6C7275] mr-3 font-semibold">Age:</p>
              <label htmlFor="freshness" className="ml-2">
                {reportDataUpdate.age}
              </label>
            </div>

            <div className="flex justify-start items-center mb-5">
              <p className="text-[#6C7275] mr-3 font-semibold">Priority:</p>

              <div className="flex justify-start items-center">
                <PriorityColor priority={reportDataUpdate.priority} />

                <label htmlFor="potentialgreenwashing" className="ml-2">
                  {reportDataUpdate.priority}
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mb-5">
              <button
                onClick={handleSendToRegulators}
                className="bg-[#3FDD78] rounded-lg  py-3 px-3 border-none outline-none text-[#fff] "
              >
                Send to regulator
              </button>

              <button
                onClick={() => {
                  setShowStep1Modify(true);
                  setShowStep0(false);
                }}
                className="bg-[#000000] rounded-lg  py-3 px-3 border-none outline-none text-[#fff] "
              >
                Modify
              </button>
            </div>
            <hr className="bg-[#E8ECEF]" />
          </div>
        )}

        {showStep1Modify && (
          <div className="mb-7">
            <div className="flex justify-start items-center mb-2">
              <p className="text-[#6C7275] mr-3 font-semibold">Age:</p>

              <div className="flex justify-start items-center gap-5">
                <div>
                  <input
                    type="radio"
                    id="Recent"
                    name="age"
                    value="Recent"
                    onChange={handleOnChange}
                    className="cursor-pointer custom-radio"
                  />
                  <label htmlFor="Recent" className="ml-2">
                    Recent
                  </label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="Average"
                    name="age"
                    value="Average"
                    onChange={handleOnChange}
                    className="cursor-pointer custom-radio"
                  />
                  <label htmlFor="Average" className="ml-2">
                    Average
                  </label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="Old"
                    name="age"
                    value="Old"
                    onChange={handleOnChange}
                    className="cursor-pointer custom-radio"
                  />
                  <label htmlFor="Old" className="ml-2">
                    Old
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-start items-center mb-5">
              <p className="text-[#6C7275] mr-3 font-semibold">Priority:</p>

              <div className="flex justify-start items-start gap-5">
                <div>
                  <input
                    type="radio"
                    id="Low"
                    name="priority"
                    value="Low"
                    onChange={handleOnChange}
                    className="cursor-pointer custom-radio"
                  />
                  <label htmlFor="Low" className="ml-2">
                    Low
                  </label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="Medium"
                    name="priority"
                    value="Medium"
                    onChange={handleOnChange}
                    className="cursor-pointer custom-radio"
                  />
                  <label htmlFor="Medium" className="ml-2">
                    Medium
                  </label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="High"
                    name="priority"
                    value="High"
                    onChange={handleOnChange}
                    className="cursor-pointer custom-radio"
                  />
                  <label htmlFor="High" className="ml-2">
                    High
                  </label>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mb-5">
              <button
                // onClick={handleUpdateAgePriority}
                onClick={() => {
                  setShowStep1Modify(false);
                  setShowStep0(true);
                }}
                className="bg-[#3FDD78] rounded-lg  py-3 px-3 border-none outline-none text-[#fff] "
              >
                {/* {isLoadingUpdate ? "Updating..." : "Update"} */}
                Update
              </button>

              <button
                onClick={() => {
                  setShowStep1Modify(false);
                  setShowStep0(true);
                }}
                className="bg-[#000000] rounded-lg  py-3 px-3 border-none outline-none text-[#fff] "
              >
                Cancel
              </button>
            </div>
            <hr className="bg-[#E8ECEF]" />
          </div>
        )}

        {/* Claims */}
        {/* <div>
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
        </div> */}

        <div>
          <p className="text-[#6C7275] font-semibold mb-3">
            Sustainability claims:
          </p>
          {Object.entries(filteredCompanyData).map(([key, value]) => {
            if (value) {
              return (
                <>
                  <p className="font-semibold text-[#000] text-[15px]">
                    {value.slice(0, 250)}
                    {value.length > 250 && "..."}
                  </p>
                  <p className="text-[#6C7275] text-sm mt-2 font-semibold mb-3">
                    Data source:
                    <span className="text-[#000] font-semibold ml-2 ">
                      {key}
                    </span>
                  </p>
                </>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default SpecificReport;
