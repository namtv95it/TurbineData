package egovframework.a2m.egov.sec.jwt;

import egovframework.a2m.egov.constants.CommonConstants;
import egovframework.a2m.egov.sec.UserDetailsImpl;
import egovframework.a2m.egov.sec.UserPrincipal;
import egovframework.a2m.egov.util.RSAUtil;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * @author Nguyen Trung Anh
 * @created 4/6/2023
 */
@Component
@SuppressWarnings("deprecation")
public class JwtRsaUtils {

    private static final Logger logger = LoggerFactory.getLogger(JwtRsaUtils.class);

    @Value("${spring.security.jwt.expirationMs}")
    public int jwtExpirationMs;

    public String getUserNameFromJwtToken(String token, String publicKey) throws Exception {
        return getClaimsFromToken(token, publicKey).getSubject();
    }

    public boolean validateJwtToken(String authToken, String publicKey) {
        try {
            Claims claims = getClaimsFromToken(authToken, publicKey);
//			Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
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
            logger.error("Jwt Rsa error", e.getMessage());
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

    public String generateJwtByPrivateKey(Authentication authentication) {
        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();
        Map<String, Object> claims = new HashMap<String, Object>();
        claims.put("authProvider", userPrincipal.getUser().getAuthProvider());
        String privateKeys = null;
        try {
            privateKeys = RSAUtil.getPrivateKey();
            PrivateKey privateKey = RSAUtil.decodePrivateKey(privateKeys);
            return Jwts.builder()
                    .setClaims(claims)
                    .setSubject(userPrincipal.getUser().getUserUid())
                    .setIssuedAt(new Date())
                    .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                    .signWith(SignatureAlgorithm.RS256,privateKey)
                    .compact();
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }


    }

    public String generateJwtOAuth2ByPrivateKey(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Map<String, Object> claims = new HashMap<String, Object>();
        claims.put("authProvider", userPrincipal.getAuthProvider());
        String privateKeys = null;
        try {
            privateKeys = RSAUtil.getPrivateKey();
            PrivateKey privateKey = RSAUtil.decodePrivateKey(privateKeys);
            return Jwts.builder()
                    .setClaims(claims)
                    .setSubject(userPrincipal.getUserUid())
                    .setIssuedAt(new Date())
                    .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                    .signWith(SignatureAlgorithm.RS256, privateKey)
                    .compact();
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
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
