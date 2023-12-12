package egovframework.a2m.egov.service.common;

import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;

import egovframework.a2m.egov.sec.jwt.JwtRsaUtils;
import egovframework.a2m.egov.util.RSAUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Service
public class CommonService {

	private static final String AUTHORIZATION = "authorization";

	@Value("${spring.security.jwt.secret}")
	private String jwtSecret;
	@Value("${spring.security.jwt.expirationMs}")
	private int jwtExpirationMs;

	@Autowired
	private JwtRsaUtils jwtRsaUtils;

	@Autowired
	private RestTemplate restTemplate;

	private String getUserIdFromToken(String token, String publicKey) throws Exception {
//		return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
		return jwtRsaUtils.getUserNameFromJwtToken(token, publicKey);
	}

	public String getCurrentUserUid() throws Exception {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
				.getRequest();

		String accessToken = jwtRsaUtils.parseJwtRsa(request);
		String publicKey = RSAUtil.getPublicKey();
		String userUid = getUserIdFromToken(accessToken, publicKey);
		if (StringUtils.isBlank(userUid)) {
			throw new Exception("USER_UID is null!");
		}
		return userUid;
	}

	private String getTokenFromRequest(HttpServletRequest request) {
		Enumeration<String> headers = request.getHeaders(AUTHORIZATION);
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
