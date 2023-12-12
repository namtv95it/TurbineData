package egovframework.com.a2m.egov.service.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import egovframework.com.a2m.egov.model.response.UserResponse;

@Service
public class UserInfoService {
	
	@Autowired
	private CommonService commonService;
	
	public UserResponse getUserInfoByUserId(String userId) {
		UserResponse userInfo = commonService.getUserInfoByUserId(userId);
		return userInfo;
	}

	public UserResponse getUserInfoByUserUid(String userUid) {
		
		UserResponse userInfo = commonService.getUserInfoByUserUid(userUid);
		return userInfo;
	}
	
}
