package egovframework.com.a2m.egov.util;

import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpHeaders;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import egovframework.com.a2m.egov.constants.CommonConstants;

/**
* 
* @author Nguyen Van Hau
* @since 2023.3.31.
* @version 1
*/
public class HeadersUtil {
	
	public static HttpHeaders setHeaders(){
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
				.getRequest();
		String accessToken = getTokenFromRequest(request);
		HttpHeaders headers = new HttpHeaders();
		headers.setBearerAuth(accessToken);
		return headers;
	}
	
	public static String getTokenFromRequest(HttpServletRequest request) {
		Enumeration<String> headers = request.getHeaders(CommonConstants.HEADER_STRING);
		String headerValue = "";
		while (headers.hasMoreElements()) {
			headerValue = headers.nextElement();
		}
		if (headerValue != null && !"".equals(headerValue)) {
			String els[] = headerValue.split(" ");
			if (els.length > 1) {
				return els[1];
			}
		}
		return "";
	}

}
