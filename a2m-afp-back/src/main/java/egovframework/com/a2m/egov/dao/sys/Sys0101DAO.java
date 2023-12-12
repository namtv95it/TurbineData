package egovframework.com.a2m.egov.dao.sys;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.com.a2m.egov.model.TsstMenu;
import egovframework.com.a2m.egov.model.TsstMenuMap;
import egovframework.com.cmm.service.impl.EgovComAbstractDAO;;

/**
 * @author Nguyen Trung Anh
 * @created 2/22/2023
 */
@Repository("sys0101Dao")
public class Sys0101DAO extends EgovComAbstractDAO {

	public List<TsstMenu> getLstMenu(Map<Object, Object> param) throws Exception {
		return selectList("Sys0101DAO.getLstMenu", param);
	}

	public int insertMenu(TsstMenu menu) throws Exception {
		return insert("Sys0101DAO.insertMenu", menu);
	}

	public String getMaxMenuId(String menuId) throws Exception {
		return selectOne("Sys0101DAO.getMaxMenuId", menuId);
	}

	public int getMaxOrdNo() throws Exception {
		return selectOne("Sys0101DAO.getMaxOrdNo");
	}

	public int getNumChildrenOfMenu(String upMenuId) throws Exception {
		return selectOne("Sys0101DAO.getNumChildrenOfMenu", upMenuId);
	}

	public TsstMenu getMenuByID(String menuId) throws Exception {
		return selectOne("Sys0101DAO.getMenuByID", menuId);
	}

	public int updateMenu(TsstMenu menu) throws Exception {
		return update("Sys0101DAO.updateMenu", menu);
	}

	public int deleteMenu(String menuId) throws Exception {
		return delete("Sys0101DAO.deleteMenu", menuId);
	}

	public List<TsstMenuMap> getMenuByUser(String userUid, String useYn) throws Exception {
		Map<Object, Object> param = new HashMap<>();
		param.put("userUid", userUid);
		param.put("useYn", useYn);
		return selectList("Sys0101DAO.getMenuByUser", param);
	}
	
	public TsstMenuMap selectParent(String upMenuId) throws Exception {
		return selectOne("Sys0101DAO.selectParent", upMenuId);
	}
}
