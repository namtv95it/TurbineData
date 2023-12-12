import axios from "axios";
import { Menu } from "../components/pages/sys/Sys0101/MenuMng";
import { ApiUrlUtil } from "../utils/apiUrlUtil";
import { HeadersUtil } from "../utils/headersUtil";
import { ParamUtil, RequestParam } from "../utils/paramUtil";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
export class WebSocketService {
  private static _webSocketService: WebSocketService;

  public static getInstance(): WebSocketService {
    if (!WebSocketService._webSocketService) {
      WebSocketService._webSocketService = new WebSocketService();
    }
    return WebSocketService._webSocketService;
  }

  
  public send(message: string){
    const url = ApiUrlUtil.buildQueryString( process.env.REACT_APP_API_URL + "/ws/sendMessageToAll.exclude");
    return axios.post(url,message, {
      headers: HeadersUtil.getHeadersAuth(),
    });
  }
  
  public connect(userName:any) {
    var ws: any = new SockJS(process.env.REACT_APP_WS_URL+'');
    var stompClient = Stomp.over(ws);
    stompClient.connect({ username: userName }, () => {
      stompClient.subscribe("/users/queue/messages",
        (msg: any) => {
          // get the message
          // console.log(JSON.parse(msg.body));
        },
        (err: any) => {
          // console.log(err);
        }
      );
    });

    // ws.close = () => {
    //   this.connect();
    // };
  } 
}
