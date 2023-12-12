/**
 * 
 */
package egovframework.com.a2m.egov.controllers.sam;

import java.util.List;
import java.util.Map;

import io.swagger.annotations.*;
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

import egovframework.com.a2m.egov.model.TccoSTD;
import egovframework.com.a2m.egov.model.response.AjaxResult;
import egovframework.com.a2m.egov.model.sam.Sam0101Model;
import egovframework.com.a2m.egov.service.common.CommonService;
import egovframework.com.a2m.egov.service.sam.ISam0101Service;
import egovframework.com.cmm.annotation.MenuPermission;
import egovframework.com.cmm.annotation.MenuPermissionType;

/**
 * @author tiennd
 *
 * @created Feb 28, 2023
 */

@RestController
@RequestMapping("api/sam/sam0101")
@Api(tags = { "Sample CRUD" })
public class Sam0101Controller {
	@Autowired
	private ISam0101Service sam0101Service;

	@Autowired
	private CommonService commonService;

	@ApiOperation(value = "Save Sample", response = ResponseEntity.class)
	@ApiResponses(value = {
			@ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Service not found"),
			@ApiResponse(code = 200, message = "Save successfully")
	})
	@MenuPermission(permissions = { MenuPermissionType.WRITE })
	@PostMapping("/save.do")
	public ResponseEntity<AjaxResult> save(@ApiParam(value = "Model to save") @RequestBody Sam0101Model model) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			String userUid = commonService.getUserUid();
			model.setCreatedBy(userUid);
			model.setUpdatedBy(userUid);
			int result = sam0101Service.save(model);
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

	@ApiOperation(value = "Get list sample Sample", response = ResponseEntity.class)
	@ApiResponses(value = {
			@ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Service not found"),
			@ApiResponse(code = 200, message = "Get list sample successfully")
	})
	@MenuPermission(permissions = { MenuPermissionType.READ })
	@GetMapping("/getList.do")
	public ResponseEntity<AjaxResult> getList(@ApiParam(value = "Page number") @RequestParam Integer page,
								  @ApiParam(value = "Limit item in 1 page") @RequestParam Integer limit,
								  @ApiParam(value = "Title to search") @RequestParam String title,
								  @ApiParam(value = "Topic to search") @RequestParam String topic,
								  @ApiParam(value = "Category to search") @RequestParam String category,
								  @ApiParam(value = "Date to search") @RequestParam String date,
								  @ApiParam(value = "Column To sort")@RequestParam String columnName,
								  @ApiParam(value = "Soft type (ASC or DESC)") @RequestParam String sortType) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			Map<Object, Object> map = sam0101Service.getList(page, limit, category, topic, title, date, columnName,
					sortType);
			ajaxResult.setResponseData(map);
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setMessage("Get list fail !!!");
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}

	@ApiOperation(value = "Delete item sample", response = ResponseEntity.class)
	@ApiResponses(value = {
			@ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Service not found"),
			@ApiResponse(code = 200, message = "Delete sample successfully")
	})
	@MenuPermission(permissions = { MenuPermissionType.DELETE })
	@DeleteMapping("/{id}/deleteById.do")
	public ResponseEntity<AjaxResult> deleteById(@ApiParam(value = "Item's id") @PathVariable Long id) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			int result = sam0101Service.delete(id);
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

	@ApiOperation(value = "Get list Comm code by up comm code", response = ResponseEntity.class)
	@ApiResponses(value = {
			@ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Service not found"),
			@ApiResponse(code = 200, message = "Get list comm code successfully")
	})
	@MenuPermission(permissions = { MenuPermissionType.READ })
	@GetMapping("/getTccoStd.do")
	public ResponseEntity<AjaxResult> getTccoStd(@ApiParam(value = "Get by up comm code") @RequestParam String upCommCd) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			List<TccoSTD> list = sam0101Service.getTccoStd(upCommCd);
			ajaxResult.setResponseData(list);
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setMessage("Get list fail !!!");
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}

	@ApiOperation(value = "Get list Comm code by value config", response = ResponseEntity.class)
	@ApiResponses(value = {
			@ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Service not found"),
			@ApiResponse(code = 200, message = "Get list comm code successfully")
	})
	@MenuPermission(permissions = { MenuPermissionType.READ })
	@GetMapping("/getTccoStdByValueConfig.do")
	public ResponseEntity<AjaxResult> getTccoStdByValueConfig(@ApiParam(value = "value to get comm code") @RequestParam String url) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			TccoSTD std = sam0101Service.getTccoStdByValueConfig(url);
			ajaxResult.setResponseData(std);
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setMessage("Get fail !!!");
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}
}
