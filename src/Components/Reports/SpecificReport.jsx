import React, { useRef, useEffect, useState } from "react";
import BackButton from "../Shared/BackButton";
import Loading from "../Shared/Loading";
import { useStepsContext } from "../../Context/StateContext";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import { create } from "ipfs-http-client";
import { smartContract } from "../../Constants";
import { ethers } from "ethers";

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
  const {
    setStep,
    currentCountry,
    description,
    specificData,
    processing,
    setProcessing,
  } = useStepsContext();
  const [predict, setPredict] = useState();
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

  // Function to update report status
  const handleSendToRegulators = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setStep("send_to_regulators");
    }, 2000);
  };

  // GPT Response

  useEffect(() => {
    const loadData = () => {
      // try {
      //   console.log("yess");

      //   const response = axios
      //     .post("https://vast-rose-bonobo-tux.cyclic.cloud/api/gpt/prompt", {
      //       targetCompanyName: currentCountry,
      //       description: description,
      //     })
      //     .then((res) => {
      //       console.log("respoonse: ", res);
      //       setPredict(res.data.response);
      //     })
      //     .catch((err) => console.log("err: ", err));
      // } catch (error) {
      //   console.log("error: ", error);
      // }
      let data =
        " A/B Group PLC provide contradictory statements as it claim to be green, carbon-neutral or Net Zero by 2030. The three concepts are either ambiguous (i.e. green) or contradictory, as the scope of Net Zero differs from the one of carbon neutral.";
      setPredict(data);
    };
    loadData();
  }, [currentCountry, description]);

  return (
    <>
      {processing ? (
        <Loading
          status="Sending report..."
          title="Please wait, data is being processed."
        />
      ) : (
        <>
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
                  Sep 8, 2023
                </p>
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
                  Data sources: :
                  <span className="text-[#000] font-semibold ml-2">
                    Sustainability Report, Twitter
                  </span>
                </p>
              </div>

              {/* Verdict */}
              <div className="bg-[#F3F5F7] p-3 rounded-md mb-7">
                <p className="text-[#6C7275] mb-3 font-semibold">Verdict:</p>
                <p className="font-semibold">
                  {specificData?.prediction || predict}
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
                {/* Buttons */}
                <div className="flex gap-3 mb-8">
                  <button
                    onClick={handleSendToRegulators}
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

              {/* Links */}
              {/* <div className="my-5">
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
              </div> */}

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
                  <span className="text-[#000] font-semibold ml-2">
                    Twitter
                  </span>
                </p>
              </div>
            </div>

            {/* Upload Report */}
            {/* <div
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
            </div> */}
          </div>
        </>
      )}
    </>
  );
};

export default SpecificReport;
