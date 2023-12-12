package egovframework.com.a2m.egov.config.sec;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import egovframework.com.a2m.egov.constants.CommonConstants;
import egovframework.com.a2m.egov.dao.common.UserInfoDAO;
import egovframework.com.a2m.egov.model.request.TsstUserRoleRequest;
import egovframework.com.a2m.egov.model.response.MenuRoleInfoResponse;
import egovframework.com.a2m.egov.model.response.UserResponse;

/**
 * @author Nguyen Van Hau
 * @since 2023. 2. 27.
 * @version 1
 */

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	
	@Autowired
	private UserInfoDAO userInfoDAO;
	
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		UserResponse user = new UserResponse();
		
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("userUid", username);
		params.put("useYn", CommonConstants.USE_Y);
		List<MenuRoleInfoResponse> menus = userInfoDAO.getMenusByUser(params);
		user.setUserUid(username);
		user.setMenus(menus);
		
		return new UserDetailsImpl(user);
	}
	
	public UserDetails loadUserByUsernameFor3rd(String username) throws UsernameNotFoundException {
		
		UserResponse user = new UserResponse();
		
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("userUid", username);
		params.put("useYn", CommonConstants.USE_Y);
		List<MenuRoleInfoResponse> menus = userInfoDAO.getMenusByUser(params);
		user.setUserUid(username);
		user.setMenus(menus);
		
		return new UserDetailsImpl(user);
	}
	
	public boolean checkUserRoleAlreadyExists(String userUid) {
		if (userInfoDAO.countUserRoleByUserUid(userUid) > 0) {
			return true;
		}
		return false;
	}
	
	public void saveTsstUserRole(TsstUserRoleRequest userRoleRequest) {
		userInfoDAO.insertTsstUserRole(userRoleRequest);
	}
}
