import React, { useEffect, useState } from "react";
import { allReportsData, allReportsSentToRegulatorsData } from "../../data";
import { useStepsContext } from "../../Context/StateContext";
import axios from "axios";

const AllReports = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [reportsSentToRegulators, setReportsSentToRegulators] = useState([]);
  console.log("================");
  console.log(reportsSentToRegulators);
  // console.log(filteredData);

  const { setStep, rows } = useStepsContext();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // FetchingAllReportsSentToRegulators
  useEffect(() => {
    const fetchReportsSentToRegulators = async () => {
      axios
        .get(
          "https://vast-rose-bonobo-tux.cyclic.cloud/api/report/getUpdateSendToRegulators"
        )
        .then((response) => {
          setReportsSentToRegulators(response?.data?.results);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    fetchReportsSentToRegulators();
  }, []);

  useEffect(() => {
    const loadData = () => {
      let newFilteredData = [];
      rows.forEach((item) => {
        // Check if item.Company is already present in newFilteredData
        const isPresent = newFilteredData.some(
          (jack) => jack.Company === item.Company
        );

        if (!isPresent) {
          // If it's not present, push it into newFilteredData
          newFilteredData.push(item);
        }
      });

      // Update the state
      setFilteredData(newFilteredData);
      // console.log("filteredData: ", newFilteredData);
    };
    loadData();
  }, []);

  return (
    <div className="w-[90%] mx-auto my-10">
      {/* Top Container */}
      <div className="flex justify-between items-start mb-6">
        {/* Left */}
        <div>
          <h1 className="text-[#000] font-bold text-3xl mb-1">Reports</h1>
          <p className="text-[#0000007f] text-lg font-semibold mb-7">
            Overview all of the Greenwashing reports here
          </p>
        </div>
        {/* Right */}
        <button
          onClick={() => setStep("step1")}
          className="bg-[#3FDD78] text-lg rounded-lg  py-3 px-3 border-none outline-none text-[#fff] "
        >
          Upload source file
        </button>
      </div>

      {/* Tabs Container */}
      <div className="flex gap-10 w-fit justify-center item-center mb-8">
        <h1
          onClick={() => handleTabClick(1)}
          className={`cursor-pointer ${
            activeTab === 1
              ? "border-b-[2px] border-[#3FDD78] text-[#000] font-semibold"
              : "text-[#5f6264]"
          }  pb-1 `}
        >
          All reports
        </h1>
        <h1
          onClick={() => handleTabClick(2)}
          className={`cursor-pointer ${
            activeTab === 2
              ? "border-b-[2px] border-[#3FDD78] text-[#000] font-semibold"
              : "text-[#5a5c5e]"
          }  pb-1 `}
        >
          Sent to regulator
        </h1>
      </div>

      {/* Reports Container */}
      <div className="w-full gap-7 grid grid-cols-3">
        {activeTab === 1 ? (
          // <Report data={allReportsData} />

          <Report data={filteredData} activeTab={1} />
        ) : (
          <Report data={reportsSentToRegulators} activeTab={2} />
        )}
      </div>
    </div>
  );
};

export default AllReports;

const Report = ({ data, activeTab }) => {
  const {
    setStep,
    rows,
    setCurrentCountry,
    setDescription,
    setSpecificData,
    specificData,
  } = useStepsContext();

  const handleNavigate = async (report) => {
    setCurrentCountry(report);

    if (report === "AIB group plc") {
      const updatedData = {
        ...specificData,
        jurisdiction: "Ireland",
        prediction:
          "AIB Group PLC provides contradictory statements as it claim to be green, carbon-neutral or Net Zero by 2030. The three concepts are either ambiguous (i.e. green) or contradictory, as the scope of Net Zero differs from the one of carbon neutral.",
        priority: "High",
        claims: [
          "In 2020 we announced our target of Net Zero in our operations by 2030.",
          "In 2019 we made €5 b available for green projects and last year we set a target for 70% of our lending to be green by 2030. We also became the first Irish bank to pledge to operate as carbon neutral by 2030.",
        ],
        hash: "QmNSM4xN1z1EXjDLn3y54YonPqrpa5gGtZG7XWiegHqxii",
        etherscanURL:
          "https://sepolia.etherscan.io/tx/0x2375fa70178934ff5dba2a1ce87405641524cb64dd5ab2f34c8d2bc1895cd901",
      };
      setSpecificData(updatedData);
    }

    if (report === "Bank of America") {
      const updatedData = {
        ...specificData,
        jurisdiction: "USA",
        prediction:
          "In the Sustainability Report, it is stated that Bank of America achieved carbon neutrality for its operations in 2019. However, in Twitter, there is a tweet from 2021 mentioning the goal of transitioning to a low-carbon economy, suggesting that carbon neutrality may not have been achieved by 2021.  The Sustainability Report mentions that Bank of America joined the Net-Zero Banking Alliance (NZBA) in 2021, but there is no mention of this in Twitter or Carbon offsets sheets. In the Sustainability Report sheet, it is stated that Bank of America achieved its 100% renewable electricity goal in 2019. However, there is no mention of this in the Twitter or Carbon offsets sheets.",
        priority: "Medium",
        claims: [
          "We achieved carbon neutrality and our 100% renewable electricity goal in 2019.",
          "Transitioning to a low-carbon economy is essential, but it's crucial to stay realistic. Achieving carbon neutrality by 2021 might be a challenging goal. Let's keep working towards a greener future!",
        ],
        hash: "QmWX2Y31vu94XquQsgjzEdXpDtT4fnJZKETxM2fEseoWiU",
        etherscanURL:
          "https://sepolia.etherscan.io/tx/0x475fca847e2b37be5ee38c94761573f13ce723f7288a8e636a199a03f7fa5e7c",
      };
      setSpecificData(updatedData);
    }

    setStep("specific_report");
  };

  return (
    <>
      {data.map((report, index) =>
        activeTab === 1 ? (
          <div
            // onClick={() => setStep("specific_report")}
            onClick={() => handleNavigate(report.Company)}
            style={{
              boxShadow:
                " 0px 33px 32px -16px rgba(0, 0, 0, 0.10), 0px 0px 16px 4px rgba(0, 0, 0, 0.04)",
            }}
            className="min-w-[31%] p-4 cursor-pointer rounded-xl hover:border-[1px] hover:border-black  "
          >
            <p className="mb-2 text-sm text-[#6C7275]">{report.year}</p>
            <h1 className="mb-3 text-[#000] text-xl font-semibold">
              {report.Company}
            </h1>
            <p className="text-[#6C7275] text-base">
              Jurisdiction :
              <span className="text-[#000] font-semibold ml-2">
                {report.Jurisdiction}
              </span>
            </p>
          </div>
        ) : (
          <div
            // onClick={() => setStep("specific_report")}
            onClick={() => handleNavigate(report.companyName)}
            style={{
              boxShadow:
                " 0px 33px 32px -16px rgba(0, 0, 0, 0.10), 0px 0px 16px 4px rgba(0, 0, 0, 0.04)",
            }}
            className="min-w-[31%] p-4 cursor-pointer rounded-xl hover:border-[1px] hover:border-black  "
          >
            <p className="mb-2 text-sm text-[#6C7275]">{report?.year}</p>
            <h1 className="mb-3 text-[#000] text-xl font-semibold">
              {report.companyName}
            </h1>
            <p className="text-[#6C7275] text-base">
              Jurisdiction :
              <span className="text-[#000] font-semibold ml-2">Ireland</span>
            </p>
          </div>
        )
      )}
    </>
  );
};
