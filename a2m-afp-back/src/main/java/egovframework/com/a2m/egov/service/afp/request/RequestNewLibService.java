package egovframework.com.a2m.egov.service.afp.request;

import java.util.List;
import java.util.Map;

public interface RequestNewLibService {
    List<Map<Object, Object>> lstRequest(String keySearch) throws Exception;

    Map<Object, Object> getRequestById(String requestId) throws Exception;
    int insertRequest(Map<Object, Object> param) throws Exception;

    int updateRequest(Map<Object, Object> param) throws Exception;

    int deleteRequest(String requestId) throws Exception;

    int updateRequestStatus(Map<Object,Object> param) throws Exception;
}
