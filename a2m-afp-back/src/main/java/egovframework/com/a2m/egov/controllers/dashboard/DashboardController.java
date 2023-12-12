package egovframework.com.a2m.egov.controllers.dashboard;

import egovframework.com.a2m.egov.model.afp.DashboardDto;
import egovframework.com.a2m.egov.model.afp.DashboardSearchDto;
import egovframework.com.a2m.egov.service.dashboard.DashboardService;
import egovframework.com.cmm.util.AjaxResult;
import io.swagger.annotations.Api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Nguyen Trung Anh
 * @created 3/24/2023
 */
@RestController
@RequestMapping("api/das")
@Api(tags = { "Dashboard" })
public class DashboardController {

	@Autowired
	DashboardService dashboardService;

	@GetMapping("getCategories.exclude")
	public ResponseEntity<?> getCategories() {
		AjaxResult result = new AjaxResult();
		try {
			result.setResponseData(dashboardService.getCategories());
			result.setStatus(true);
		} catch (Exception e) {
			e.printStackTrace();
			result.setStatus(false);
		}
		return ResponseEntity.ok(result);
	}

	@GetMapping("getPostForDashboard.exclude")
	public ResponseEntity<AjaxResult> getPostForDashboard(@RequestParam DashboardSearchDto postType) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			List<DashboardDto> list = dashboardService.getPostForDashboard(postType);

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

}
