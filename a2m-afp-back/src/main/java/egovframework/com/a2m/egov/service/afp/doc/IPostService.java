package egovframework.com.a2m.egov.service.afp.doc;

import org.springframework.transaction.annotation.Transactional;

import egovframework.com.a2m.egov.model.afp.doc.AfpPostRequest;
import egovframework.com.a2m.egov.model.afp.doc.AfpPostResponse;

public interface IPostService {
	
	@Transactional(rollbackFor = Exception.class)
	void createPost(AfpPostRequest postRequest) throws Exception;
    
	@Transactional(rollbackFor = Exception.class)
    int updatePost(AfpPostRequest postRequest) throws Exception;
    
	@Transactional(rollbackFor = Exception.class)
    int deletePostById(Long id) throws Exception;
    
	@Transactional(rollbackFor = Exception.class)
    int deletePostByMenuId(Long menuId) throws Exception;
    
    AfpPostResponse getByMenuId(Long menuId)throws Exception;
	
}
