package egovframework.com.a2m.egov.service.afp.download;

import java.util.List;
import java.util.Map;

/**
 * @author Nguyen Trung Anh
 * @created 5/8/2023
 */
public interface DownloadService {
    List<Map<Object, Object>> getHistory() throws Exception;

    void saveHistory(Map<Object, Object> param) throws Exception;

    Map<Object, Object> getProjectById(String projectId) throws Exception;

    Map<Object, Object> getDependManualsById(String dependId) throws Exception;
}
