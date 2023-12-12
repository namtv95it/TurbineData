package egovframework.com.a2m.egov.service.sys;

import java.util.List;
import java.util.Map;

/**
 * @author Nguyen Trung Anh
 * @created 3/20/2023
 */
public interface Sys0501Service {

    public List<Map<Object, Object>> getListData(Map<Object,Object> param) throws Exception;

    public int saveManuals(Map<Object,Object> param) throws Exception;

    int changeStatus(Map<Object,Object> param) throws Exception;

    Map<Object,Object> getManualsByID(Map<Object,Object> param) throws Exception;
}
