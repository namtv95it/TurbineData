//package egovframework.com.a2m.egov.service.kafka.impl;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.kafka.core.KafkaTemplate;
//import org.springframework.stereotype.Service;
//
//import egovframework.com.a2m.egov.service.kafka.KafkaProducerService;
//
//@Service
//public class KafkaProducerServiceImpl implements KafkaProducerService {
//
//	@Autowired
//	private KafkaTemplate<String, Object> kafkaTemplate;
//
//	@Override
//	public void sendMessage(String topic, Object message) {
//		kafkaTemplate.send(topic, message);
//	}
//
//}
