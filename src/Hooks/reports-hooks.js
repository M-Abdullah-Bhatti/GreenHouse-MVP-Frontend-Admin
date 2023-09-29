import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ReportService from "../Services/reports-services";








const useGetSingleReportDetails = (company) => {
  return useQuery({
    queryKey: ["getSingleReportDetail"], 
    queryFn: () => ReportService.getSingleReportDetail(company),
  });
};



const useUpdateReportAgePriority = (reportData) => {
  // console.log(reportData)
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      return ReportService.updateReportAgePriority(reportData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("updateReportAgePriority");
      },
    }
  );
};










export { useUpdateReportAgePriority, useGetSingleReportDetails};
