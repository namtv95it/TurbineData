import axios from "axios";
import { ApiUrlUtil } from "../../utils/apiUrlUtil";
import { HeadersUtil } from "../../utils/headersUtil";
import { ParamUtil, RequestParam } from "../../utils/paramUtil";
import { param } from "jquery";
export class DownloadService {
  private static _downloadService: DownloadService;

  public static getInstance(): DownloadService {
    if (!DownloadService._downloadService) {
        DownloadService._downloadService = new DownloadService();
    }
    return DownloadService._downloadService;
  }

  public getCategories(){
    const url = ApiUrlUtil.buildQueryString( process.env.REACT_APP_API_URL + "/das/getCategories.exclude");
    return axios.get(url, {
      headers: HeadersUtil.getHeadersAuth(),
    });
  }

  public getDownloadHistory(){
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/down/getHistory.exclude");
    return axios.get(url, {
        headers: HeadersUtil.getHeadersAuth(),
      });
  }

  public getProjectById(projectId:any){
    const params: RequestParam[] = ParamUtil.toRequestParams(projectId);
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/down/getProjectById.exclude", params);
    return axios.get(url, {
        headers: HeadersUtil.getHeadersAuth(),
      });
  }

  public downloadProject(param:any, downloadUrl:any){
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + downloadUrl + ".exclude");
    return axios.post(url, param, {
        headers: HeadersUtil.getHeadersAuth(),
        responseType: "blob"
      });
  }
  
  public saveHistory(param: any){
    const url = ApiUrlUtil.buildQueryString( process.env.REACT_APP_API_URL + "/down/saveHistory.exclude");
    return axios.post(url, param,{
      headers: HeadersUtil.getHeadersAuth(),
    });
  }

  public getDependManualsById(dependId:any){
    const params: RequestParam[] = ParamUtil.toRequestParams(dependId);
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/down/getDependManualsById.exclude", params);
    return axios.get(url, {
        headers: HeadersUtil.getHeadersAuth(),
      });
  }
}
