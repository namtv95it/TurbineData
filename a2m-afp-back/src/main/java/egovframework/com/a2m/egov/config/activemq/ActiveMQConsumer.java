//package egovframework.com.a2m.egov.config.activemq;
//
//import javax.jms.JMSException;
//import javax.jms.Message;
//import javax.jms.TextMessage;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.jms.annotation.JmsListener;
//import org.springframework.messaging.handler.annotation.SendTo;
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
//public class ActiveMQConsumer {
//	
//	private Logger log = LoggerFactory.getLogger(ActiveMQConsumer.class);
//	
//	private final String QUEUE_NAME = "sampleQueue";
//	private final String TOPIC_NAME = "sampleTopic";
//
//    @JmsListener(destination = QUEUE_NAME)
//    @SendTo("sampleQueue2")
//    public String receiveAndForwardMessageFromQueue(final Message jsonMessage) throws JMSException {
//        String messageData = null;
//        log.info("ActiveMQ received message: " + jsonMessage);
//        if(jsonMessage instanceof TextMessage) {
//            TextMessage textMessage = (TextMessage)jsonMessage;
//            messageData = textMessage.getText();
//        }
//        return messageData;
//    }
//
//    @JmsListener(destination = TOPIC_NAME)
//    @SendTo("sampleTopic2")
//    public String receiveAndForwardMessageFromTopic(final Message jsonMessage) throws JMSException, JsonProcessingException {
//        String messageData = null;
//        System.out.println("Received message " + jsonMessage);
//        if(jsonMessage instanceof TextMessage) {
//            TextMessage textMessage = (TextMessage)jsonMessage;
//            messageData = textMessage.getText();
//            System.out.println("messageData:"+messageData);
//        }
//        return new ObjectMapper().writer().withDefaultPrettyPrinter().writeValueAsString(messageData);
//    }
//
//
//    @JmsListener(destination = TOPIC_NAME)
//    public void receiveMessageFromTopic(final Message jsonMessage) throws JMSException {
//        String messageData = null;
//        System.out.println("Received message in 2nd topic " + jsonMessage);
//        if(jsonMessage instanceof TextMessage) {
//            TextMessage textMessage = (TextMessage)jsonMessage;
//            messageData = textMessage.getText();
//            System.out.println("messageData in 2nd listener:"+messageData);
//        }
//    }
//}
