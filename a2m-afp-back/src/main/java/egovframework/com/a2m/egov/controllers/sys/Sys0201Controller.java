package egovframework.com.a2m.egov.controllers.sys;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import egovframework.com.a2m.egov.service.sys.Sys0201Service;
import egovframework.com.a2m.egov.service.sys.Sys0301Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import egovframework.com.a2m.egov.model.TsstMenu;
import egovframework.com.a2m.egov.model.TsstUserRole;
import egovframework.com.a2m.egov.model.UserModel;
import egovframework.com.a2m.egov.model.request.TsstRoleMenuRequest;
import egovframework.com.a2m.egov.model.request.TsstRoleRequest;
import egovframework.com.a2m.egov.model.request.TsstUserRoleRequest;
import egovframework.com.a2m.egov.model.response.TsstRoleMenuResponse;
import egovframework.com.a2m.egov.model.response.TsstRoleResponse;
import egovframework.com.a2m.egov.service.common.CommonService;
import egovframework.com.cmm.annotation.MenuPermission;
import egovframework.com.cmm.annotation.MenuPermissionType;
import egovframework.com.cmm.util.AjaxResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import springfox.documentation.annotations.ApiIgnore;


/**
 * @author KetHx
 * @created 2/23/2023
 */
@RestController
@RequestMapping("api/sys/sys0201")
@Api(tags = {"Role Management"})
public class Sys0201Controller {
	@Autowired
	Sys0201Service sys0201Service;

	@Autowired
	private CommonService commonService;

	@Autowired
	Sys0301Service sys0301Service;
	
	@ApiOperation(value = "Get list role", response = TsstRoleResponse.class)
	@ApiResponses(value = {@ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Service not found"),
			@ApiResponse(code = 200, message = "Get list role successful")})
	@MenuPermission(permissions = { MenuPermissionType.READ })
	@GetMapping(value = "/search-role.do")
	public ResponseEntity<?> searchRole(
			@ApiParam(value= "Page number", required = true)
			@RequestParam Integer page, 
			@ApiParam(value= "Limit number in 1 page", required = true)
			@RequestParam Integer limit,
			@ApiParam(value= "Role name to search", required = true)
			@RequestParam String roleNm,
			@ApiParam(value= "Role useYn to search", required = true)
			@RequestParam String useYn) {

		AjaxResult ajaxResult = new AjaxResult();
		try {
			Map<Object, Object> map = sys0201Service.searchTsstRole(page,limit,roleNm,useYn);
			ajaxResult.setMessage("search successful");
			ajaxResult.setResponseData(map);
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setMessage("search failed");
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}

	@ApiOperation(value = "Save role")
	@ApiResponses(value = {@ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Service not found"),
			@ApiResponse(code = 200, message = "Save role sucssessfully")})
	@MenuPermission(permissions = { MenuPermissionType.WRITE })
	@PostMapping("/save-role.do")
	public ResponseEntity<?> saveRole(
			@ApiParam(value= "Model to save", required = true)
			@RequestBody  TsstRoleRequest tsstRoleRequest) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			long result = sys0201Service.insertTsstRole(tsstRoleRequest);
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
			ajaxResult.setMessage("Save failed");
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}
	
	@ApiOperation(value = "Update role")
	@ApiResponses(value = {@ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Service not found"),
			@ApiResponse(code = 200, message = "Update role sucssessfully")})
	@MenuPermission(permissions = { MenuPermissionType.MODIFY })
	@PutMapping("/update-role.do")
	public ResponseEntity<?> updateRole(
			@ApiParam(value= "Model to update", required = true)
			@RequestBody TsstRoleRequest tsstRoleRequest) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			long result = sys0201Service.updateTsstRole(tsstRoleRequest);
			if (result == 0) {
				ajaxResult.setStatus(false);
				ajaxResult.setMessage("Update failed");
			} else {
				ajaxResult.setMessage("Update successful");
				ajaxResult.setStatus(true);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setMessage("Update failed");
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}


