package egovframework.a2m.egov.service.common;

import java.security.SecureRandom;

import org.apache.commons.codec.binary.Base32;
import org.springframework.stereotype.Service;

import egovframework.a2m.egov.util.TOTPUtil;

/**
* 
* @author Nguyen Van Hau
* @since 2023. 2. 27.
* @version 1
*/

@Service
public class TwoFactorAuthService {
	
	public boolean verifyCode(String totpCode, String secret) {
        String totpCodeBySecret = getTOTPCode(secret);

        return totpCodeBySecret.equals(totpCode);
    }
	
	public boolean verifyCodeEmail(String totpCode, String secret) {
        String totpCodeBySecret = getTOTPCode(secret);

        return totpCodeBySecret.equals(totpCode);
    }

	public String getTOTPCode(String secretKey) {
	    return TOTPUtil.getOTP(secretKey);
	}
    
	public String generateSecretKey() {
	    SecureRandom random = new SecureRandom();
	    byte[] bytes = new byte[20];
	    random.nextBytes(bytes);
	    Base32 base32 = new Base32();
	    return base32.encodeToString(bytes);
	}
}
