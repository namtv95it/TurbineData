package egovframework.a2m.egov.dao;

import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.stereotype.Repository;

import egovframework.a2m.egov.model.request.SignUpRequest;
import egovframework.a2m.egov.model.request.UserRequest;

/**
 * 
 * @author Nguyen Van Hau
 * @since 2023.02.22
 */

@Repository("userInfoDAO")
public class UserInfoDAO extends EgovAbstractMapper {
	
	/**
	 * Insert TsstUserInfo
	 * @param signUpRequest
	 * @return
	 * @throws Exception
	 */
	public int insertTsstUserInfo(SignUpRequest signUpRequest){
		return insert("userInfoDAO.insertTsstUserInfo", signUpRequest);
	}
	
	public int updateUserInfo(UserRequest user) {
		return update("userInfoDAO.updateUserInfo", user);
	}
	
	public int deleteTsstUserInfo(Long userInfoId) {
		return delete("userInfoDAO.deleteTsstUserInfo", userInfoId);
	}
	
	public int insertUserInfo(UserRequest userRequest){
		return insert("userInfoDAO.insertUserInfo", userRequest);
	}
	
}
