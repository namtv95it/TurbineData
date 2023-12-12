import axios from "axios";
import { ApiUrlUtil } from "../utils/apiUrlUtil";
import { HeadersUtil } from "../utils/headersUtil";
import { ParamUtil, RequestParam } from "../utils/paramUtil";

export class TsstUserService {

    private static _tsstUserService: TsstUserService

    public static getInstance(): TsstUserService {
        if (!TsstUserService._tsstUserService) {
            TsstUserService._tsstUserService = new TsstUserService()
        }
        return TsstUserService._tsstUserService;
    }

    // public delete(id: number) {
    //     return axios.delete(process.env.REACT_APP_API_URL + "/sam/sam0101/deleteById/" + id, {
    //         headers: HeadersUtil.getHeadersAuth()
    //     })
    // }

    public inserUser(model: any) {
        const params: RequestParam[] = ParamUtil.toRequestParams(model);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/tsst-user/insertUser.do", params);
        return axios.post(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }
}