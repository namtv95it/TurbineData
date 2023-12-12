//package egovframework.com.a2m.egov.config.rabbitmq;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.amqp.core.Binding;
//import org.springframework.amqp.core.Queue;
//import org.springframework.amqp.rabbit.core.RabbitAdmin;
//import org.springframework.amqp.rabbit.core.RabbitTemplate;
//import org.springframework.amqp.rabbit.listener.AbstractMessageListenerContainer;
//import org.springframework.amqp.rabbit.listener.RabbitListenerEndpointRegistry;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
///**
// * 
// * @author Nguyen Van Hau
// * @since 2023. 2. 27.
// * @version 1
// */
//
//@Service
//public class RabbitMQService {
//
//	private Logger log = LoggerFactory.getLogger(RabbitMQService.class);
//
//	@Autowired
//	private RabbitAdmin rabbitAdmin;
//	@Autowired
//	private RabbitListenerEndpointRegistry rabbitListenerEndpointRegistry;
//	
//	@Autowired 
//	private RabbitTemplate rabbitTemplate;
//	
//	public void sendMessage(String exchangeName, String routingKey, Object message) {
//		rabbitTemplate.convertAndSend(exchangeName, routingKey, message);
//	}
//
//    public void addNewQueue(String queueName, String exchangeName, String routingKey) {
//        Queue queue = new Queue(queueName, true, false, false);
//        Binding binding = new Binding(
//                queueName,
//                Binding.DestinationType.QUEUE,
//                exchangeName,
//                routingKey,
//                null
//        );
//        rabbitAdmin.declareQueue(queue);
//        rabbitAdmin.declareBinding(binding);
//        this.addQueueToListener(exchangeName,queueName);
//    }
//
//    public void addQueueToListener(String exchangeName, String queueName) {
//        log.info("adding queue : " + queueName + " to listener with id : " + exchangeName);
//        if (!checkQueueExistOnListener(exchangeName,queueName)) {
//            this.getMessageListenerContainerById(exchangeName).addQueueNames(queueName);
//            log.info("queue ");
//        } else {
//            log.info("given queue name : " + queueName + " not exist on given listener id : " + exchangeName);
//        }
//    }
//
//    public void removeQueueFromListener(String listenerId, String queueName) {
//        log.info("removing queue : " + queueName + " from listener : " + listenerId);
//        if (checkQueueExistOnListener(listenerId,queueName)) {
//            this.getMessageListenerContainerById(listenerId).removeQueueNames(queueName);
//            log.info("deleting queue from rabbit management");
//            this.rabbitAdmin.deleteQueue(queueName);
//        } else {
//            log.info("given queue name : " + queueName + " not exist on given listener id : " + listenerId);
//        }
//    }
//
//    public Boolean checkQueueExistOnListener(String listenerId, String queueName) {
//        try {
//            log.info("checking queueName : " + queueName + " exist on listener id : " + listenerId);
//            log.info("getting queueNames");
//            String[] queueNames = this.getMessageListenerContainerById(listenerId).getQueueNames();
//            if (queueNames != null) {
//                log.info("checking " + queueName + " exist on active queues");
//                for (String name : queueNames) {
//                    log.info("name : " + name + " with checking name : " + queueName);
//                    if (name.equals(queueName)) {
//                        log.info("queue name exist on listener, returning true");
//                        return Boolean.TRUE;
//                    }
//                }
//                return Boolean.FALSE;
//            } else {
//                log.info("there is no queue exist on listener");
//                return Boolean.FALSE;
//            }
//        } catch (Exception e) {
//            log.error("Error on checking queue exist on listener");
//            log.error("error message : " + e.getMessage());
//            log.error("trace : " + e.getStackTrace());
//            return Boolean.FALSE;
//        }
//    }
//
//    private AbstractMessageListenerContainer getMessageListenerContainerById(String listenerId) {
//        log.info("getting message listener container by id : " + listenerId);
//        return ((AbstractMessageListenerContainer) this.rabbitListenerEndpointRegistry
//                .getListenerContainer(listenerId)
//        );
//    }
//}
