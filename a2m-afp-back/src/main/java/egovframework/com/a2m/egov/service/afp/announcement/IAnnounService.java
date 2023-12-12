/**
 * 
 */
package egovframework.com.a2m.egov.service.afp.announcement;

import java.util.List;
import java.util.Map;

import egovframework.com.a2m.egov.model.afp.ann.AnnounModel;
import egovframework.com.a2m.egov.model.afp.ann.AnnounSearch;

/**
 * @author ThanhNV
 *
 * 21 thg 4, 2023
 */
public interface IAnnounService {
	int save(AnnounModel threadsModel) throws Exception;

	List<AnnounModel> getList(AnnounSearch arg) throws Exception;
	
	Map getAnnounNotiInfo() throws Exception;
	
	Map remakeAnnounNoti() throws Exception;
	
	int delete(Long id) throws Exception;

	AnnounModel getById(Long id)throws Exception;
}
