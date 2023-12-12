package egovframework.com.a2m.egov.config.sec;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import egovframework.com.a2m.egov.constants.CommonConstants;
import egovframework.com.a2m.egov.model.response.UserResponse;

/**
 * 
 * @author Nguyen Van Hau
 * @since 2023. 2. 27.
 * @version 1
 */

public class UserDetailsImpl implements UserDetails {

	private static final long serialVersionUID = 1L;

	UserResponse user;

	public UserDetailsImpl(UserResponse user) {
		super();
		this.user = user;
	}

	public UserDetailsImpl() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UserResponse getUser() {
		return user;
	}

	public void setUser(UserResponse user) {
		this.user = user;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<GrantedAuthority> authorities = new ArrayList<>();
		if (user.getRoles() != null) {
			user.getRoles().forEach(r -> {
				authorities.add(new SimpleGrantedAuthority(r.getRoleNm()));
			});
		} else {
			return null;
		}
		return authorities;
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return user.getPwd();
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return user.getUserId();
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
		// TODO Auto-generated method stub
		if (!user.getStatus().equals(CommonConstants.ACCOUNT_STATUS_ACTIVED)) {
			return false;
		}
		return true;
	}

}
