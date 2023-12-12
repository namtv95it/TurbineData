package egovframework.com.a2m.egov.service.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import egovframework.com.a2m.egov.dao.common.ComSeqDAO;

/**
 * @author KetHX
 * @created 2/23/2023
 */
@Service
public class ComSeqService {

	@Autowired
	private ComSeqDAO comSeqDAO;
	
	public String getSeq(String seqName) throws Exception {
		comSeqDAO.setSeq(seqName);
		return comSeqDAO.getSeq();
	}

}
