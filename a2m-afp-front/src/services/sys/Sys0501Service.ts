import axios from "axios";
import { Menu } from "../../components/pages/sys/Sys0101/MenuMng";
import { ApiUrlUtil } from "../../utils/apiUrlUtil";
import { HeadersUtil } from "../../utils/headersUtil";
import { ParamUtil, RequestParam } from "../../utils/paramUtil";

export class Sys0501Service {

    private static _sys0501Service: Sys0501Service

    public static getInstance(): Sys0501Service {
        if (!Sys0501Service._sys0501Service) {
            Sys0501Service._sys0501Service = new Sys0501Service()
        }
        return Sys0501Service._sys0501Service;
    }

    public getListLib(modelSearch: any) {
        const params: RequestParam[] = ParamUtil.toRequestParams(modelSearch);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/sys/sys0501/getLibData.do", params);
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public saveManual(data:any){
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/sys/sys0501/saveManuals.do");
        return axios.post(url, data, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public changeStatus(data:any){
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/sys/sys0501/changeStatus.do");
        return axios.post(url, data, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public getManuals(data: any) {
        const params: RequestParam[] = ParamUtil.toRequestParams(data);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/sys/sys0501/getManualsByID.do", params);
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }
}