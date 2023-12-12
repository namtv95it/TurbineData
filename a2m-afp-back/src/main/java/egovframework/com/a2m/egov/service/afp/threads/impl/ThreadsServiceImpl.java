package egovframework.com.a2m.egov.service.afp.threads.impl;

import java.util.*;

import egovframework.com.a2m.egov.model.afp.doc.AfpMenuResponse;
import org.apache.commons.lang3.StringUtils;
import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

import egovframework.com.a2m.egov.dao.afp.threads.ThreadsDAO;
import egovframework.com.a2m.egov.model.afp.threads.ThreadsModel;
import egovframework.com.a2m.egov.model.afp.threads.ThreadsSearch;
import egovframework.com.a2m.egov.service.afp.threads.IThreadsService;
import egovframework.com.a2m.egov.service.common.CommonService;

/**
 * @author kethx
 *
 * @created Apr 18, 2023
 */
@Service
public class ThreadsServiceImpl  extends EgovAbstractServiceImpl implements IThreadsService{

	@Value("${auth.api.url}")
	private String authServer;

	@Autowired
	private ThreadsDAO threadsDao;
	
	@Autowired
	private CommonService commonService;

	@Override
	public List<ThreadsModel> getList(ThreadsSearch arg) throws Exception {

		String userUid = commonService.getUserUid();
		arg.setUserUid(userUid);
		List<ThreadsModel> listModel = threadsDao.getList(arg);
		Set<String> setUserUid = new HashSet<>();

		for (ThreadsModel model : listModel) {
			setUserUid.add(model.getCreatedBy());
		}

		List<String> paramsUid = new ArrayList<String>();
		paramsUid.addAll(setUserUid);
		List<Map> list = commonService.getListUserInfoByUserUid(paramsUid);

		Map<String, Map<String, String>> map = new HashMap<>();

		for (int i = 0; i < list.size(); i++) {
			Map user = list.get(i);
			String imgPath = user.get("imgPath") == null ? null : user.get("imgPath").toString();
			Map<String, String> obj = new HashMap();
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

		for (ThreadsModel model : listModel) {
			if (map.containsKey(model.getCreatedBy())) {
				model.setCreatedByNm(map.get(model.getCreatedBy()).get("fullName"));
				model.setImageUrl(map.get(model.getCreatedBy()).get("imgUrl"));
			} else {
				model.setCreatedByNm("Anonymous");
			}
		}

		return listModel;
	}

	@Override
	public List<AfpMenuResponse> getAfpMenus(Map<String, Object> param) throws Exception {
		List<AfpMenuResponse> rs = new ArrayList<>();
		param.put("isDeleted", false);
		List<AfpMenuResponse> menus = threadsDao.getAfpMenus(param);

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

}
