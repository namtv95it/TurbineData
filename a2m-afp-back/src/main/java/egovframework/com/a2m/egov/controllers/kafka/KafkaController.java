//package egovframework.com.a2m.egov.controllers.kafka;
//
//import java.util.Map;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import egovframework.com.a2m.egov.model.response.AjaxResult;
//import egovframework.com.a2m.egov.service.kafka.KafkaProducerService;
//import egovframework.com.a2m.egov.service.kafka.KafkaTopicService;
//
//@RestController
//@RequestMapping(value = "/api/kafka")
//public class KafkaController {
//	@Autowired
//	private KafkaProducerService kafkaProducerService;
//	@Autowired
//	private KafkaTopicService kafkaTopicService;
//
//	@PostMapping(value = "/sendMessage")
//	public ResponseEntity<?> sendMsToKafkaTopic(@RequestBody Map<String, Object> messages) throws Exception {
//		kafkaProducerService.sendMessage(messages.get("topic").toString(), messages.get("message"));
//		AjaxResult ajaxResult = new AjaxResult();
//		ajaxResult.setMessage("Send message successful");
//		ajaxResult.setStatus(true);
//		return ResponseEntity.ok(ajaxResult);
//	}
//
//	@PostMapping(value = "/createTopic")
//	public ResponseEntity<?> createTopic(@RequestBody Map<String, Object> params) {
//		kafkaTopicService.createTopic(params.get("topicName").toString());
//		return ResponseEntity.ok(null);
//	}
//
//	@GetMapping(value = "getTopics")
//	public ResponseEntity<?> getTopics() {
//		return ResponseEntity.ok(kafkaTopicService.getTopics());
//	}
//
//	@GetMapping(value = "deleteTopic")
//	public ResponseEntity<?> deleteTopic(@RequestParam String topic) {
//		AjaxResult ajaxResult = new AjaxResult();
//		kafkaTopicService.deleteTopic(topic);
//		ajaxResult.setMessage("Delete topic successfull");
//		ajaxResult.setStatus(true);
//		return ResponseEntity.ok(ajaxResult);
//	}
//}
