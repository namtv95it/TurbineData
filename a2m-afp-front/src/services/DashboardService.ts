import axios from "axios";
import { ApiUrlUtil } from "../utils/apiUrlUtil";
import { HeadersUtil } from "../utils/headersUtil";
import { ParamUtil, RequestParam } from "../utils/paramUtil";
export class DashboardService {
  private static _dashboardService: DashboardService;

  public static getInstance(): DashboardService {
    if (!DashboardService._dashboardService) {
      DashboardService._dashboardService = new DashboardService();
    }
    return DashboardService._dashboardService;
  }


  public getListCategory() {
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/das/getListCategory.exclude");
    return axios.get(url, {
      headers: HeadersUtil.getHeadersAuth(),
    });
  }

  public getCategories() {
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/das/getCategories.exclude");
    return axios.get(url, {
      headers: HeadersUtil.getHeadersAuth(),
    });
  }

  public getPostForDashboard(modelSearch: any) {
    const params: RequestParam[] = ParamUtil.toRequestParams(modelSearch);
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/das/getPostForDashboard.exclude", params);
    return axios.get(url, {
      headers: HeadersUtil.getHeadersAuth()
    })
  }

}
