package egovframework.a2m.egov.service.common.impl;

import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import egovframework.a2m.egov.dao.commom.ComSeqDAO;
import egovframework.a2m.egov.service.common.ComSeqService;

@Service
public class ComSeqServiceImpl implements ComSeqService{

	@Autowired
	private ComSeqDAO dao;
	
	@Override
	public String getSeq(String seqName) throws SQLException {
		dao.setSeq(seqName);
		return dao.getSeq();
	}

}
