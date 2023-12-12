/**
 * 
 */
package egovframework.com.a2m.egov.service.sam;

import java.util.List;
import java.util.Map;

import egovframework.com.a2m.egov.model.TccoSTD;
import egovframework.com.a2m.egov.model.sam.Sam0101Model;

/**
 * @author tiennd
 *
 * @created Feb 28, 2023
 */
public interface ISam0101Service {
	int save(Sam0101Model sam0101Model) throws Exception;

	Map<Object, Object> getList(Integer page, Integer limit, String category, 
			String topic, String title, String date, String columnName, String sortType) throws Exception;

	int delete(Long id) throws Exception;
	
	List<TccoSTD> getTccoStd(String upCommCd) throws Exception;
	
	TccoSTD getTccoStdByValueConfig(String valueConfig) throws Exception;
}
