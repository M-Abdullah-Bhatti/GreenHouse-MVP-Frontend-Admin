import axios from "axios";
import apiUrl from "../utils/baseURL";

class ReportService {






  /**
   * getChangeStatusToReview
   * @returns
   */
  async updateReportAgePriority(reportData) {
    const res = await axios.put(`${apiUrl}/api/report/updateReportAgePriority`, reportData  ,{headers: {
        "Content-Type": "application/json",
      }});
    return res
  }








  /**
   * getSingleReportDetail
   * @returns
   */
    async getAllPendingReports() {
    const {data} = await axios.get(`${apiUrl}/api/report/getUpdateSendToRegulators`)
    return data;
  }




  

  
}


// eslint-disable-next-line import/no-anonymous-default-export
export default new ReportService();