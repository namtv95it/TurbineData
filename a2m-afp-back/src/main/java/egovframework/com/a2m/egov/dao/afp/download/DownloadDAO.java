package egovframework.com.a2m.egov.dao.afp.download;

import egovframework.com.a2m.egov.model.Library;
import egovframework.com.cmm.service.impl.EgovComAbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @author Nguyen Trung Anh
 * @created 5/8/2023
 */
@Repository("downloadDao")
public class DownloadDAO extends EgovComAbstractDAO {

    public List<Map<Object, Object>> getHistoryDownload(Map<Object, Object> param) throws Exception {
        return selectList("DownloadDAO.getHistoryDownload", param);
    }

    public Library getLibraryByLibName(String libName) throws Exception {
        return selectOne("DownloadDAO.getLibraryByLibName", libName);
    }

    public Map<Object, Object> checkExitsProject(String id) throws Exception {
        return selectOne("DownloadDAO.checkExitsProject", id);
    }

    public int saveDownloadHistory(Map<Object, Object> downloadHistory) throws Exception {
        return insert("DownloadDAO.saveDownloadHistory", downloadHistory);
    }

    public int saveDownloadHisDependency(Map<Object, Object> dependency) throws Exception {
        return insert("DownloadDAO.saveDownloadHisDependency", dependency);
    }

    public Map<Object, Object> getProjectById(String projectId) throws Exception {
        return selectOne("DownloadDAO.getProjectById", projectId);
    }

    public List<Map<Object, Object>> getLstLib() throws Exception {
        return selectList("DownloadDAO.getLstLib");
    }

    public Map<Object, Object> getDependManualsById(String dependId) throws Exception {
        return selectOne("DownloadDAO.getDependManualsById", dependId);
    }
    
    public List<Map<Object, Object>> getHistoryDownloadV2(Map<Object, Object> param) throws Exception {
        return selectList("DownloadDAO.getHistoryDownloadV2", param);
    }
}
