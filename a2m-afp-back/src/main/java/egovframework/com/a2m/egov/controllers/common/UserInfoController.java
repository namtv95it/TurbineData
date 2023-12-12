package egovframework.com.a2m.egov.controllers.common;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import egovframework.com.a2m.egov.model.UserModel;
import egovframework.com.a2m.egov.model.request.ChangePasswordRequest;
import egovframework.com.a2m.egov.model.response.UserResponse;
import egovframework.com.a2m.egov.service.common.CommonService;
import egovframework.com.a2m.egov.service.common.UserInfoService;
import egovframework.com.a2m.egov.service.sys.Sys0301Service;
import egovframework.com.cmm.annotation.MenuPermission;
import egovframework.com.cmm.annotation.MenuPermissionType;
import egovframework.com.cmm.util.AjaxResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import springfox.documentation.annotations.ApiIgnore;

/**
 * @author ThanhNV
 * @created 3/29/2023
 */
@RestController
@RequestMapping("api/tsst-userInfo")
@Api(tags = { "Get User Info" })
@ApiIgnore
public class UserInfoController {

	@Autowired
	UserInfoService userInfoService;

	@Autowired
	private CommonService commonService;

	@Autowired
	Sys0301Service sys0301Service;

	@Value("${auth.api.url}")
	private String authServer;

