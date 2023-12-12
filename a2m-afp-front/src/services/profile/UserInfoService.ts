import axios from "axios";
import { ApiUrlUtil } from "../../utils/apiUrlUtil";
import { HeadersUtil } from "../../utils/headersUtil";
import { ParamUtil, RequestParam } from "../../utils/paramUtil";

export class UserInfoService {

    private static _userInfoService: UserInfoService

    public static getInstance(): UserInfoService {
        if (!UserInfoService._userInfoService) {
            UserInfoService._userInfoService = new UserInfoService()
        }
        return UserInfoService._userInfoService;
    }

    public generateSecretKey(request: any) {
        const params: RequestParam[] = ParamUtil.toRequestParams(request);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/tsst-userInfo/generate-secret-key.exclude", params);
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public verifyOTP(request: any) {
        const params: RequestParam[] = ParamUtil.toRequestParams(request);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/tsst-userInfo/verify-otp.exclude", params);
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }


    public changePassword(model: any) {
        return axios.post(process.env.REACT_APP_API_URL + "/tsst-userInfo/change-password.exclude", model, {
            headers: HeadersUtil.getHeadersAuth()
        });
    }

    
    public verifyPassword(request: any) {
        const params: RequestParam[] = ParamUtil.toRequestParams(request);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/tsst-userInfo/verify-password.exclude", params);
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    
    public update(model: any) {
        return axios.put(process.env.REACT_APP_API_URL + "/tsst-userInfo/update.exclude", model, {
            headers: HeadersUtil.getHeadersAuth()
        });
    }

    

    public sendOTPEmail(request: any) {
        const params: RequestParam[] = ParamUtil.toRequestParams(request);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/tsst-userInfo/send-otp-email.exclude", params);
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    
    public verifyOTPEmail(request: any) {
        const params: RequestParam[] = ParamUtil.toRequestParams(request);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/tsst-userInfo/verify-otp-email.exclude", params);
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

        
    public changeAvatar(file: File) {
        const formData: FormData = new FormData();
        formData.append('file', file);

        return axios.post(process.env.REACT_APP_API_URL + "/tsst-userInfo/change-avatar.exclude", formData, {
            headers: HeadersUtil.getHeadersAuthFormData()
        });
    }

    public viewAvatar(request: any) {
        const params: RequestParam[] = ParamUtil.toRequestParams(request);
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/tsst-userInfo/get-avatar-base64.exclude", params);
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }

    public deleteAvatar() {
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/tsst-userInfo/delete-avatar.exclude");
        return axios.delete(url, {
            headers: HeadersUtil.getHeadersAuth()
        })
    }
}