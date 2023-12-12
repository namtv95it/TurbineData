//package egovframework.com.a2m.egov.config.kafka;
//
//import java.util.HashMap;
//import java.util.Map;
//
//import org.apache.kafka.clients.producer.ProducerConfig;
//import org.apache.kafka.clients.producer.ProducerRecord;
//import org.apache.kafka.clients.producer.RecordMetadata;
//import org.apache.kafka.common.serialization.StringSerializer;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.core.env.Environment;
//import org.springframework.kafka.core.DefaultKafkaProducerFactory;
//import org.springframework.kafka.core.KafkaTemplate;
//import org.springframework.kafka.core.ProducerFactory;
//import org.springframework.kafka.support.ProducerListener;
//import org.springframework.kafka.support.serializer.JsonSerializer;
//
///**
// * 
// * @author longdh
// * @since 27/2/2023
// * 
// */
//@Configuration
//public class KafkaProducerConfig {
//	private static Logger logger = LoggerFactory.getLogger(KafkaProducerConfig.class);
//	
//	@Autowired
//	private Environment env;
//
//	@Bean
//	public ProducerFactory<String, Object> producerFactory() {
//		Map<String, Object> props = new HashMap<>();
//		props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, env.getProperty("spring.kafka.bootstrap-servers"));
//		props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
//		props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
//		return new DefaultKafkaProducerFactory<>(props, null, new JsonSerializer());
//	}
//
//	@Bean
//	public KafkaTemplate<String, Object> kafkaTemplate() {
//		KafkaTemplate<String, Object> kafkaTemplate = new KafkaTemplate<>(producerFactory());
//		kafkaTemplate.setProducerListener(new ProducerListener<String, Object>() {
//			@Override
//			public void onSuccess(ProducerRecord<String, Object> producerRecord, RecordMetadata recordMetadata) {
//				logger.info("ACK from ProducerListener message: {}, partition: {}, offset: {}, topic: {}",
//						producerRecord.value(), recordMetadata.partition(), recordMetadata.offset(),
//						recordMetadata.topic());
//			}
//
//			@Override
//			public void onError(ProducerRecord<String, Object> producerRecord, RecordMetadata recordMetadata,
//					Exception exception) {
//				logger.warn("Unable to deliver message [{}]. {}", producerRecord.value(), recordMetadata.offset());
//			}
//		});
//		return kafkaTemplate;
//	}
//}
