package egovframework.a2m.egov.sec.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import egovframework.a2m.egov.sec.jwt.JwtRsaUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import egovframework.a2m.egov.constants.CommonConstants;
import egovframework.a2m.egov.constants.SecurityConstants;
import egovframework.a2m.egov.exception.EmailAlreadyExistsException;
import egovframework.a2m.egov.exception.UsernameAlreadyExistsException;
import egovframework.a2m.egov.model.request.LoginRequest;
import egovframework.a2m.egov.model.request.SignUpRequest;
import egovframework.a2m.egov.model.request.VerifyOtpRequest;
import egovframework.a2m.egov.model.response.JwtResponse;
import egovframework.a2m.egov.model.response.UserResponse;
import egovframework.a2m.egov.sec.UserDetailsImpl;
import egovframework.a2m.egov.service.UserService;
import egovframework.a2m.egov.service.common.MailService;
import egovframework.a2m.egov.service.common.TwoFactorAuthService;
import egovframework.a2m.egov.util.CookieUtil;

/**
* 
* @author Nguyen Van Hau
* @since 2023. 2. 22.
* @version 1
*/

@RestController
@RequestMapping(value = "api/auth/")
public class AuthApiController {

	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private JwtRsaUtils jwtRsaUtil;
	@Autowired
	private UserService userService;
	@Autowired
	private TwoFactorAuthService twoFactorAuthService;
	@Autowired
	private MailService mailService;

