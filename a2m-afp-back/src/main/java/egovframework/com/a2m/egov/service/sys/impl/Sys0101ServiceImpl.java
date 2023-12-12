package egovframework.com.a2m.egov.service.sys.impl;

import egovframework.com.a2m.egov.constants.CommonConstants;
import egovframework.com.a2m.egov.dao.sys.Sys0101DAO;
import egovframework.com.a2m.egov.service.common.CommonService;
import org.apache.commons.lang3.StringUtils;
import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import egovframework.com.a2m.egov.model.TsstMenu;
import egovframework.com.a2m.egov.model.TsstMenuMap;
import egovframework.com.a2m.egov.service.sys.Sys0101Service;

import javax.annotation.Resource;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @author Nguyen Trung Anh
 * @created 2/22/2023
 */
@Service
public class Sys0101ServiceImpl extends EgovAbstractServiceImpl implements Sys0101Service {
	private DecimalFormat myFormatter = new DecimalFormat("00");
	@Resource
	Sys0101DAO sys0101DAO;

	@Autowired
	CommonService commonService;
	
	@Override
	public List<TsstMenu> getListMenu(Map<Object, Object> param) throws Exception {

		return sys0101DAO.getLstMenu(param);
	}

	@Override
	public int insertMenu(TsstMenu arg) throws Exception {
		String menuId = getMenuId(arg);
		arg.setMenuId(menuId);
		arg.setCreatedBy(commonService.getUserUid());
		Integer maxOrdNo = getMaxOrdNo();
		/** if is the first menu, order no = 1 else generate order no of new menu */
		maxOrdNo = maxOrdNo == null ? 1 : maxOrdNo + 1;
		arg.setOrdNo(maxOrdNo);

		/**
		 * if this new menu don't have parent menu, its lev = 1 else its lev = lev of
		 * parent menu + 1
		 */
		if (!StringUtils.isNotEmpty(arg.getUpMenuId())) {
			arg.setLev(1);
			arg.setUpMenuId(null);
		} else {
			TsstMenu upMenu = sys0101DAO.getMenuByID(arg.getUpMenuId());

			if(upMenu.getLev() < CommonConstants.MAX_MENU_LEV){
				arg.setLev(upMenu.getLev() + 1);
			}else {
//				throw new MaxLevMenuException("Lev of menu is max!");
				return -1;
			}
		}
		return sys0101DAO.insertMenu(arg);
	}

	@Override
	public int updateMenu(TsstMenu menu) throws Exception {
		menu.setUpdatedBy(commonService.getUserUid());
		return sys0101DAO.updateMenu(menu);
	}

	@Override
	public int deleteMenu(String menuId) throws Exception {
		return sys0101DAO.deleteMenu(menuId);
	}

	private String getMaxMenuId(String menuId) throws Exception {
		return sys0101DAO.getMaxMenuId(menuId);
	}

	private int getMaxOrdNo() throws Exception {
		return sys0101DAO.getMaxOrdNo();
	}

	private int getNumChildrenOfMenu(String upMenuId) throws Exception {
		return sys0101DAO.getNumChildrenOfMenu(upMenuId);
	}

	/** Generate ID of new menu */
	public String getMenuId(TsstMenu arg) throws Exception {
		String upMenuId = arg.getUpMenuId();

		String menuId = "";
		if (StringUtils.isNotEmpty(upMenuId)) {
			/** Get number child menu of up menu to set id of new menu */
			int numOfChild = getNumChildrenOfMenu(upMenuId);
			if (numOfChild == 0) {
				menuId = upMenuId + "_01";
			} else {
				String maxChild = getMaxMenuId(upMenuId);
				int numberEndID = Integer.parseInt(maxChild.substring(getPosToGenChild(maxChild), maxChild.length())) + 1;
				menuId = upMenuId + "_" + myFormatter.format(numberEndID);
			}
		} else {
			String maxMenuId = getMaxMenuId(null);
			if (StringUtils.isNotEmpty(maxMenuId)) {
				menuId = "MNU" + "_" + myFormatter.format(Integer.parseInt(maxMenuId.substring(4, 6)) + 1);
			} else {
				menuId = "MNU_01";
			}
		}
		return menuId;
	}

//	this func to get position of number in maxchildrenId
	int getPosToGenChild(String maxMenuID){
		int pos = 0;
		for (int i = 0; i < maxMenuID.length(); i++) {
			if(maxMenuID.charAt(i) == '_'){
				pos = i +1;
			}

		}
		return pos;
	}

	@Override
	public List<TsstMenuMap> getMenuByUser(String userUid) throws Exception {
		List<TsstMenuMap> menus = sys0101DAO.getMenuByUser(userUid, CommonConstants.USE_Y);
//		Map<String, String> map = new HashMap<String, String>();
//		for (int i = 0; i < menus.size(); i++) {
//			TsstMenuMap menu = menus.get(i);
//			menu.setTsstMenuDtos(new ArrayList<>());
//			map.put(menu.getMenuId(), menu.getMenuId());
//			if (menu.getTsstMenu() != null && !map.containsKey(menu.getTsstMenu().getMenuId())) {
//				TsstMenuMap temp = menu.getTsstMenu();
//				temp.setTsstMenu(sys0101DAO.selectParent(temp.getMenuId()));
//				menus.add(temp);
//				map.put(menu.getTsstMenu().getMenuId(), menu.getTsstMenu().getMenuId());
//			}
//		}
		
		Map<String, Integer> map = new HashMap<String, Integer>();
		for (int i = 0; i < menus.size(); i++) {
			TsstMenuMap menu = menus.get(i);
			menu.setTsstMenuDtos(new ArrayList<>());
			map.put(menu.getMenuId(), i);
			if (menu.getTsstParrentMenuId() != null && !menu.getTsstParrentMenuId().isEmpty() && map.containsKey(menu.getTsstParrentMenuId())) {
				List<TsstMenuMap> lists = menus.get(map.get(menu.getTsstParrentMenuId())).getTsstMenuDtos();
				lists.add(menu);
				menus.get(map.get(menu.getTsstParrentMenuId())).setTsstMenuDtos(lists);
			}
		}
		
//		Collections.sort(menus, new Comparator<TsstMenuMap>() {
//			@Override
//			public int compare(TsstMenuMap o1, TsstMenuMap o2) {
//				return o1.getMenuId().compareTo(o2.getMenuId());
//			}
//		});

		return menus.stream().filter(e -> e.getLev() == 1).collect(Collectors.toList());
	}

	@Override
	public TsstMenu getMenuById(String menuId) throws Exception {
		return sys0101DAO.getMenuByID(menuId);
	}
}
