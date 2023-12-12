package egovframework.com.a2m.egov.service.sys;


import java.util.List;
import java.util.Map;

import egovframework.com.a2m.egov.model.TsstMenu;
import egovframework.com.a2m.egov.model.TsstMenuMap;

/**
 * @author Nguyen Trung Anh
 * @created 2/22/2023
 */
public interface Sys0101Service {

    List<TsstMenu> getListMenu(Map<Object,Object> param) throws Exception;

    int insertMenu(TsstMenu menu) throws Exception;

    int updateMenu(TsstMenu menu) throws Exception;

    int deleteMenu(String menuId) throws Exception;
    
    List<TsstMenuMap> getMenuByUser(String userUid) throws Exception;

    TsstMenu getMenuById(String menuId) throws Exception;
}
