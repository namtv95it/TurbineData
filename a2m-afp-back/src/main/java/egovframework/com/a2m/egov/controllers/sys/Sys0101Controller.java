package egovframework.com.a2m.egov.controllers.sys;

import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import egovframework.com.a2m.egov.model.TsstMenu;
import egovframework.com.a2m.egov.model.TsstMenuMap;
import egovframework.com.a2m.egov.service.common.CommonService;
import egovframework.com.a2m.egov.service.sys.Sys0101Service;
import egovframework.com.cmm.annotation.MenuPermission;
import egovframework.com.cmm.annotation.MenuPermissionType;
import egovframework.com.cmm.util.AjaxResult;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Nguyen Trung Anh
 * @created 2/22/2023
 */
@RestController
@RequestMapping("api/sys/sys0101")
@Api(tags = {"Menu Management"})
public class Sys0101Controller {
	@Autowired
	Sys0101Service sys0101Service;

	@Autowired
	private CommonService commonService;

	@ApiOperation(value = "Get list menu", response = Map.class)
	@MenuPermission(permissions = { MenuPermissionType.READ })
	@ApiResponses(value = {
			@ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Service not found"),
			@ApiResponse(code = 200, message = "Get list menu successfully")
	})
	@GetMapping("/getLstMenu.do")
	public ResponseEntity<AjaxResult> getLstMenu(@ApiParam(value = "Menu name to search") @RequestParam String menuName, @ApiParam(value = "Menu status to search") @RequestParam String status) {
		AjaxResult result = new AjaxResult();
		Map<Object, Object> param = new HashMap<>();
		param.put("menuName", menuName);
		param.put("status", status);
		try {
			result.setResponseData(sys0101Service.getListMenu(param));
			result.setStatus(true);
		} catch (Exception e) {
			e.printStackTrace();
			result.setMessage("get menu error");
			result.setStatus(false);
		}
		return ResponseEntity.ok(result);
	}


	@ApiOperation(value = "Insert new menu", response = Map.class)
	@ApiResponses(value = {
			@ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Service not found"),
			@ApiResponse(code = 200, message = "Insert menu successfully")
	})
	@MenuPermission(permissions = {MenuPermissionType.WRITE})
	@PostMapping("/insert.do")
	public ResponseEntity<AjaxResult> saveMenu(@ApiParam(value = "New menu to insert", required = true) @RequestBody TsstMenu menu) {
		AjaxResult result = new AjaxResult();
		try {
			result.setResponseData(sys0101Service.insertMenu(menu));
			result.setStatus(true);
		} catch (Exception e) {
			e.printStackTrace();
			result.setMessage("insert menu unsuccessful");
			result.setStatus(false);
		}
		return ResponseEntity.ok(result);
	}

	@ApiOperation(value = "Update menu", response = Map.class)
	@ApiResponses(value = {
			@ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Service not found"),
			@ApiResponse(code = 200, message = "Update menu successfully")
	})
	@MenuPermission(permissions = {MenuPermissionType.MODIFY})
	@PostMapping("/update.do")
	public ResponseEntity<AjaxResult> updateMenu(@ApiParam(value = "Menu to update", required = true) @RequestBody TsstMenu menu) {
		AjaxResult result = new AjaxResult();
		try {
			result.setResponseData(sys0101Service.updateMenu(menu));
			result.setStatus(true);
		} catch (Exception e) {
			e.printStackTrace();
			result.setMessage("insert menu unsuccessful");
			result.setStatus(false);
		}
		return ResponseEntity.ok(result);
	}


	@ApiOperation(value = "Delete menu", response = Map.class)
	@ApiResponses(value = {
			@ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Service not found"),
			@ApiResponse(code = 200, message = "Delete menu successfully")
	})
	@MenuPermission(permissions = {MenuPermissionType.DELETE})
	@DeleteMapping("/{menuId}/deleteMenu.do")
	public ResponseEntity<AjaxResult> deleteMenu(@ApiParam(value = "Id of menu to delete", required = true) @PathVariable String menuId) {
		AjaxResult result = new AjaxResult();
		try {
			result.setResponseData(sys0101Service.deleteMenu(menuId));
			result.setStatus(true);
		} catch (Exception e) {
			e.printStackTrace();
			result.setMessage("delete menu failed");
			result.setStatus(false);
		}
		return ResponseEntity.ok(result);
	}


	@ApiOperation(value = "Get menu detail in form", response = Map.class)
	@ApiResponses(value = {
			@ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Service not found"),
			@ApiResponse(code = 200, message = "Get menu detail successfully")
	})
	@MenuPermission(permissions = {MenuPermissionType.READ})
	@GetMapping("/getMenuById.do")
	public ResponseEntity<AjaxResult> getMenuById(@ApiParam(value = "Menu's Id to get detail", required = true) @RequestParam String menuId) {
		AjaxResult result = new AjaxResult();
		try {
			result.setResponseData(sys0101Service.getMenuById(menuId));
			result.setStatus(true);
		} catch (Exception e) {
			e.printStackTrace();
			result.setMessage("get Menu error");
			result.setStatus(false);
		}
		return ResponseEntity.ok(result);
	}

	@GetMapping("/getMenuByUser.exclude")
	public ResponseEntity<AjaxResult> getMenuByUser() throws Exception {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			String userUid = commonService.getUserUid();
			List<TsstMenuMap> menus = sys0101Service.getMenuByUser(userUid);
			ajaxResult.setResponseData(menus);
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setMessage(e.getMessage());
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}

}
