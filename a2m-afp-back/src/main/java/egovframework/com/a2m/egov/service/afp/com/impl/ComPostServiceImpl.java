/**
 * 
 */
package egovframework.com.a2m.egov.service.afp.com.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import egovframework.com.a2m.egov.constants.StateConstants;
import egovframework.com.a2m.egov.dao.afp.com.ComPostDAO;
import egovframework.com.a2m.egov.model.afp.bookmark.BookmarkModel;
import egovframework.com.a2m.egov.model.afp.bookmark.BookmarkSearch;
import egovframework.com.a2m.egov.model.afp.com.AppCommentModel;
import egovframework.com.a2m.egov.model.afp.com.AppCommentRequest;
import egovframework.com.a2m.egov.model.afp.com.CommentModel;
import egovframework.com.a2m.egov.model.afp.com.DocumentPostInfo;
import egovframework.com.a2m.egov.model.afp.com.LikeModel;
import egovframework.com.a2m.egov.model.afp.com.PostModel;
import egovframework.com.a2m.egov.model.afp.com.PostViewedModel;
import egovframework.com.a2m.egov.model.response.UserResponse;
import egovframework.com.a2m.egov.service.afp.com.IComPostService;
import egovframework.com.a2m.egov.service.common.CommonService;
import kr.a2mvn.largefileupload.common.CastUtil;

/**
 * @author ThanhNV
 *
 * 21 thg 4, 2023
 */

@Service
public class ComPostServiceImpl implements IComPostService{
	@Autowired
	private ComPostDAO dao;
	
	@Autowired
	private CommonService commonService;

	@Value("${auth.api.url}")
	private String authServer;

	@Override
	public List<BookmarkModel> searchBookmark(String keySearch, String postType) throws Exception {
		// TODO Auto-generated method stub
		String userUid = commonService.getUserUid();
		BookmarkSearch search = new BookmarkSearch(keySearch, postType);
		search.setCreatedBy(userUid);
		
		List<BookmarkModel> list = dao.searchBookmark(search);
		return list;
	}
	
	
	@Override
	public int bookmark(BookmarkModel model) throws Exception {
		// TODO Auto-generated method stub
		String userUid = commonService.getUserUid();
		model.setCreatedBy(userUid);
		Object existData = new Object();
		if(model.getCommentId() != null) {
			existData = dao.getCommentById(model.getCommentId());
		}else if(model.getPostId() != null ) {
			existData = dao.getById(model.getPostId());
		}
		if (existData == null) {
			return 0;
		} else {
			if ("N".equals(model.getIsBookmark())) {
				// bookmark
				dao.bookmark(model);
			} else if ("Y".equals(model.getIsBookmark())) {
				// un bookmark
				dao.unBookmark(model);
			} else {
				return 0;
			}
		}
		return 1;
	}
	
	
	@Override
	public int like(LikeModel model) throws Exception {
		// TODO Auto-generated method stub
		String userUid = commonService.getUserUid();
		model.setCreatedBy(userUid);
		if (model.getCreatedBy() != null && (model.getCommentId() != null || model.getPostId() != null) ) {
			if ("N".equals(model.getIsLike())) {
				// add like
				dao.addLike(model);
			} else if ("Y".equals(model.getIsLike())) {
				// dis Like
				dao.unLike(model);
			} else {
				return 0;
			}
		}
		return 1;
	}
	
	@Override
	public CommentModel comment(CommentModel model) throws Exception {
		// TODO Auto-generated method stub
		String userUid = commonService.getUserUid();
		model.setCreatedBy(userUid);
		model.setUpdatedBy(userUid);
		if (model.getId() != null) {
			CommentModel optional = dao.getCommentById(model.getId());
			if (optional == null) {
				return null;
			} else {
				dao.updateComment(model);
			}
		} else {
			dao.insertComment(model);
		}
		
		//add createdNm
		UserResponse userResponse = commonService.getUserInfoByUserUid(model.getCreatedBy());
		model.setCreatedByNm(userResponse.getFullName());
		
		return model;
	}
	
	
	@Override
	public int deleteComment(Long id) throws Exception {
		// TODO Auto-generated method stub
		String userUid = commonService.getUserUid();
		CommentModel model = dao.getCommentById(id);
		model.setUpdatedBy(userUid);
		if (model == null) {
			return 0;
		} else {
			model.setCrudType( StateConstants.DELETE.getValue()  );
			
			dao.deleteComment(model);
		}
		return 1;
	}
	
