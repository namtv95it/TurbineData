package egovframework.com.a2m.egov.dao.afp.threads;

import java.util.List;
import java.util.Map;

import egovframework.com.a2m.egov.model.afp.doc.AfpMenuResponse;
import org.springframework.stereotype.Repository;

import egovframework.com.a2m.egov.model.afp.threads.ThreadsModel;
import egovframework.com.a2m.egov.model.afp.threads.ThreadsSearch;
import egovframework.com.cmm.service.impl.EgovComAbstractDAO;

/**
 * @author kethx
 *
 * @created Apr 18, 2023
 */
@Repository("threadsDao")
public class ThreadsDAO  extends EgovComAbstractDAO {
	
	public List<ThreadsModel> getList(ThreadsSearch param) throws Exception {
		return selectList("threadsDao.getList", param);
	}

	public List<AfpMenuResponse> getAfpMenus(Map<String, Object> param) throws Exception {
		return selectList("threadsDao.getAfpMenus", param);
	}
}
