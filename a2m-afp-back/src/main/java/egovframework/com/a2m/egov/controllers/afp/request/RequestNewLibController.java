package egovframework.com.a2m.egov.controllers.afp.request;

import egovframework.com.a2m.egov.model.response.AjaxResult;
import egovframework.com.a2m.egov.service.afp.request.RequestNewLibService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("api/request-new-lib/")
public class RequestNewLibController {

    @Autowired
    RequestNewLibService requestNewLibService;

    @GetMapping("/get-request.exclude")
    public ResponseEntity<?> getRequest(@RequestParam String keySearch){
        AjaxResult ajaxResult = new AjaxResult();
        try {
            ajaxResult.setResponseData(requestNewLibService.lstRequest(keySearch));
            ajaxResult.setStatus(true);
        }catch (Exception e){
            ajaxResult.setStatus(false);
        }
        return ResponseEntity.ok(ajaxResult);
    }

    @GetMapping("/get-request-by-id.exclude")
    public ResponseEntity<?> getRequestById(@RequestParam String requestId){
        AjaxResult ajaxResult = new AjaxResult();
        try {
            ajaxResult.setResponseData(requestNewLibService.getRequestById(requestId));
            ajaxResult.setStatus(true);
        }catch (Exception e){
            ajaxResult.setStatus(false);
        }
        return ResponseEntity.ok(ajaxResult);
    }

    @PostMapping("/insert-request.exclude")
    public ResponseEntity<?> insertRequest(@RequestBody Map<Object, Object> param){
        AjaxResult ajaxResult = new AjaxResult();
        try {
            requestNewLibService.insertRequest(param);
            ajaxResult.setStatus(true);
        }catch (Exception e){
            ajaxResult.setStatus(false);
        }
        return ResponseEntity.ok(ajaxResult);
    }

    @PutMapping("/update-request.exclude")
    public ResponseEntity<?> updateRequest(@RequestBody Map<Object, Object> param){
        AjaxResult ajaxResult = new AjaxResult();
        try {
            requestNewLibService.updateRequest(param);
            ajaxResult.setStatus(true);
        }catch (Exception e){
            ajaxResult.setStatus(false);
        }
        return ResponseEntity.ok(ajaxResult);
    }
    @PutMapping("/update-request-status.exclude")
    public ResponseEntity<?> updateRequestStatus(@RequestBody Map<Object, Object> param){
        AjaxResult ajaxResult = new AjaxResult();
        try {
            requestNewLibService.updateRequestStatus(param);
            ajaxResult.setStatus(true);
        }catch (Exception e){
            ajaxResult.setStatus(false);
        }
        return ResponseEntity.ok(ajaxResult);
    }

    @DeleteMapping("/delete-request.exclude")
    public ResponseEntity<?> deleteRequest(@RequestParam String requestId){
        AjaxResult ajaxResult = new AjaxResult();
        try {
            requestNewLibService.deleteRequest(requestId);
            ajaxResult.setStatus(true);
        }catch (Exception e){
            ajaxResult.setStatus(false);
        }
        return ResponseEntity.ok(ajaxResult);
    }


}
