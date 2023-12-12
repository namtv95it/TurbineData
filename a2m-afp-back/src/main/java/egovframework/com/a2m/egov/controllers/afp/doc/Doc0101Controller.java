package egovframework.com.a2m.egov.controllers.afp.doc;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import egovframework.com.a2m.egov.model.TsstMenu;
import egovframework.com.a2m.egov.model.afp.doc.AfpMenuRequest;
import egovframework.com.a2m.egov.model.afp.doc.AfpMenuResponse;
import egovframework.com.a2m.egov.model.afp.doc.AfpPostRequest;
import egovframework.com.a2m.egov.model.afp.doc.AfpPostResponse;
import egovframework.com.a2m.egov.model.response.AjaxResult;
import egovframework.com.a2m.egov.service.afp.doc.IDoc0101Service;
import egovframework.com.a2m.egov.service.afp.doc.IPostService;
import egovframework.com.a2m.egov.service.sys.Sys0101Service;

@RestController
@RequestMapping(value = "api/doc/doc0101")
public class Doc0101Controller {
	@Autowired
	private IDoc0101Service doc0101Service;
	@Autowired
	private Sys0101Service sys0101Service;
	@Autowired
	private IPostService postService;
	
	@GetMapping(value = "searchMenu")
	public ResponseEntity<?> searchMenu(@RequestParam Map<String, Object> params) {
		AjaxResult result = new AjaxResult();
		try {
			List<AfpMenuResponse> menus = doc0101Service.searchMenu(params);
			result.setStatus(true);
			result.setResponseData(menus);
		} catch (Exception e) {
			e.printStackTrace();
			result.setStatus(false);
			result.setResponseData(null);
		}
		return ResponseEntity.ok(result);
	}
	
	@GetMapping(value = "getMenuById")
	public ResponseEntity<?> getMenuById(@RequestParam Long menuId) {
		AjaxResult result = new AjaxResult();
		try {
			AfpMenuResponse menu = doc0101Service.getMenuById(menuId);
			result.setStatus(true);
			result.setResponseData(menu);
		} catch (Exception e) {
			e.printStackTrace();
			result.setStatus(false);
			result.setResponseData(null);
		}
		return ResponseEntity.ok(result);
	}
	
	@GetMapping(value = "getTsstMenuById")
	public ResponseEntity<?> getTsstMenuById(@RequestParam String menuId) {
		AjaxResult result = new AjaxResult();
		try {
			TsstMenu menu = sys0101Service.getMenuById(menuId);
			result.setStatus(true);
			result.setResponseData(menu);
		} catch (Exception e) {
			e.printStackTrace();
			result.setStatus(false);
			result.setResponseData(null);
		}
		return ResponseEntity.ok(result);
	}
	
	@GetMapping(value = "getAfpMenus")
	public ResponseEntity<?> getAfpMenus(@RequestParam Map<String, Object> params) {
		AjaxResult result = new AjaxResult();
		try {
			List<AfpMenuResponse> menus = doc0101Service.getAfpMenus(params);
			result.setStatus(true);
			result.setResponseData(menus);
		} catch (Exception e) {
			e.printStackTrace();
			result.setStatus(false);
			result.setResponseData(null);
		}
		return ResponseEntity.ok(result);
	}
	
	@PostMapping(value = "createAfpMenu")
	public ResponseEntity<?> createAfpMenu(@Valid @RequestBody AfpMenuRequest wireFrameRequest) {
		AjaxResult result = new AjaxResult();
		try {
			doc0101Service.insertAfpMenu(wireFrameRequest);
			result.setStatus(true);
		} catch (Exception e) {
			e.printStackTrace();
			result.setStatus(false);
		}
		
		return ResponseEntity.ok(result);
	}
	
