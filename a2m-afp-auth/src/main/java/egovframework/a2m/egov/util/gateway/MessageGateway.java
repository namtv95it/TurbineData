package egovframework.a2m.egov.util.gateway;


public interface MessageGateway {
	public static int SUCCESS_CODE = 0;
	public static int FAIL_CODE = 1;
	// ....... define your code here
	
	// send message to destination
	/**
	 * 
	 * @param destination email/phone number/kakao id of receiver
	 * @param content message content
	 * @param retryTimes number of retry times in case of error, retry send again
	 * @return result code
	 */
	public int sendMessage(String destination, String content, int retryTimes);
}
