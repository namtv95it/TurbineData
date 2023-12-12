package egovframework.com.a2m.egov.controllers.sys;

import egovframework.com.a2m.egov.model.TccoSTD;
import egovframework.com.a2m.egov.service.sys.impl.Sys0401ServiceImpl;
import egovframework.com.cmm.annotation.MenuPermission;
import egovframework.com.cmm.annotation.MenuPermissionType;
import egovframework.com.cmm.util.AjaxResult;
import io.swagger.annotations.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * @author Nguyen Trung Anh
 * @created 2/23/2023
 */
@RestController
@RequestMapping("api/sys/sys0401")
@Api(tags = {"Common Code Management"})
public class Sys0401Controller {

    @Autowired
    Sys0401ServiceImpl sys0401Service;

    @ApiOperation(value = "Get list Commcode", response = Map.class)
    @ApiResponses(value = {
            @ApiResponse(code = 500, message = "Server error"),
            @ApiResponse(code = 404, message = "Service not found"),
            @ApiResponse(code = 200, message = "Get list Commcode successfully")
    })
    @MenuPermission(permissions = {MenuPermissionType.READ})
    @GetMapping("/getAllCommCd.do")
    public ResponseEntity getAllCommCd(@ApiParam(value = "Comm code's name to search") @RequestParam String commName, @ApiParam(value = "Comm code's status to search") @RequestParam String status){
        AjaxResult result = new AjaxResult();
        Map<Object,Object> param = new HashMap<>();
        param.put("commName", commName);
        param.put("status", status);
        try {
            result.setResponseData(sys0401Service.searchCommCd(param));
            result.setStatus(true);
        }catch (Exception e){
            e.printStackTrace();
            result.setMessage("get list comm code fail");
            result.setStatus(false);
        }
        return ResponseEntity.ok(result);
    }

    @ApiOperation(value = "Insert new Commcode", response = Map.class)
    @ApiResponses(value = {
            @ApiResponse(code = 500, message = "Server error"),
            @ApiResponse(code = 404, message = "Service not found"),
            @ApiResponse(code = 200, message = "Insert Commcode successfully")
    })
    @MenuPermission(permissions = {MenuPermissionType.WRITE})
    @PostMapping("/insertCommCd.do")
    public ResponseEntity insertCommCd(@ApiParam(value = "New Commcode to insert", required = true) @RequestBody TccoSTD tccoSTD){
        AjaxResult result = new AjaxResult();
        try {
            result.setResponseData(sys0401Service.insertCommCd(tccoSTD));
            result.setStatus(true);
        }catch (Exception e){
            e.printStackTrace();
            result.setMessage("save comm code fail");
            result.setStatus(false);
        }
        return ResponseEntity.ok(result);
    }

    @ApiOperation(value = "Update Commcode", response = Map.class)
    @ApiResponses(value = {
            @ApiResponse(code = 500, message = "Server error"),
            @ApiResponse(code = 404, message = "Service not found"),
            @ApiResponse(code = 200, message = "Update Commcode successfully")
    })
    @MenuPermission(permissions = {MenuPermissionType.MODIFY})
    @PostMapping("/updateCommCd.do")
    public ResponseEntity updateCommCd(@ApiParam(value = "Commcode to update", required = true) @RequestBody TccoSTD tccoSTD){
        AjaxResult result = new AjaxResult();
        try {
                result.setResponseData(sys0401Service.updateCommCd(tccoSTD));
                result.setStatus(true);
        }catch (Exception e){
            e.printStackTrace();
            result.setMessage("save comm code fail");
            result.setStatus(false);
        }
        return ResponseEntity.ok(result);
    }

    @ApiOperation(value = "Delete Commcode", response = Map.class)
    @ApiResponses(value = {
            @ApiResponse(code = 500, message = "Server error"),
            @ApiResponse(code = 404, message = "Service not found"),
            @ApiResponse(code = 200, message = "Delete Commcode successfully")
    })
    @MenuPermission(permissions = {MenuPermissionType.DELETE})
    @DeleteMapping("/{commCode}/deleteCommCd.do")
    public ResponseEntity deleteCommCd(@ApiParam(value = "Commcode's ID to delete", required = true)@PathVariable String commCode){
        AjaxResult result = new AjaxResult();
        try {
            result.setResponseData(sys0401Service.deleteCommCd(commCode));
            result.setMessage("Delete successfully");
            result.setStatus(true);
        }catch (Exception e){
            e.printStackTrace();
            result.setMessage("delete comm code fail");
            result.setStatus(false);
        }
        return ResponseEntity.ok(result);
    }

    @ApiOperation(value = "Get Commcode detail", response = Map.class)
    @ApiResponses(value = {
            @ApiResponse(code = 500, message = "Server error"),
            @ApiResponse(code = 404, message = "Service not found"),
            @ApiResponse(code = 200, message = "Get Commcode successfully")
    })
    @MenuPermission(permissions = {MenuPermissionType.READ})
    @GetMapping("/getCommCdById.do")
    public ResponseEntity getCommCdById(@ApiParam(value = "Commcode's ID to get detail") @RequestParam String commCode){
        AjaxResult result = new AjaxResult();
        try {
            result.setResponseData(sys0401Service.getCommCdById(commCode));
            result.setMessage("get Commcode successfully");
            result.setStatus(true);
        }catch (Exception e){
            e.printStackTrace();
            result.setMessage("Get commcode fail");
            result.setStatus(false);
        }
        return ResponseEntity.ok(result);
    }

}
