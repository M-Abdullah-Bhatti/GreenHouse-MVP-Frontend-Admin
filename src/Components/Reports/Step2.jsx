import React, { useRef, useState } from "react";
import BackButton from "../Shared/BackButton";

const Step2 = () => {
  const fileInputRef = useRef(null);
  const [processing, setProcessing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileProgress, setFileProgress] = useState(0);

  const handleFileChange = (event) => {
    const selected = event.target.files[0];
    setSelectedFile(selected);

    const simulateFileUploadProgress = () => {
      let progress = 0;

      const interval = setInterval(() => {
        if (progress < 100) {
          progress += 10;
          setFileProgress(progress);
        } else {
          clearInterval(interval); // Clear the interval when progress reaches 100%
        }
      }, 200);
    };

    simulateFileUploadProgress();
  };

  const handleDeleteFile = () => {
    setSelectedFile(null);
    setFileProgress(0);
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      {processing ? (
        <div className="flex flex-col justify-center items-center min-h-[86vh]">
          <h1 className="text-[#000] font-bold text-4xl mb-1">
            Please wait...
          </h1>
          <p className="text-[#0000007f] text-lg font-semibold mb-7">
            Please wait, data source is being processed
          </p>
        </div>
      ) : (
        <div className="pb-10">
          <BackButton />
          <div className="grid w-full min-h-[75vh] ">
            <div className="w-1/2 mx-auto flex justify-center items-center flex-col">
              <h1 className="text-[#000] font-bold text-3xl mb-1">
                Identify potential Greenwashing on the fly
              </h1>
              <p className="text-[#0000007f] text-lg font-semibold mb-7">
                Download the data source file to get started
              </p>
              {/* File Upload */}
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                />
                <img
                  src="/assets/file_upload.svg"
                  alt="file"
                  className="cursor-pointer"
                  onClick={handleFileClick}
                />
              </div>
              {/* File Progress */}
              {selectedFile && (
                <div className="grid grid-cols-[70px,70%,70px] w-[75%] mx-auto rounded-xl border-[2px] border-[#E8ECEF] mt-10 p-3 justify-center">
                  <div className=" ">
                    <img
                      src="/assets/file.svg"
                      alt="logo"
                      className="mx-auto"
                    />
                  </div>
                  <div className="">
                    <h1 className="font-semibold mb-0 text-[#000]">
                      {selectedFile.name}
                    </h1>
                    <p className="font-semibold mt-0 text-sm text-[#808080]">
                      {Math.round(selectedFile.size / 1024)} KB
                    </p>

                    <div className="bg-gray-200 h-3 rounded-full overflow-hidden w-full mt-2">
                      <div
                        className="bg-green-500 h-full rounded-full"
                        style={{ width: `${fileProgress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className=" ">
                    <img
                      onClick={handleDeleteFile}
                      src="/assets/delete.svg"
                      alt="logo"
                      className="mx-auto cursor-pointer"
                    />
                    <p className="text-center mt-2 text-base">
                      {fileProgress}%
                    </p>
                  </div>
                </div>
              )}
              <button
                onClick={() => setProcessing(true)}
                className="bg-[#3FDD78] text-lg rounded-2xl mt-10 py-3 px-6 border-none outline-none text-[#fff] "
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Step2;