	@ApiOperation(value = "Update user", response = UserModel.class)
	@ApiResponses(value = { @ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Service not found"),
			@ApiResponse(code = 200, message = "Update user successfully") })
	@MenuPermission(permissions = { MenuPermissionType.MODIFY })
	@PutMapping("/update.exclude")
	public ResponseEntity<?> update(
			@ApiParam(value = "User model to update", required = true) @RequestBody UserModel userModel) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			userModel.setImgPath("");
			sys0301Service.update(userModel);
			ajaxResult.setMessage("Update successful");
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setMessage("Update failed");
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}

	// KetHx
	@ApiIgnore
	@GetMapping(value = "/getUserInfo.exclude", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getUserInfo() {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			String userUid = commonService.getUserUid();
			UserResponse userInfo = commonService.getUserInfoByUserUid(userUid);

//			byte[] avatar = sys0301Service.viewAvatar();
//			String encodeToString = avatar==null? "" : Base64.getEncoder().encodeToString( avatar );
//			userInfo.setImgPathBase64(encodeToString);

			// edit by tiennd
			String imgPath = userInfo.getImgPath();
			if (imgPath != null && !imgPath.equals("")) {
				if (!(imgPath.startsWith("http://") || imgPath.startsWith("https://"))) {
					String imgUrl = authServer + "/api/public/getImageByName?useThumb=Y&fileName=" + imgPath;
					userInfo.setImgPathBase64(imgUrl);
				} else {
					userInfo.setImgPathBase64(imgPath);
				}
			}

			String roles = commonService.getUserRoles(userUid);
			userInfo.setRolesStr(roles);
			ajaxResult.setResponseData(userInfo);
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setMessage(e.getMessage());
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}

	// thanhnv
	@ApiOperation(value = "generate secret key", response = String.class)
	@ApiResponses(value = { @ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Service not found"),
			@ApiResponse(code = 200, message = "Generate secret key successfully") })
	@MenuPermission(permissions = { MenuPermissionType.READ })
	@GetMapping(value = "/generate-secret-key.exclude")
	public ResponseEntity<?> generateSecretKey() {

		AjaxResult ajaxResult = new AjaxResult();
		try {
			Map<Object, Object> map = sys0301Service.generateSecretKey();
			ajaxResult.setMessage("search successful");
			ajaxResult.setResponseData(map);
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setMessage("gen failed");
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}

	// thanhnv
	@ApiOperation(value = "verify-otp user")
	@ApiResponses(value = { @ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Service not found"),
			@ApiResponse(code = 200, message = "verify-otp pass") })
	@MenuPermission(permissions = { MenuPermissionType.READ })
	@GetMapping(value = "/verify-otp.exclude")
	public ResponseEntity<?> verifyOTP(
			@ApiParam(value = "key and status", required = true) @RequestParam Map<String, Object> params) {

		AjaxResult ajaxResult = new AjaxResult();
		try {
			Map<Object, Object> map = sys0301Service.verifyOTP(params);
			if (map.get("status").equals("NG")) {
				ajaxResult.setMessage("OTP expired");
				ajaxResult.setResponseData(map);
				ajaxResult.setStatus(false);
			} else {
				ajaxResult.setMessage("OTP valid");
				ajaxResult.setResponseData(map);
				ajaxResult.setStatus(true);
			}

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setMessage("verify-otp failed");
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}

	@ApiOperation(value = "change password user")
	@ApiResponses(value = { @ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Service not found"),
			@ApiResponse(code = 200, message = "change password user successfully") })
	@MenuPermission(permissions = { MenuPermissionType.WRITE })
	@PostMapping("/change-password.exclude")
	public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			Map<Object, Object> map = sys0301Service.changePassword(changePasswordRequest);
			if ((Boolean) map.get("status") == false) {
				ajaxResult.setMessage("Change password faild");
				ajaxResult.setResponseData(map);
				ajaxResult.setStatus(false);
			} else {
				ajaxResult.setMessage("Change password Successfully");
				ajaxResult.setResponseData(map);
				ajaxResult.setStatus(true);
			}
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}

	// thanh nv
	@ApiOperation(value = "verify password", response = Boolean.class)
	@ApiResponses(value = { @ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Service not found"),
			@ApiResponse(code = 200, message = "Verify password successfully") })
	@GetMapping(value = "/verify-password.exclude")
	public ResponseEntity<?> verifyPassword(@RequestParam String oldPassword) {

		AjaxResult ajaxResult = new AjaxResult();
		try {
			Boolean isTruePassword = sys0301Service.verifyPassword(oldPassword);
			ajaxResult.setResponseData(isTruePassword);
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}

	// thanh nv
	@ApiOperation(value = "send OTP to verify when change email", response = Map.class)
	@ApiResponses(value = { @ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Service not found"),
			@ApiResponse(code = 200, message = "Verify successfully") })
	@GetMapping(value = "/send-otp-email.exclude")
	public ResponseEntity<?> sendOTPEmail(@RequestParam String newEmail) {

		AjaxResult ajaxResult = new AjaxResult();
		try {
			Map<Object, Object> map = sys0301Service.sendOTPEmail(newEmail);
			ajaxResult.setResponseData(map);
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}

	// thanh nv
	@ApiOperation(value = "check invalid OTP email", response = Map.class)
	@ApiResponses(value = { @ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Service not found"),
			@ApiResponse(code = 200, message = "change email successfully") })
	@GetMapping(value = "/verify-otp-email.exclude")
	public ResponseEntity<?> verifyOTPEmail(@RequestParam String otpCode,
			@RequestParam(required = false) String newEmail) {

		AjaxResult ajaxResult = new AjaxResult();
		try {
			Map<Object, Object> map = sys0301Service.verifyOTPEmail(otpCode, newEmail);
			ajaxResult.setResponseData(map);
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}

	@PostMapping(value = "/change-avatar.exclude", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	@ResponseBody
	public ResponseEntity<?> changeAvatar(MultipartHttpServletRequest multiRequest) throws Exception {
		Map<String, MultipartFile> files = multiRequest.getFileMap();

		List<MultipartFile> list = new ArrayList<MultipartFile>(files.values());

		AjaxResult ajaxResult = new AjaxResult();
		try {
			Map<Object, Object> map = sys0301Service.changeAvatar(list.get(0));
			ajaxResult.setResponseData(map);
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}

	@GetMapping("/view-avatar.exclude")
	public void viewAvatar(HttpServletResponse response) throws Exception {

		try {
			// response.setContentType(Files.probeContentType(file.toPath()));
			response.getOutputStream().write(sys0301Service.viewAvatar());
			response.flushBuffer();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@GetMapping("/get-avatar-base64.exclude")
	public ResponseEntity<?> getAvatarBase64(HttpServletResponse response) throws Exception {

		AjaxResult ajaxResult = new AjaxResult();
		try {
			byte[] avatar = sys0301Service.viewAvatar();
			String encodeToString = avatar == null ? "" : Base64.getEncoder().encodeToString(avatar);

			ajaxResult.setResponseData(encodeToString);
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);

	}

//	@GetMapping("getImageByName.exclude")
//	public void getImageByName(@RequestParam String fileName, HttpServletResponse httpServletResponse) {
//		try {
//			byte[] bytes = commonService.getImageByName(fileName);
//			httpServletResponse.getOutputStream().write(bytes);
//		} catch (IOException e) {
//			
//		}
//	}
	@DeleteMapping("delete-avatar.exclude")
	public ResponseEntity<?> deleteAvatar(){
		AjaxResult ajaxResult = new AjaxResult();
		try{
			commonService.deleteAvatar();
			ajaxResult.setStatus(true);
		}catch (Exception e){
			e.printStackTrace();
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}

}
