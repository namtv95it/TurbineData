package egovframework.com.a2m.egov.service.sys.impl;


import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.ByteArrayHttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;

import egovframework.com.a2m.egov.dao.sys.Sys0201DAO;
import egovframework.com.a2m.egov.model.UserModel;
import egovframework.com.a2m.egov.model.request.ChangePasswordRequest;
import egovframework.com.a2m.egov.service.common.CommonService;
import egovframework.com.a2m.egov.service.sys.Sys0301Service;
import egovframework.com.a2m.egov.util.ApiUrlUtil;
import egovframework.com.a2m.egov.util.HeadersUtil;
import kr.a2mvn.largefileupload.common.CastUtil;

/**
 * @author KetHX
 * @created 2/22/2023
 */
@Service
public class Sys0301ServiceImpl extends EgovAbstractServiceImpl implements Sys0301Service {

	@Autowired
	CommonService commonService;
	
	@Autowired
	Sys0201DAO sys0201DAO;
	
	@Value("${auth.api.url}")
	private String authApiUrl;
	
	@Autowired
	private RestTemplate rest;

	
	@Override
	public Map<Object, Object> search(Map<String, Object> params) throws Exception {
		
		HttpHeaders headers = HeadersUtil.setHeaders();
		HttpEntity<?> entity = new HttpEntity<>(headers);
		String url = ApiUrlUtil.buildApiUrl(authApiUrl + "/api/user/search", params);
		ResponseEntity<Map> responseEntity = rest.exchange(url, HttpMethod.GET, entity, Map.class);
		return responseEntity.getBody();
	}
	
	@Override
	public Map<Object, Object> findByUserUid(String userUid) throws Exception {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("userUid", userUid);
		
		HttpHeaders headers = HeadersUtil.setHeaders();
		HttpEntity<?> entity = new HttpEntity<>(headers);
		String url = ApiUrlUtil.buildApiUrl(authApiUrl + "/api/user/getUserInfoByUserUid", params);
		ResponseEntity<Map> responseEntity = rest.exchange(url, HttpMethod.GET, entity, Map.class);
		return responseEntity.getBody();
	}
	
	@Override
	public Map<Object, Object> generateSecretKey() throws Exception {
		Map<String, Object> params = new HashMap<String, Object>();
		
		HttpHeaders headers = HeadersUtil.setHeaders();
		HttpEntity<?> entity = new HttpEntity<>(headers);
		String url = ApiUrlUtil.buildApiUrl(authApiUrl + "/api/2fa/generate-secret-key", params);
		ResponseEntity<Map> responseEntity = rest.exchange(url, HttpMethod.GET, entity, Map.class);
		
		return responseEntity.getBody();
	}
	
	@Override
	public Map<Object, Object> changePassword(ChangePasswordRequest changePasswordRequest) throws Exception {
		Map<String, Object> params = new HashMap<String, Object>();
		
		HttpHeaders headers = HeadersUtil.setHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		
		HttpEntity<?> entity = new HttpEntity<>(changePasswordRequest, headers);
		
		String url = ApiUrlUtil.buildApiUrl(authApiUrl + "/api/user/change-password", params);
		ResponseEntity<Map> responseEntity = rest.exchange(url, HttpMethod.POST, entity, Map.class);
		
		return responseEntity.getBody();
	}
	
	@Override
	public Map<Object, Object> verifyOTP(Map<String, Object> params) throws Exception {
		
		HttpHeaders headers = HeadersUtil.setHeaders();
		HttpEntity<?> entity = new HttpEntity<>(headers);
		String url = ApiUrlUtil.buildApiUrl(authApiUrl + "/api/2fa/verify-otp", params);
		ResponseEntity<Map> responseEntity = rest.exchange(url, HttpMethod.GET, entity, Map.class);
		return responseEntity.getBody();
	}
	
	@Override
	public Map<Object, Object> changeAvatar(MultipartFile file) throws Exception {
		HttpHeaders headers = HeadersUtil.setHeaders();

		//add file
	    LinkedMultiValueMap<String, Object> params = new LinkedMultiValueMap<>();
	    
	    if (!file.isEmpty()) {
	    	params.add("images", new MultipartInputStreamFileResource(file.getInputStream(), file.getOriginalFilename()));
        }
	    headers.setContentType(MediaType.MULTIPART_FORM_DATA);

	    HttpEntity<LinkedMultiValueMap<String, Object>> requestEntity =
	            new HttpEntity<>(params, headers);

	    ResponseEntity<Map> responseEntity = rest.exchange(
	    		authApiUrl + "/api/user/change-avatar",
	            HttpMethod.POST,
	            requestEntity,
	            Map.class);
		return responseEntity.getBody();
	}
	
	class MultipartInputStreamFileResource extends InputStreamResource {

	    private final String filename;

