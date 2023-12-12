import axios from "axios";
import { ApiUrlUtil } from "../../utils/apiUrlUtil";
import { HeadersUtil } from "../../utils/headersUtil";
import { ParamUtil, RequestParam } from "../../utils/paramUtil";

export class Thr0101Service {

    private static _thr0101Service: Thr0101Service

    public static getInstance(): Thr0101Service {
        if (!Thr0101Service._thr0101Service) {
            Thr0101Service._thr0101Service = new Thr0101Service()
        }
        return Thr0101Service._thr0101Service;
    }

    public getList(modelSearch: any) {
        const params: RequestParam[] = ParamUtil.toRequestParams(modelSearch);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/threads/search.exclude", params);
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public getMenus() {
        return axios.get(process.env.REACT_APP_API_URL + "/threads/getAfpMenus.exclude", {
            headers: HeadersUtil.getHeadersAuth()
        })
    }
}