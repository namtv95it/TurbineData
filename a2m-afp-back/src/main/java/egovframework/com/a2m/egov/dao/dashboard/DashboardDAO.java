package egovframework.com.a2m.egov.dao.dashboard;

import egovframework.com.a2m.egov.model.FrameCategory;
import egovframework.com.a2m.egov.model.FrameTag;
import egovframework.com.a2m.egov.model.afp.DashboardDto;
import egovframework.com.a2m.egov.model.FrameProject;
import egovframework.com.cmm.service.impl.EgovComAbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @author Nguyen Trung Anh
 * @created 3/24/2023
 */
@Repository("dashboardDao")
public class DashboardDAO extends EgovComAbstractDAO {

	public List<FrameCategory> getFrameCategory() throws Exception {
		return selectList("DashboardDAO.getFrameCategory");
	}

	public List<FrameProject> getFrameProject(String categoryId) throws Exception {
		return selectList("DashboardDAO.getFrameProject", categoryId);
	}

	public List<FrameTag> getFramTag(String projectId) throws Exception {
		return selectList("DashboardDAO.getTagInProject", projectId);
	}

	public List<Map> getCategories() {
		return selectList("DashboardDAO.getCategories");
	}

	public List<DashboardDto> getPostForDashboard() throws Exception{
		return selectList("DashboardDAO.getPostForDashboard");
	}

	public List<DashboardDto> getProForDashboard() throws Exception{
		return selectList("DashboardDAO.getProForDashboard");
	}

	public List<DashboardDto> getDocForDashboard() throws Exception{
		return selectList("DashboardDAO.getDocForDashboard");
	}

	public List<DashboardDto> getAnnForDashboard() throws Exception{
		return selectList("DashboardDAO.getAnnForDashboard");
	}

	public List<DashboardDto> getThrForDashboard() throws Exception{
		return selectList("DashboardDAO.getThrForDashboard");
	}

	public List<DashboardDto> getListThreadLike() throws Exception {
		return selectList("DashboardDAO.getListThresdLike");
	}
}
