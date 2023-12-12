/**
 * 
 */
package egovframework.com.a2m.egov.dao.afp.project;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.com.a2m.egov.model.afp.project.ProjectDto;
import egovframework.com.a2m.egov.model.afp.project.ProjectSearchDto;
import egovframework.com.cmm.service.impl.EgovComAbstractDAO;

/**
 * @author tiennd
 *
 * @created Apr 18, 2023
 */

@Repository
public class ProjectDAO extends EgovComAbstractDAO {

	public List<ProjectDto> getList(ProjectSearchDto param) throws Exception {
		return selectList("ProjectDAO.search", param);
	}

	public ProjectDto getById(Long id) throws Exception {
		return selectOne("ProjectDAO.getPostById", id);
	}

	public int insertPostDetail(ProjectDto model) throws Exception {
		return insert("ProjectDAO.insertPostDetail", model);
	}

	public int insert(ProjectDto model) throws Exception {
		return insert("ProjectDAO.insert", model);
	}

	public int updatePostDetail(ProjectDto model) throws Exception {
		return update("ProjectDAO.updatePostDetail", model);
	}

	public int update(ProjectDto model) throws Exception {
		return update("ProjectDAO.update", model);
	}
	
	public int delete(ProjectDto model) throws Exception {
		return update("ProjectDAO.update", model);
	}
	
	public int bookmark(ProjectDto model) throws Exception {
		return insert("ProjectDAO.bookmark", model);
	}
	
	public int unBookmark(ProjectDto model) throws Exception {
		return delete("ProjectDAO.unBookmark", model);
	}
	
	public ProjectDto getProjectById(Map args) throws Exception {
		return selectOne("ProjectDAO.getProjectById", args);
	}
}
