//package egovframework.com.a2m.egov.config.kafka;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.kafka.annotation.KafkaListener;
//import org.springframework.messaging.handler.annotation.Header;
//import org.springframework.messaging.handler.annotation.Payload;
//import org.springframework.stereotype.Component;
//import org.springframework.kafka.support.KafkaHeaders;
//
///**
// * 
// * @author longdh
// * @since 28/2/2023
// *
// */
//@Component
//public class KafkaListenerConfig {
//	Logger logger = LoggerFactory.getLogger(KafkaListenerConfig.class);
//
//	@KafkaListener(topics = "${spring.kafka.topic}", containerFactory = "kafkaListenerContainerFactory", groupId = "groupId")
//	void listener(@Payload String messages, @Header(KafkaHeaders.RECEIVED_PARTITION_ID) int partition,
//			@Header(KafkaHeaders.OFFSET) int offset) throws Exception {
//
//		logger.info("Received message: {} from partition-{} with offset-{}", messages, partition, offset);
//	}
//}
