package egovframework.com.a2m.egov.service.afp.download.impl;

import egovframework.com.a2m.egov.constants.CommonConstants;
import egovframework.com.a2m.egov.dao.afp.download.DownloadDAO;
import egovframework.com.a2m.egov.service.common.CommonService;
import egovframework.com.a2m.egov.service.afp.download.DownloadService;
import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.*;

/**
 * @author Nguyen Trung Anh
 * @created 5/8/2023
 */

@Service
public class DownloadSerivceImpl extends EgovAbstractServiceImpl implements DownloadService {

    @Resource
    DownloadDAO downloadDAO;
    @Autowired
    CommonService commonService;

    @Override
    public List<Map<Object, Object>> getHistory() throws Exception {
        Map<Object, Object> param = new HashMap<>();
        param.put("uid", commonService.getUserUid());
        // Long sTime = System.currentTimeMillis();
        
        // edit by tiennd
        // List<Map<Object, Object>> lstHistory = downloadDAO.getHistoryDownload(param);
        List<Map<Object, Object>> lstHistory = downloadDAO.getHistoryDownloadV2(param);
        
        // Long eTime = System.currentTimeMillis();
        // System.out.println(eTime - sTime);
        for (int i = 0; i < lstHistory.size(); i++) {
            List<String> features = new ArrayList<>();
            List<Map<Object, Object>> lstLib = (List<Map<Object, Object>>) lstHistory.get(i).get("lstLibrary");
            List<Map<Object, Object>> lstHisDepend = (List<Map<Object, Object>>) lstHistory.get(i).get("downHisDependency");
            for (int j = 0; j < lstLib.size(); j++) {
                List<Map<Object, Object>> lstDepend = (List<Map<Object, Object>>) lstLib.get(j).get("lstDependency");
                for (int k = 0; k < lstHisDepend.size(); k++) {
                    for (int l = 0; l < lstDepend.size(); l++) {
                        if (lstLib.get(j).get("optionType").toString().equals(CommonConstants.OPTION_TYPE_DEPEND_RADIO) && lstHisDepend.get(k).get("keyName").toString().equals(lstLib.get(j).get("libName").toString())) {
                            if (lstHisDepend.get(k).get("value").toString().equals(lstDepend.get(l).get("dependValue").toString())) {
                                features.add(lstDepend.get(l).get("dependName").toString());
                            }
                        }
                        if (lstLib.get(j).get("optionType").toString().equals(CommonConstants.OPTION_TYPE_DEPEND_CHECK)) {
                            if (lstHisDepend.get(k).get("keyName").toString().equals(lstDepend.get(l).get("dependValue").toString())) {
                                if (lstHisDepend.get(k).get("value").toString().equals("true")) {
                                    features.add(lstDepend.get(l).get("dependName").toString());
                                }
                            }
                        }
                    }
                }


            }
            lstHistory.get(i).put("features", features);
        }
        return lstHistory;
    }

    @Override
    @Transactional
    public void saveHistory(Map<Object, Object> param) throws Exception {
        Map<Object, Object> downloadHistory = new HashMap<>();

        try {
            Map<Object, Object> project = downloadDAO.checkExitsProject(param.get("projectId").toString());
            if (project == null) {
                throw new RuntimeException("ProjectId not exits");
            }
        } catch (Exception e) {
            throw new RuntimeException("ProjectId not exits");
        }

        String projectName = "";
        if (param.containsKey(CommonConstants.KEY_PROJECT_NAME)) {
            projectName = param.get(CommonConstants.KEY_PROJECT_NAME).toString();
        }
        if ("".equals(projectName)) {
            throw new RuntimeException("project name is not empty");
        }
        param.remove(CommonConstants.KEY_PROJECT_NAME);

        downloadHistory.put("projectId", param.get("projectId"));
        downloadHistory.put("downloadBy", commonService.getUserUid());
        downloadHistory.put("downloadDate", new Date());
        downloadHistory.put("projectNameCus", projectName);
        downloadDAO.saveDownloadHistory(downloadHistory);
        for (Map.Entry<Object, Object> entry : param.entrySet()) {
            if (!"projectId".equals(entry.getKey())) {
                Map<Object, Object> dependency = new HashMap<>();
                dependency.put("keyName", entry.getKey().toString());
                dependency.put("value", entry.getValue().toString());
                dependency.put("historyId", downloadHistory.get("id"));
                downloadDAO.saveDownloadHisDependency(dependency);
            }
        }
    }

    @Override
    public Map<Object, Object> getProjectById(String projectId) throws Exception {
        List<Map<Object, Object>> lstLib = downloadDAO.getLstLib();
        Map<Object, Object> project = downloadDAO.getProjectById(projectId);
        List<Map<Object, Object>> lstLibOfProject = new ArrayList<>();
        for (int i = 0; i < lstLib.size(); i++) {
            if (lstLib.get(i).get("projectId").toString().equals(project.get("id").toString())) {
                lstLibOfProject.add(lstLib.get(i));
            }
        }
        project.put("lstLib", lstLibOfProject);
        return project;
    }

    @Override
    public Map<Object, Object> getDependManualsById(String dependId) throws Exception {
        return downloadDAO.getDependManualsById(dependId);
    }
}
