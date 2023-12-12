import axios from "axios";
import { ApiUrlUtil } from "../../utils/apiUrlUtil";
import { HeadersUtil } from "../../utils/headersUtil";
import { ParamUtil, RequestParam } from "../../utils/paramUtil";

export class Sam0103Service {

    private static _sam0103Service: Sam0103Service

    public static getInstance(): Sam0103Service {
        if (!Sam0103Service._sam0103Service) {
            Sam0103Service._sam0103Service = new Sam0103Service()
        }
        return Sam0103Service._sam0103Service;
    }

    public save(model: any) {
        return axios.post(process.env.REACT_APP_API_URL + "/sam/sam0103/save-comment.do", model, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public saveQuestion(model: any) {
        return axios.post(process.env.REACT_APP_API_URL + "/sam/sam0103/save.do", model, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    // public delete(id: number) {
    //     return axios.delete(process.env.REACT_APP_API_URL + "/sam/sam0101/" + id + "/deleteById.do", {
    //         headers: HeadersUtil.getHeadersAuth()
    //     })
    // }

    public getListComment(param: any) {
        const params: RequestParam[] = ParamUtil.toRequestParams(param);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/sam/sam0103/getListComment.do", params);
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public getList(modelSearch: any) {
        const params: RequestParam[] = ParamUtil.toRequestParams(modelSearch);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/sam/sam0103/getList.do", params);
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public getListHashTag(modelSearch: any) {
        const params: RequestParam[] = ParamUtil.toRequestParams(modelSearch);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/sam/sam0103/getListByUrl.do", params);
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public getQAById(modelSearch: any) {
        const params: RequestParam[] = ParamUtil.toRequestParams(modelSearch);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/sam/sam0103/getQAById.do", params);
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }
}