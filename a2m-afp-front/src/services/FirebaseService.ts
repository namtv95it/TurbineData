import axios from "axios";
import { Menu } from "../components/pages/sys/Sys0101/MenuMng";
import { ApiUrlUtil } from "../utils/apiUrlUtil";
import { HeadersUtil } from "../utils/headersUtil";
import { ParamUtil, RequestParam } from "../utils/paramUtil";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
export class FirebaseService {
  private static _firebaseService: FirebaseService;

  public static getInstance(): FirebaseService {
    if (!FirebaseService._firebaseService) {
      FirebaseService._firebaseService = new FirebaseService();
    }
    return FirebaseService._firebaseService;
  }

  

  public push(listRegisToken:any){
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/firebase/send-notification.exclude"
    );
    const data = {
      "subject": "Notice",
      "content": "Notification from firebase",
      "image": "",
      "data": {
          "key1": "data1"
      },
      "registrationTokens": listRegisToken
  }
    return axios.post(url,data, {
      headers: HeadersUtil.getHeadersAuth(),
    });
  }
}
