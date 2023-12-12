package egovframework.com.a2m.egov.service.sys.impl;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import egovframework.com.a2m.egov.dao.sys.Sys0201DAO;
import egovframework.com.a2m.egov.model.request.TsstRoleMenuRequest;
import egovframework.com.a2m.egov.model.request.TsstRoleRequest;
import egovframework.com.a2m.egov.model.request.TsstUserRoleRequest;
import egovframework.com.a2m.egov.model.response.TsstRoleMenuResponse;
import egovframework.com.a2m.egov.model.response.TsstRoleResponse;
import egovframework.com.a2m.egov.service.common.CommonService;
import egovframework.com.a2m.egov.service.sys.Sys0201Service;

import org.springframework.transaction.annotation.Transactional;

/**
 * @author KetHX
 * @created 2/23/2023
 */

@Service
public class Sys0201ServiceImpl extends EgovAbstractServiceImpl implements Sys0201Service {

	@Resource
	Sys0201DAO sys0201DAO;

	@Autowired
	private CommonService commonService;

	private DecimalFormat myFormatter = new DecimalFormat("000");

	@Override
	public Map<Object, Object> searchTsstRole(Integer page, Integer limit, String roleNm, String useYn) throws Exception {

		Map<Object, Object> params = new HashMap();

		params.put("roleNm", "".equals(roleNm) ? null : roleNm);
		params.put("offset", page <= 0 ? 0 : (page - 1) * (limit <= 0 ? 10 : limit));
		params.put("limit", limit <= 0 ? 10 : limit);
		
		params.put("useYn",("".equals(useYn) || "null".equals(useYn)) ? null : useYn);


		List<TsstRoleResponse> list = sys0201DAO.searchTsstRole(params);
		int count = sys0201DAO.countRole(params);

		Map result = new HashMap();
		result.put("totalElement", count);
		result.put("value", list);
		return result;
	}

	@Override
	public Map getTsstRole(String roleId) throws Exception {
		return sys0201DAO.getTsstRole(roleId);
	}

	@Override
	public int deleteTsstRole(String roleId) throws Exception {
		return sys0201DAO.deleteTsstRole(roleId);
	}

	@Override
	public int insertTsstRole(TsstRoleRequest arg) throws Exception {
		String UserUid = commonService.getUserUid();
		arg.setCreatedBy(UserUid);
		
		//set roleId
		arg.setRoleId(getMaxRoleId());

		return sys0201DAO.insertTsstRole(arg);
	}

	@Override
	public int updateTsstRole(TsstRoleRequest arg) throws Exception {
		String UserUid = commonService.getUserUid();
		arg.setUpdatedBy(UserUid);
		return sys0201DAO.updateTsstRole(arg);
	}

	@Override
	public String getMaxRoleId() throws Exception {
			
	    Map<String,Object> map =  new HashMap<String,Object>() ;
		List<String> list = new ArrayList<String>();
		
		// if there is a change to the role_id (edit in the database), then add the role_id here
		String r3rd = "R3RD";
		String role_anony = "ROLE_ANONYMOUS";
		list.add(r3rd);
		list.add(role_anony);
		
        map.put("list", list);
		
		String maxRoleId = sys0201DAO.getMaxRoleId(map);
		maxRoleId = maxRoleId.replaceAll("R", "");
		String newRoleId = "R" + myFormatter.format((Integer.parseInt(maxRoleId) + 1));
		return newRoleId;
	}

	@Override
	public TsstUserRoleRequest getTsstUserRole(TsstUserRoleRequest userRoleRequest) throws Exception {
		return sys0201DAO.getTsstUserRole(userRoleRequest);
	}

	@Override
	public List searchTsstUserRole(Map arg) throws Exception {
		return sys0201DAO.searchTsstUserRole(arg);
	}

	@Override
	public int updateTsstUserRole(TsstUserRoleRequest userRoleRequest) throws Exception {
		return sys0201DAO.updateTsstUserRole(userRoleRequest);
	}

	@Override
	public int insertTsstUserRole(TsstUserRoleRequest userRoleRequest) throws Exception {
		return sys0201DAO.insertTsstUserRole(userRoleRequest);
	}

	@Override
	public int deleteTsstUserRole(TsstUserRoleRequest userRoleRequest) throws Exception {
		return sys0201DAO.deleteTsstUserRole(userRoleRequest);
	}

