package egovframework.com.a2m.egov.dao.afp.doc;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.com.a2m.egov.model.afp.doc.AfpMenuRequest;
import egovframework.com.a2m.egov.model.afp.doc.AfpMenuResponse;
import egovframework.com.cmm.service.impl.EgovComAbstractDAO;

@Repository
public class Doc0101DAO extends EgovComAbstractDAO{
	
	public List<AfpMenuResponse> getAfpMenus(Map<String, Object> param) throws Exception {
		return selectList("Doc0101DAO.getAfpMenus", param);
	}

	public List<AfpMenuResponse> getAfpMenuById(Map<String, Object> param) throws Exception {
		return selectList("Doc0101DAO.getAfpMenuById", param);
	}
	
	public int insertWireFrameMenu(AfpMenuRequest wireFrameMenu) throws Exception {
		return insert("Doc0101DAO.insertWireFrameMenu", wireFrameMenu);
	}
	
	public int updateWireFrameMenu(AfpMenuRequest param) throws Exception {
		return update("Doc0101DAO.updateWireFrameMenu", param);
	}
	
	public String getMaxMenuId(String wireFrameMenuId) throws Exception {
		return selectOne("Doc0101DAO.getMaxMenuId", wireFrameMenuId);
	}

	public int getMaxOrdNo(Long afpMenuParentId) throws Exception {
		return selectOne("Doc0101DAO.getMaxOrdNo", afpMenuParentId);
	}
 
	public List<AfpMenuResponse> getWireFrameMenuByParentMenuId(String menuParentId) throws Exception {
		return selectList("Doc0101DAO.getWireFrameMenuByParentMenuId", menuParentId);
	}
	
	public AfpMenuResponse getAfpMenuById(Long menuId) throws Exception {
		return selectOne("Doc0101DAO.getAfpMenuById", menuId);
	}
	
	public int deleteAfpMenu(Map<String, Object> params) {
		return update("Doc0101DAO.deleteAfpMenu", params);
	}
	
	public List<AfpMenuResponse> getAllParentMenu(Long menuId) throws Exception {
		return selectList("Doc0101DAO.getAllParentMenu", menuId);
	}

	public List<AfpMenuResponse> searchDoc(Map<String, Object> param) throws Exception {
		return selectList("Doc0101DAO.searchDoc", param);
	}
	
}
