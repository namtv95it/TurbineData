export class Constant {
  public static readonly PREFIX_URL = "/";
  public static readonly LANGUAGE = "lang";
  public static readonly ENGLISH = "en";
  public static readonly SOUTH_KOREA = "kr";
  public static readonly VIETNAME = "vn";

  public static readonly LOCKED = "02-01";
  public static readonly DISABLED = "02-02";
  public static readonly ACTIVED = "02-03";

  public static readonly CATEGORY = "04";
  public static readonly NUMBER_QA = 3;
  public static readonly FORMAT_DATE_EN = "YYYY-MM-DD";
  public static readonly START_PAGE = 1;
  public static readonly ROWS_OF_PAGE = 10;

  public static readonly LABEL_KR = "labelKr";
  public static readonly LABEL_EN = "label";

  public static readonly PRIME_FORMAT_DATE_EN = "dd-mm-yy";
  public static readonly PRIME_FORMAT_DATE_KR = "yy-mm-dd";
  public static readonly ACTIVE_STATUS = 'Active';
  public static readonly INACTIVE_STATUS = 'Inactive';
  public static readonly DISABLED_STATUS = 'Disabled';
  public static readonly LOCK_STATUS = 'Lock';

  public static readonly GET_METHOD = 'GET';
  public static readonly POST_METHOD = 'POST';
  public static readonly PUT_METHOD = 'PUT';
  public static readonly DELETE_METHOD = 'DELETE';

  public static readonly VAPID_KEY = "BFokkHJnVqsqDrYgkzVzP8SxZst5ZUBiFrrNzkxKmAn-Qo027tNEe2OKBWOU0iMtITegf7O7jgyArli6Z59IJgc"
  public static readonly FIREBASE_CONF = {
    apiKey: "AIzaSyDWyxxGiyS0fGcde6lh-KwNJxgP-2ExRZ4",
    authDomain: "egov-test-58837.firebaseapp.com",
    projectId: "egov-test-58837",
    storageBucket: "egov-test-58837.appspot.com",
    messagingSenderId: "263590623306",
    appId: "1:263590623306:web:ef41bb4c6cd840ec8a0eb3"
  };

  public static readonly PUBLIC_KEY = 'PublicKey';

  public static readonly PRO_TYPE = [
    'ALL', 'MYPROJECT', 'GENERAL', 'LIBRARY', 'BOOKMARKED'
  ];

  public static readonly ANN_VIEW_TYPE = [
    'LIST', 'POST', 'SINGLE'
  ];

  public static readonly THREADS_TYPE = [
    'ALL', 'GUIDE', 'CODE_CONVENTIONS', 'COMMON_LIBRARIES', 'COMPONENT_TEMPLATES', 'BOOKMARKED'
  ];

  public static readonly PROJECT_TYPE_STD = "05";

  public static readonly POST_TYPE = "09";
  public static readonly POST_TYPE_PROJECTS = "09-01";
  public static readonly POST_TYPE_DOCUMENTS = "09-02";
  public static readonly POST_TYPE_THREADS = "09-03";
  public static readonly POST_TYPE_ANNOUNCEMENTS = "09-04";

  public static readonly BOOKMARK_STATUS = {
    YES: "Y",
    NO: "N"
  }

  public static readonly LIB_NAME_COMPONENT_SAMP = "comm_compo";
  public static readonly LIB_OPTION_TYPE_CHECKBOX = "CHECKBOX";
  public static readonly LIB_OPTION_TYPE_RADIO = "RADIO_BUTTON";
  public static readonly LIB_OPTION_TYPE_MAUNALS = "MANUALS";

  public static readonly POSITION_TYPE_STD = "10";
  public static readonly DASHBOARD_TYPE = [
    'ALL', 'PROJECTS', 'DOCUMENTS', 'THREADS', 'ANNOUNCEMENTS', 'MOST_LIKE_THREADS'
  ];

  public static readonly DEPEND_STATUS_DEACTIVE = 2;

  public static readonly REQUEST_STATUS_REQUESTED = "11-01";
  public static readonly REQUEST_STATUS_APPROVED = "11-02";
  public static readonly REQUEST_STATUS_REJECTED = "11-03";

  public static readonly ADMIN_ROLE = "R000";
}