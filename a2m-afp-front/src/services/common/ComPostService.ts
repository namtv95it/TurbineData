import axios from "axios";
import { ApiUrlUtil } from "../../utils/apiUrlUtil";
import { ParamUtil, RequestParam } from "../../utils/paramUtil";
import { HeadersUtil } from "../../utils/headersUtil";

export class ComPostService {

    public searchBookmark(modelSearch: any) {
        const params: RequestParam[] = ParamUtil.toRequestParams(modelSearch);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/common-post/search-bookmark.exclude", params);
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public bookmarkOrUnBookmark(model: any) {
        return axios.post(process.env.REACT_APP_API_URL + "/common-post/bookmark.exclude", model, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public addLikeOrUnlike(model: any) {
        return axios.post(process.env.REACT_APP_API_URL + "/common-post/like.exclude", model, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    
    public comment(model: any) {
        return axios.post(process.env.REACT_APP_API_URL + "/common-post/comment.exclude", model, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public getListComment(modelSearch: any) {
        const params: RequestParam[] = ParamUtil.toRequestParams(modelSearch);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/common-post/searchComment.exclude", params);
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public getAppCommentData(modelSearch: any) {
        const params: RequestParam[] = ParamUtil.toRequestParams(modelSearch);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/common-post/getAppCommentData.exclude", params);
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public viewed(id: number) {
        return axios.post(process.env.REACT_APP_API_URL + "/common-post/" + id + "/viewed.exclude", {
            headers: HeadersUtil.getHeadersAuth()
        })
    }
    
    public increasePostView(id: number) {
        return axios.get(process.env.REACT_APP_API_URL + "/common-post/" + id + "/increasePostView.exclude", {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public deleteComment(id: number) {
        return axios.delete(process.env.REACT_APP_API_URL + "/common-post/" + id + "/deleteComment.exclude", {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    getDocumentPostInfo(postId: any) {
        const url = process.env.REACT_APP_API_URL + "/common-post/getDocumentPostInfo?postId=" + postId;
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

}