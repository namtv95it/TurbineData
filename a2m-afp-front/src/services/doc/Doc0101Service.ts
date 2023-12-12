import axios from "axios";
import { ApiUrlUtil } from "../../utils/apiUrlUtil";
import { ParamUtil, RequestParam } from "../../utils/paramUtil";
import { HeadersUtil } from "../../utils/headersUtil";
import { Subject } from 'rxjs';

export class Doc0101Service {
    
    public searchMenu(request: any) {
        const params: RequestParam[] = ParamUtil.toRequestParams(request);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/doc/doc0101/searchMenu", params);
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        });
    }

    public getAllParentMenu(menuId: any) {
        const url = process.env.REACT_APP_API_URL + "/doc/doc0101/getAllParentMenu?menuId=" + menuId;
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        });
    }

    public getMenuById(menuId: any) {
        return axios.get(process.env.REACT_APP_API_URL + "/doc/doc0101/getMenuById?menuId=" + menuId, {
            headers: HeadersUtil.getHeadersAuth()
        });
    }

    public getMenus() {
        return axios.get(process.env.REACT_APP_API_URL + "/doc/doc0101/getAfpMenus", {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public getTsstMenuById(menuId: any) {
        return axios.get(process.env.REACT_APP_API_URL + "/doc/doc0101/getTsstMenuById?menuId=" + menuId, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public bookmarkOrUnBookmark(model: any) {
        return axios.post(process.env.REACT_APP_API_URL + "/pro/pro0101/bookmark", model, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public saveAfpMenu(menus: any){
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/doc/doc0101/saveAfpMenu");
        return axios.post(url, menus, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public createAfpMenu(menu: any){
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/doc/doc0101/createAfpMenu");
        return axios.post(url, menu, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public updateAfpMenu(menu: any){
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/doc/doc0101/updateAfpMenu");
        return axios.post(url, menu, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    deleteAfpMenu(menuIds: any) {
        return axios.post(process.env.REACT_APP_API_URL + "/doc/doc0101/deleteAfpMenu", menuIds, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    // --------------------------------------------------POST------------------------------------------------

    public getPostByAfpMenu(menuId: any) {
        const url = process.env.REACT_APP_API_URL + "/doc/doc0101/getPostByAfpMenu?afpMenuId=" + menuId;
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public createPost(request: any){
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/doc/doc0101/createAfpPost");
        return axios.post(url, request, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public updateAfpPost(request: any){
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/doc/doc0101/updateAfpPost");
        return axios.post(url, request, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public deletePostById(postId: any) {
        const url = process.env.REACT_APP_API_URL + "/doc/doc0101/deletePost?postId=" + postId;
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public searchDoc(param :any){
        const params: RequestParam[] = ParamUtil.toRequestParams(param);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/doc/doc0101/searchDoc", params);
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth(),
          });
    }
}


const refreshTreeMenu = new Subject();

export const afpMenuDataService = {
    setRefreshMenu: (data: any) => refreshTreeMenu.next(data),
    getRefreshMenu: () => refreshTreeMenu.asObservable()
};
