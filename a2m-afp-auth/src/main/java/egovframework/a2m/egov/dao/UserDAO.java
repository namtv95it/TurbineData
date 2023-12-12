package egovframework.a2m.egov.dao;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.stereotype.Repository;

import egovframework.a2m.egov.model.request.ChangePasswordRequest;
import egovframework.a2m.egov.model.request.SignUpRequest;
import egovframework.a2m.egov.model.request.UserRequest;
import egovframework.a2m.egov.model.response.UserResponse;

/**
 *  
 * @author Nguyen Van Hau
 * @since 2023.02.22
 * @version 1.0
 * @see
 */

@Repository("userDAO")
public class UserDAO extends EgovAbstractMapper{
	
	/**
	 * Get user information by userId
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public UserResponse getUserByUserId(String userId) {
		return selectOne("userDAO.getUserByUserId", userId);
	}
	
	/**
	 * Get user information by userUid
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public UserResponse getUserByUserUid(String userUid) {
		return selectOne("userDAO.getUserByUserUid", userUid);
	}
	
	/**
	 * Get user information by email
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public UserResponse getUserByEmail(String email) {
		return selectOne("userDAO.getUserByEmail", email);
	}
	
	/**
	 * Get all user
	 * @return user list
	 * @throws Exception
	 */
	public List<UserResponse> getAllUsers() throws SQLException{
		return selectList("userDAO.getAllUsers");
	}
	
	/**
	 * Insert TsstUser
	 * @param signUpRequest
	 * @return
	 * @throws Exception
	 */
	public int insertTsstUser(SignUpRequest signUpRequest) {
		return insert("userDAO.insertTsstUser", signUpRequest);
	}
	
	/**
	 * 
	 * @param userId
	 * @return
	 */
	public int countUserByUserId(String userId) {
		return (int) selectOne("userDAO.countUserByUserId", userId);
	}
	
	/**
	 * 
	 * @param email
	 * @return
	 */
	public int countUserByEmail(String email) {
		return (int) selectOne("userDAO.countUserByEmail", email);
	}
	
	
	public int deleteTsstUser(String userUid) {
		return delete("userDAO.deleteTsstUser", userUid);
	}
	
	public int updateUser(UserRequest user) {
		return update("userDAO.updateUser", user);
	}
	
	public int changePassword(ChangePasswordRequest params) {
		return update("userDAO.changePassword", params);
	}
	
	public List<UserResponse> searchUser(Map<Object, Object> params) {
		return selectList("userDAO.searchUser", params);
	}
	
	public int count(Map arg) throws Exception {
		return selectOne("userDAO.count", arg);
	}
	
	public int insertUser(UserRequest userRequest) {
		return insert("userDAO.insertUser", userRequest);
	}
	
	public int updateStatusByEmail(Map<String, Object> params) {
		return update("userDAO.updateStatusByEmail", params);
	}
	
	public int update2FAKey(Map<String, Object> params) {
		return update("userDAO.update2FAKey", params);
	}
	
	public int update2FAKeyStatus(Map<String, Object> params) {
		return update("userDAO.update2FAKeyStatus", params);
	}
	
	public int updateEmailVerifyKey(Map<String, Object> params) {
		return update("userDAO.updateEmailVerifyKey", params);
	}
	
	public int updateEmail(Map<String, Object> params) {
		return update("userDAO.updateEmail", params);
	}
	
	public int updateAvatarImgPath(Map<String, Object> params) {
		return update("userDAO.updateAvatarImgPath", params);
	}
	
	public List<UserResponse> getListUserInfoByUserUid(Map<String, List<String>> params) {
		return selectList("userDAO.getListUserInfoByUserUid", params);
	}
}
