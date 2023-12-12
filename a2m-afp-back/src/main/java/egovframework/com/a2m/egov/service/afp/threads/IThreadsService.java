package egovframework.com.a2m.egov.service.afp.threads;

import java.util.List;
import java.util.Map;

import egovframework.com.a2m.egov.model.afp.doc.AfpMenuResponse;
import egovframework.com.a2m.egov.model.afp.threads.ThreadsModel;
import egovframework.com.a2m.egov.model.afp.threads.ThreadsSearch;

/**
 * @author kethx
 *
 * @created Apr 18, 2023
 */
public interface IThreadsService {

	List<ThreadsModel> getList(ThreadsSearch arg) throws Exception;

	List<AfpMenuResponse> getAfpMenus(Map<String,Object> param) throws Exception;
}
