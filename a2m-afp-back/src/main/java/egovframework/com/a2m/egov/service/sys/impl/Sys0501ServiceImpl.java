package egovframework.com.a2m.egov.service.sys.impl;

import egovframework.com.a2m.egov.dao.dashboard.DashboardDAO;
import egovframework.com.a2m.egov.dao.sys.Sys0501DAO;
import egovframework.com.a2m.egov.model.FrameCategory;
import egovframework.com.a2m.egov.model.FrameProject;
import egovframework.com.a2m.egov.service.sys.Sys0501Service;
import egovframework.com.a2m.egov.util.QuillEditorUtil;
import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Nguyen Trung Anh
 * @created 3/20/2023
 */
@Service
public class Sys0501ServiceImpl extends EgovAbstractServiceImpl implements Sys0501Service {
    @Resource
    Sys0501DAO sys0501DAO;

    @Resource
    DashboardDAO dashboardDAO;

    @Override
    public List<Map<Object, Object>> getListData(Map<Object, Object> param) throws Exception{
//        Get list depenency
        List<Map<Object,Object>> listLib = sys0501DAO.searchLib(param);
//        Get list project
        List<Map> categoryList = sys0501DAO.getCategories();
        for (int i = 0; i < categoryList.size(); i++) {
            listLib.add(categoryList.get(i));
        }
        return listLib;
    }

    @Override
    public int saveManuals(Map<Object, Object> param) throws Exception {
        String manuals = QuillEditorUtil.handleImageFromEditorContent(param.get("manuals").toString());
        param.put("manuals", manuals);
        return sys0501DAO.saveManuals(param);
    }

    @Override
    public int changeStatus(Map<Object, Object> param) throws Exception {
        return sys0501DAO.changeStatus(param);
    }

    @Override
    public Map<Object, Object> getManualsByID(Map<Object, Object> param) throws Exception {
        return sys0501DAO.getManualsByID(param);
    }
}
