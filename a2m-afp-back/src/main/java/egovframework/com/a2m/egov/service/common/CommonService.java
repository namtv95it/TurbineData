/**
 * 
 */
package egovframework.com.a2m.egov.service.common;

import java.security.PublicKey;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import egovframework.com.a2m.egov.constants.CommonConstants;
import egovframework.com.a2m.egov.dao.common.UserInfoDAO;
import egovframework.com.a2m.egov.util.RSAUtil;
import org.apache.commons.lang3.StringUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import egovframework.com.a2m.egov.model.TsstRole;
import egovframework.com.a2m.egov.model.response.AjaxResult;
import egovframework.com.a2m.egov.model.response.UserResponse;
import egovframework.com.a2m.egov.util.HeadersUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

/**
 * @author tiennd
 *
 * @created Feb 27, 2023
 */

@Service
public class CommonService {

	@Value("${auth.api.url}")
	private String authApiUrl;

	@Autowired
	private RestTemplate rest;
	
	@Autowired
	private UserInfoDAO userInfoDao;

	// get user info current
	public UserResponse getCurrentUserInfo() {
		HttpHeaders headers = HeadersUtil.setHeaders();
		HttpEntity<?> entity = new HttpEntity<>(headers);
		ResponseEntity<UserResponse> responseEntity = rest.exchange(authApiUrl + "/api/user/getUserInfoCheckToken",
				HttpMethod.GET, entity, UserResponse.class);
		return responseEntity.getBody();
	}

	// get user info by userUid
	public UserResponse getUserInfoByUserUid(String userUid) {

		HttpHeaders headers = HeadersUtil.setHeaders();
		HttpEntity<?> entity = new HttpEntity<>(headers);
		ResponseEntity<UserResponse> responseEntity = rest.exchange(
				authApiUrl + "/api/user/getUserInfoByUserUid?userUid={userUid}", HttpMethod.GET, entity,
				UserResponse.class, userUid);
		System.out.println(responseEntity);
		return responseEntity.getBody();
	}

	// get user info by userId
	public UserResponse getUserInfoByUserId(String userId) {

		HttpHeaders headers = HeadersUtil.setHeaders();
		HttpEntity<?> entity = new HttpEntity<>(headers);
		ResponseEntity<UserResponse> responseEntity = rest.exchange(
				authApiUrl + "/api/user/getUserInfoByUserId?userId={userId}", HttpMethod.GET, entity,
				UserResponse.class, userId);

		return responseEntity.getBody();
	}

	// check userid
	public Boolean existsByUserId(String userId) {

		HttpHeaders headers = HeadersUtil.setHeaders();
		HttpEntity<?> entity = new HttpEntity<>(headers);
		ResponseEntity<Boolean> responseEntity = rest.exchange(authApiUrl + "/api/user/existsByUserId?userId={userId}",
				HttpMethod.GET, entity, Boolean.class, userId);

		return responseEntity.getBody();
	}

	// check email
	public Boolean existsByEmail(String email) {

		HttpHeaders headers = HeadersUtil.setHeaders();
		HttpEntity<?> entity = new HttpEntity<>(headers);
		ResponseEntity<Boolean> responseEntity = rest.exchange(authApiUrl + "/api/user/existsByEmail?email={email}",
				HttpMethod.GET, entity, Boolean.class, email);

		return responseEntity.getBody();
	}

	public String getUserUid() throws Exception {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
				.getRequest();

		String accessToken = parseJwt(request);
		String publicKey = RSAUtil.getPublicKey();
		Claims claims = getClaimsFromTokenAndPublicKey(accessToken, publicKey);
		String userUid = claims.getSubject();
		if (StringUtils.isBlank(userUid)) {
			throw new Exception("USER_UID is null!");
		}
		return userUid;
	}

	public String getAuthProviderOfCurrentUser() throws Exception {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
				.getRequest();

		String accessToken = parseJwt(request);
		String publicKey = RSAUtil.getPublicKey();
		Claims claims = getClaimsFromTokenAndPublicKey(accessToken, publicKey);
		String authProvider = (String) claims.get("authProvider");
		return authProvider;
	}

	public String getUserId() throws Exception {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
				.getRequest();
		String accessToken = parseJwt(request);
		String publicKey = RSAUtil.getPublicKey();
		Claims claims = getClaimsFromTokenAndPublicKey(accessToken, publicKey);
		String authProvider = (String) claims.get("userId");
		return authProvider;
	}

	private Claims getClaimsFromTokenAndPublicKey(String token, String publicKey) throws Exception {
		PublicKey key = RSAUtil.decodePublicKey(publicKey);
		return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
	}

	private String parseJwt(HttpServletRequest request) {
		String headerAuth = request.getHeader(CommonConstants.HEADER_STRING);
		if (org.springframework.util.StringUtils.hasText(headerAuth)
				&& headerAuth.startsWith(CommonConstants.TOKEN_PREFIX)) {
			return headerAuth.substring(7, headerAuth.length());
		}
		return null;
	}

	// get user info by list userUid
	public List<Map> getListUserInfoByUserUid(List<String> listUserUid) {
		HttpHeaders headers = HeadersUtil.setHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		JSONObject request = new JSONObject();
		request.put("userUids", listUserUid);

		HttpEntity<?> entity = new HttpEntity<>(request.toString(), headers);
		ResponseEntity<AjaxResult> responseEntity = rest.exchange(
				authApiUrl + "/api/user/getListUserInfoByUserUid", HttpMethod.POST, entity,
				AjaxResult.class);
		
		AjaxResult ajaxResult = responseEntity.getBody();
		
		return (List<Map>) ajaxResult.getResponseData();
	}
	
	public List<TsstRole> getListRoleByUserUid(String userUid) {
		List<TsstRole> roles = new ArrayList<>();
		roles = userInfoDao.getListRoleByUserUid(userUid);
		return roles;
	}
	
	public String getUserRoles(String userUid) {
		String roles = "";
		roles = userInfoDao.getUserRoles(userUid);
		return roles;
	}
	
	public byte[] getImageByName(String fileName) {
		HttpHeaders headers = HeadersUtil.setHeaders();
		HttpEntity<?> entity = new HttpEntity<>(headers);
		ResponseEntity<byte[]> responseEntity = rest.exchange(authApiUrl + "/api/user/getImageByName?fileName={fileName}",
				HttpMethod.GET, entity, byte[].class, fileName);
		return responseEntity.getBody();
	}

	public ResponseEntity<?> deleteAvatar(){
		HttpHeaders headers = HeadersUtil.setHeaders();
		HttpEntity<?> entity = new HttpEntity<>(headers);
		ResponseEntity<?> responseEntity = rest.exchange(authApiUrl + "/api/user/delete-avatar",
				HttpMethod.DELETE, entity, AjaxResult.class);
		return responseEntity;
	}

}
