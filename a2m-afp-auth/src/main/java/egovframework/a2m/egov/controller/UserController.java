package egovframework.a2m.egov.controller;

import java.io.File;
import java.io.InputStream;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import egovframework.a2m.egov.constants.CommonConstants;
import egovframework.a2m.egov.model.request.ChangePasswordRequest;
import egovframework.a2m.egov.model.request.SignUpRequest;
import egovframework.a2m.egov.model.request.UserRequest;
import egovframework.a2m.egov.model.response.AjaxResult;
import egovframework.a2m.egov.model.response.UserResponse;
import egovframework.a2m.egov.service.UserService;
import egovframework.a2m.egov.service.common.CommonService;

/**
 * @author KetHX
 */
@RestController
@RequestMapping(value = "api/user")
public class UserController {
	@Autowired
	private UserService userService;

	@Autowired
	private CommonService commonService;

	@Value("${path.upload.dir}")
	private String pathUploadDir;

	@PostMapping("save")
	public ResponseEntity<?> saveUser(@RequestBody SignUpRequest user) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			userService.signUp(user);
			ajaxResult.setStatus(true);
			ajaxResult.setMessage("Save success");
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.setStatus(false);
			ajaxResult.setMessage("Save failed");
		}
		return ResponseEntity.ok(ajaxResult);
	}

	@PostMapping(value = "save-user", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> saveUserRequest(@RequestBody UserRequest userRequest) {
		try {
			userService.saveUserRequest(userRequest);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ResponseEntity.ok(userRequest);
	}

	@PostMapping(value = "update", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> update(@RequestBody UserRequest userRequest) {
		try {
			userService.updateUser(userRequest);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ResponseEntity.ok(userRequest);
	}

	@DeleteMapping(value = "{userUid}/delete")
	public ResponseEntity<?> deleteUser(@PathVariable String userUid) {
		try {
			userService.deleteUser(userUid);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ResponseEntity.ok(userUid);
	}

	@PostMapping(value = "change-password")
	public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			userService.changePassword(changePasswordRequest);
			ajaxResult.setStatus(true);
			ajaxResult.setMessage("Change password success");
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.setStatus(false);
			ajaxResult.setMessage(e.getMessage());
		}
		return ResponseEntity.ok(ajaxResult);
	}

	@GetMapping(value = "getUserInfoByUserUid")
	public ResponseEntity<?> getUserInfoByUserUid(@RequestParam String userUid) {
		UserResponse user = null;
		try {
			user = userService.getUserInfoByUserUid(userUid);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ResponseEntity.ok(user);
	}

	@GetMapping(value = "getUserInfoByUserId")
	public ResponseEntity<?> getUserInfoUserId(@RequestParam String userId) {
		UserResponse user = null;
		try {
			user = userService.getUserInfoByUserId(userId);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return ResponseEntity.ok(user);
	}

	@GetMapping(value = "getUserInfoByEmail")
	public ResponseEntity<?> getUserInfoByEmail(@RequestParam String email) {
		UserResponse user = null;
//		AjaxResult ajaxResult = new AjaxResult();
		try {
			user = userService.getUserInfoByEmail(email);
//			ajaxResult.setStatus(true);
//			ajaxResult.setResponseData(user);
		} catch (Exception e) {
			e.printStackTrace();
//			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(user);
	}

	@GetMapping(value = "getUserInfoCheckToken")
	public ResponseEntity<?> getUserInfoCheckToken() {
		UserResponse user = null;
		try {
			user = userService.getUserInfoForCheckToken();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ResponseEntity.ok(user);
	}

	@GetMapping(value = "search")
	public ResponseEntity<?> search(@RequestParam Integer page, @RequestParam Integer limit,
			@RequestParam String fullName, @RequestParam String status, @RequestParam String columnName,
			@RequestParam String sortType) {
		Map<Object, Object> map = null;
		try {
			map = userService.search(page, limit, fullName, status, columnName, sortType);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ResponseEntity.ok(map);
	}

	@GetMapping(value = "existsByUserId")
	public ResponseEntity<?> existsByUserId(@RequestParam String userId) {
		Boolean map = false;
		try {
			map = userService.existsByUserId(userId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ResponseEntity.ok(map);
	}

	@GetMapping(value = "existsByEmail")
	public ResponseEntity<?> existsByEmail(String email) {
		Boolean checkEmail = false;
		try {
			checkEmail = userService.existsByEmail(email);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ResponseEntity.ok(checkEmail);
	}

	@GetMapping(value = "send-otp-email")
	public ResponseEntity<?> sendOTPEmail(@RequestParam String newEmail) {
		Map<String, Object> result = new HashMap<>();
		try {
			userService.sendOTPEmail(newEmail);
			result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_OK);
		} catch (Exception e) {
			e.printStackTrace();
			result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_NG);
		}

		return ResponseEntity.ok(result);
	}

	@GetMapping(value = "verify-otp-email")
	public ResponseEntity<?> verifyOTPEmail(@RequestParam String otpCode,
			@RequestParam(required = false) String newEmail) {
		Map<String, Object> result = new HashMap<>();
		try {
			if (userService.verifyOTPEmail(otpCode)) {
				result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_OK);
				if (newEmail != null) {
					userService.updateEmail(newEmail);
				}
			} else {
				result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_NG);
			}
		} catch (Exception e) {
			e.printStackTrace();
			result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_NG);
		}
		return ResponseEntity.ok(result);
	}

	@GetMapping(value = "verify-password")
	public ResponseEntity<?> verifyPassword(@RequestParam String oldPassword) {
		Map<String, Object> result = new HashMap<>();
		try {
			if (userService.verifyPassword(oldPassword)) {
				result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_OK);
			} else {
				result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_NG);
			}
		} catch (Exception e) {
			e.printStackTrace();
			result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_NG);
		}
		return ResponseEntity.ok(result);
	}

	@PostMapping(value = "/change-avatar", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	@ResponseBody
	public ResponseEntity<?> changeAvatar(MultipartHttpServletRequest multiRequest) throws Exception {
		Map<String, Object> result = new HashMap<>();

		Map<String, MultipartFile> files = multiRequest.getFileMap();
		List<MultipartFile> list = new ArrayList<MultipartFile>(files.values());

		try {
			String base64 = userService.changeAvatar(list.get(0));
			if (!base64.equals("")) {
				result.put(CommonConstants.RESULT_KEY, base64);
				result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_OK);
			} else {
				result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_NG);
			}
		} catch (Exception e) {
			e.printStackTrace();
			result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_NG);
		}
		return ResponseEntity.ok(result);
	}

	@GetMapping("/view-avatar")
	public void viewAvatar(HttpServletResponse response) throws Exception {
		String currentUserUid = commonService.getCurrentUserUid();
		UserResponse userInfo = userService.getUserInfoByUserUid(currentUserUid);

		File file = new File(pathUploadDir + userInfo.getImgPath());
		if (file.exists()) {
			try (InputStream in = FileUtils.openInputStream(file)) {
				response.setContentType(Files.probeContentType(file.toPath()));
				response.getOutputStream().write(IOUtils.toByteArray(in));
				response.flushBuffer();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	@PostMapping("getListUserInfoByUserUid")
	public ResponseEntity<AjaxResult> getListUserInfoByUserUid(@RequestBody Map<String, List<String>> userUids) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			List<UserResponse> uList = new ArrayList<>();
			uList = userService.getListUserInfoByUserUid(userUids);
			ajaxResult.setResponseData(uList);
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setMessage("Get list fail !!!");
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}

	@DeleteMapping("delete-avatar")
	public ResponseEntity<?> deleteAvatar(){
		AjaxResult ajaxResult = new AjaxResult();
		try{
			userService.deleteAvatar();
			ajaxResult.setStatus(true);
		}catch (Exception e){
			e.printStackTrace();
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}
}
