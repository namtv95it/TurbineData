package egovframework.a2m.egov.service;

import java.io.File;
import java.nio.file.Path;
import java.sql.SQLException;
import java.time.Instant;
import java.util.Base64;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import egovframework.a2m.egov.constants.CommonConstants;
import egovframework.a2m.egov.dao.UserDAO;
import egovframework.a2m.egov.dao.UserInfoDAO;
import egovframework.a2m.egov.exception.EmailAlreadyExistsException;
import egovframework.a2m.egov.exception.UsernameAlreadyExistsException;
import egovframework.a2m.egov.model.request.ChangePasswordRequest;
import egovframework.a2m.egov.model.request.SignUpRequest;
import egovframework.a2m.egov.model.request.UserRequest;
import egovframework.a2m.egov.model.response.UserResponse;
import egovframework.a2m.egov.sec.model.AuthProvider;
import egovframework.a2m.egov.service.common.ComSeqService;
import egovframework.a2m.egov.service.common.CommonService;
import egovframework.a2m.egov.service.common.MailService;
import egovframework.a2m.egov.util.CommonFileUtils;
import egovframework.a2m.egov.util.ResizeImage;
import egovframework.a2m.egov.util.TOTPUtil;

@Service
public class UserService extends EgovAbstractServiceImpl {
	@Resource(name = "userDAO")
	private UserDAO userDAO;
	@Autowired
	private UserInfoDAO userInfoDAO;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private ComSeqService comSeqService;
	@Autowired
	private CommonService commonService;
	@Autowired
	private MailService mailService;

	public UserResponse getUserInfoByUserId(String userId) {
		UserResponse userInfo = userDAO.getUserByUserId(userId);
		return userInfo;
	}

	public UserResponse getUserInfoByUserUid(String userUid) {
		return userDAO.getUserByUserUid(userUid);
	}

	public UserResponse getUserInfoByEmail(String email) {
		return userDAO.getUserByEmail(email);
	}

	public List<UserResponse> getAllUsers() throws SQLException {
		return userDAO.getAllUsers();
	}

	@Transactional(rollbackFor = Exception.class)
	public void saveUserFor3rd(SignUpRequest signUpRequest) throws SQLException {

		if (this.existsByUserId(signUpRequest.getUserId())) {
			throw new UsernameAlreadyExistsException(
					String.format("Username %s already exists", signUpRequest.getUserId()));
		}

		if (this.existsByEmail(signUpRequest.getEmail())) {
			throw new EmailAlreadyExistsException(String.format("Email %s already exists", signUpRequest.getEmail()));
		}

		String userUid = comSeqService.getSeq("SEQ_USER_UID");
		String hashPassword = passwordEncoder.encode(signUpRequest.getPwd());

		signUpRequest.setUserUid(userUid);
		signUpRequest.setHashPwd(hashPassword);
		signUpRequest.setTwoFAEnable(false);
		signUpRequest.setTwoFAKey(TOTPUtil.generateSecretKey());
		signUpRequest.setStatus(CommonConstants.AccountStatus.ACTIVED.getValue());
		signUpRequest.setCreatedDate(Instant.now());

		userInfoDAO.insertTsstUserInfo(signUpRequest);
		userDAO.insertTsstUser(signUpRequest);

	}

	@Transactional(rollbackFor = Exception.class)
	public void signUp(SignUpRequest signUpRequest) throws SQLException {

		if (this.existsByUserId(signUpRequest.getUserId())) {
			throw new UsernameAlreadyExistsException(
					String.format("Username %s already exists", signUpRequest.getUserId()));
		}

		if (this.existsByEmail(signUpRequest.getEmail())) {
			throw new EmailAlreadyExistsException(String.format("Email %s already exists", signUpRequest.getEmail()));
		}

		String userUid = comSeqService.getSeq("SEQ_USER_UID");
		String hashPassword = passwordEncoder.encode(signUpRequest.getPwd());

		signUpRequest.setUserUid(userUid);
		signUpRequest.setHashPwd(hashPassword);
		signUpRequest.setTwoFAEnable(false);
		signUpRequest.setTwoFAKey(TOTPUtil.generateSecretKey());
		signUpRequest.setStatus(CommonConstants.AccountStatus.NOT_ACTIVED.getValue());
		signUpRequest.setCreatedDate(Instant.now());
		signUpRequest.setEmailVerifyKey(TOTPUtil.generateSecretKey());
		signUpRequest.setAuthProvider(AuthProvider.LOCAL.toString());

		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.MONTH, 6);
		Date pwdExprDate = calendar.getTime();
		signUpRequest.setPwdExpr(pwdExprDate);

