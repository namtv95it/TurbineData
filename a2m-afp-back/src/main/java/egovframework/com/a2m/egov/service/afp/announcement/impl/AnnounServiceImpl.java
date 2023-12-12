/**
 * 
 */
package egovframework.com.a2m.egov.service.afp.announcement.impl;

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
import egovframework.com.a2m.egov.dao.afp.announ.AnnounDAO;
import egovframework.com.a2m.egov.model.afp.ann.AnnounModel;
import egovframework.com.a2m.egov.model.afp.ann.AnnounSearch;
import egovframework.com.a2m.egov.model.response.UserResponse;
import egovframework.com.a2m.egov.service.afp.announcement.IAnnounService;
import egovframework.com.a2m.egov.service.common.CommonService;

/**
 * @author ThanhNV
 *
 * 21 thg 4, 2023
 */

@Service
public class AnnounServiceImpl implements IAnnounService{
	@Autowired
	private AnnounDAO dao;
	
	@Autowired
	private CommonService commonService;
	
	@Value("${auth.api.url}")
	private String authServer;

	@Override
	public List<AnnounModel> getList(AnnounSearch args) throws Exception {
		// TODO Auto-generated method stub
		List<AnnounModel> list = dao.getList(args);
		
		Set<String> setUserUid = new HashSet<>();
		for(AnnounModel model: list) {
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

		for (AnnounModel model : list) {
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
	public AnnounModel getById(Long id) throws Exception {
		Map<String, Object> params = new HashMap<>();
		String userUid = commonService.getUserUid();
		params.put("userUid", userUid);
		params.put("postId", id);
		AnnounModel detail = dao.getById(params);
		
		UserResponse u = commonService.getUserInfoByUserUid(detail.getCreatedBy());
		detail.setCreatedByNm( u.getFullName() != null ? u.getFullName() : "Anonymous" );
		detail.setImageUrl(authServer + "/api/public/getImageByName?useThumb=Y&fileName=" + u.getImgPath());
		
		return detail;
	}
	
	@Override
	public int save(AnnounModel model) throws Exception {
		// TODO Auto-generated method stub
		String userUid = commonService.getUserUid();
		model.setCreatedBy(userUid);
		model.setUpdatedBy(userUid);
		if (model.getId() != null) {
			AnnounModel optional = dao.checkExist(model.getId());
			if (optional == null) {
				return 0;
			} else {
				dao.update(model);
			}
		} else {
			dao.insert(model);
		}
		return 1;
	}
	
	@Override
	public int delete(Long id) throws Exception {
		// TODO Auto-generated method stub
		String userUid = commonService.getUserUid();
		AnnounModel model = dao.checkExist(id);
		model.setUpdatedBy(userUid);
		if (model == null) {
			return 0;
		} else {
			model.setCrudType( StateConstants.DELETE.getValue()  );
			
			dao.delete(model);
		}
		return 1;
	}

	@Override
	public Map getAnnounNotiInfo() throws Exception {
		// TODO Auto-generated method stub
		String userUid = commonService.getUserUid();
		Long lastAnnounId = dao.getLastAnnounId();
		Long lastViewId = dao.getAnnounNotiInfo(userUid);
		
		Map<Object, Object> result = new HashMap<>();
		result.put("lastAnnounId", lastAnnounId);
		result.put("lastViewId", lastViewId != null ? lastViewId : 0);
		return result;
	}

	@Override
	public Map remakeAnnounNoti() throws Exception {
		String userUid = commonService.getUserUid();
		Long lastAnnounId = dao.getLastAnnounId();
		
		Map<Object, Object> params = new HashMap<>();
		params.put("userUid", userUid);
		params.put("lastAnnounId", lastAnnounId);
		dao.remakeAnnounNoti(params);
		
		Map<Object, Object> result = new HashMap<>();
		result.put("lastAnnounId", lastAnnounId);
		result.put("lastViewId", lastAnnounId);
		return result;
	}
}
