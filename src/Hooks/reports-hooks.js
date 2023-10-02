import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ReportService from "../Services/reports-services";








const useGetAllPendingReports = () => {
  return useQuery({
    queryKey: ["getUpdateSendToRegulators"], 
    queryFn: () => ReportService.getAllPendingReports(),
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










export { useUpdateReportAgePriority, useGetAllPendingReports};
