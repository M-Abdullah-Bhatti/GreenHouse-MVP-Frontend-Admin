import React, { useEffect, useState } from "react";
import { allReportsData, allReportsSentToRegulatorsData } from "../../data";
import { useStepsContext } from "../../Context/StateContext";
import axios from "axios";

const AllReports = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [reportsSentToRegulators, setReportsSentToRegulators] = useState([]);
  // console.log("================");
  // console.log(reportsSentToRegulators);
  // console.log(filteredData);

  const { setStep, rows, sheet } = useStepsContext();

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
      console.log("sheet: ", sheet);

      let newFilteredData = [];

      // Iterate over the keys in sheet
      for (const key in sheet) {
        if (Object.hasOwnProperty.call(sheet, key)) {
          const arrayForCurrentKey = sheet[key];

          // Iterate over the array for the current key
          for (const item of arrayForCurrentKey) {
            // Check if item.Company is already present in newFilteredData
            const isPresent = newFilteredData.some(
              (jack) => jack.Company === item.Company
            );
            if (!isPresent) {
              // If it's not present, push it into newFilteredData
              newFilteredData.push(item);
            }
          }
        }
      }

      console.log("Filtered data:", newFilteredData);

      // Update the state
      setFilteredData(newFilteredData);
      // console.log("filteredData: ", newFilteredData);
    };
    loadData();
  }, [sheet]);

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
  const { setStep, rows, setCurrentCountry, setDescription } =
    useStepsContext();

  const handleNavigate = async (report) => {
    setCurrentCountry(report);
    console.log("report: ", report);

    // // Filter all the records that match the Company of the clicked report
    // const filteredRecords = rows.filter(
    //   (row) => row.Company === report.Company
    // );

    // console.log("Filtered records: ", filteredRecords);

    // // Initialize an empty array to store all text
    // let allText = [];

    // // Assuming that your records have a 'text' field
    // filteredRecords.forEach((record) => {
    //   console.log("=", record.text);
    //   if (record.text) {
    //     allText.push(record.text);
    //   }
    // });

    // console.log("allText: ", allText);
    // // Convert the array of text into a single string
    // const paragraphText = allText.join(" ");

    // console.log("Paragraph text: ", paragraphText);
    // // Now you can navigate or do something with these filtered records

    // setCurrentCountry(report.Company);
    // setDescription(paragraphText);
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
