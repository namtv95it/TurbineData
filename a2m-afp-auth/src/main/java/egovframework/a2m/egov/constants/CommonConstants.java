package egovframework.a2m.egov.constants;

public class CommonConstants {

	public static final String RESULT_OK = "OK";
	public static final String RESULT_WN = "WN";
	public static final String RESULT_NG = "NG";
	public static final String RESULT_OTP_2FA = "OTP_2FA";
	public static final String RESULT_OTP_EMAIL = "OTP_EMAIL";

	public static final String MESSAGES_KEY = "messages";
	public static final String STATUS_KEY = "status";
	public static final String RESULT_KEY = "result";
	public static final String LIST_KEY = "list";
	public static final String DETAIL_KEY = "detail";
	public static final String COUNT_ITEMS_KEY = "totalItems";
	public static final String KEY = "key";

	public static final String LOGOUT_PRE_ACTION = "logout";

	public static final String USE_Y = "Y";
	public static final String USE_N = "N";

	public static final String HEADER_STRING = "Authorization";

	public static final String PUBLIC_KEY_PREFIX = "PublicKey";

	public static final String TOKEN_PREFIX = "Bearer ";

	public static final int WIDTH_IMG_THUMB = 96;

	public enum State {
		UPDATE("U"), DELETE("D"), CREATE("C");

		private String value;

		State(String id) {
			this.value = id;
		}

		public String getValue() {
			return value;
		}
	}

	public enum AccountStatus {
		LOCKED("02-01"), DISABLED("02-02"), ACTIVED("02-03"), NOT_ACTIVED("02-04");

		private String value;

		private AccountStatus(String value) {
			this.value = value;
		}

		public String getValue() {
			return value;
		}

	}

}