		userInfoDAO.insertTsstUserInfo(signUpRequest);
		userDAO.insertTsstUser(signUpRequest);

	}

	@Transactional(rollbackFor = Exception.class)
	public void saveUserRequest(UserRequest userRequest) throws Exception {

		String userUid = comSeqService.getSeq("SEQ_USER_UID");
		String hashPassword = passwordEncoder.encode(userRequest.getPassword());

		String UserBy = commonService.getCurrentUserUid();
		userRequest.setCreatedBy(UserBy);
		userRequest.setUserUid(userUid);
		userRequest.setPassword(hashPassword);
		userRequest.setTwoFAEnable(false);
		userRequest.setTwoFAKey(TOTPUtil.generateSecretKey());
		userRequest.setStatus(CommonConstants.AccountStatus.ACTIVED.getValue());
		userRequest.setEmailVerifyKey(TOTPUtil.generateSecretKey());
		userRequest.setAuthProvider(AuthProvider.LOCAL.toString());

		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.MONTH, 6);
		Date pwdExprDate = calendar.getTime();
		userRequest.setPwdExpr(pwdExprDate);

		userInfoDAO.insertUserInfo(userRequest);
		userDAO.insertUser(userRequest);

	}

	@Transactional(rollbackFor = Exception.class)
	public void updateUser(UserRequest userRequest) throws Exception {

		String currentUserUid = commonService.getCurrentUserUid();
		userRequest.setUpdatedBy(currentUserUid);
		userRequest.setUpdatedDate(new Date());

		BCryptPasswordEncoder b = new BCryptPasswordEncoder();
		if (userRequest.isChangePwd()) {
			// thanh nv
			userRequest.setNewPwd(userRequest.getMatchPassword());
			userRequest.setPassword(b.encode(userRequest.getNewPwd()));

			Calendar calendar = Calendar.getInstance();
			calendar.add(Calendar.MONTH, 6);
			Date pwdExprDate = calendar.getTime();
			userRequest.setPwdExpr(pwdExprDate);
		}

		userInfoDAO.updateUserInfo(userRequest);
		userDAO.updateUser(userRequest);

	}

	public boolean existsByUserId(String userId) {
		if (userDAO.countUserByUserId(userId) > 0) {
			return true;
		}
		return false;
	}

	public boolean existsByEmail(String email) {
		if (userDAO.countUserByEmail(email) > 0) {
			return true;
		}
		return false;
	}

	@Transactional(rollbackFor = Exception.class)
	public void deleteUser(String userUid) {
		UserResponse user = userDAO.getUserByUserUid(userUid);
		userDAO.deleteTsstUser(userUid);
		userInfoDAO.deleteTsstUserInfo(user.getUserInfoId());
	}

	public void changePassword(ChangePasswordRequest changePasswordRequest) throws Exception {
		UserResponse user = userDAO.getUserByUserUid(changePasswordRequest.getUserUid());

		Boolean trueOldPass = passwordEncoder.matches(changePasswordRequest.getOldPwd(), user.getPwd());

		if (!trueOldPass) {

			throw new RuntimeException("Change password failed, Old password is incorrect");

		}
		String currentUserUid = commonService.getCurrentUserUid();
		changePasswordRequest.setUpdatedDate(new Date());
		changePasswordRequest.setUpdatedBy(currentUserUid);
		changePasswordRequest.setHashPwd(passwordEncoder.encode(changePasswordRequest.getNewPwd()));

		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.MONTH, 6);
		Date pwdExprDate = calendar.getTime();
		changePasswordRequest.setPwdExpr(pwdExprDate);

		userDAO.changePassword(changePasswordRequest);
	}

	public UserResponse getUserInfoForCheckToken() throws Exception {
		String userUid = commonService.getCurrentUserUid();
		return userDAO.getUserByUserUid(userUid);
	}

	public Map<Object, Object> search(Integer page, Integer limit, String fullName, String status, String columnName,
			String sortType) throws Exception {

		Map<Object, Object> params = new HashMap<>();

		params.put("fullName", "".equals(fullName) ? null : fullName);
		params.put("status", ("".equals(status) || "null".equals(status)) ? null : status);
		params.put("offset", page <= 0 ? 0 : (page - 1) * (limit <= 0 ? 10 : limit));
		params.put("limit", limit <= 0 ? 10 : limit);

		params.put("sortType", "".equals(sortType) ? null : sortType);
		params.put("columnName", ("".equals(columnName) || "null".equals(columnName)) ? null : columnName);

		List<UserResponse> list = userDAO.searchUser(params);
		int count = userDAO.count(params);

		Map<Object, Object> result = new HashMap<>();
		result.put("totalElement", count);
		result.put("value", list);
		return result;
	}

	public void updateStatusByEmail(String email, String status) {
		Map<String, Object> params = new HashMap<>();
		params.put("email", email);
		params.put("status", status);
		userDAO.updateStatusByEmail(params);
	}

	public void update2FAKey(String secretKey, String userUid) {
		Map<String, Object> params = new HashMap<>();
		params.put("userUid", userUid);
		params.put("secretKey", secretKey);
		userDAO.update2FAKey(params);
	}

	public void update2FAKeyStatus(Boolean status, String userUid) {
		Map<String, Object> params = new HashMap<>();
		params.put("userUid", userUid);
		params.put("status", status);
		userDAO.update2FAKeyStatus(params);
	}

	public void sendOTPEmail(String newEmail) throws Exception {
		String secretKey = TOTPUtil.generateSecretKey();
		String currentUserUid = commonService.getCurrentUserUid();
		Map<String, Object> params = new HashMap<>();
		params.put("emailVerifyKey", secretKey);
		params.put("userUid", currentUserUid);

		userDAO.updateEmailVerifyKey(params);

		mailService.sendVerificationCode(newEmail, secretKey);

	}

	public void updateEmail(String email) throws Exception {
		String currentUserUid = commonService.getCurrentUserUid();
		Map<String, Object> params = new HashMap<>();
		params.put("email", email);
		params.put("userUid", currentUserUid);
		userDAO.updateEmail(params);

	}

	public Boolean verifyOTPEmail(String OTPCode) throws Exception {
		String currentUserUid = commonService.getCurrentUserUid();
		UserResponse user = getUserInfoByUserUid(currentUserUid);
		return mailService.checkOtp(OTPCode, user.getEmailVerifyKey());
	}

	public Boolean verifyPassword(String oldPassword) throws Exception {
		String currentUserUid = commonService.getCurrentUserUid();
		UserResponse user = userDAO.getUserByUserUid(currentUserUid);

		return passwordEncoder.matches(oldPassword, user.getPwd());
	}

	public String changeAvatar(MultipartFile file) throws Exception {
		if (file == null)
			return "";
		this.deleteAvatarOld();

		String seq = UUID.randomUUID().toString();
		String fleNm = file.getOriginalFilename();
		String newFleNm = CommonFileUtils.replaceFileName(seq, fleNm);

		File fileSource = CommonFileUtils.save(newFleNm, file);

		// add by tiennd
		File target = new File(CommonFileUtils.getPathThumbUploaddir() + File.separator + newFleNm);
		ResizeImage.handle(fileSource.toPath(), target.toPath(), CommonConstants.WIDTH_IMG_THUMB, null);

		this.updateAvatarImgPath(newFleNm);

		byte[] img = file.getBytes();
		String encodeToString = img == null ? "" : Base64.getEncoder().encodeToString(img);

		return encodeToString;
	}

	public void updateAvatarImgPath(String newFleNm) throws Exception {
		String currentUserUid = commonService.getCurrentUserUid();
		Map<String, Object> params = new HashMap<>();
		params.put("imgPath", newFleNm);
		params.put("userUid", currentUserUid);
		userDAO.updateAvatarImgPath(params);
	}

	public void deleteAvatarOld() throws Exception {
		String currentUserUid = commonService.getCurrentUserUid();
		UserResponse user = userDAO.getUserByUserUid(currentUserUid);
		CommonFileUtils.deleteAvatar(user.getImgPath());
	}

	public void deleteAvatar() throws Exception {
		String currentUserUid = commonService.getCurrentUserUid();
		UserResponse user = userDAO.getUserByUserUid(currentUserUid);
		updateAvatarImgPath(null);
		CommonFileUtils.deleteAvatar(user.getImgPath());
	}

	public List<UserResponse> getListUserInfoByUserUid(Map<String, List<String>> userUid) {
		return userDAO.getListUserInfoByUserUid(userUid);
	}

}
