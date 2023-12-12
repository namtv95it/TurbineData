package egovframework.com.a2m.egov.service.sys;

import java.util.List;
import java.util.Map;

import egovframework.com.a2m.egov.model.request.TsstRoleMenuRequest;
import egovframework.com.a2m.egov.model.request.TsstRoleRequest;
import egovframework.com.a2m.egov.model.request.TsstUserRoleRequest;
import egovframework.com.a2m.egov.model.response.TsstRoleMenuResponse;

/**
 * @author KetHX
 * @created 2/23/2023
 */
public interface Sys0201Service {
	
	public Map<Object, Object> searchTsstRole(Integer page, Integer limit, String roleNm, String useYn) throws Exception;
	
	public Map<Object, Object> searchTsstMenu(Integer page, Integer limit, String menuNm) throws Exception;

	Map getTsstRole(String roleId) throws Exception;

	int deleteTsstRole(String id) throws Exception;

	int insertTsstRole(TsstRoleRequest arg) throws Exception;

	int updateTsstRole(TsstRoleRequest arg) throws Exception;

	String getMaxRoleId() throws Exception;
    
    public List<String> getRoles(String userUid) throws Exception;

	public TsstUserRoleRequest getTsstUserRole(TsstUserRoleRequest userRoleRequest) throws Exception;

	List searchTsstUserRole(Map arg) throws Exception;

	int updateTsstUserRole(TsstUserRoleRequest userRoleRequest) throws Exception;

	int insertTsstUserRole(TsstUserRoleRequest userRoleRequest) throws Exception;

	int deleteTsstUserRole(TsstUserRoleRequest userRoleRequest) throws Exception;

	List searchTsstRoleMenu(Map arg) throws Exception;

	TsstRoleMenuResponse getTsstRoleMenu(TsstRoleMenuRequest arg) throws Exception;

	int updateTsstRoleMenu(TsstRoleMenuRequest arg) throws Exception;

	int insertTsstRoleMenu(TsstRoleMenuRequest arg) throws Exception;
	
	int deleteTsstRoleMenu(TsstRoleMenuRequest arg) throws Exception;

	void saveRoleUser(List<TsstUserRoleRequest> requestList) throws Exception;
	
	void saveMenuRole(List<TsstRoleMenuRequest> requestList) throws Exception;

}


