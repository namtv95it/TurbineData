package egovframework.a2m.egov.sec;

import java.nio.charset.Charset;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import egovframework.a2m.egov.constants.CommonConstants;
//import egovframework.a2m.egov.ldap.model.LdapUser;
//import egovframework.a2m.egov.ldap.repository.LdapUserReposity;
import egovframework.a2m.egov.model.response.UserResponse;
import egovframework.a2m.egov.sec.model.AuthProvider;
import egovframework.a2m.egov.service.UserService;

/**
* 
* @author Nguyen Van Hau
* @since 2023. 2. 22.
* @version 1
*/

@Service
public class UserDetailsServiceImpl implements UserDetailsService{
	
	@Autowired
	private UserService userService;
//	@Autowired
//	private LdapUserReposity ldapUserRepo;
	
	@Value("${spring.ldap.enable}")
	private boolean ldapEnable;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserResponse user = new UserResponse();
		if (ldapEnable) {
//			Optional<LdapUser> ldapUser = ldapUserRepo.findByUserId(username);
//			if (ldapUser.isEmpty()) {
//				throw new UsernameNotFoundException("User Not Found with username: " + username);
//			}
//			
//			user.setUserId(ldapUser.get().getUserId());
//			user.setUserUid(ldapUser.get().getUserId());
//			user.setPwd(new String(ldapUser.get().getUserPassword(), Charset.forName("UTF-8")));
//			user.setStatus(CommonConstants.AccountStatus.ACTIVED.getValue());
//			user.setAuthProvider(AuthProvider.LOCAL.toString());
			
		}else {
			user = userService.getUserInfoByUserId(username);
			if (user == null) {
				throw new UsernameNotFoundException("User Not Found with username: " + username);
			}
		}
		return new UserDetailsImpl(user);
	}
	
	public UserDetails loadUserByUserUid(String userUid) throws UsernameNotFoundException {
		UserResponse user = userService.getUserInfoByUserUid(userUid);
		if (user == null) {
			throw new UsernameNotFoundException("User Not Found with userUid: " + userUid);
		}
		return new UserDetailsImpl(user);
	}

}
