package egovframework.com.a2m.egov.dao.common;

import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.stereotype.Repository;

/**
 * @author KetHX
 * @created 2/23/2023
 */
@Repository("comSeqDAO")
public class ComSeqDAO extends EgovAbstractMapper{
	
	public Object setSeq(String seqName) throws Exception {
		return selectOne("ComSeqDAO.setSeq", seqName);
	}
	
	public String getSeq() throws Exception {
		return selectOne("ComSeqDAO.getSeq");
	}
}
