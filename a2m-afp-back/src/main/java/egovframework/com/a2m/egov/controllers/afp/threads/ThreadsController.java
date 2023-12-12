package egovframework.com.a2m.egov.controllers.afp.threads;

import java.util.List;
import java.util.Map;

import egovframework.com.a2m.egov.model.afp.doc.AfpMenuResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import egovframework.com.a2m.egov.model.afp.threads.ThreadsModel;
import egovframework.com.a2m.egov.model.afp.threads.ThreadsSearch;
import egovframework.com.a2m.egov.model.afp.threads.ThreadsType;
import egovframework.com.a2m.egov.model.response.AjaxResult;
import egovframework.com.a2m.egov.service.afp.threads.IThreadsService;
/**
 * @author kethx
 *
 * @created Apr 18, 2023
 */
@RestController
@RequestMapping("api/threads")
public class ThreadsController {
	
	@Autowired
	private IThreadsService threadsService;

	@GetMapping("search.exclude")
	public AjaxResult search(@RequestParam String keySearch, @RequestParam ThreadsType typeSearch) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			ThreadsSearch threadsSearch = new ThreadsSearch("", keySearch, typeSearch.type());
			List<ThreadsModel> list = threadsService.getList(threadsSearch);
			ajaxResult.setResponseData(list);
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			ajaxResult.setMessage("Search failed !!!");
			ajaxResult.setStatus(false);
		}
		return ajaxResult;
	}

	@GetMapping(value = "getAfpMenus.exclude")
	public ResponseEntity<?> getAfpMenus(@RequestParam Map<String, Object> params) {
		AjaxResult result = new AjaxResult();
		try {
			List<AfpMenuResponse> menus = threadsService.getAfpMenus(params);
			result.setStatus(true);
			result.setResponseData(menus);
		} catch (Exception e) {
			e.printStackTrace();
			result.setStatus(false);
			result.setResponseData(null);
		}
		return ResponseEntity.ok(result);
	}

}
