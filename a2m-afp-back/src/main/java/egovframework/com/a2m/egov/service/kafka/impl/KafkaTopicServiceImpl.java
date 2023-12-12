//package egovframework.com.a2m.egov.service.kafka.impl;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Set;
//import java.util.concurrent.ExecutionException;
//
//import org.apache.kafka.clients.admin.AdminClient;
//import org.apache.kafka.clients.admin.ListTopicsResult;
//import org.apache.kafka.clients.admin.NewTopic;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.kafka.config.TopicBuilder;
//import org.springframework.kafka.core.KafkaAdmin;
//import org.springframework.stereotype.Service;
//
//import egovframework.com.a2m.egov.service.kafka.KafkaTopicService;
//
//@Service
//public class KafkaTopicServiceImpl implements KafkaTopicService {
//	private Logger log = LoggerFactory.getLogger(KafkaTopicServiceImpl.class);
//
//	@Autowired
//	private KafkaAdmin kafkaAdmin;
//
//	@Autowired
//	private AdminClient adminClient;
//
//	@Override
//	public void createTopic(String topicName) {
//		NewTopic newTopic = TopicBuilder.name(topicName).build();
//		kafkaAdmin.createOrModifyTopics(newTopic);
//		log.info("Create topic successfully with topic name " + topicName);
//
//	}
//
//	@Override
//	public Set<String> getTopics() {
//		try {
//			ListTopicsResult topics = adminClient.listTopics();
//			Set<String> results = topics.names().get();
//			log.info("Get all topics");
//			return results;
//		} catch (InterruptedException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} catch (ExecutionException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		return null;
//	}
//
//	@Override
//	public void deleteTopic(String topicName) {
//		List<String> topics = new ArrayList<String>();
//		topics.add(topicName);
//		adminClient.deleteTopics(topics);
//		log.info("Delete topic successfull");
//	}
//
//}
