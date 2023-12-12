package egovframework.com.a2m.egov.controllers.ws;

import egovframework.com.cmm.annotation.MenuPermission;
import egovframework.com.cmm.annotation.MenuPermissionType;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.user.SimpUser;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

/**
 * @author Nguyen Trung Anh
 * @created 3/4/2023
 */
@RestController
@RequestMapping("api/ws")
@Api(tags = {"Web Socket"})
public class WsController {

    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private SimpUserRegistry simpUserRegistry;

    @ApiOperation(value = "Example Send message to all user active", response = Map.class)
    @ApiResponses(value = {
            @ApiResponse(code = 500, message = "Server error"),
            @ApiResponse(code = 404, message = "Service not found"),
            @ApiResponse(code = 200, message = "send message successfully")
    })
    @PostMapping("/sendMessageToAll.exclude")
    public void sendAll(){
        Set<SimpUser> listSimpUser = simpUserRegistry.getUsers();
        Map<Object, Object> data = new HashMap();
//      Set message data
        data.put("key", "Hello From WS !");
        for (SimpUser simpUser : listSimpUser) {
            simpMessagingTemplate.convertAndSendToUser(simpUser.getName(), "/queue/messages", data);
        }
    }

}
