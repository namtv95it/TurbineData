import axios from "axios";
import { CommCodeModel } from "../../components/pages/sys/Sys0401/ComCode";
import { ApiUrlUtil } from "../../utils/apiUrlUtil";
import { HeadersUtil } from "../../utils/headersUtil";
import { ParamUtil, RequestParam } from "../../utils/paramUtil";

export class Sys0401Service {

    private static _sys0401Service: Sys0401Service

    public static getInstance(): Sys0401Service {
        if (!Sys0401Service._sys0401Service) {
            Sys0401Service._sys0401Service = new Sys0401Service()
        }
        return Sys0401Service._sys0401Service;
    }

    // public delete(id: number) {
    //     return axios.delete(process.env.REACT_APP_API_URL + "/sam/sam0101/deleteById/" + id, {
    //         headers: HeadersUtil.getHeadersAuth()
    //     })
    // }

    public getList(modelSearch: any) {
        const params: RequestParam[] = ParamUtil.toRequestParams(modelSearch);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/sys/sys0401/getAllCommCd.do", params);
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public getCommCodeById(commCd: any) {
        const params: RequestParam[] = ParamUtil.toRequestParams(commCd);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/sys/sys0401/getCommCdById.do", params);
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public insertCommCode(commCode: CommCodeModel){
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/sys/sys0401/insertCommCd.do");
        return axios.post(url, commCode, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public updateCommCode(commCode: CommCodeModel){
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/sys/sys0401/updateCommCd.do");
        return axios.post(url, commCode, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public delete(commCode: any){
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/sys/sys0401/" + commCode + "/deleteCommCd.do");
        return axios.delete(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }
}