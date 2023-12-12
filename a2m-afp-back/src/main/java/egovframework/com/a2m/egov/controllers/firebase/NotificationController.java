//package egovframework.com.a2m.egov.controllers.firebase;
//
//import com.google.firebase.messaging.BatchResponse;
//import egovframework.com.a2m.egov.model.Notice;
//import egovframework.com.a2m.egov.service.firebase.NotificationService;
//import egovframework.com.a2m.egov.service.firebase.impl.NotificationServiceImpl;
//import egovframework.com.cmm.annotation.MenuPermission;
//import egovframework.com.cmm.annotation.MenuPermissionType;
//import io.swagger.annotations.ApiOperation;
//import io.swagger.annotations.ApiParam;
//import io.swagger.annotations.ApiResponse;
//import io.swagger.annotations.ApiResponses;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.Map;
//
//@RestController
//@RequestMapping("api/firebase")
//@RequiredArgsConstructor
//public class NotificationController {
//
//    @Autowired
//    private NotificationServiceImpl notificationServiceImpl;
//
//    @ApiOperation(value = "Example Send notification to regis token", response = Map.class)
//    @ApiResponses(value = {
//            @ApiResponse(code = 500, message = "Server error"),
//            @ApiResponse(code = 404, message = "Service not found"),
//            @ApiResponse(code = 200, message = "send notification successfully")
//    })
//    @PostMapping("/send-notification.exclude")
//    public BatchResponse sendNotification(@ApiParam(value = "Infomation of notice, include list regis token") @RequestBody Notice notice){
//        return notificationServiceImpl.sendNotification(notice);
//    }
//}
