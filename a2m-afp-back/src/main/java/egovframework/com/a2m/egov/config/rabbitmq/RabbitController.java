//package egovframework.com.a2m.egov.config.rabbitmq;
//
//import java.util.Map;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import egovframework.com.a2m.egov.model.response.AjaxResult;
//
///**
// * 
// * @author Nguyen Van Hau
// * @since 2023. 2. 27.
// * @version 1
// */
//
//@RestController
//@RequestMapping(value = "api/rabbitmq")
//public class RabbitController {
//	
//	@Autowired
//	private RabbitMQService rabbitMQService;
//	
//	@PostMapping(value = "createQueue")
//	public ResponseEntity<?> createQueue(@RequestBody Map<String, Object> params) {
//		AjaxResult result = new AjaxResult();
//		try {
//			String queueName = (String) params.get("queueName");
//			String exchangeName = (String) params.get("exchangeName");
//			String routingKey = (String) params.get("routingKey");
//			rabbitMQService.addNewQueue(queueName, exchangeName, routingKey);
//			result.setStatus(true);
//			result.setMessage("Create queue success");
//		} catch (Exception e) {
//			e.printStackTrace();
//			result.setStatus(false);
//			result.setMessage("Create queue failed");
//		}
//		return ResponseEntity.ok(result);
//	}
//	
//	@PostMapping(value = "sendMessage")
//	public ResponseEntity<?> sendMessage(@RequestBody Map<String, Object> params) {
//		AjaxResult result = new AjaxResult();
//		try {
//			Map<String, Object> message = (Map<String, Object>) params.get("message");
//			String exchangeName = (String) params.get("exchangeName");
//			String routingKey = (String) params.get("routingKey");
//			rabbitMQService.sendMessage(exchangeName, routingKey, message);
//			result.setStatus(true);
//			result.setMessage("Send message success");
//		} catch (Exception e) {
//			e.printStackTrace();
//			result.setStatus(false);
//			result.setMessage("Send message failed");
//		}
//		return ResponseEntity.ok(result);
//	}
//	
//}
