package egovframework.com.a2m.egov.service.sys;

import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import egovframework.com.a2m.egov.model.UserModel;
import egovframework.com.a2m.egov.model.request.ChangePasswordRequest;

/**
 * @author KetHX
 * @created 2/22/2023
 */
public interface Sys0301Service {

	Map<Object, Object> search(Map<String, Object> params) throws Exception;
	
	Map<Object, Object> findByUserUid(String userUid) throws Exception;
	
	Map<Object, Object> generateSecretKey() throws Exception;
	
	Map<Object, Object> verifyOTP(Map<String, Object> params) throws Exception;
	
	Map<Object, Object> changeAvatar(MultipartFile file) throws Exception;
	
	public byte[] viewAvatar() throws Exception;
	
	Map<Object, Object> changePassword(ChangePasswordRequest changePasswordRequest) throws Exception;
	
	Boolean verifyPassword(String oldPassword) throws Exception;
	
	Map<Object, Object> sendOTPEmail(String otpCode) throws Exception;
	
	//Map<Object, Object> updateEmail(String newEmail) throws Exception;
	
	Map<Object, Object> verifyOTPEmail(String otpCode, String newEmail) throws Exception;

	public void save(UserModel userModel) throws Exception;
	
	public void update(UserModel userModel) throws Exception;
	
	public void deleteUser(String userUid) throws Exception;
	
	public Map<Object, Object> exists(String userId, String email) throws Exception;

}