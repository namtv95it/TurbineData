package egovframework.a2m.egov.service.common;

import java.sql.SQLException;

/**
* 
* @author Nguyen Van Hau
* @since 2023. 2. 27.
* @version 1
*/

public interface ComSeqService {
	public String getSeq(String seqName) throws SQLException;
}
