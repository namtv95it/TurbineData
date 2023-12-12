//package egovframework.com.a2m.egov.config.rabbitmq;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.amqp.rabbit.annotation.RabbitListener;
//import org.springframework.stereotype.Component;
//
///**
// * 
// * @author Nguyen Van Hau
// * @since 2023. 2. 27.
// * @version 1
// */
//
//@Component
//public class RabbitMQConsumerListener {
//	
//	private Logger log = LoggerFactory.getLogger(RabbitMQConsumerListener.class);
//	
//	@RabbitListener(id = RabbitMQConfig.TOPIC_EXCHANGE, queues = RabbitMQConfig.QUEUE_NAME)
//	public void receiveMessageDeliveryInstanceLog(Object message) throws Exception {
//		log.info("Rabbitmq Received message: {}" , message.toString());
//	}
//	
//}	
