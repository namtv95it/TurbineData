package egovframework.com.a2m.egov.service.dashboard;

import java.util.List;
import java.util.Map;

import egovframework.com.a2m.egov.model.afp.DashboardDto;
import egovframework.com.a2m.egov.model.afp.DashboardSearchDto;

/**
 * @author Nguyen Trung Anh
 * @created 3/24/2023
 */
public interface DashboardService {

	List<Map> getCategories();

	List<DashboardDto> getPostForDashboard(DashboardSearchDto postType) throws Exception;

}
