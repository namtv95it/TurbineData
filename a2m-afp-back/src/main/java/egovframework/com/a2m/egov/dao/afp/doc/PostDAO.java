package egovframework.com.a2m.egov.dao.afp.doc;

import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.com.a2m.egov.model.afp.doc.AfpPostRequest;
import egovframework.com.a2m.egov.model.afp.doc.AfpPostResponse;
import egovframework.com.cmm.service.impl.EgovComAbstractDAO;

@Repository
public class PostDAO extends EgovComAbstractDAO{
	
	public int insert(AfpPostRequest request) {
		return insert("PostDAO.insert", request);
	}
	
	public int update(AfpPostRequest request) {
		return update("PostDAO.update", request);
	}
	
	public int deleteByAfpMenu(Long menuId) {
		return update("PostDAO.deleteByAfpMenu", menuId);
	}
	
	public int deleteById(Long id) {
		return update("PostDAO.deleteById", id);
	}
	
	public AfpPostResponse findByAfpMenuId(Long menuId) {
		return selectOne("PostDAO.findByAfpMenuId", menuId);
	}
	
	public int checkBookmark(Map<String, Object> params) {
		return selectOne("PostDAO.checkBookmark", params);
	}
	
}
