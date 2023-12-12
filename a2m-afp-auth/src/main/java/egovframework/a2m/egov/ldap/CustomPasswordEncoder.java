//package egovframework.a2m.egov.ldap;
//
//import java.nio.charset.StandardCharsets;
//
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//import com.google.common.hash.Hashing;
//
//public class CustomPasswordEncoder implements PasswordEncoder{
//
//	@Override
//	public String encode(CharSequence rawPassword) {
//		String hash = Hashing.sha512().hashString(rawPassword, StandardCharsets.UTF_8).toString();
//
//		return hash;
//	}
//
//	@Override
//	public boolean matches(CharSequence rawPassword, String encodedPassword) {
//		String hash = Hashing.sha512().hashString(rawPassword, StandardCharsets.UTF_8).toString(); 
//		return encodedPassword.equals(hash);
//	}
//
//}
