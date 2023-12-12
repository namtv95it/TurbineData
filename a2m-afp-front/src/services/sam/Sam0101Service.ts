import axios from "axios";
import { ApiUrlUtil } from "../../utils/apiUrlUtil";
import { HeadersUtil } from "../../utils/headersUtil";
import { ParamUtil, RequestParam } from "../../utils/paramUtil";

export class Sam0101Service {

    private static _sam0101Service: Sam0101Service

    public static getInstance(): Sam0101Service {
        if (!Sam0101Service._sam0101Service) {
            Sam0101Service._sam0101Service = new Sam0101Service()
        }
        return Sam0101Service._sam0101Service;
    }

    public delete(id: number) {
        return axios.delete(process.env.REACT_APP_API_URL + "/sam/sam0101/" + id + "/deleteById.do", {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public getList(modelSearch: any) {
        const params: RequestParam[] = ParamUtil.toRequestParams(modelSearch);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/sam/sam0101/getList.do", params);
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public getListTccoStd(modelSearch: any) {
        const params: RequestParam[] = ParamUtil.toRequestParams(modelSearch);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/sam/sam0101/getTccoStd.do", params);
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public getListTccoStdByValueConfig(modelSearch: any) {
        const params: RequestParam[] = ParamUtil.toRequestParams(modelSearch);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/sam/sam0101/getTccoStdByValueConfig.do", params);
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }
}