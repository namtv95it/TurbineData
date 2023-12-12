package egovframework.com.a2m.egov.dao.sys;

import egovframework.com.a2m.egov.model.FrameProject;
import egovframework.com.cmm.service.impl.EgovComAbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @author Nguyen Trung Anh
 * @created 3/20/2023
 */
@Repository("sys0501Dao")
public class Sys0501DAO extends EgovComAbstractDAO {

    public List<Map<Object,Object>> searchLib(Map<Object,Object> param){
        return selectList("Sys0501DAO.searchLib", param);
    }

    public List<Map<Object,Object>> listOptionLib(){
        return selectList("Sys0501DAO.listOptionLib");
    }

    public int saveManuals(Map<Object,Object> param){
        return update("Sys0501DAO.saveManuals", param);
    }

    public int changeStatus(Map<Object,Object> param) throws Exception{
        return update("Sys0501DAO.changeStatus", param);
    }

    public List<FrameProject> getFrameProject(String categoryId) throws Exception{
        return selectList("Sys0501DAO.getFrameProject", categoryId);
    }

    public List<Map> getCategories() throws Exception{
        return selectList("Sys0501DAO.getCategories");
    }

    public Map<Object,Object> getManualsByID(Map<Object,Object> param) throws Exception{
        return selectOne("Sys0501DAO.getManualsByID",param);
    }
}
