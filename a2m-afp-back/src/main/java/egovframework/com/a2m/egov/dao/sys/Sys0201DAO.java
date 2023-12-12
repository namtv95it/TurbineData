package egovframework.com.a2m.egov.dao.sys;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.com.a2m.egov.model.request.TsstRoleMenuRequest;
import egovframework.com.a2m.egov.model.request.TsstRoleRequest;
import egovframework.com.a2m.egov.model.request.TsstUserRoleRequest;
import egovframework.com.a2m.egov.model.response.TsstRoleMenuResponse;
import egovframework.com.a2m.egov.model.response.TsstRoleResponse;
import egovframework.com.cmm.service.impl.EgovComAbstractDAO;

/**
 * @author KetHX
 * @created 2/23/2023
 */
@Repository("sys0201Dao")
public class Sys0201DAO extends EgovComAbstractDAO {

	// Search user
	public List<TsstRoleResponse> searchTsstRole(Map<Object, Object> arg) throws Exception {
		return selectList("Sys0201DAO.searchTsstRole", arg);
	}

	//Get role by role id
	public Map getTsstRole(String roleId) throws Exception {
		return selectOne("Sys0201DAO.getTsstRole", roleId);
	}

	//Delete role
	public int deleteTsstRole(String roleId) throws Exception {
		return delete("Sys0201DAO.deleteTsstRole", roleId);
	}

	//Insert role
	public int insertTsstRole(TsstRoleRequest arg) throws Exception {
		return insert("Sys0201DAO.insertTsstRole", arg);
	}

	//Update role
	public int updateTsstRole(TsstRoleRequest arg) throws Exception {
		return update("Sys0201DAO.updateTsstRole", arg);
	}

	public String getMaxRoleId(Map<String,Object> map) throws Exception {
		return selectOne("Sys0201DAO.getMaxRoleId", map);
	}

	public List<Map<Object, Object>> getRoles(String userUid) throws Exception {
		return selectList("Sys0201DAO.getRoles", userUid);
	}

	public TsstUserRoleRequest getTsstUserRole(TsstUserRoleRequest userRoleRequest) throws Exception {
		return selectOne("Sys0201DAO.getTsstUserRole", userRoleRequest);
	}

	public List searchTsstUserRole(Map arg) throws Exception {
		return selectList("Sys0201DAO.searchTsstUserRole", arg);
	}

	public int updateTsstUserRole(TsstUserRoleRequest userRoleRequest) throws Exception {
		return update("Sys0201DAO.updateTsstUserRole", userRoleRequest);
	}

	public int insertTsstUserRole(TsstUserRoleRequest userRoleRequest) throws Exception {
		return insert("Sys0201DAO.insertTsstUserRole", userRoleRequest);
	}

	public int deleteTsstUserRole(TsstUserRoleRequest userRoleRequest) throws Exception {
		return delete("Sys0201DAO.deleteTsstUserRole", userRoleRequest);
	}

	public List searchTsstRoleMenu(Map arg) throws Exception {
		return selectList("Sys0201DAO.searchTsstRoleMenu", arg);
	}

	public TsstRoleMenuResponse getTsstRoleMenu(TsstRoleMenuRequest arg) throws Exception {
		return selectOne("Sys0201DAO.getTsstRoleMenu", arg);
	}

	public int updateTsstRoleMenu(TsstRoleMenuRequest arg) throws Exception {
		return update("Sys0201DAO.updateTsstRoleMenu", arg);
	}

	public int insertTsstRoleMenu(TsstRoleMenuRequest arg) throws Exception {
		return insert("Sys0201DAO.insertTsstRoleMenu", arg);
	}
	
	public int countRole(Map arg) throws Exception {
		return selectOne("Sys0201DAO.countRole", arg);
	}
	
	public List searchAllMenu(Map arg) throws Exception {
		return selectList("Sys0201DAO.searchAllMenu", arg);
	}
	
	public int countMenu(Map arg) throws Exception {
		return selectOne("Sys0201DAO.countMenu", arg);
	}
	
	public int deleteUserRole(String userUid) {
		return delete("Sys0201DAO.deleteUserRole", userUid);
	}
	
	public int deleteTsstRoleMenu(TsstRoleMenuRequest arg) throws Exception {
		return delete("Sys0201DAO.deleteTsstRoleMenu", arg);
	}
}
