package egovframework.com.a2m.egov.dao.sam;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.com.a2m.egov.model.sam.Sam0103CommentModel;
import egovframework.com.a2m.egov.model.sam.Sam0103Model;
import egovframework.com.cmm.service.impl.EgovComAbstractDAO;

/**
 * @author tiennd
 *
 * @created Feb 28, 2023
 */

@Repository
public class Sam0103DAO extends EgovComAbstractDAO {

	public Sam0103CommentModel getById(Long id) throws Exception {
		return selectOne("Sam0103DAO.getById", id);
	}

	public int update(Sam0103CommentModel model) throws Exception {
		return update("Sam0103DAO.update", model);
	}

	public int insert(Sam0103CommentModel model) throws Exception {
		return insert("Sam0103DAO.insert", model);
	}

	public List<Sam0103CommentModel> getListCommentByPostId(Long id) throws Exception {
		return selectList("Sam0103DAO.getListCommentByPostId", id);
	}

	public List<Sam0103CommentModel> getListCommentChild(Long id) throws Exception {
		return selectList("Sam0103DAO.getListCommentChild", id);
	}

//	public int deleteById(Long id) throws Exception {
//		return delete("Sam0103DAO.deleteById", id);
//	}

	public Sam0103Model getQuestionById(Long id) throws Exception {
		return selectOne("Sam0103DAO.getQuestionById", id);
	}

	public int update(Sam0103Model model) throws Exception {
		return update("Sam0103DAO.updateQuestion", model);
	}

	public int insert(Sam0103Model model) throws Exception {
		return insert("Sam0103DAO.insertQuestion", model);
	}

	public List<Sam0103Model> getList(Map<Object, Object> param) throws Exception {
		return selectList("Sam0103DAO.getList", param);
	}

	public Long count(Map<Object, Object> param) throws Exception {
		return selectOne("Sam0103DAO.count", param);
	}

	public List<Sam0103Model> getListByUrl(Map<Object, Object> param) throws Exception {
		return selectList("Sam0103DAO.getListByUrl", param);
	}
	
	public List<Sam0103CommentModel> selectComment(Long id) throws Exception {
		return selectList("Sam0103DAO.selectComment", id);
	}
}
