package egovframework.com.a2m.egov.dao.common;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.stereotype.Repository;

/**
 * @author KetHX
 */
@Repository("tccoFileDAO")
public class TccoFileDAO extends EgovAbstractMapper{

	public List<Map<Object, Object>> findBySequences(List<String> fileSequences) throws Exception{
		return selectList("TccoFileDAO.findBySequences", fileSequences);
	}

	public int insert(Map<Object, Object> data) throws Exception{
		return insert("TccoFileDAO.insert", data);
	}
}
