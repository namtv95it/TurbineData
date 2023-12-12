import axios from "axios";
import { ApiUrlUtil } from "../../utils/apiUrlUtil";
import { ParamUtil, RequestParam } from "../../utils/paramUtil";
import { HeadersUtil } from "../../utils/headersUtil";
import { AnnounDto } from "../../model/ann/AnnounDto";

export class Ann_0101Service {

    public getList(modelSearch: any) {
        const params: RequestParam[] = ParamUtil.toRequestParams(modelSearch);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/common-post/announ/search.exclude", params);
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public getById(modelSearch: any) {
        const params: RequestParam[] = ParamUtil.toRequestParams(modelSearch);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/common-post/announ/getById.exclude", params);
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public save(model: AnnounDto) {
        return axios.post(process.env.REACT_APP_API_URL + "/common-post/announ/save.exclude", model, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public delete(id: number) {
        return axios.delete(process.env.REACT_APP_API_URL + "/common-post/announ/" + id + "/delete.exclude", {
            headers: HeadersUtil.getHeadersAuth()
        })
    }
}