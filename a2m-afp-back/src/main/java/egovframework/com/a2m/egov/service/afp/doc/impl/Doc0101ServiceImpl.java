package egovframework.com.a2m.egov.service.afp.doc.impl;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import egovframework.com.a2m.egov.constants.StateConstants;
import egovframework.com.a2m.egov.dao.afp.doc.Doc0101DAO;
import egovframework.com.a2m.egov.model.afp.doc.AfpMenuRequest;
import egovframework.com.a2m.egov.model.afp.doc.AfpMenuResponse;
import egovframework.com.a2m.egov.service.afp.doc.IDoc0101Service;
import egovframework.com.a2m.egov.service.afp.doc.IPostService;
import egovframework.com.a2m.egov.service.common.CommonService;

@Service
public class Doc0101ServiceImpl implements IDoc0101Service{
	
	@Autowired
	private Doc0101DAO doc0101DAO;
	@Autowired
	private CommonService commonService;
	@Autowired
	private IPostService postService;

	
	@Override
	public List<AfpMenuResponse> searchMenu(Map<String, Object> params) throws Exception {
		params.put("isDeleted", false);
		return doc0101DAO.getAfpMenus(params);
	}
	
	@Override
	public AfpMenuResponse getMenuById(Long menuId) throws Exception {
		return doc0101DAO.getAfpMenuById(menuId);
	}
	
	@Override
	public List<AfpMenuResponse> getAfpMenus(Map<String, Object> param) throws Exception {
		List<AfpMenuResponse> rs = new ArrayList<>();
		param.put("isDeleted", false);
		List<AfpMenuResponse> menus = doc0101DAO.getAfpMenus(param);
		
		for (AfpMenuResponse menu : menus) {
			if (menu.getMenuParentId() == null || !StringUtils.isNotEmpty(menu.getMenuParentId())) {
				AfpMenuResponse menuResponse = menu;
				List<AfpMenuResponse> children = convertData(menu.getId(), menus);
				menuResponse.setChildren(children);
				rs.add(menuResponse);
			}
		}
		
		return rs;
	}
	
	private List<AfpMenuResponse> convertData(String upMenu, List<AfpMenuResponse> datas) {
		List<AfpMenuResponse> rs = new ArrayList<>();
		for (AfpMenuResponse wireFrameMenuResponse : datas) {
			if ( wireFrameMenuResponse.getMenuParentId() != null && wireFrameMenuResponse.getMenuParentId().equals(upMenu)) {
				List<AfpMenuResponse> children = convertData(wireFrameMenuResponse.getId(), datas);
				wireFrameMenuResponse.setChildren(children);
				rs.add(wireFrameMenuResponse);
			}
		}
		
		return rs;
	}

	@Override
	public int insertAfpMenu(AfpMenuRequest menu) throws Exception {
		menu.setCreatedDate(Instant.now());
		menu.setCreatedBy(commonService.getUserUid());
		menu.setOrderNo(getMaxOrderNo(menu.getMenuParentId()));
		
		if (menu.getMenuParentId() != null) {
			AfpMenuResponse parentMenu = doc0101DAO.getAfpMenuById(menu.getMenuParentId());
			menu.setLev(parentMenu.getLev() + 1);
		}else {
			menu.setLev(1);
			menu.setMenuParentId(null);
		}
		return doc0101DAO.insertWireFrameMenu(menu);
	}
	
	private int getMaxOrderNo(Long menuParentId) {
		Integer maxOrderNo = null;
		try {
			maxOrderNo = doc0101DAO.getMaxOrdNo(menuParentId);
		} catch (Exception e) {
			// TODO: handle exception
		}
		maxOrderNo = maxOrderNo == null ? 1 : maxOrderNo + 1;
		return maxOrderNo;
	}

	@Override
	public int updateAfpMenu(AfpMenuRequest menu) throws Exception {
		return doc0101DAO.updateWireFrameMenu(menu);
	}

	@Override
	public void deleteAfpMenu(Long menuId) throws Exception {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("menuId", menuId);
		params.put("isDeleted", true);
		doc0101DAO.deleteAfpMenu(params);
		postService.deletePostByMenuId(menuId);
		return ;
	}

	@Override
	public void saveWireFrameMenu(List<AfpMenuRequest> afpMenuRequestList) throws Exception {
		for (AfpMenuRequest afpMenuRequest : afpMenuRequestList) {
			if (afpMenuRequest.getCrudType().equals(StateConstants.CREATE.getValue())) {
				insertAfpMenu(afpMenuRequest);
			} else if (afpMenuRequest.getCrudType().equals(StateConstants.DELETE.getValue())) {
				deleteAfpMenu(afpMenuRequest.getId());
			} else {
				updateAfpMenu(afpMenuRequest);
			}
		}
	}

	@Override
	public List<AfpMenuResponse> getAllParentMenu(Long menuId) throws Exception {
		return doc0101DAO.getAllParentMenu(menuId);
	}

	@Override
	public List<AfpMenuResponse> searchDoc(Map<String, Object> param) throws Exception {
		param.put("isDeleted", false);
		return doc0101DAO.searchDoc(param);
	}

}
