import axios from "axios";
import { ApiUrlUtil } from "../../utils/apiUrlUtil";
import { HeadersUtil } from "../../utils/headersUtil";
import { ParamUtil, RequestParam } from "../../utils/paramUtil";

export class Sys0201Service {

    private static _sys0201Service: Sys0201Service

    public static getInstance(): Sys0201Service {
        if (!Sys0201Service._sys0201Service) {
            Sys0201Service._sys0201Service = new Sys0201Service()
        }
        return Sys0201Service._sys0201Service;
    }

    public search_role(modelSearch: any) {
        const params: RequestParam[] = ParamUtil.toRequestParams(modelSearch);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/sys/sys0201/search-role.do", params);
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public search_user_role(modelSearch: any) {
        const params: RequestParam[] = ParamUtil.toRequestParams(modelSearch);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/sys/sys0201/search-user-role.do", params);
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public search_menu_role(modelSearch: any) {
        const params: RequestParam[] = ParamUtil.toRequestParams(modelSearch);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/sys/sys0201/search-menu-role.do", params);
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    // public search_all_user(modelSearch: any) {
    //     const params: RequestParam[] = ParamUtil.toRequestParams(modelSearch);
    //     const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/sys/sys0201/search-all-user.do", params);
    //     return axios.get(url, {
    //         headers: HeadersUtil.getHeadersAuth()
    //     })
    // }

    public save_role(model: any) {
        return axios.post(process.env.REACT_APP_API_URL + "/sys/sys0201/save-role.do", model, {
            headers: HeadersUtil.getHeadersAuth()
        });
    }

    public delete_role(roleId: number) {
        return axios.delete(process.env.REACT_APP_API_URL + "/sys/sys0201/" + roleId + "/delete-role.do", {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public update_role(model: any) {
        return axios.put(process.env.REACT_APP_API_URL + "/sys/sys0201/update-role.do", model, {
            headers: HeadersUtil.getHeadersAuth()
        });
    }

    public save_user_role(model: any) {
        return axios.post(process.env.REACT_APP_API_URL + "/sys/sys0201/save-user-role.do", model, {
            headers: HeadersUtil.getHeadersAuth()
        });
    }

    public save_menu_role(model: any) {
        return axios.post(process.env.REACT_APP_API_URL + "/sys/sys0201/save-menu-role.do", model, {
            headers: HeadersUtil.getHeadersAuth()
        });
    }

    public searchByRole(roleId: any) {
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/sys/sys0201/" + roleId + "/search-menu-role.do");
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    // public search_all_role(modelSearch: any) {
    //     const params: RequestParam[] = ParamUtil.toRequestParams(modelSearch);
    //     const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/sys/sys0201/search-all-role.do", params);
    //     return axios.get(url, {
    //         headers: HeadersUtil.getHeadersAuth()
    //     })
    // }

    public search_menu(modelSearch: any) {
        const params: RequestParam[] = ParamUtil.toRequestParams(modelSearch);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/sys/sys0201/search-menu.do", params);
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public searchUser(modelSearch: any) {
        const params: RequestParam[] = ParamUtil.toRequestParams(modelSearch);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/sys/sys0201/search-user.do", params);
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

}