	@Override
	public List searchTsstRoleMenu(Map arg) throws Exception {
		return sys0201DAO.searchTsstRoleMenu(arg);
	}

	@Override
	public TsstRoleMenuResponse getTsstRoleMenu(TsstRoleMenuRequest arg) throws Exception {
		return sys0201DAO.getTsstRoleMenu(arg);
	}

	@Override
	public int updateTsstRoleMenu(TsstRoleMenuRequest arg) throws Exception {
		return sys0201DAO.updateTsstRoleMenu(arg);
	}

	@Override
	public int insertTsstRoleMenu(TsstRoleMenuRequest arg) throws Exception {
		String userUid = commonService.getUserUid();
		arg.setCreatedBy(userUid);
		return sys0201DAO.insertTsstRoleMenu(arg);
	}

	@Override
	public List<String> getRoles(String userUid) throws Exception {
		List<Map<Object, Object>> roles = sys0201DAO.getRoles(userUid);
		Map<String, String> temp = new HashMap<String, String>();
		for (Map<Object, Object> role : roles) {
			if (role != null) {
				String s = role.get("ROLES").toString();
				String key = s.split("\\$")[0];
				if (key != null) {
					String value = temp.get(key);
					if (value == null || value.isEmpty()) {
						temp.put(key, s);
					} else {
						if (s.split("\\$").length > 1 && s.split("\\$")[1] != null && s.split("\\$")[1].contains("Y")) {
							temp.put(key, s);
						}
					}
				}
			}
		}

		List<String> result = new ArrayList<String>();

		for (Map.Entry<String, String> entry : temp.entrySet()) {
			String v = entry.getValue();
			if (v.startsWith("/")) {
				v.substring(1);
			}
			result.add(v);
		}

		return result;
	}

	@Override
	@Transactional
	public void saveRoleUser(List<TsstUserRoleRequest> requestList) throws Exception {
		for (TsstUserRoleRequest item : requestList) {
			if (item.isTouch()) {
				if (item.isChecked() == true) {
					insertTsstUserRole(item);
				} else if (item.isChecked() == false) {
					deleteTsstUserRole(item);
				}
			}
		}
	}

	@Override
	public Map<Object, Object> searchTsstMenu(Integer page, Integer limit, String menuNm) throws Exception {

		Map<Object, Object> params = new HashMap();

		params.put("menuNm", "".equals(menuNm) ? null : menuNm);
		params.put("offset", page <= 0 ? 0 : (page - 1) * (limit <= 0 ? 10 : limit));
		params.put("limit", limit <= 0 ? 10 : limit);

		List<TsstRoleResponse> list = sys0201DAO.searchAllMenu(params);
		int count = sys0201DAO.countMenu(params);

		Map result = new HashMap();
		result.put("totalElement", count);
		result.put("value", list);
		return result;
	}

	@Override
	@Transactional
	public void saveMenuRole(List<TsstRoleMenuRequest> requestList) throws Exception {

		String userUid = commonService.getUserUid();
		for (TsstRoleMenuRequest item : requestList) {
			
			boolean checkDelete = false;
			boolean delYn = "Y".equals(item.getDelYn());
			boolean excDnYn ="Y".equals(item.getExcDnYn());
			boolean modYn ="Y".equals(item.getModYn());
			boolean pntYn ="Y".equals(item.getPntYn());
			boolean readYn = "Y".equals(item.getReadYn());
			boolean wrtYn = "Y".equals(item.getWrtYn());
			boolean mngYn = "Y".equals(item.getMngYn());
			
			checkDelete = (delYn == false) && (excDnYn == false) && (modYn == false) && (pntYn == false) && (readYn == false) && (wrtYn == false) && (mngYn == false);
			
			TsstRoleMenuResponse getMenuRole = getTsstRoleMenu(item);
			if (getMenuRole != null) {
				if(checkDelete == false) {
					item.setCreatedBy(userUid);
					updateTsstRoleMenu(item);
				}else {
					deleteTsstRoleMenu(item);
				}

			} else {
				item.setCreatedBy(userUid);
				insertTsstRoleMenu(item);
			}

		}
	}
	
	@Override
	public int deleteTsstRoleMenu(TsstRoleMenuRequest arg) throws Exception {
		return sys0201DAO.deleteTsstRoleMenu(arg);
	}

}
