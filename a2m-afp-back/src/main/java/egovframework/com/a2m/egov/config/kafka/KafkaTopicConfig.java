//package egovframework.com.a2m.egov.config.kafka;
//
//import java.util.HashMap;
//import java.util.Map;
//
//import org.apache.kafka.clients.admin.AdminClient;
//import org.apache.kafka.clients.admin.AdminClientConfig;
//import org.apache.kafka.clients.admin.KafkaAdminClient;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.core.env.Environment;
//import org.springframework.kafka.core.KafkaAdmin;
//
///**
// * 
// * @author longdh
// * @since 27/2/2023
// * 
// */
//@Configuration
//public class KafkaTopicConfig {
//	@Autowired
//	private Environment env;
//	
//	@Bean
//	KafkaAdmin kafkaAdmin() {
//		return new KafkaAdmin(config());
//	}
//
//	@Bean
//	AdminClient adminClient() {
//		return KafkaAdminClient.create(config());
//	}
//
//	public Map<String, Object> config() {
//		Map<String, Object> config = new HashMap<>();
//		config.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, env.getProperty("spring.kafka.bootstrap-servers"));
//		return config;
//	}
//}
