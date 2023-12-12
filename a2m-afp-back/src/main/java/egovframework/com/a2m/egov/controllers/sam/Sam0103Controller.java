package egovframework.com.a2m.egov.controllers.sam;

import java.util.List;
import java.util.Map;

import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import egovframework.com.a2m.egov.model.response.AjaxResult;
import egovframework.com.a2m.egov.model.sam.Sam0103CommentModel;
import egovframework.com.a2m.egov.model.sam.Sam0103Model;
import egovframework.com.a2m.egov.service.common.CommonService;
import egovframework.com.a2m.egov.service.sam.ISam0103Service;
import egovframework.com.cmm.annotation.MenuPermission;
import egovframework.com.cmm.annotation.MenuPermissionType;

/**
 * @author tiennd
 *
 * @created Feb 28, 2023
 */

@RestController
@RequestMapping("api/sam/sam0103")
@Api(tags= {"FAQ"})
public class Sam0103Controller {

	@Autowired
	private ISam0103Service sam0103Service;

	@Autowired
	private CommonService commonService;

	@ApiOperation(value = "Save comment", response = ResponseEntity.class)
	@ApiResponses(value = {
			@ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Service not found"),
			@ApiResponse(code = 200, message = "Get list sample successfully")
	})
	@MenuPermission(permissions = { MenuPermissionType.WRITE })
	@PostMapping("/save-comment.do")
	public ResponseEntity<AjaxResult> save(@RequestBody Sam0103CommentModel model) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			String userUid = commonService.getUserUid();
			model.setCreatedBy(userUid);
			int result = sam0103Service.save(model);
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
			ajaxResult.setMessage("Save failed !!!");
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}

	@ApiOperation(value = "Get list Comment in the post", response = ResponseEntity.class)
	@ApiResponses(value = {
			@ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Service not found"),
			@ApiResponse(code = 200, message = "Get list comment successfully")
	})
	@MenuPermission(permissions = { MenuPermissionType.READ })
	@GetMapping("/getListComment.do")
	public ResponseEntity<AjaxResult> getListComment(@ApiParam(value = "Post's id to get comment") @RequestParam Long id) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			List<Sam0103CommentModel> list = sam0103Service.getCommentByPostId(id);
			ajaxResult.setResponseData(list);
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setMessage("Get list failed !!!");
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}

	@ApiOperation(value = "Save the question", response = ResponseEntity.class)
	@ApiResponses(value = {
			@ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Service not found"),
			@ApiResponse(code = 200, message = "Save question successfully")
	})
	@MenuPermission(permissions = { MenuPermissionType.WRITE })
	@PostMapping("/save.do")
	public ResponseEntity<AjaxResult> save(@ApiParam(value = "Question to save") @RequestBody Sam0103Model model) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			String userUid = commonService.getUserUid();
			model.setCreatedBy(userUid);
			model.setUpdatedBy(userUid);
			int result = sam0103Service.save(model);
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
			ajaxResult.setMessage("Save faild");
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}

	@ApiOperation(value = "Get list question", response = ResponseEntity.class)
	@ApiResponses(value = {
			@ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Service not found"),
			@ApiResponse(code = 200, message = "Get list question successfully")
	})
	@MenuPermission(permissions = { MenuPermissionType.READ })
	@GetMapping("/getList.do")
	public ResponseEntity<AjaxResult> getList(@ApiParam(value = "Page number") @RequestParam Integer page,
								  @ApiParam(value = "Limit item in 1 page") @RequestParam Integer limit,
								  @ApiParam(value = "Title to search") @RequestParam String title,
								  @ApiParam(value = "Topic to search") @RequestParam String topic,
								  @ApiParam(value = "Category to search") @RequestParam String category,
								  @ApiParam(value = "Date to search") @RequestParam String date) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			Map<Object, Object> map = sam0103Service.getList(page, limit, category, topic, title, date);
			ajaxResult.setResponseData(map);
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setMessage("Get list failed !!!");
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}

	@ApiOperation(value = "Get list question by url", response = ResponseEntity.class)
	@ApiResponses(value = {
			@ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Service not found"),
			@ApiResponse(code = 200, message = "Get list question successfully")
	})
	@MenuPermission(permissions = { MenuPermissionType.READ })
	@GetMapping("/getListByUrl.do")
	public ResponseEntity<AjaxResult> getListByUrl(@ApiParam(value="Number limit")@RequestParam Integer limit,
									   @ApiParam(value = "url to search")@RequestParam String url) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			Map<Object, Object> map = sam0103Service.getList(limit, url);
			ajaxResult.setResponseData(map);
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setMessage("Get list failed !!!");
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}

	@ApiOperation(value = "Get QA by ID", response = ResponseEntity.class)
	@ApiResponses(value = {
			@ApiResponse(code = 500, message = "Server error"),
			@ApiResponse(code = 404, message = "Service not found"),
			@ApiResponse(code = 200, message = "Get QA successfully")
	})
	@MenuPermission(permissions = { MenuPermissionType.READ })
	@GetMapping("/getQAById.do")
	public ResponseEntity<AjaxResult> getQAById(@ApiParam(value="QA's ID")@RequestParam Long id) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			Sam0103Model map = sam0103Service.getQAById(id);
			ajaxResult.setResponseData(map);
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setMessage("Get QA failed !!!");
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}
}
