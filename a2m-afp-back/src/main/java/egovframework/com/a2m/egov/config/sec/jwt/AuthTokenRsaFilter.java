package egovframework.com.a2m.egov.config.sec.jwt;

import egovframework.com.a2m.egov.config.sec.UserDetailsServiceImpl;
import egovframework.com.a2m.egov.constants.RoleConstants;
import egovframework.com.a2m.egov.model.request.TsstUserRoleRequest;
import egovframework.com.a2m.egov.util.RSAUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.SignatureException;

/**
 * @author Nguyen Trung Anh
 * @created 4/6/2023
 */

@Component
public class AuthTokenRsaFilter extends OncePerRequestFilter {
    private static final Logger logger = LoggerFactory.getLogger(AuthTokenRsaFilter.class);
    @Autowired
    private JwtRsaUtils jwtRsaUtils;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String jwt = jwtRsaUtils.parseJwtRsa(request);
            String publicKey = RSAUtil.getPublicKey();
            if (jwt != null && validateJwtToken(jwt, publicKey)) {
                setAuthenticationContext(jwt, publicKey, request);
            }
            else {
                filterChain.doFilter(request, response);
                return;
            }
        } catch (Exception e) {
            logger.error("Cannot set user authentication: {}", e);
        }

        filterChain.doFilter(request, response);
    }

    private void setAuthenticationContext(String token, String publicKey, HttpServletRequest request) throws Exception {
        UserDetails userDetails = getUserDetails(token, publicKey);

        UsernamePasswordAuthenticationToken
                authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

        authentication.setDetails(
                new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    private UserDetails getUserDetails(String token, String publicKey) throws Exception {

        Claims claims = jwtRsaUtils.getClaimsFromToken(token, publicKey);
        String userUid = claims.getSubject();

        if (!userDetailsService.checkUserRoleAlreadyExists(userUid)) {
            TsstUserRoleRequest userRoleRequest = new TsstUserRoleRequest();
            userRoleRequest.setRoleId(RoleConstants.DEFAULT_ROLE_3RD_PARTY.getValue());
            userRoleRequest.setUserUid(userUid);
            userDetailsService.saveTsstUserRole(userRoleRequest);
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(userUid);
        return userDetails;
    }



    private boolean validateJwtToken(String authToken, String publicKey) {
        try {
            jwtRsaUtils.getClaimsFromToken(authToken, publicKey);
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
}