	@ApiOperation(value = "Delete role")
	@ApiResponses(value = {@ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Service not found"),
			@ApiResponse(code = 200, message = "Delete role sucssessfully")})
	@MenuPermission(permissions = { MenuPermissionType.DELETE })
	@DeleteMapping("/{roleId}/delete-role.do")
	public ResponseEntity<?> deleteRole(
			@ApiParam(value= "Id of role to delete", required = true)
			@PathVariable("roleId") String roleId) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			int result = sys0201Service.deleteTsstRole(roleId);
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
			ajaxResult.setMessage("Delete failed");
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}
	
	@ApiOperation(value = "Get list role user", response = TsstUserRole.class)
	@ApiResponses(value = {@ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Service not found"),
			@ApiResponse(code = 200, message = "Get list role user sucssessfully")})
	@MenuPermission(permissions = { MenuPermissionType.READ })
	@GetMapping(value = "/search-user-role.do")
	public ResponseEntity<?> searchUserRole(
			@ApiParam(value= "Model to list", required = true)
			@RequestParam Map<Object, Object> arg) {

		AjaxResult ajaxResult = new AjaxResult();
		try {
			List map = sys0201Service.searchTsstUserRole(arg);
			ajaxResult.setMessage("search successful");
			ajaxResult.setResponseData(map);
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setMessage("search failed");
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}
	
	@ApiOperation(value = "save role user", response = TsstUserRoleRequest.class)
	@ApiResponses(value = {@ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Service not found"),
			@ApiResponse(code = 200, message = "Save role user successfully")})
	@MenuPermission(permissions = { MenuPermissionType.WRITE})
	@PostMapping("/save-user-role.do")
	public Map<String, Object> saveUserRole(
			@ApiParam(value= "Role user model to save", required = true)
			@RequestBody @Valid List<TsstUserRoleRequest> arg) throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		try{
			sys0201Service.saveRoleUser(arg);
			result.put("success", "success");
		}catch (Exception e){
			e.printStackTrace();
			result.put("error", "save user role fail");
		}
		return result;
	}
	
	@ApiOperation(value = "Save model role menu", response = TsstRoleMenuResponse.class)
	@ApiResponses(value = {@ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Service not found"),
			@ApiResponse(code = 200, message = "Save role menu successfully")})
	@MenuPermission(permissions = { MenuPermissionType.WRITE, MenuPermissionType.MODIFY })
	@PostMapping("/save-menu-role.do")
	public Map<String, Object> saveMenuRole(
			@ApiParam(value= "Role menu model to save", required = true)
			@RequestBody @Valid List<TsstRoleMenuRequest> arg) throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		try{
			sys0201Service.saveMenuRole(arg);
			result.put("success", "success");
		}catch (Exception e){
			e.printStackTrace();
			result.put("error", "save menu role fail");
		}
		return result;
	}
	
	@ApiOperation(value = "Get list role menu", response = TsstRoleMenuResponse.class)
	@ApiResponses(value = {@ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Service not found"),
			@ApiResponse(code = 200, message = "Get list role menu successfully")})
	@MenuPermission(permissions = { MenuPermissionType.READ})
	@GetMapping(value = "/search-menu-role.do")
	public ResponseEntity searchRoleMenu(
			@ApiParam(value= "Role menu model to list", required = true)
			@RequestParam Map<Object, Object> arg) {

		AjaxResult ajaxResult = new AjaxResult();
		try {
			List map = sys0201Service.searchTsstRoleMenu(arg);
			ajaxResult.setMessage("search successful");
			ajaxResult.setResponseData(map);
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setMessage("search failed");
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}

	@ApiIgnore
	@GetMapping("/getRoles.exclude")
	public ResponseEntity getRoles() {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			String userUid = commonService.getUserUid();
			List<String> listRoles = sys0201Service.getRoles(userUid);
			ajaxResult.setResponseData(listRoles);
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setMessage(e.getMessage());
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}
	
	@ApiIgnore
	@GetMapping(value = "/{roleId}/search.do")
	public ResponseEntity getTsstRoleById(@PathVariable("roleId") String roleId) {

		AjaxResult ajaxResult = new AjaxResult();
		try {
			Map<Object,Object> map = sys0201Service.getTsstRole(roleId);
			ajaxResult.setMessage("search successful");
			ajaxResult.setResponseData(map);
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setMessage("search failed");
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}
	
	@ApiOperation(value = "Get list model menu", response = TsstMenu.class)
	@ApiResponses(value = {@ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Service not found"),
			@ApiResponse(code = 200, message = "Get list menu successfully")})
	@MenuPermission(permissions = { MenuPermissionType.READ })
	@GetMapping(value = "/search-menu.do")
	public ResponseEntity searchMenu(
			@ApiParam(value= "Page number", required = true)
			@RequestParam Integer page,
			@ApiParam(value= "Limit number in 1 page", required = true)
			@RequestParam Integer limit, 
			@ApiParam(value= "Menu name to search", required = true)
			@RequestParam String menuNm) {

		AjaxResult ajaxResult = new AjaxResult();
		try {
			Map<Object, Object> map = sys0201Service.searchTsstMenu(page,limit,menuNm);
			ajaxResult.setMessage("search successful");
			ajaxResult.setResponseData(map);
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setMessage("search failed");
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}

	/**
	 * @author NguyenTrung Anh
	 * @created 3/3/2023
	 */
	
	@ApiOperation(value = "Get list model user", response = UserModel.class)
	@ApiResponses(value = {@ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Service not found"),
			@ApiResponse(code = 200, message = "Get list user successfully")})
	@MenuPermission(permissions = { MenuPermissionType.READ })
	@GetMapping(value = "/search-user.do")
	public ResponseEntity searchUser(
			@ApiParam(value= "Search to user", required = true)
			@RequestParam Map<String,Object> params 
		) {

		AjaxResult ajaxResult = new AjaxResult();
		try {
			Map<Object, Object> map = sys0301Service.search(params);
			ajaxResult.setMessage("search successful");
			ajaxResult.setResponseData(map);
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setMessage("Search failed");
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}
}