	@PostMapping(value = "updateAfpMenu")
	public ResponseEntity<?> updateAfpMenu(@Valid @RequestBody AfpMenuRequest wireFrameRequest) {
		AjaxResult result = new AjaxResult();
		try {
			doc0101Service.updateAfpMenu(wireFrameRequest);
			result.setStatus(true);
		} catch (Exception e) {
			e.printStackTrace();
			result.setStatus(false);
		}
		
		return ResponseEntity.ok(result);
	}
	
	@PostMapping(value = "saveAfpMenu")
	public ResponseEntity<?> saveAfpMenu(@RequestBody List<AfpMenuRequest> wireFrameRequestList) {
		AjaxResult result = new AjaxResult();
		try {
			doc0101Service.saveWireFrameMenu(wireFrameRequestList);
			result.setStatus(true);
		} catch (Exception e) {
			e.printStackTrace();
			result.setStatus(false);
		}
		
		return ResponseEntity.ok(result);
	}
	
	@PostMapping(value = "deleteAfpMenu")
	public ResponseEntity<?> deleteAfpMenu(@RequestBody List<Long> menuIds) {
		AjaxResult result = new AjaxResult();
		try {
			for (Long id : menuIds) {
				doc0101Service.deleteAfpMenu(id);
			}
			result.setStatus(true);
		} catch (Exception e) {
			e.printStackTrace();
			result.setStatus(false);
		}
		
		return ResponseEntity.ok(result);
	}
	
	@GetMapping(value = "getAllParentMenu")
	public ResponseEntity<?> getAllParentMenu(@RequestParam Long menuId) {
		AjaxResult result = new AjaxResult();
		try {
			List<AfpMenuResponse> datas = doc0101Service.getAllParentMenu(menuId);
			result.setStatus(true);
			result.setResponseData(datas);
		} catch (Exception e) {
			e.printStackTrace();
			result.setStatus(false);
		}
		
		return ResponseEntity.ok(result);
	}
	
	
	
	@PostMapping(value = "createAfpPost")
	public ResponseEntity<?> createAfpPost(@RequestBody AfpPostRequest postRequest) {
		AjaxResult result = new AjaxResult();
		try {
			postService.createPost(postRequest);
			result.setStatus(true);
		} catch (Exception e) {
			e.printStackTrace();
			result.setStatus(false);
		}
		
		return ResponseEntity.ok(result);
	}
	
	@PostMapping(value = "updateAfpPost")
	public ResponseEntity<?> updateAfpPost(@RequestBody AfpPostRequest postRequest) {
		AjaxResult result = new AjaxResult();
		try {
			postService.updatePost(postRequest);
			result.setStatus(true);
		} catch (Exception e) {
			e.printStackTrace();
			result.setStatus(false);
		}
		
		return ResponseEntity.ok(result);
	}
	
	@GetMapping(value = "getPostByAfpMenu")
	public ResponseEntity<?> getPostByAfpMenu(@RequestParam Long afpMenuId){
		AjaxResult result = new AjaxResult();
		try {
			AfpPostResponse post = postService.getByMenuId(afpMenuId);
			result.setStatus(true);
			result.setResponseData(post);
		} catch (Exception e) {
			e.printStackTrace();
			result.setStatus(false);
		}
		
		return ResponseEntity.ok(result);
	}
	
	@GetMapping(value = "deletePost")
	public ResponseEntity<?> deletePost(@RequestParam Long postId) {
		AjaxResult result = new AjaxResult();
		try {
			postService.deletePostById(postId);
;			result.setStatus(true);
		} catch (Exception e) {
			e.printStackTrace();
			result.setStatus(false);
		}
		return ResponseEntity.ok(result);
	}

	@GetMapping(value = "searchDoc")
	public ResponseEntity<?> searchDoc(@RequestParam Map<String, Object> param) {
		AjaxResult result = new AjaxResult();
		try {
			result.setResponseData(doc0101Service.searchDoc(param));
			result.setStatus(true);
		} catch (Exception e) {
			e.printStackTrace();
			result.setStatus(false);
		}
		return ResponseEntity.ok(result);
	}
	
}
