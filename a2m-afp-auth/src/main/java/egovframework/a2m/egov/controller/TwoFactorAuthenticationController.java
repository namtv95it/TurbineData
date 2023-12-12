package egovframework.a2m.egov.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import egovframework.a2m.egov.constants.CommonConstants;
import egovframework.a2m.egov.model.response.UserResponse;
import egovframework.a2m.egov.service.UserService;
import egovframework.a2m.egov.service.common.CommonService;
import egovframework.a2m.egov.util.TOTPUtil;

/**
* 
* @author Nguyen Van Hau
* @since 2023. 2. 21.
* @version 1
*/

@RestController
@RequestMapping(value = "api/2fa")
public class TwoFactorAuthenticationController {

	@Autowired
	private CommonService commonService;
	@Autowired
	private UserService userService;

	@GetMapping(value = "generate-secret-key")
	public ResponseEntity<?> generateSecretKey() {
		Map<String, Object> rs = new HashMap<String, Object>();
		try {
			String secretKey = TOTPUtil.generateSecretKey();
			String userUid = commonService.getCurrentUserUid();
			userService.update2FAKey(secretKey, userUid);
			rs.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_OK);
			rs.put(CommonConstants.RESULT_KEY, secretKey);
		} catch (Exception e) {
			e.printStackTrace();
			rs.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_NG);
		}
		return ResponseEntity.ok(rs);
	}

	@GetMapping(value = "verify-otp")
	public ResponseEntity<?> verifyOTP(@RequestParam String otpCode, @RequestParam(required = false) Boolean twoFAEnable) {
		Map<String, Object> rs = new HashMap<String, Object>();
		try {
			String userUid = commonService.getCurrentUserUid();
			UserResponse currentUser = userService.getUserInfoByUserUid(userUid);
			if (otpCode.equals(TOTPUtil.getOTP(currentUser.getTwoFAKey()))) {
				if(twoFAEnable != null) {
					userService.update2FAKeyStatus(twoFAEnable, userUid);
				}				
				rs.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_OK);
			} else {
				rs.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_NG);
			}
		} catch (Exception e) {
			e.printStackTrace();
			rs.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_NG);
		}

		return ResponseEntity.ok(rs);
	}
}
