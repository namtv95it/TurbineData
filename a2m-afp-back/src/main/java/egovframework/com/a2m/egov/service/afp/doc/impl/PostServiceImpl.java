package egovframework.com.a2m.egov.service.afp.doc.impl;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import egovframework.com.a2m.egov.constants.CommonConstants;
import egovframework.com.a2m.egov.dao.afp.doc.PostDAO;
import egovframework.com.a2m.egov.model.afp.doc.AfpPostRequest;
import egovframework.com.a2m.egov.model.afp.doc.AfpPostResponse;
import egovframework.com.a2m.egov.service.afp.doc.IPostService;
import egovframework.com.a2m.egov.service.common.CommonService;

@Service
public class PostServiceImpl implements IPostService{
	
	@Autowired
	private PostDAO postDAO;
	@Autowired
	private CommonService commonService;

	@Override
	public void createPost(AfpPostRequest postRequest) throws Exception {
		postRequest.setCreatedDate(Instant.now());
		postRequest.setCreatedBy(commonService.getUserUid());
		postRequest.setCommCdPostTypeId(CommonConstants.POST_TYPE_DOCUMENTS);
		postRequest.setDeleted(false);
		
		if (postDAO.findByAfpMenuId(postRequest.getAfpMenuId()) != null) {
			postDAO.update(postRequest);
		} else {
			postDAO.insert(postRequest);
		}
	}

	@Override
	public int updatePost(AfpPostRequest postRequest) throws Exception {
		postRequest.setUpdatedBy(commonService.getUserUid());
		postRequest.setUpdatedDate(Instant.now());
		return postDAO.update(postRequest);
	}

	@Override
	public int deletePostById(Long id) throws Exception {
		return postDAO.deleteById(id);
	}

	@Override
	public AfpPostResponse getByMenuId(Long menuId) throws Exception {
		AfpPostResponse post = postDAO.findByAfpMenuId(menuId);
		if (post != null) {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("userUid", commonService.getUserUid());
			params.put("postId", post.getId());
			if ( postDAO.checkBookmark(params) > 0) {
				post.setBookmarked(true);
			} else {
				post.setBookmarked(false);
			}
		} 
		
		return post;
	}

	@Override
	public int deletePostByMenuId(Long menuId) throws Exception {
		return postDAO.deleteByAfpMenu(menuId);
	}


}
