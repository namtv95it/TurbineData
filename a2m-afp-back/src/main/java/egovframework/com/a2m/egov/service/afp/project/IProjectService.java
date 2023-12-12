/**
 * 
 */
package egovframework.com.a2m.egov.service.afp.project;

import java.util.List;

import egovframework.com.a2m.egov.model.afp.project.ProjectDto;
import egovframework.com.a2m.egov.model.afp.project.ProjectSearchDto;

/**
 * @author tiennd
 *
 * @created Apr 18, 2023
 */
public interface IProjectService {

	List<ProjectDto> getList(ProjectSearchDto args) throws Exception;

	int save(ProjectDto projectDto) throws Exception;

	int delete(Long id) throws Exception;
	
	int bookmark(ProjectDto projectDto) throws Exception;
	
	int getProjectCounter() throws Exception;
	
	ProjectDto getProjectById(Long id) throws Exception;
}
