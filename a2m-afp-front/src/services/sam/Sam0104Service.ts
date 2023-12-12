import { ApiUrlUtil } from "./../../utils/apiUrlUtil";
import { ParamUtil } from "./../../utils/paramUtil";
import axios from "axios";
import { HeadersUtil } from "../../utils/headersUtil";

export class Sam0104Service {
  public static getListApi() {
    let url = process.env.REACT_APP_MAIN_URL + "/v2/api-docs";
    return axios.get(url, {
      headers: HeadersUtil.getHeadersAuth(),
    });
  }

  public static get(url: any) {
    return axios.get(url, {
      headers: HeadersUtil.getHeadersAuth(),
    });
  }

  public static post(api: any, req: any) {
    let url = process.env.REACT_APP_MAIN_URL + api;
    return axios.post(url, req, {
      headers: HeadersUtil.getHeadersAuth(),
    });
  }

  public static put(api: any, req: any) {
    let url = process.env.REACT_APP_MAIN_URL + api;
    return axios.put(url, req, {
      headers: HeadersUtil.getHeadersAuth(),
    });
  }

  public static delete(api: any) {
    let url = process.env.REACT_APP_MAIN_URL + api;
    return axios.delete(url, {
      headers: HeadersUtil.getHeadersAuth(),
    });
  }
}
