package egovframework.com.a2m.egov.service.afp.doc;

import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional;

import egovframework.com.a2m.egov.model.afp.doc.AfpMenuRequest;
import egovframework.com.a2m.egov.model.afp.doc.AfpMenuResponse;

public interface IDoc0101Service {
	
	List<AfpMenuResponse> searchMenu(Map<String, Object> params) throws Exception;
	
	List<AfpMenuResponse> getAfpMenus(Map<String,Object> param) throws Exception;
	
	AfpMenuResponse getMenuById(Long menuId) throws Exception;
	
	@Transactional(rollbackFor = Exception.class)
	void saveWireFrameMenu(List<AfpMenuRequest> wireFrameMenuRequestList) throws Exception;

	@Transactional(rollbackFor = Exception.class)
    int insertAfpMenu(AfpMenuRequest menu) throws Exception;

	@Transactional(rollbackFor = Exception.class)
    int updateAfpMenu(AfpMenuRequest menu) throws Exception;

	@Transactional(rollbackFor = Exception.class)
    void deleteAfpMenu(Long menuId) throws Exception;
	
	List<AfpMenuResponse> getAllParentMenu(Long menuId) throws Exception;

	List<AfpMenuResponse> searchDoc(Map<String,Object> param) throws Exception;

}