	    MultipartInputStreamFileResource(InputStream inputStream, String filename) {
	        super(inputStream);
	        this.filename = filename;
	    }

	    @Override
	    public String getFilename() {
	        return this.filename;
	    }

	    @Override
	    public long contentLength() throws IOException {
	        return -1; // we do not want to generally read the whole stream into memory ...
	    }
	}
	
	@Override
	public Map<Object, Object> sendOTPEmail(String newEmail) throws Exception {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("newEmail", newEmail);
		
		HttpHeaders headers = HeadersUtil.setHeaders();
		HttpEntity<?> entity = new HttpEntity<>(headers);
		String url = ApiUrlUtil.buildApiUrl(authApiUrl + "/api/user/send-otp-email", params);
		ResponseEntity<Map> responseEntity = rest.exchange(url, HttpMethod.GET, entity, Map.class);
		return responseEntity.getBody();
	}
	
//	@Override
//	public Map<Object, Object> updateEmail(String newEmail) throws Exception {
//		Map<String, Object> params = new HashMap<String, Object>();
//		params.put("newEmail", newEmail);
//		
//		HttpHeaders headers = HeadersUtil.setHeaders();
//		HttpEntity<?> entity = new HttpEntity<>(headers);
//		String url = ApiUrlUtil.buildApiUrl(authApiUrl + "/api/user/update-email", params);
//		ResponseEntity<Map> responseEntity = rest.exchange(url, HttpMethod.GET, entity, Map.class);
//		return responseEntity.getBody();
//	}
	
	@Override
	public Map<Object, Object> verifyOTPEmail(String otpCode, String newEmail) throws Exception {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("otpCode", otpCode);
		params.put("newEmail", newEmail);
		
		HttpHeaders headers = HeadersUtil.setHeaders();
		HttpEntity<?> entity = new HttpEntity<>(headers);
		String url = ApiUrlUtil.buildApiUrl(authApiUrl + "/api/user/verify-otp-email", params);
		ResponseEntity<Map> responseEntity = rest.exchange(url, HttpMethod.GET, entity, Map.class);
		return responseEntity.getBody();
	}
	
	@Override
	public Boolean verifyPassword(String oldPassword) throws Exception {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("oldPassword", oldPassword);
		
		HttpHeaders headers = HeadersUtil.setHeaders();
		HttpEntity<?> entity = new HttpEntity<>(headers);
		String url = ApiUrlUtil.buildApiUrl(authApiUrl + "/api/user/verify-password", params);
		ResponseEntity<Map> responseEntity = rest.exchange(url, HttpMethod.GET, entity, Map.class);
		
		Map<Object, Object> body = responseEntity.getBody();
		if( CastUtil.castToString(body.get("status") ).equals("OK") ) {
			return true;
		}else {
			return false;
		}
		
	}
	
	@Override
	public void save(UserModel userModel) throws Exception {
		HttpHeaders headers = HeadersUtil.setHeaders();
		HttpEntity<UserModel> user = new HttpEntity<>(userModel, headers);

		ResponseEntity<UserModel> responseEntity = rest.postForEntity(authApiUrl + "/api/user/save-user", user, UserModel.class);
	}
	
	@Override
	public void update(UserModel userModel) throws Exception {
		HttpHeaders headers = HeadersUtil.setHeaders();
		HttpEntity<UserModel> user = new HttpEntity<>(userModel, headers);

		ResponseEntity<UserModel> responseEntity = rest.postForEntity(authApiUrl + "/api/user/update", user, UserModel.class);
	}
	
	@Override
	public void deleteUser(String userUid) throws Exception{
		
		sys0201DAO.deleteUserRole(userUid);
		HttpHeaders headers = HeadersUtil.setHeaders();
		HttpEntity<?> entity = new HttpEntity<>(headers);
		ResponseEntity<Void> responseEntity = rest.exchange(authApiUrl + "/api/user/{userUid}/delete", HttpMethod.DELETE, entity, Void.class, userUid);
		
	}
	
	@Override
	public Map<Object,Object> exists(String userId, String email) throws Exception{
		
		Boolean existsByUserId =  commonService.existsByUserId(userId);
		Boolean existsByEmail = commonService.existsByEmail(email);
		
		Map result = new HashMap();
		result.put("existsByUserId", existsByUserId);
		result.put("existsByEmail", existsByEmail);
		return result;
		
	}

	@Override
	public byte[] viewAvatar() throws Exception {
		HttpHeaders headers = HeadersUtil.setHeaders();
		 rest.getMessageConverters().add(new ByteArrayHttpMessageConverter());
		 
		 ResponseEntity<byte[]> response = rest.exchange(authApiUrl + "/api/user/view-avatar", 
		 HttpMethod.GET, new HttpEntity<>((headers)), byte[].class);
		 return response.getBody();
	}
	
}