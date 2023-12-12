/**
 * 
 */
package egovframework.com.a2m.egov.dao.sam;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.com.a2m.egov.model.TccoSTD;
import egovframework.com.a2m.egov.model.sam.Sam0101Model;
import egovframework.com.cmm.service.impl.EgovComAbstractDAO;

/**
 * @author tiennd
 *
 * @created Feb 28, 2023
 */

@Repository
public class Sam0101DAO extends EgovComAbstractDAO {

	public List<Sam0101Model> getList(Map<Object, Object> param) throws Exception {
		return selectList("Sam0101DAO.getList", param);
	}
	
	public Long count(Map<Object, Object> param) throws Exception {
		return selectOne("Sam0101DAO.count", param);
	}
	
	public Sam0101Model getById(Long id) throws Exception {
		return selectOne("Sam0101DAO.getById", id);
	}
	
	public int update(Sam0101Model model) throws Exception {
		return update("Sam0101DAO.update", model);
	}
	
	public int insert(Sam0101Model model) throws Exception {
		return insert("Sam0101DAO.insert", model);
	}
	
	public int deleteById(Long id) throws Exception {
		return delete("Sam0101DAO.deleteById", id);
	}
	
	public List<TccoSTD> getTccoStd(String upCommCd) throws Exception {
		return selectList("Sam0101DAO.getTccoStd", upCommCd);
	}
	
	public TccoSTD getTccoStdByValueConfig(String url) throws Exception {
		return selectOne("Sam0101DAO.getTccoStdByValueConfig", url);
	}
}
