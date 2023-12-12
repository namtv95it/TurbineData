import axios from "axios";
import { ApiUrlUtil } from "../../utils/apiUrlUtil";
import { ParamUtil, RequestParam } from "../../utils/paramUtil";
import { HeadersUtil } from "../../utils/headersUtil";
import { ProjectDto } from "../../model/pro/ProjectDto";

export class Pro0101Service {

    private static _pro0101Service: Pro0101Service

    public static getInstance(): Pro0101Service {
        if (!Pro0101Service._pro0101Service) {
            Pro0101Service._pro0101Service = new Pro0101Service()
        }
        return Pro0101Service._pro0101Service;
    }

    public getList(modelSearch: any) {
        const params: RequestParam[] = ParamUtil.toRequestParams(modelSearch);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/pro/pro0101/search.exclude", params);
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public bookmarkOrUnBookmark(model: any) {
        return axios.post(process.env.REACT_APP_API_URL + "/pro/pro0101/bookmark.exclude", model, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public getProjectCounter() {
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/pro/pro0101/getProjectCounter.exclude");
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public save(model: ProjectDto) {
        return axios.post(process.env.REACT_APP_API_URL + "/pro/pro0101/save.exclude", model, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public getProjectById(projectId: number) {
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + `/pro/pro0101/${projectId}/getProjectById.exclude`);
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public delete(projectId: number) {
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + `/pro/pro0101/${projectId}/delete.exclude`);
        return axios.delete(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

}