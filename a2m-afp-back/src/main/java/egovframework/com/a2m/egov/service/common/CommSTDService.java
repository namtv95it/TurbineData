package egovframework.com.a2m.egov.service.common;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import egovframework.com.a2m.egov.dao.common.CommSTDDAO;
import egovframework.com.a2m.egov.model.TccoSTD;

/**
 * @author KetHX
 * @created 2/23/2023
 */
@Service
public class CommSTDService {

	@Autowired
	private CommSTDDAO comStdDAO;

	public String getCommNm(Map<Object, Object> agr) {
		return comStdDAO.getCommNm(agr);
	}

	public List<TccoSTD> getTccoStd(String upCommCd) throws Exception {
		return comStdDAO.getTccoStd(upCommCd);
	}
}
