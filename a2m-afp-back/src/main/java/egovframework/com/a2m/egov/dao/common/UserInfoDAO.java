package egovframework.com.a2m.egov.dao.common;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.stereotype.Repository;

import egovframework.com.a2m.egov.model.TsstRole;
import egovframework.com.a2m.egov.model.request.TsstUserRoleRequest;
import egovframework.com.a2m.egov.model.response.MenuRoleInfoResponse;

@Repository("userInfoDAO")
public class UserInfoDAO extends EgovAbstractMapper{
	
	public List<MenuRoleInfoResponse> getMenusByUser(Map<String, Object> params) {
		return selectList("userInfoDAO.getMenusByUser", params);
	}
	
	public int countUserRoleByUserUid(String userUid) {
		return selectOne("userInfoDAO.countUserRole", userUid);
	}
	
	public int insertTsstUserRole(TsstUserRoleRequest userRole) {
		return insert("userInfoDAO.insertTsstUserRole", userRole);
	}
	
	public List<TsstRole> getListRoleByUserUid(String userUid) {
		return selectList("userInfoDAO.getListRoleByUserUid", userUid);
	}
	
	public String getUserRoles(String userUid) {
		return selectOne("userInfoDAO.getUserRoles", userUid);
	}
}
