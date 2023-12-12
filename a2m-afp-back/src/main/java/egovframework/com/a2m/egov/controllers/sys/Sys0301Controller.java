package egovframework.com.a2m.egov.controllers.sys;

import java.util.Map;

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

import egovframework.com.a2m.egov.model.UserModel;
import egovframework.com.a2m.egov.model.response.AjaxResult;
import egovframework.com.a2m.egov.service.common.CommonService;
import egovframework.com.a2m.egov.service.sys.Sys0301Service;
import egovframework.com.cmm.annotation.MenuPermission;
import egovframework.com.cmm.annotation.MenuPermissionType;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import springfox.documentation.annotations.ApiIgnore;

/**
 * @author KetHX
 * @created 2/22/2023
 */
@RestController
@RequestMapping("api/sys/sys0301")
@Api(tags = { "User Management" })
public class Sys0301Controller {

	@Autowired
	Sys0301Service sys0301Service;

	@Autowired
	CommonService commonService;

	@ApiOperation(value = "Save user", response = UserModel.class)
	@ApiResponses(value = { @ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Service not found"),
			@ApiResponse(code = 200, message = "Save user successfully") })
	@MenuPermission(permissions = { MenuPermissionType.WRITE })
	@PostMapping("/save.do")
	public ResponseEntity<?> saveDo(
			@ApiParam(value = "User model to save", required = true) @RequestBody UserModel userModel) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			sys0301Service.save(userModel);
			ajaxResult.setStatus(true);
			ajaxResult.setMessage("Save success");

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setMessage("Save failed");
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}

	@ApiOperation(value = "Update user", response = UserModel.class)
	@ApiResponses(value = { @ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Service not found"),
			@ApiResponse(code = 200, message = "Update user successfully") })
	@MenuPermission(permissions = { MenuPermissionType.MODIFY })
	@PutMapping("/update.do")
	public ResponseEntity<?> update(
			@ApiParam(value = "User model to update", required = true) @RequestBody UserModel userModel) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			sys0301Service.update(userModel);
			ajaxResult.setMessage("Update successful");
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setMessage("Update failed");
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}

	@ApiOperation(value = "Get list model user", response = UserModel.class)
	@ApiResponses(value = { @ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Service not found"),
			@ApiResponse(code = 200, message = "Get list user successfully") })
	@MenuPermission(permissions = { MenuPermissionType.READ })
	@GetMapping(value = "/search.do")
	public ResponseEntity<?> search(
			@ApiParam(value = "Search to user", required = true) @RequestParam Map<String, Object> params) {

		AjaxResult ajaxResult = new AjaxResult();
		try {
			Map<Object, Object> map = sys0301Service.search(params);
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

	// thanhnv
	@ApiOperation(value = "Get my model user", response = UserModel.class)
	@ApiResponses(value = { @ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Service not found"),
			@ApiResponse(code = 200, message = "Get my user successfully") })
	@MenuPermission(permissions = { MenuPermissionType.READ })
	@GetMapping(value = "/getMyUser.do")
	public ResponseEntity<?> getMyUser(
			@ApiParam(value = "no param", required = true) @RequestParam Map<String, Object> params) {

		AjaxResult ajaxResult = new AjaxResult();
		try {
			String userUid = commonService.getUserUid();
			Map<Object, Object> map = sys0301Service.findByUserUid(userUid);
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


	@ApiOperation(value = "Delete model user")
	@ApiResponses(value = { @ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Service not found"),
			@ApiResponse(code = 200, message = "Delete user successfully") })
	@MenuPermission(permissions = { MenuPermissionType.DELETE })
	@DeleteMapping(value = "/{userUid}/delete.do")
	public ResponseEntity<?> deleteUser(
			@ApiParam(value = "userUId of user to delete", required = true) @PathVariable String userUid) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			sys0301Service.deleteUser(userUid);
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}


	@ApiIgnore
	@GetMapping(value = "/{userId}/existsByUserId.do")
	public ResponseEntity<?> existsByUserId(@PathVariable String userId) {

		AjaxResult ajaxResult = new AjaxResult();
		try {
			Boolean checkUserId = commonService.existsByUserId(userId);
			ajaxResult.setResponseData(checkUserId);
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}

	@ApiIgnore
	@GetMapping(value = "/{email}/existsByEmail.do")
	public ResponseEntity<?> existsByEmail(@PathVariable String email) {

		AjaxResult ajaxResult = new AjaxResult();
		try {
			Boolean checkEmail = commonService.existsByEmail(email);
			ajaxResult.setResponseData(checkEmail);
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}

	@ApiIgnore
	@GetMapping(value = "/exists.do")
	public ResponseEntity<?> exists(

			@RequestParam String userId, @RequestParam String email) {

		AjaxResult ajaxResult = new AjaxResult();
		try {
			Map<Object, Object> map = sys0301Service.exists(userId, email);
			ajaxResult.setResponseData(map);
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO Auto-generated catch block	
			e.printStackTrace();
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}
	


}