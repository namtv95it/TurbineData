package egovframework.com.a2m.egov.dao.common;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.stereotype.Repository;

import egovframework.com.a2m.egov.model.TccoSTD;

/**
 * @author KetHX
 * @created 2/23/2023
 */
@Repository("commSTDDAO")
public class CommSTDDAO extends EgovAbstractMapper {

	public String getCommNm(Map<Object, Object> agr) {
		return selectOne("CommSTDDAO.getCommNmByCommCd", agr);
	}

	public List<TccoSTD> getTccoStd(String upCommCd) throws Exception {
		return selectList("CommSTDDAO.getTccoStd", upCommCd);
	}
}
