package egovframework.com.a2m.egov.controllers.afp.download;

import egovframework.com.a2m.egov.service.afp.download.DownloadService;
import egovframework.com.cmm.util.AjaxResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * @author Nguyen Trung Anh
 * @created 5/8/2023
 */

@RestController
@RequestMapping("api/down/")
public class DownloadController {
    @Autowired
    DownloadService downloadService;

    @GetMapping("getHistory.exclude")
    public ResponseEntity<?> getHistoryDownload(){
        AjaxResult result = new AjaxResult();
        try {
            result.setResponseData(downloadService.getHistory());
            result.setStatus(true);
        }catch (Exception e){
            e.printStackTrace();
            result.setStatus(false);
        }
        return ResponseEntity.ok(result);
    }

    @PostMapping("saveHistory.exclude")
    public ResponseEntity<?> saveHistory(@RequestBody Map<Object, Object> param){
        AjaxResult result = new AjaxResult();
        try {
            downloadService.saveHistory(param);
            result.setStatus(true);
        }catch (Exception e){
            e.printStackTrace();
            result.setStatus(false);
        }
        return ResponseEntity.ok(result);
    }

    @GetMapping("getProjectById.exclude")
    public ResponseEntity<?> getProjectById(@RequestParam String projectId){
        AjaxResult result = new AjaxResult();
        try {
            result.setResponseData(downloadService.getProjectById(projectId));
            result.setStatus(true);
        }catch (Exception e){
            e.printStackTrace();
            result.setStatus(false);
        }
        return ResponseEntity.ok(result);
    }

    @GetMapping("getDependManualsById.exclude")
    public ResponseEntity<?> getDependManualsById(@RequestParam String dependId){
        AjaxResult result = new AjaxResult();
        try {
            result.setResponseData(downloadService.getDependManualsById(dependId));
            result.setStatus(true);
        }catch (Exception e){
            e.printStackTrace();
            result.setStatus(false);
        }
        return ResponseEntity.ok(result);
    }

}
