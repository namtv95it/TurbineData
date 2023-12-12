package egovframework.com.a2m.egov.dao.sys;

import egovframework.com.a2m.egov.model.TccoSTD;
import egovframework.com.cmm.service.impl.EgovComAbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @author Nguyen Trung Anh
 * @created 2/23/2023
 */
@Repository("sys0401Dao")
public class Sys0401DAO extends EgovComAbstractDAO {

    public List<TccoSTD> searchCommCd(Map<Object, Object> param) throws Exception{
        return selectList("Sys0401DAO.searchCommCd", param);
    }

    public int addCommCd(TccoSTD tccoSTD) throws Exception{
        return insert("Sys0401DAO.addCommCd", tccoSTD);
    }

    public String getMaxCommCd(String commCd) throws Exception{
        return selectOne("Sys0401DAO.getMaxCommCd", commCd);
    }

    public int getNumChildrenOfCommCd(String upCommCd) throws Exception{
        return selectOne("Sys0401DAO.getNumChildrenOfCommCd", upCommCd);
    }

    public TccoSTD getCommCdByID(String commCd) throws Exception{
        return selectOne("Sys0401DAO.getCommCdByID", commCd);
    }

    public int updateCommCd(TccoSTD tccoSTD) throws Exception{
        return update("Sys0401DAO.updateCommCd", tccoSTD);
    }

    public int deleteCommCd(String commCd) throws Exception{
        return delete("Sys0401DAO.deleteCommCd", commCd);
    }
}
