import axios from "axios";
import { ApiUrlUtil } from "../../utils/apiUrlUtil";
import { HeadersUtil } from "../../utils/headersUtil";
import { ParamUtil, RequestParam } from "../../utils/paramUtil";

export class Sys0301Service {

    private static _sys0301Service: Sys0301Service

    public static getInstance(): Sys0301Service {
        if (!Sys0301Service._sys0301Service) {
            Sys0301Service._sys0301Service = new Sys0301Service()
        }
        return Sys0301Service._sys0301Service;
    }

    // public delete(id: number) {
    //     return axios.delete(process.env.REACT_APP_API_URL + "/sam/sam0101/deleteById/" + id, {
    //         headers: HeadersUtil.getHeadersAuth()
    //     })
    // }

    public search(modelSearch: any) {
        const params: RequestParam[] = ParamUtil.toRequestParams(modelSearch);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/sys/sys0301/search.do", params);
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public getMyUser(modelSearch: any) {
        const params: RequestParam[] = ParamUtil.toRequestParams(modelSearch);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/sys/sys0301/getMyUser.do", params);
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public save(model: any) {
        return axios.post(process.env.REACT_APP_API_URL + "/sys/sys0301/save.do", model, {
            headers: HeadersUtil.getHeadersAuth()
        });
    }

    public delete(userInfoId: number) {
        return axios.delete(process.env.REACT_APP_API_URL + "/sys/sys0301/" + userInfoId + "/deleteUserInfo.do", {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public deleteUser(userUid: String) {
        return axios.delete(process.env.REACT_APP_API_URL + "/sys/sys0301/" + userUid + "/delete.do", {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public update(model: any) {
        return axios.put(process.env.REACT_APP_API_URL + "/sys/sys0301/update.do", model, {
            headers: HeadersUtil.getHeadersAuth()
        });
    }

    public existsByUserId(userId: String) {
        return axios.get(process.env.REACT_APP_API_URL + "/sys/sys0301/" + userId + "/existsByUserId.do", {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public existsByEmail(email: String) {
        return axios.get(process.env.REACT_APP_API_URL + "/sys/sys0301/" + email + "/existsByEmail.do", {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public exists(param: any) {
        const params: RequestParam[] = ParamUtil.toRequestParams(param);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/sys/sys0301/exists.do", params);
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

}