	@PostMapping(value = "login")
	public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginReq, HttpServletRequest request,
			HttpServletResponse response) {

		Map<String, Object> result = new HashMap<>();
		try {
			Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(loginReq.getUsername(), loginReq.getPassword()));
			SecurityContextHolder.getContext().setAuthentication(authentication);
			String jwt = jwtRsaUtil.generateJwtByPrivateKey(authentication);
			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

			if (userDetails.getUser().getStatus().equals(CommonConstants.AccountStatus.NOT_ACTIVED.getValue())) {
				mailService.sendVerificationCode(userDetails.getUser().getEmail(), userDetails.getUser().getEmailVerifyKey());
				result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_OTP_EMAIL);
				result.put(CommonConstants.MESSAGES_KEY, "Two Factor Authentication");
			} else if (userDetails.getUser().isTwoFAEnable()) {
				result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_OTP_2FA);
				result.put(CommonConstants.MESSAGES_KEY, "Two Factor Authentication");
			} else {
				CookieUtil.addCookie(response, SecurityConstants.ACCESS_TOKEN_KEY, jwt);
				JwtResponse jwtRes = new JwtResponse();
				jwtRes.setAccessToken(jwt);

				result.put(CommonConstants.MESSAGES_KEY, "Login success");
				result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_OK);
				result.put(CommonConstants.RESULT_KEY, jwtRes);
			}
		} catch (Exception e) {
			e.printStackTrace();
			result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_NG);
			result.put(CommonConstants.MESSAGES_KEY, "The username or password is wrong");
		}
		return ResponseEntity.ok(result);
	}

	@PostMapping(value = "logout")
	public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {

		Map<String, Object> result = new HashMap<>();
		try {
			CookieUtil.deleteCookie(request, response, SecurityConstants.ACCESS_TOKEN_KEY);

			result.put(CommonConstants.MESSAGES_KEY, "Login success");
			result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_OK);
		} catch (Exception e) {
			e.printStackTrace();
			result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_NG);
			result.put(CommonConstants.MESSAGES_KEY, "The username or password is wrong");
		}
		return ResponseEntity.ok(result);
	}

	@PostMapping(value = "sign-up")
	public ResponseEntity<?> signUp(@Valid @RequestBody SignUpRequest signUpRequest) {
		Map<String, Object> result = new HashMap<>();
		try {
			userService.signUp(signUpRequest);
			result.put(CommonConstants.MESSAGES_KEY,
					"Sign up success, Please verify your email to activate your account");
			result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_OK);
		} catch (UsernameAlreadyExistsException e) {
			e.printStackTrace();
			result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_NG);
			result.put(CommonConstants.MESSAGES_KEY, "Sign up failed, username already exists");
		} catch (EmailAlreadyExistsException e) {
			e.printStackTrace();
			result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_NG);
			result.put(CommonConstants.MESSAGES_KEY, "Sign up failed, email already exists");
		} catch (Exception e) {
			e.printStackTrace();
			result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_NG);
			result.put(CommonConstants.MESSAGES_KEY, "Sign up failed, An error has occurred during processing");
		}
		return ResponseEntity.ok(result);
	}

	@PostMapping(value = "2fa-verify-otp")
	public ResponseEntity<?> verifyOtp(@RequestBody VerifyOtpRequest request, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<>();
		try {
			Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
			SecurityContextHolder.getContext().setAuthentication(authentication);

			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

			if (twoFactorAuthService.verifyCode(request.getOtpCode(), userDetails.getUser().getTwoFAKey())) {

				String accessToken = jwtRsaUtil.generateJwtByPrivateKey(authentication);

				JwtResponse jwtRes = new JwtResponse();
				jwtRes.setAccessToken(accessToken);
				result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_OK);
				result.put(CommonConstants.MESSAGES_KEY, "Two Factor Authentication Success");
				result.put(CommonConstants.RESULT_KEY, jwtRes);
				CookieUtil.addCookie(response, SecurityConstants.ACCESS_TOKEN_KEY, accessToken);

			} else {
				result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_NG);
				result.put(CommonConstants.MESSAGES_KEY, "Verification code is incorrect");
			}
		} catch (Exception e) {
			e.printStackTrace();
			result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_NG);
			result.put(CommonConstants.MESSAGES_KEY, "The username or password is wrong");
		}

		return ResponseEntity.ok(result);
	}

	@PostMapping(value = "enable-account")
	public ResponseEntity<?> enableAccount(@RequestBody VerifyOtpRequest request, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<>();
		try {
			Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
			SecurityContextHolder.getContext().setAuthentication(authentication);

			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

			if (mailService.checkOtp(request.getOtpCode(), userDetails.getUser().getEmailVerifyKey())) {
				userService.updateStatusByEmail(userDetails.getUser().getEmail(),
						CommonConstants.AccountStatus.ACTIVED.getValue());
				String accessToken = jwtRsaUtil.generateJwtByPrivateKey(authentication);

				JwtResponse jwtRes = new JwtResponse();
				jwtRes.setAccessToken(accessToken);

				result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_OK);
				result.put(CommonConstants.MESSAGES_KEY, "Two Factor Authentication Success");
				result.put(CommonConstants.RESULT_KEY, jwtRes);

				CookieUtil.addCookie(response, SecurityConstants.ACCESS_TOKEN_KEY, accessToken);

			} else {
				result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_NG);
				result.put(CommonConstants.MESSAGES_KEY, "Verification code is incorrect");
			}
		} catch (Exception e) {
			e.printStackTrace();
			result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_NG);
			result.put(CommonConstants.MESSAGES_KEY, "The username or password is wrong");
		}

		return ResponseEntity.ok(result);
	}
	
	@PostMapping(value = "enable-account-resend-otp")
	public ResponseEntity<?> resendOtp(@RequestBody VerifyOtpRequest request, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<>();
		try {
			Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
			SecurityContextHolder.getContext().setAuthentication(authentication);

			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
			
			
			
			if (mailService.checkOtp(request.getOtpCode(), userDetails.getUser().getEmailVerifyKey())) {
				userService.updateStatusByEmail(userDetails.getUser().getEmail(),
						CommonConstants.AccountStatus.ACTIVED.getValue());
				String accessToken = jwtRsaUtil.generateJwtByPrivateKey(authentication);

				JwtResponse jwtRes = new JwtResponse();
				jwtRes.setAccessToken(accessToken);

				result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_OK);
				result.put(CommonConstants.MESSAGES_KEY, "Two Factor Authentication Success");
				result.put(CommonConstants.RESULT_KEY, jwtRes);

				CookieUtil.addCookie(response, SecurityConstants.ACCESS_TOKEN_KEY, accessToken);

			} else {
				result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_NG);
				result.put(CommonConstants.MESSAGES_KEY, "Verification code is incorrect");
			}
		} catch (Exception e) {
			e.printStackTrace();
			result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_NG);
			result.put(CommonConstants.MESSAGES_KEY, "The username or password is wrong");
		}

		return ResponseEntity.ok(result);
	}

	@GetMapping(value = "mail-send-otp")
	public ResponseEntity<?> mailSendOtp(@RequestParam String email) {
		Map<String, Object> result = new HashMap<>();
		try {
			UserResponse user = userService.getUserInfoByEmail(email);
			mailService.sendVerificationCode(user.getEmail(), user.getEmailVerifyKey());
			result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_OK);
			result.put(CommonConstants.MESSAGES_KEY, "Send mail success.");
		} catch (Exception e) {
			e.printStackTrace();
			result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_NG);
			result.put(CommonConstants.MESSAGES_KEY, "Send email faild");
		}
		return ResponseEntity.ok(result);
	}

	@GetMapping(value = "mail-verify-otp")
	public ResponseEntity<?> verifyEmail(@RequestParam String email, @RequestParam String otpCode) {
		Map<String, Object> result = new HashMap<>();
		try {
			if (mailService.verifyOtp(email, otpCode)) {
				userService.updateStatusByEmail(email, CommonConstants.AccountStatus.ACTIVED.getValue());
				result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_OK);
				result.put(CommonConstants.MESSAGES_KEY, "Account activated success");
			} else {
				result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_NG);
				result.put(CommonConstants.MESSAGES_KEY, "Verification code is incorrect");
			}

		} catch (UsernameNotFoundException e) {
			e.printStackTrace();
			result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_NG);
			result.put(CommonConstants.MESSAGES_KEY, "Account not found with email " + email);
		} catch (Exception e) {
			e.printStackTrace();
			result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_NG);
			result.put(CommonConstants.MESSAGES_KEY, "An error has occurred during processing");
		}

		return ResponseEntity.ok(result);
	}
	
	@GetMapping(value = "get-new-password")
	public ResponseEntity<?> getNewPassword(@RequestParam String email, String otpCode) {
		Map<String, Object> result = new HashMap<>();
		try {
			if (mailService.verifyOtp(email, otpCode)) {
				mailService.forgotPassword(email);
				result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_OK);
				result.put(CommonConstants.MESSAGES_KEY, "Change password successfully, new password will be sent to your email.");
			} else {
				result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_NG);
				result.put(CommonConstants.MESSAGES_KEY, "Verification code is incorrect.");
			}

		} catch (UsernameNotFoundException e) {
			e.printStackTrace();
			result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_NG);
			result.put(CommonConstants.MESSAGES_KEY, "Account not found with email " + email);
		} catch (Exception e) {
			e.printStackTrace();
			result.put(CommonConstants.STATUS_KEY, CommonConstants.RESULT_NG);
			result.put(CommonConstants.MESSAGES_KEY, "An error has occurred during processing");
		}

		return ResponseEntity.ok(result);
	}
}
