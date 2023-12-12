/**
 * 
 */
package egovframework.com.a2m.egov.service.afp.com;

import java.util.List;

import egovframework.com.a2m.egov.model.afp.bookmark.BookmarkModel;
import egovframework.com.a2m.egov.model.afp.com.AppCommentModel;
import egovframework.com.a2m.egov.model.afp.com.AppCommentRequest;
import egovframework.com.a2m.egov.model.afp.com.CommentModel;
import egovframework.com.a2m.egov.model.afp.com.DocumentPostInfo;
import egovframework.com.a2m.egov.model.afp.com.LikeModel;
import egovframework.com.a2m.egov.model.afp.com.PostModel;

/**
 * @author ThanhNV
 *
 * 21 thg 4, 2023
 */
public interface IComPostService {

	List<BookmarkModel> searchBookmark(String keySearch, String postType) throws Exception;
	
	int bookmark(BookmarkModel bookmarkModel) throws Exception;
	
	int like(LikeModel model) throws Exception;
	
	CommentModel comment(CommentModel model) throws Exception;
	
	int deleteComment(Long id) throws Exception;

	List<CommentModel> getListComment(AppCommentRequest request) throws Exception;
	
	PostModel getPostById(Long postId) throws Exception;

	int viewed(Long postId) throws Exception;
	
	int increasePostView(Long postId) throws Exception;

	AppCommentModel getAppCommentData( AppCommentRequest request )throws Exception;
	
	DocumentPostInfo getDocumentPostInfo(Long postId) throws Exception;
}
