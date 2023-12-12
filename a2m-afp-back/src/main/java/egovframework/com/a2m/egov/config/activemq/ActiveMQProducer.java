//package egovframework.com.a2m.egov.config.activemq;
//
//import javax.jms.TextMessage;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.jms.core.JmsTemplate;
//import org.springframework.stereotype.Component;
//
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.ObjectMapper;
//
///**
// * 
// * @author Nguyen Van Hau
// * @since 2023. 2. 27.
// * @version 1
// */
//
//@Component
//public class ActiveMQProducer {
//    
//    private Logger log = LoggerFactory.getLogger(ActiveMQProducer.class);
//
//    @Autowired
//    JmsTemplate jmsTemplate;
//
//    public void sendToQueue(Object sampleMessage, String queueName) throws JsonProcessingException {
//        try {
//            String jsonObj = new ObjectMapper().writer().withDefaultPrettyPrinter().writeValueAsString(sampleMessage);
//            jmsTemplate.send(queueName, messageCreator -> {
//                TextMessage message = messageCreator.createTextMessage();
//                message.setText(jsonObj);
//                return message;
//            });
//        }
//        catch (Exception ex) {
//        	log.info("ActiveMQ: ERROR in sending message to queue");
//        }
//    }
//
//    public void sendToTopic(Object sampleMessage, String topicName) throws JsonProcessingException {
//        try {
//            String jsonObj = new ObjectMapper().writer().withDefaultPrettyPrinter().writeValueAsString(sampleMessage);
//            jmsTemplate.send(topicName, messageCreator -> {
//                TextMessage message = messageCreator.createTextMessage();
//                message.setText(jsonObj);
//                return message;
//            });
//        }
//        catch (Exception ex) {
//        	log.info("ActiveMQ: ERROR in sending message to queue");
//        }
//    }
//}
