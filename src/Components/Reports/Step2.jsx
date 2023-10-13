/* eslint-disable no-loop-func */
import React, { useRef, useState } from "react";
import BackButton from "../Shared/BackButton";
import { useStepsContext } from "../../Context/StateContext";
import Loading from "../Shared/Loading";
import * as XLSX from "xlsx"; // Import the xlsx library
import { toast } from "react-toastify";

const Step2 = () => {
  const fileInputRef = useRef(null);
  const { processing, setProcessing, setStep, rows, setRows, setSheet } =
    useStepsContext();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileProgress, setFileProgress] = useState({});

  // Add a new state variable to hold the sheet data
  const [sheetData, setSheetData] = useState({});

  const processDataFromFiles = async () => {
    try {
      let allSheetData = {}; // Initialize an empty object to store all rows from all sheets and files

      for (const file of selectedFiles) {
        const reader = new FileReader();
        const promise = new Promise((resolve, reject) => {
          reader.onload = async (e) => {
            try {
              const data = new Uint8Array(e.target.result);
              const workbook = XLSX.read(data, { type: "array" });

              for (const sheetName of workbook.SheetNames) {
                const sheet = workbook.Sheets[sheetName];
                const rows = XLSX.utils.sheet_to_json(sheet);

                // Process the rows from the sheet (console.log or store the data as needed)
                // console.log(`File: ${file.name}, Sheet: ${sheetName}`);
                // console.log("===", rows);

                // Accumulate rows by sheet name
                allSheetData[sheetName] = allSheetData[sheetName]
                  ? [...allSheetData[sheetName], ...rows]
                  : [...rows];
              }
              resolve();
            } catch (error) {
              reject(error);
            }
          };
        });

        reader.readAsArrayBuffer(file);
        await promise; // Wait for each file to be processed before moving to the next
      }

      setSheetData(allSheetData); // Set all sheet data at once after all files have been processed
      setSheet(allSheetData);
      // console.log("setSheetData: ", setSheetData);
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const handleFileChange = (event) => {
    console.log("Hello");
    const newSelectedFiles = Array.from(event.target.files);
    setSelectedFiles([...selectedFiles, ...newSelectedFiles]);

    newSelectedFiles.forEach((file) => {
      setFileProgress((prevProgress) => ({
        ...prevProgress,
        [file.name]: 0,
      }));

      simulateFileUploadProgress(file);
    });
  };

  const simulateFileUploadProgress = (file) => {
    let progress = 0;

    const interval = setInterval(() => {
      if (progress < 100) {
        progress += 10;
        setFileProgress((prevProgress) => ({
          ...prevProgress,
          [file.name]: progress,
        }));
      } else {
        clearInterval(interval); // Clear the interval when progress reaches 100%
      }
    }, 200);
  };

  const handleDeleteFile = (fileName) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
    setFileProgress((prevProgress) => {
      const updatedProgress = { ...prevProgress };
      delete updatedProgress[fileName];
      return updatedProgress;
    });
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileConfirm = () => {
    if (selectedFiles.length === 0) {
      return toast.error("Please upload dataset first");
    }

    setProcessing(true);
    processDataFromFiles();
    setTimeout(() => {
      setStep("all_reports");
      setProcessing(false);
    }, 2000);
  };

  // const showRows = () => {
  //   console.log("rows: ", sheetData);
  // };

  return (
    <>
      {processing ? (
        <Loading title="Please wait, data source is being processed" />
      ) : (
        <div className="pb-10">
          <BackButton setStep={() => setStep("step1")} />
          <div className="grid w-full min-h-[75vh] ">
            <div className="w-1/2 mx-auto flex justify-center items-center flex-col">
              <h1 className="text-[#000] font-bold text-3xl mb-1">
                Identify potential Greenwashing on the fly
              </h1>
              <p className="text-[#0000007f] text-lg font-semibold mb-7">
                Upload a data source file to get started
              </p>
              {/* File Upload */}
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                  multiple
                />
                <img
                  src="/assets/file_upload.png"
                  alt="file"
                  className="cursor-pointer"
                  onClick={handleFileClick}
                />
              </div>
              {/* File Progress */}
              {selectedFiles.map((file) => (
                <div
                  key={file.name}
                  className="grid grid-cols-[70px,70%,70px] w-[75%] mx-auto rounded-xl border-[2px] border-[#E8ECEF] mt-10 p-3 justify-center"
                >
                  <div className="">
                    <img
                      src="/assets/file.svg"
                      alt="logo"
                      className="mx-auto"
                    />
                  </div>
                  <div className="">
                    <h1 className="font-semibold mb-0 text-[#000]">
                      {file.name}
                    </h1>
                    <p className="font-semibold mt-0 text-sm text-[#808080]">
                      {Math.round(file.size / 1024)} KB
                    </p>
                    <div className="bg-gray-200 h-3 rounded-full overflow-hidden w-full mt-2">
                      <div
                        className="bg-green-500 h-full rounded-full"
                        style={{ width: `${fileProgress[file.name] || 0}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="">
                    <img
                      onClick={() => handleDeleteFile(file.name)}
                      src="/assets/delete.svg"
                      alt="logo"
                      className="mx-auto cursor-pointer"
                    />
                    <p className="text-center mt-2 text-base">
                      {fileProgress[file.name] || 0}%
                    </p>
                  </div>
                </div>
              ))}
              <button
                onClick={handleFileConfirm}
                className="bg-[#3FDD78] text-lg rounded-2xl mt-10 py-3 px-6 border-none outline-none text-[#fff] "
              >
                Confirm
              </button>

              {/* <button
                onClick={showRows}
                className="bg-[#3FDD78] text-lg rounded-2xl mt-10 py-3 px-6 border-none outline-none text-[#fff] "
              >
                Show
              </button> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Step2;
