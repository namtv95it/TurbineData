//package egovframework.a2m.egov.ldap;
//
//import java.util.Collection;
//
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.ldap.userdetails.LdapUserDetails;
//
//import egovframework.a2m.egov.model.response.UserResponse;
//
//public class CustomLdapUserDetail implements LdapUserDetails{
//	
//	private static final long serialVersionUID = 1L;
//	
//	UserResponse user;
//
//	@Override
//	public Collection<? extends GrantedAuthority> getAuthorities() {
//		// TODO Auto-generated method stub
//		return null;
//	}
//
//	@Override
//	public String getPassword() {
//		// TODO Auto-generated method stub
//		return user.getPwd();
//	}
//
//	@Override
//	public String getUsername() {
//		// TODO Auto-generated method stub
//		return user.getUserId();
//	}
//
//	@Override
//	public boolean isAccountNonExpired() {
//		// TODO Auto-generated method stub
//		return false;
//	}
//
//	@Override
//	public boolean isAccountNonLocked() {
//		// TODO Auto-generated method stub
//		return false;
//	}
//
//	@Override
//	public boolean isCredentialsNonExpired() {
//		// TODO Auto-generated method stub
//		return false;
//	}
//
//	@Override
//	public boolean isEnabled() {
//		// TODO Auto-generated method stub
//		return false;
//	}
//
//	@Override
//	public void eraseCredentials() {
//		// TODO Auto-generated method stub
//		
//	}
//
//	@Override
//	public String getDn() {
//		// TODO Auto-generated method stub
//		return null;
//	}
//
//}
