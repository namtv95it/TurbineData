/**
 * 
 */
package egovframework.com.a2m.egov.controllers.afp.project;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import egovframework.com.a2m.egov.model.afp.project.ProjectDto;
import egovframework.com.a2m.egov.model.afp.project.ProjectSearchDto;
import egovframework.com.a2m.egov.model.afp.project.ProjectTypeDto;
import egovframework.com.a2m.egov.model.response.AjaxResult;
import egovframework.com.a2m.egov.service.afp.project.IProjectService;

/**
 * @author tiennd
 *
 * @created Apr 18, 2023
 */

@RestController
@RequestMapping("api/pro/pro0101")
public class ProjectController {

	@Autowired
	private IProjectService service;

	@GetMapping("search.exclude")
	public ResponseEntity<AjaxResult> search(@RequestParam String keySearch, @RequestParam ProjectTypeDto typeSearch) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			ProjectSearchDto projectSearch = new ProjectSearchDto("", keySearch, typeSearch.type());
			List<ProjectDto> list = service.getList(projectSearch);
			ajaxResult.setResponseData(list);
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			ajaxResult.setMessage("Search project fail !!!");
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}

	@PostMapping("save.exclude")
	public ResponseEntity<AjaxResult> save(@Valid @RequestBody ProjectDto projectDto) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			int result = service.save(projectDto);
			if (result == 0) {
				ajaxResult.setStatus(false);
				ajaxResult.setMessage("Save failed");
			} else {
				ajaxResult.setMessage("Save successful");
				ajaxResult.setStatus(true);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setMessage("Save fail !!!");
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}

	@DeleteMapping("{id}/delete.exclude")
	public ResponseEntity<AjaxResult> delete(@PathVariable Long id) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			int result = service.delete(id);
			if (result == 0) {
				ajaxResult.setStatus(false);
				ajaxResult.setMessage("Delete failed");
			} else {
				ajaxResult.setMessage("Delete successful");
				ajaxResult.setStatus(true);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setMessage("Delete fail !!!");
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}

	@PostMapping("bookmark.exclude")
	public ResponseEntity<AjaxResult> bookmark(@RequestBody ProjectDto projectDto) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			int result = service.bookmark(projectDto);
			if (result == 0) {
				ajaxResult.setStatus(false);
				ajaxResult.setMessage("Save failed");
			} else {
				ajaxResult.setMessage("Save successful");
				ajaxResult.setStatus(true);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setMessage("Save fail !!!");
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}

	@GetMapping("getProjectCounter.exclude")
	public ResponseEntity<AjaxResult> getProjectCounter() {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			int counter = service.getProjectCounter();
			ajaxResult.setResponseData(counter);
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			ajaxResult.setMessage("Search project fail !!!");
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}

	@GetMapping("{id}/getProjectById.exclude")
	public ResponseEntity<AjaxResult> getProjectById(@PathVariable Long id) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			ProjectDto projectDto = service.getProjectById(id);
			if (projectDto == null) {
				ajaxResult.setStatus(false);
				ajaxResult.setMessage("Get project failed");
			}
			ajaxResult.setResponseData(projectDto);
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			ajaxResult.setMessage("Get project fail !!!");
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}
}