	@Override
	public List<CommentModel> getListComment( AppCommentRequest request ) throws Exception {
		// TODO Auto-generated method stub
		String userUid = commonService.getUserUid();
		request.setOffset( CastUtil.castToLong(request.getPage() * request.getSize()) + request.getDifferrence() ) ;
		request.setUserUid(userUid);
		List<CommentModel> list = dao.getListComment(request);
		
		Set<String> setUserUid = new HashSet<>();
		for(CommentModel model: list) {
//			UserResponse userResponse = commonService.getUserInfoByUserUid(model.getCreatedBy());
//			model.setCreatedByNm(userResponse.getFullName());
			setUserUid.add(model.getCreatedBy());
		}
		
		List<String> paramsUid = new ArrayList<String>();
		paramsUid.addAll(setUserUid);
		List<Map> listUserInfo = commonService.getListUserInfoByUserUid(paramsUid);

		Map<String, Map<String, String>> map = new HashMap<>();

		for (int i = 0; i < listUserInfo.size(); i++) {
			Map user = listUserInfo.get(i);
			String imgPath = user.get("imgPath") == null ? null : user.get("imgPath").toString();
			Map<String, String> obj = new HashMap<>();
			if (imgPath != null && !imgPath.equals("")) {
				if (!(imgPath.startsWith("http://") || imgPath.startsWith("https://"))) {
					String imgUrl = authServer + "/api/public/getImageByName?useThumb=Y&fileName=" + imgPath;
					obj.put("imgUrl", imgUrl);
				} else {
					obj.put("imgUrl", imgPath);
				}
			}
			obj.put("fullName", user.get("fullName").toString());
			map.put(user.get("userUid").toString(), obj);
		}

		for (CommentModel model : list) {
			if (map.containsKey(model.getCreatedBy())) {
				model.setCreatedByNm(map.get(model.getCreatedBy()).get("fullName"));
				model.setImageUrl(map.get(model.getCreatedBy()).get("imgUrl"));
			} else {
				model.setCreatedByNm("Anonymous");
			}
		}
		
		return list;
	}
	
	@Override
	public PostModel getPostById(Long id) throws Exception {
		// TODO Auto-generated method stub
		String userUid = commonService.getUserUid();
		Map<String, Object> params = new HashMap<>();
		params.put("userUid",userUid);
		params.put("postId",id);
		
		PostModel model = dao.getPostById(params);
		return model;
	}
	
	@Override
	public int viewed(Long postId) throws Exception {
		PostViewedModel model = new PostViewedModel();
		model.setPostId(postId);
		String userUid = commonService.getUserUid();
		model.setViewedBy(userUid);
		BookmarkModel existPost = dao.getById(model.getPostId());
		if (existPost == null) {
			return 0;
		} else {
			int viewed = dao.checkPostViewed(model);
			if(viewed <= 0) {
				dao.viewed(model);
			}
		}
		return 1;
	}
	
	@Override
	public int increasePostView(Long postId) throws Exception {
		BookmarkModel existPost = dao.getById( postId );
		if (existPost == null) {
			return 0;
		} else {
				dao.increasePostView(postId);
		}
		return 1;
	}


	@Override
	public AppCommentModel getAppCommentData( AppCommentRequest request ) throws Exception {
		AppCommentModel data = new AppCommentModel();
		
		Long commentCnt = dao.countComment(request);
		data.setTotalComment(commentCnt);
		
		List<CommentModel> listComment = getListComment(request);
		data.setListComment(listComment);
		
		
		
		PostModel postModel = getPostById( request.getPostId() );
		data.setPostModel(postModel);
		return data;
	}


	@Override
	public DocumentPostInfo getDocumentPostInfo(Long postId) throws Exception {
		return dao.getDocumentPostInfo(postId);
	}
}
