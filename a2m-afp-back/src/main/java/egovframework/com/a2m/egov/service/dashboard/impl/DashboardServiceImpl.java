package egovframework.com.a2m.egov.service.dashboard.impl;

import egovframework.com.a2m.egov.dao.dashboard.DashboardDAO;
import egovframework.com.a2m.egov.model.afp.DashboardDto;
import egovframework.com.a2m.egov.model.afp.DashboardSearchDto;
import egovframework.com.a2m.egov.service.dashboard.DashboardService;
import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @author Nguyen Trung Anh
 * @created 3/24/2023
 */
@Service
public class DashboardServiceImpl extends EgovAbstractServiceImpl implements DashboardService {
	@Resource
	DashboardDAO dashboardDAO;

	@Override
	public List<Map> getCategories() {
		return dashboardDAO.getCategories();
	}

	@Override
	public List<DashboardDto> getPostForDashboard(DashboardSearchDto postType) throws Exception {
		// TODO Auto-generated method stub

		List<DashboardDto> dashboards = new ArrayList<>();

		switch (postType) {
			case ALL:{
				dashboards = dashboardDAO.getPostForDashboard();
				break;
			}
			case PROJECTS:{
				dashboards = dashboardDAO.getProForDashboard();
				break;
			}
			case DOCUMENTS: {
				dashboards = dashboardDAO.getDocForDashboard();
				break;
			}
			case THREADS:{
				dashboards = dashboardDAO.getThrForDashboard();
				break;
			}
			case ANNOUNCEMENTS:{
				dashboards = dashboardDAO.getAnnForDashboard();
				break;
			}
			case MOST_LIKE_THREADS: {
				dashboards = dashboardDAO.getListThreadLike();
				break;
			}
			default: {
				break;
			}
		}

		return dashboards;
	}

}
