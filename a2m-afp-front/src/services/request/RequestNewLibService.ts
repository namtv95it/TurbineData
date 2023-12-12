import axios from "axios";
import { ApiUrlUtil } from "../../utils/apiUrlUtil";
import { HeadersUtil } from "../../utils/headersUtil";
import { ParamUtil, RequestParam } from "../../utils/paramUtil";

export class RequestNewLibService {

    private static _requestNewLibService: RequestNewLibService

    public static getInstance(): RequestNewLibService {
        if (!RequestNewLibService._requestNewLibService) {
            RequestNewLibService._requestNewLibService = new RequestNewLibService()
        }
        return RequestNewLibService._requestNewLibService;
    }

    public getRequest(param :any){
        const params: RequestParam[] = ParamUtil.toRequestParams(param);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/request-new-lib/get-request.exclude", params);
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth(),
          });
    }

    public getRequestById(param :any){
        const params: RequestParam[] = ParamUtil.toRequestParams(param);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/request-new-lib/get-request-by-id.exclude", params);
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth(),
          });
    }

    public insertRequest(param :any){
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/request-new-lib/insert-request.exclude");
        return axios.post(url, param, {
            headers: HeadersUtil.getHeadersAuth(),
          });
    }
    
    public updateRequest(param :any){
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/request-new-lib/update-request.exclude");
        return axios.put(url, param, {
            headers: HeadersUtil.getHeadersAuth(),
          });
    }

    public deleteRequest(param :any){
        const params: RequestParam[] = ParamUtil.toRequestParams(param);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/request-new-lib/delete-request.exclude", params);
        return axios.delete(url, {
            headers: HeadersUtil.getHeadersAuth(),
          });
    }

    public updateRequestStatus(param :any){
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/request-new-lib/update-request-status.exclude");
        return axios.put(url, param, {
            headers: HeadersUtil.getHeadersAuth(),
          });
    }
}