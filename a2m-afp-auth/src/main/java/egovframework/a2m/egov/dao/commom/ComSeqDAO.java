package egovframework.a2m.egov.dao.commom;

import java.sql.SQLException;

import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.stereotype.Repository;

/**
* 
* @author Nguyen Van Hau
* @since 2023. 2. 21.
* @version 1
*/

@Repository("comSeqDAO")
public class ComSeqDAO extends EgovAbstractMapper{
	
	public Object setSeq(String seqName) throws SQLException {
		return selectOne("comSeqDAO.setSeq", seqName);
	}
	
	public String getSeq() throws SQLException {
		return selectOne("comSeqDAO.getSeq");
	}
}
