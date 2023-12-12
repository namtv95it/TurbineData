package egovframework.com.a2m.egov.config.sec.jwt;

import egovframework.com.a2m.egov.constants.CommonConstants;
import egovframework.com.a2m.egov.util.RSAUtil;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.security.PublicKey;

/**
 * @author Nguyen Trung Anh
 * @created 4/6/2023
 */
@SuppressWarnings({ "deprecation" })
@Component
public class JwtRsaUtils {

	private static final Logger logger = LoggerFactory.getLogger(JwtRsaUtils.class);

	public String getUserNameFromJwtToken(String token, String publicKey) throws Exception {
		return getClaimsFromToken(token, publicKey).getSubject();
	}

	public boolean validateJwtToken(String authToken, String publicKey) {
		try {
			getClaimsFromToken(authToken, publicKey);
			return true;
		} catch (SignatureException e) {
			logger.error("Invalid JWT signature: {}", e.getMessage());
		} catch (MalformedJwtException e) {
			logger.error("Invalid JWT token: {}", e.getMessage());
		} catch (ExpiredJwtException e) {
			logger.error("JWT token is expired: {}", e.getMessage());
		} catch (UnsupportedJwtException e) {
			logger.error("JWT token is unsupported: {}", e.getMessage());
		} catch (IllegalArgumentException e) {
			logger.error("JWT claims string is empty: {}", e.getMessage());
		} catch (Exception e) {
			logger.error("error", e.getMessage());
		}
		return false;
	}

	public String parseJwtRsa(HttpServletRequest request) {
		String headerAuth = request.getHeader(CommonConstants.HEADER_STRING);

		if (StringUtils.hasText(headerAuth) && headerAuth.startsWith(CommonConstants.TOKEN_PREFIX)) {
			return headerAuth.substring(7, headerAuth.length());
		}
		return null;
	}

	public Claims getClaimsFromToken(String token, String publicKey) throws Exception {
		PublicKey key = RSAUtil.decodePublicKey(publicKey);
		return Jwts.parserBuilder()
				.setSigningKey(key)
				.build()
				.parseClaimsJws(token)
				.getBody();
	}
}
