package egovframework.a2m.egov.sec;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import egovframework.a2m.egov.constants.CommonConstants;
import egovframework.a2m.egov.model.response.UserResponse;

/**
* 
* @author Nguyen Van Hau
* @since 2023. 2. 22.
* @version 1
*/

public class UserDetailsImpl implements UserDetails {

	private static final long serialVersionUID = 1L;

	UserResponse user;

	public UserDetailsImpl(UserResponse user) {
		super();
		this.user = user;
	}

	public UserResponse getUser() {
		return user;
	}

	public void setUser(UserResponse user) {
		this.user = user;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return user.getPwd();
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return user.getUserUid();
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		if (user.getStatus().equals(CommonConstants.AccountStatus.ACTIVED.getValue())
				|| user.getStatus().equals(CommonConstants.AccountStatus.NOT_ACTIVED.getValue())) {
			return true;
		}
		return false;
	}

}
