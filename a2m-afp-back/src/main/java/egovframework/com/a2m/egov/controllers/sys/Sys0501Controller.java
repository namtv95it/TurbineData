package egovframework.com.a2m.egov.controllers.sys;

import egovframework.com.a2m.egov.service.sys.Sys0501Service;
import egovframework.com.a2m.egov.util.FileBase64Util;
import egovframework.com.a2m.egov.util.QuillEditorUtil;
import egovframework.com.cmm.annotation.MenuPermission;
import egovframework.com.cmm.annotation.MenuPermissionType;
import egovframework.com.cmm.util.AjaxResult;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author Nguyen Trung Anh
 * @created 3/20/2023
 */
@RestController
@RequestMapping("api/sys/sys0501")
@Api(tags = {"Manual Management"})
public class Sys0501Controller {

    @Autowired
    Sys0501Service sys0501Service;

    @GetMapping("/getLibData.do")
    @ApiOperation(value = "Get list Data Library", response = Map.class)
    @ApiResponses(value = {
            @ApiResponse(code = 500, message = "Server error"),
            @ApiResponse(code = 404, message = "Service not found"),
            @ApiResponse(code = 200, message = "Get list Lib successfully")
    })
    @MenuPermission(permissions = {MenuPermissionType.READ})
    public ResponseEntity getListData(@ApiParam("Library name to search") @RequestParam String libName, @ApiParam("Library status to search") @RequestParam String status){
        AjaxResult result = new AjaxResult();
        Map<Object,Object> param = new HashMap<>();
        param.put("libName", libName);
        param.put("status", status);
        try {
            result.setStatus(true);
            result.setResponseData(sys0501Service.getListData(param));
        }catch (Exception e){
            e.printStackTrace();
            result.setStatus(false);
            result.setMessage("get data lib error");
        }
        return ResponseEntity.ok(result);
    }

    @PostMapping("/saveManuals.do")
    @ApiOperation(value = "Save manuals", response = Map.class)
    @ApiResponses(value = {
            @ApiResponse(code = 500, message = "Server error"),
            @ApiResponse(code = 404, message = "Service not found"),
            @ApiResponse(code = 200, message = "Save Manuals successfully")
    })
    @MenuPermission(permissions = {MenuPermissionType.MODIFY})
    public ResponseEntity<AjaxResult> saveManuals(@ApiParam("manuals and id of Option") @RequestBody Map<Object,Object> param) throws IOException{
        AjaxResult result = new AjaxResult();
        try {
            result.setResponseData(sys0501Service.saveManuals(param));
            result.setStatus(true);
        }catch (Exception e){
            e.printStackTrace();
            result.setStatus(false);
            result.setMessage("Save manuals fail");
        }
        return ResponseEntity.ok(result);
    }
    
    @ApiOperation(value = "Update status of Library or depenency", response = Map.class)
    @MenuPermission(permissions = { MenuPermissionType.MODIFY })
    @ApiResponses(value = {
            @ApiResponse(code = 500, message = "Server error"),
            @ApiResponse(code = 404, message = "Service not found"),
            @ApiResponse(code = 200, message = "Change status successfully")
    })
    @PostMapping("changeStatus.do")
    public ResponseEntity changeStatus(@ApiParam(value = "Type Object, include 'enable (bool)', 'type (value is L if change library or D if change dependency)'") @RequestBody Map<Object, Object> param){
        AjaxResult result = new AjaxResult();
        try {
            result.setResponseData(sys0501Service.changeStatus(param));
            result.setStatus(true);
        }catch (Exception e){
            e.printStackTrace();
            result.setStatus(false);
        }
        return ResponseEntity.ok(result);
    }

    @ApiOperation(value = "Get manuals", response = Map.class)
    @MenuPermission(permissions = { MenuPermissionType.READ })
    @ApiResponses(value = {
            @ApiResponse(code = 500, message = "Server error"),
            @ApiResponse(code = 404, message = "Service not found"),
            @ApiResponse(code = 200, message = "Get manuals successfully")
    })
    @GetMapping("getManualsByID.do")
    public ResponseEntity getManualsByID(@RequestParam Map<Object,Object> param){
        AjaxResult result = new AjaxResult();
        try {
            result.setResponseData(sys0501Service.getManualsByID(param));
            result.setStatus(true);
        }catch (Exception e){
            e.printStackTrace();
            result.setStatus(false);
            result.setMessage("Get manuals failed");
        }
        return ResponseEntity.ok(result);
    }
}
