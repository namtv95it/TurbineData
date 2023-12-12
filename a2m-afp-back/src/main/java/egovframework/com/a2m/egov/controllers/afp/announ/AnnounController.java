/**
 * 
 */
package egovframework.com.a2m.egov.controllers.afp.announ;

import java.util.List;
import java.util.Map;

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

import egovframework.com.a2m.egov.model.afp.ann.AnnounModel;
import egovframework.com.a2m.egov.model.afp.ann.AnnounSearch;
import egovframework.com.a2m.egov.model.response.AjaxResult;
import egovframework.com.a2m.egov.service.afp.announcement.IAnnounService;
import egovframework.com.a2m.egov.service.common.CommonService;

/**
 * @author ThanhNV
 *
 * 21 thg 4, 2023
 */

@RestController
@RequestMapping("api/common-post/announ")
public class AnnounController {
	@Autowired
	private IAnnounService service;

	@Autowired
	private CommonService commonService;
	
	@GetMapping("getAnnounNotiInfo.exclude")
	public AjaxResult getAnnounNotiInfo() {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			Map info = service.getAnnounNotiInfo();
			ajaxResult.setResponseData(info);
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			ajaxResult.setMessage("Search announcement fail !!!");
			ajaxResult.setStatus(false);
		}
		return ajaxResult; 
	}
	
	@PostMapping("remakeAnnounNoti.exclude")
	public AjaxResult remakeAnnounNoti() {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			Map info = service.remakeAnnounNoti();
			ajaxResult.setResponseData(info);
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			ajaxResult.setMessage("Search announcement fail !!!");
			ajaxResult.setStatus(false);
		}
		return ajaxResult; 
	}
	
	@GetMapping("search.exclude")
	public AjaxResult search(@RequestParam String keySearch) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			String userUid = commonService.getUserUid();
			AnnounSearch search = new AnnounSearch(keySearch);
			search.setUserUid(userUid);
			List<AnnounModel> list = service.getList(search);
			ajaxResult.setResponseData(list);
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			ajaxResult.setMessage("Search announcement fail !!!");
			ajaxResult.setStatus(false);
		}
		return ajaxResult; 
	}
	
	@GetMapping("getById.exclude")
	public AjaxResult getById(@RequestParam Long id) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			AnnounModel detail = service.getById(id);
			ajaxResult.setResponseData(detail);
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			ajaxResult.setMessage("Find announcement fail !!!");
			ajaxResult.setStatus(false);
		}
		return ajaxResult; 
	}

	@PostMapping("save.exclude")
	public AjaxResult save(@RequestBody AnnounModel model) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			int result = service.save(model);
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
		return ajaxResult;
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
}
