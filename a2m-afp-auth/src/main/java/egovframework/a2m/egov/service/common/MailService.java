package egovframework.a2m.egov.service.common;

import java.io.IOException;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import egovframework.a2m.egov.dao.UserDAO;
import egovframework.a2m.egov.model.request.ChangePasswordRequest;
import egovframework.a2m.egov.model.response.UserResponse;
import egovframework.a2m.egov.util.CommonUtil;
import egovframework.a2m.egov.util.EmailUtil;
import egovframework.a2m.egov.util.TOTPUtil;

/**
* 
* @author Nguyen Van Hau
* @since 2023. 2. 27.
* @version 1
*/

@Service
public class MailService {
	
	private final long STEPS_TIME = System.currentTimeMillis() / 300000;
	
	@Autowired
	private UserDAO userDAO;
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public void sendVerificationCode(String email, String secretKey) throws AddressException, IOException, MessagingException {
//		UserResponse user = userDAO.getUserByEmail(email);
//		if (user == null) {
//			throw new UsernameNotFoundException("User not found with email " + email);
//		}
		String otpCode = getOTP(secretKey);
		String mailTemplate = EmailUtil.getEmailTemplateVerifyCode();
		mailTemplate = mailTemplate.replace("_VERIFY_CODE_", otpCode);
		String title = "AtwoM - Email verification code";
		EmailUtil.sendMail(title, mailTemplate, email);
	}
	
	public void forgotPassword(String email) throws AddressException, MessagingException, IOException {
		UserResponse user = userDAO.getUserByEmail(email);
		if (user == null) {
			throw new UsernameNotFoundException("User not found with email " + email);
		}
		String newPassword = CommonUtil.generatePassword(8);
		ChangePasswordRequest changePasswordRequest = new ChangePasswordRequest();
		changePasswordRequest.setHashPwd(passwordEncoder.encode(newPassword));
		changePasswordRequest.setUserUid(user.getUserUid());
		userDAO.changePassword(changePasswordRequest);
		
		String mailTemplate = EmailUtil.getEmailTemplateResetPassword();
		mailTemplate = mailTemplate.replace("NEW_PASSWORD", newPassword);
		String title = "AtwoM - Email for new password";
		EmailUtil.sendMail(title, mailTemplate, email);
	}
	
	public boolean verifyOtp(String email, String otpCode) {
		UserResponse user = userDAO.getUserByEmail(email);
		if (user == null) {
			throw new UsernameNotFoundException("User not found with email " + email);
		}
		
		return checkOtp(otpCode, user.getEmailVerifyKey());
	}
	
	public boolean checkOtp(String otpCode, String emailKey) {
		if (otpCode.equals(getOTP(emailKey))) {
			return true;
		}
		return false;
	}
	
	private String getOTP(String secretKey) {
		return TOTPUtil.getOTP(STEPS_TIME, secretKey);
	}
}
