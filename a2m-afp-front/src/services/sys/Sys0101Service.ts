import axios from "axios";
import { Menu } from "../../components/pages/sys/Sys0101/MenuMng";
import { ApiUrlUtil } from "../../utils/apiUrlUtil";
import { HeadersUtil } from "../../utils/headersUtil";
import { ParamUtil, RequestParam } from "../../utils/paramUtil";

export class Sys0101Service {

    private static _sys0101Service: Sys0101Service

    public static getInstance(): Sys0101Service {
        if (!Sys0101Service._sys0101Service) {
            Sys0101Service._sys0101Service = new Sys0101Service()
        }
        return Sys0101Service._sys0101Service;
    }

    // public delete(id: number) {
    //     return axios.delete(process.env.REACT_APP_API_URL + "/sam/sam0101/deleteById/" + id, {
    //         headers: HeadersUtil.getHeadersAuth()
    //     })
    // }

    public getList(modelSearch: any) {
        const params: RequestParam[] = ParamUtil.toRequestParams(modelSearch);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/sys/sys0101/getLstMenu.do", params);
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public getMenuById(menuId: any) {
        const params: RequestParam[] = ParamUtil.toRequestParams(menuId);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/sys/sys0101/getMenuById.do", params);
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public updateMenu(menu: Menu){
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/sys/sys0101/update.do");
        return axios.post(url, menu, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public insertMenu(menu: Menu){
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/sys/sys0101/insert.do");
        return axios.post(url, menu, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public delete(menuId: any){
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/sys/sys0101/" + menuId + "/deleteMenu.do");
        return axios.delete(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }
}