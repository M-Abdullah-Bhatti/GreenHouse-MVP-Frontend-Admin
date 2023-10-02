import BackButton from "../Shared/BackButton";
import { useStepsContext } from "../../Context/StateContext";
import { useGetAllPendingReports } from "../../Hooks/reports-hooks";

// ----------------------------
const SentToRegulators = () => {
  const { setStep } = useStepsContext();

  // getSingleReportDetail;
  const { data: pendingReportData, isLoading: pendingReportLoading } =
    useGetAllPendingReports();

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
              {pendingReportLoading
                ? "loading..."
                : pendingReportData?.results[0]?.sendToRegulatorsTimeStamp &&
                  pendingReportData?.results[0]?.sendToRegulatorsTimeStamp}
            </p>

            <img src="./assets/pending__to__review.png" alt="logo" />
          </div>
          <h1 className="mb-5 text-[#000] text-2xl font-bold">
            {pendingReportLoading
              ? "loading..."
              : pendingReportData?.results[0]?.companyName &&
                pendingReportData?.results[0]?.companyName}
          </h1>
          <p className="text-[#6C7275] text-base mb-1 font-semibold">
            Jurisdiction :
            <span className="text-[#000] font-semibold ml-2">Ireland</span>
          </p>

          <p className="text-[#6C7275] text-base font-semibold mb-1">
            Data sources: :
            <span className="text-[#000] font-semibold ml-2">
              2022 Sustainability Report, Twitter post 2021
            </span>
          </p>
          {/* Links */}
          <div className="">
            <>
              <p className="mb-1 text-[#6C7275] text-base">
                <span className="font-bold"> Hash: </span>
                <a
                  href={`https://gateway.pinata.cloud/ipfs/${
                    pendingReportData?.results[0]?.IPFSHash &&
                    pendingReportData?.results[0]?.IPFSHash
                  }`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#3FDD78] font-semibold"
                >
                  {pendingReportLoading
                    ? "loading..."
                    : pendingReportData?.results[0]?.IPFSHash &&
                      pendingReportData?.results[0]?.IPFSHash}
                </a>
              </p>
              <p className="text-[#6C7275] text-base">
                <span className="font-bold"> Etherscan URL: </span>
                <a
                  href={
                    pendingReportData?.results[0]?.etherscanURL &&
                    pendingReportData?.results[0]?.etherscanURL
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#3FDD78] font-semibold"
                >
                  {" "}
                  {pendingReportLoading
                    ? "loading..."
                    : pendingReportData?.results[0]?.etherscanURL &&
                      pendingReportData?.results[0]?.etherscanURL}
                </a>
              </p>
            </>
          </div>
        </div>

        {/* Verdict */}
        <div className="bg-[#F3F5F7] p-3 rounded-md mb-7">
          <p className="text-[#6C7275] mb-3 font-semibold">
            Summary of findings::
          </p>
          <p className="font-semibold">
            {" "}
            {pendingReportLoading
              ? "loading..."
              : pendingReportData?.results[0]?.contradiction &&
                pendingReportData?.results[0]?.contradiction}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SentToRegulators;
