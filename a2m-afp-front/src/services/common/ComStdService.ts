import axios from "axios";
import { Menu } from "../../components/pages/sys/Sys0101/MenuMng";
import { CommCodeModel } from "../../components/pages/sys/Sys0401/ComCode";
import { ApiUrlUtil } from "../../utils/apiUrlUtil";
import { HeadersUtil } from "../../utils/headersUtil";
import { ParamUtil, RequestParam } from "../../utils/paramUtil";

export class ComStdService {
  private static _comStdService: ComStdService;

  public static getInstance(): ComStdService {
    if (!ComStdService._comStdService) {
      ComStdService._comStdService = new ComStdService();
    }
    return ComStdService._comStdService;
  }

  public getCommNm(commCd: any) {
    const params: RequestParam[] = ParamUtil.toRequestParams(commCd);
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/comStd/getComNm.do",
      params
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeadersAuth(),
    });
  }


  public logout() {
    return axios.post(process.env.REACT_APP_AUTH_URL + "/api/auth/logout", {
      headers: HeadersUtil.getHeaders()
    })
  }

  public getListTccoStd(modelSearch: any) {
    const params: RequestParam[] = ParamUtil.toRequestParams(modelSearch);
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/comStd/getTccoStd.exclude", params);
    return axios.get(url, {
      headers: HeadersUtil.getHeadersAuth()
    })
  }

}
