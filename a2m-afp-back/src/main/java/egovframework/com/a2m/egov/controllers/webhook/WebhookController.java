package egovframework.com.a2m.egov.controllers.webhook;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import egovframework.com.a2m.egov.model.UserModel;
import egovframework.com.a2m.egov.model.response.AjaxResult;
import egovframework.com.a2m.egov.service.sys.Sys0301Service;
import egovframework.com.cmm.annotation.MenuPermission;
import egovframework.com.cmm.annotation.MenuPermissionType;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("api/webhook/user")
public class WebhookController {
	
	@Autowired
	Sys0301Service sys0301Service;
	
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

}
