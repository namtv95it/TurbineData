package egovframework.com.a2m.egov.controllers.common;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import egovframework.com.a2m.egov.model.TccoSTD;
import egovframework.com.a2m.egov.service.common.CommSTDService;
import egovframework.com.cmm.util.AjaxResult;

/**
 * @author KetHX
 * @created 2/24/2023
 */
@RestController
@RequestMapping("api/comStd")
public class ComSTDController {

	@Autowired
	CommSTDService commSTDService;

	@GetMapping("/getCommNm.do")
	public ResponseEntity getCommNm(@RequestParam Map agr) {
		AjaxResult ajaxResult = new AjaxResult();
		try {

			String comNm = commSTDService.getCommNm(agr);
			ajaxResult.setResponseData(comNm);
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setMessage(e.getMessage());
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}

	@GetMapping("getTccoStd.exclude")
	public ResponseEntity<AjaxResult> getTccoStd(@RequestParam String upCommCd) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			List<TccoSTD> list = commSTDService.getTccoStd(upCommCd);
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
}
