/**
 * 
 */
package egovframework.com.a2m.egov.dao.afp.com;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.com.a2m.egov.model.afp.bookmark.BookmarkModel;
import egovframework.com.a2m.egov.model.afp.bookmark.BookmarkSearch;
import egovframework.com.a2m.egov.model.afp.com.AppCommentRequest;
import egovframework.com.a2m.egov.model.afp.com.CommentModel;
import egovframework.com.a2m.egov.model.afp.com.DocumentPostInfo;
import egovframework.com.a2m.egov.model.afp.com.LikeModel;
import egovframework.com.a2m.egov.model.afp.com.PostModel;
import egovframework.com.a2m.egov.model.afp.com.PostViewedModel;
import egovframework.com.cmm.service.impl.EgovComAbstractDAO;

/**
 * @author ThanhNV
 *
 * 19 thg 4, 2023
 */
@Repository
public class ComPostDAO extends EgovComAbstractDAO {
	public List<BookmarkModel> searchBookmark(BookmarkSearch param) throws Exception {
		return selectList("ComPostDAO.searchBookmark", param);
	}

	public BookmarkModel getById(Long id) throws Exception {
		return selectOne("ComPostDAO.getById", id);
	}
	
	public int bookmark(BookmarkModel model) throws Exception {
		return insert("ComPostDAO.bookmark", model);
	}
	
	public int unBookmark(BookmarkModel model) throws Exception {
		return delete("ComPostDAO.unBookmark", model);
	}
//	view
	
//	end view
	public int checkPostViewed(PostViewedModel model) throws Exception {
		return selectOne("ComPostDAO.checkPostViewed", model);
	}
	
	public int viewed(PostViewedModel model) throws Exception {
		return insert("ComPostDAO.viewed", model);
	}
	
	public int increasePostView(Long postId) throws Exception {
		return insert("ComPostDAO.increasePostView", postId);
	}
//	like function
	public int addLike(LikeModel model) throws Exception {
		return insert("ComPostDAO.addLike", model);
	}
	
	public int unLike(LikeModel model) throws Exception {
		return insert("ComPostDAO.unLike", model);
	}
//	end like function
	
//	comment function
	public List<CommentModel> getListComment(AppCommentRequest param) throws Exception {
		return selectList("ComPostDAO.searchComment", param);
	}
	
	public int insertComment(CommentModel model) throws Exception {
		return insert("ComPostDAO.insertComment", model);
	}

	public int updateComment(CommentModel model) throws Exception {
		return update("ComPostDAO.updateComment", model);
	}
	
	public int deleteComment(CommentModel model) throws Exception {
		return update("ComPostDAO.updateComment", model);
	}
	
	public CommentModel getCommentById(Long id) throws Exception {
		return selectOne("ComPostDAO.getCommentById", id);
	}
	public Long countComment(AppCommentRequest request) throws Exception {
		return selectOne("ComPostDAO.countComment", request);
	}
//	end comment function
	
	public PostModel getPostById(Map<String, Object> params) throws Exception {
		return selectOne("ComPostDAO.getPostById", params);
	}
	
	public DocumentPostInfo getDocumentPostInfo(Long postId) throws Exception {
		return selectOne("ComPostDAO.getDocumentPostInfo", postId);
	}
}
