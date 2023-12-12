package egovframework.com.a2m.egov.dao.afp.request;

import egovframework.com.cmm.service.impl.EgovComAbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository("RequestNewLibDao")
public class RequestNewLibDAO extends EgovComAbstractDAO {

    public List<Map<Object, Object>> getRequest(Map<Object, Object> param){
        return selectList("RequestNewLibDAO.getRequest", param);
    }

    public Map<Object, Object> getRequestById(Map<Object, Object> param){
        return selectOne("RequestNewLibDAO.getRequestById", param);
    }

    public int insertRequest(Map<Object, Object> param){
        return insert("RequestNewLibDAO.insertRequest", param);
    }

    public int insertRequestStatus(Map<Object, Object> param){
        return insert("RequestNewLibDAO.insertRequestStatus", param);
    }

    public int updateRequest(Map<Object, Object> param){
        return update("RequestNewLibDAO.updateRequest", param);
    }

    public int deletePost(Map<Object, Object> param){
        return update("RequestNewLibDAO.deletePost", param);
    }

    public int deletePostRequestStatus(String requestId){
        return delete("RequestNewLibDAO.deletePostRequestStatus", requestId);
    }

    public int updateRequestStatus (Map<Object, Object> param){
        return update("RequestNewLibDAO.updateRequestStatus", param);
    }
}
