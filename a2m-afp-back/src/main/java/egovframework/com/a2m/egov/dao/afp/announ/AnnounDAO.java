/**
 * 
 */
package egovframework.com.a2m.egov.dao.afp.announ;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.com.a2m.egov.model.afp.ann.AnnounModel;
import egovframework.com.a2m.egov.model.afp.ann.AnnounSearch;
import egovframework.com.cmm.service.impl.EgovComAbstractDAO;

/**
 * @author ThanhNV
 *
 * 19 thg 4, 2023
 */
@Repository
public class AnnounDAO extends EgovComAbstractDAO {
	public List<AnnounModel> getList(AnnounSearch param) throws Exception {
		return selectList("AnnounDAO.search", param);
	}

	public AnnounModel checkExist(Long id) throws Exception {
		return selectOne("AnnounDAO.getPostById", id);
	}
	
	public AnnounModel getById(Map<String, Object> params) throws Exception {
		return selectOne("AnnounDAO.getById", params);
	}

	public int insert(AnnounModel model) throws Exception {
		return insert("AnnounDAO.insert", model);
	}

	public int update(AnnounModel model) throws Exception {
		return update("AnnounDAO.update", model);
	}
	
	public int delete(AnnounModel model) throws Exception {
		return update("AnnounDAO.update", model);
	}
	
	public Long getAnnounNotiInfo(String userUid) throws Exception {
		return selectOne("AnnounDAO.getAnnounNotiInfo", userUid);
	}
	
	public Long getLastAnnounId() throws Exception {
		return selectOne("AnnounDAO.getLastAnnounId");
	}
	
	public int remakeAnnounNoti(Map<Object, Object> params) throws Exception {
		return insert("AnnounDAO.remakeAnnounNoti", params);
	}
}
