import React, { useRef, useEffect, useState } from "react";
import BackButton from "../Shared/BackButton";
import { useStepsContext } from "../../Context/StateContext";
import { useReactToPrint } from "react-to-print";
import { create } from "ipfs-http-client";
import axios from "axios";
import { toast } from "react-toastify";
import { smartContract } from "../../Constants";
import { ethers } from "ethers";
import {
  useGetSingleReportDetails,
  useUpdateReportAgePriority,
} from "../../Hooks/reports-hooks";

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
  const [showStep0, setShowStep0] = useState(true);
  const [showStep1Modify, setShowStep1Modify] = useState(false);
  const { setStep, currentCompany, description, filteredCompanyData } =
    useStepsContext();

  // state variables:
  const [predict, setPredict] = useState("There will be be some prediction");

  // Print Report
  const printRef = useRef();
  const [hash, setHash] = useState("");
  const [etherscanURL, setEtherscanURL] = useState("");
  const [uploadReport, setUploadReport] = useState("");

  const handlePrintReport = useReactToPrint({
    content: () => printRef.current,
  });

  // Function to upload report to blockchain
  const handleReportUpload = async () => {
    try {
      if (!uploadReport) {
        toast.error("Please select a report to upload.");
        return;
      }

      // Adding our file to ipfs
      const added = await ipfs.add(uploadReport);
      let reportHash = added.path;
      console.log("certificateHash: ", reportHash);
      setHash(reportHash);

      // Making connection to the blockchain, getting signer wallet address and connecting to our smart contract
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        smartContract.address,
        smartContract.abi,
        signer
      );

      // calling our smart contract function
      const tx = await contract.addImageHash(reportHash);
      const receipt = await tx.wait();
      const txHash = receipt.transactionHash;
      const etherscanUrl = `https://sepolia.etherscan.io/tx/${txHash}`;
      setEtherscanURL(etherscanUrl);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // // Function to update report status
  // const handleSendToRegulators = () => {
  //   axios
  //     .post(
  //       "https://vast-rose-bonobo-tux.cyclic.cloud/api/report/updateSendToRegulators",
  //       {
  //         companyName: currentCompany,
  //       }
  //     )
  //     .then(() => {
  //       toast.success("Report sent to regulator");
  //       setStep("all_reports");
  //     })
  //     .catch(() => {
  //       toast.error("Something went wrong");
  //     });
  // };

  const handleSendToRegulators = async () => {
    // console.log(
    //   "report data send: ",
    //   reportDataUpdate.age,
    //   reportDataUpdate.priority
    // );
    console.log({
      companyName: "hello111",
      // companyName: currentCompany,
      contradiction: predict,
      age: reportDataUpdate.age,
      priority: reportDataUpdate.priority,
    });
    axios
      .post("http://localhost:5000/api/report/updateSendToRegulators", {
        // companyName: "hello1111111",
        companyName: currentCompany,
        contradiction: predict,
        age: reportDataUpdate.age,
        priority: reportDataUpdate.priority,
      })
      .then((res) => {
        console.log("res: ", res);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
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

  // const { mutate: addMutateUpdate, isLoading: isLoadingUpdate } =
  //   useUpdateReportAgePriority(
  //     JSON.stringify({
  //       ...reportDataUpdate,
  //       companyName: "hello1",
  //     })
  //   );

  // const handleUpdateAgePriority = async () => {
  //   if (!reportDataUpdate.age || !reportDataUpdate.priority) {
  //     console.log("reportDataUpdate:", reportDataUpdate);
  //     toast.error("Please select the fields");
  //     return;
  //   }

  //   addMutateUpdate(
  //     {},
  //     {
  //       onSuccess: (response) => {
  //         if (response?.data?.message) {
  //           toast.error(response?.data?.message);
  //         }
  //         if (response?.data?.results) {
  //           toast.success("Stats has been updated");
  //           setShowStep1Modify(false);
  //           setShowStep0(true);
  //         }
  //       },
  //     }
  //   );
  // };

  // ===================================

  // getSingleReport Data
  // const { data: singleReportData, isLoading: singleReportLoading } =
  //   useGetSingleReportDetails("hello1");

  // // GPT Response
  // useEffect(() => {
  //   const loadData = async () => {
  //     try {
  //       console.log("yess");

  //       const gptPrompt = await axios.get("http://localhost:5000/api/prompt");
  //       console.log("gpt prompt: ", gptPrompt?.data?.result?.prompt);
  //       console.log("filteredCompanyData: ", filteredCompanyData);

  //       let prompt = (gptPrompt?.data?.result?.prompt).toString();
  //       let concatenatedData = `${prompt}\n \n${JSON.stringify(
  //         filteredCompanyData
  //       )}`;

  //       if (prompt) {
  //         console.log("exist", concatenatedData);
  //         const response = axios
  //           .post("http://localhost:5000/api/gpt/prompt", {
  //             targetCompanyName: currentCompany,
  //             description: concatenatedData,
  //           })
  //           .then((res) => {
  //             console.log("response: ", res);
  //             setPredict(res.data.response);
  //           })
  //           .catch((err) => console.log("err: ", err));
  //       } else {
  //         console.log("no exist");
  //       }
  //     } catch (error) {
  //       console.log("error: ", error);
  //     }
  //   };
  //   loadData();
  // }, [currentCompany, description]);

  useEffect(() => {
    console.log("filteredCompanyData: ", typeof filteredCompanyData);
    console.log("filteredCompanyData: ", filteredCompanyData);
  }, []);

  return (
    <div>
      <BackButton setStep={() => setStep("all_reports")} />

      {/* Specific Report */}
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
            {currentCompany}
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
        {showStep0 && (
          <div className="mb-7">
            <div className="flex justify-start items-center mb-2">
              <p className="text-[#6C7275] mr-3 font-semibold">Age:</p>
              <label htmlFor="freshness" className="ml-2">
                {reportDataUpdate.age}
              </label>
            </div>

            <div className="flex justify-start items-center mb-7">
              <p className="text-[#6C7275] mr-3 font-semibold">Priority:</p>

              <label htmlFor="potentialgreenwashing" className="ml-2">
                {reportDataUpdate.priority}
              </label>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mb-8">
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

            <div className="flex justify-start items-center mb-7">
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
            <div className="flex gap-3 mb-8">
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

        {/* Links */}
        <div className="my-5">
          {hash && (
            <>
              <p className="mb-1 text-sm">
                <span className="font-bold"> Hash: </span>
                <a
                  href={`https://gateway.pinata.cloud/ipfs/${hash}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {" "}
                  {hash}
                </a>
              </p>
              <p className="text-sm">
                <span className="font-bold"> Etherscan URL: </span>
                <a href={etherscanURL} target="_blank" rel="noreferrer">
                  {" "}
                  {etherscanURL}{" "}
                </a>
              </p>
            </>
          )}
        </div>

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
                  <p className="font-semibold text-[#000]">
                    {value.slice(0, 250)}
                    {value.length > 250 && "..."}
                  </p>
                  <p className="text-[#6C7275] text-sm mt-3 font-semibold mb-4">
                    Data source:
                    <span className="text-[#000] font-semibold ml-2 ">
                      {key}
                    </span>
                  </p>
                </>
              );
            }
          })}
          {/* <p className="font-semibold text-[#000]">
            In 2019 we made €5 b available for green projects and last year we
            set a target for 70% of our lending to be green by 2030. We also
            became the first Irish bank to pledge to operate as carbon neutral
            by 2030
          </p>
          <p className="text-[#6C7275] text-sm mt-3 font-semibold">
            Data source:
            <span className="text-[#000] font-semibold ml-2">Twitter</span>
          </p> */}
        </div>
      </div>

      {/* Upload Report */}
      <div
        style={{
          boxShadow:
            "0px 33px 32px -16px rgba(0, 0, 0, 0.10), 0px 0px 16px 4px rgba(0, 0, 0, 0.04)",
        }}
        className="w-[80%] mx-auto my-10 p-5 rounded-xl"
      >
        <h1>
          <span>Note: </span>To upload a report to IPFS first download the
          report then upload that report to IPFS
        </h1>
        <div className="my-10">
          <h1 className="font-bold mb-2">Step 1:</h1>
          <button
            onClick={handlePrintReport}
            className="bg-[#3FDD78] rounded-lg  py-3 px-3 border-none outline-none text-[#fff] "
          >
            Download Report
          </button>
        </div>

        <div>
          <h1 className="mb-2 font-bold">Step 2:</h1>
          <div className="mb-5">
            <input
              type="file"
              // className="bg-gray-300 w-60 h-20 rounded-lg cursor-pointer"
              className="bg-[#3FDD78]-500 hover:bg-[#3FDD78]-900 text-white py-2 px-4 rounded-lg cursor-pointer inline-block"
              onChange={(e) => setUploadReport(e.target.files[0])}
            />
          </div>

          <button
            onClick={handleReportUpload}
            className="bg-[#3FDD78] rounded-lg  py-3 px-3 border-none outline-none text-[#fff] "
          >
            Upload Report to IPFS
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecificReport;
