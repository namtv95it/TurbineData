//package egovframework.com.a2m.egov.config.rabbitmq;
//
//import org.springframework.amqp.core.AmqpTemplate;
//import org.springframework.amqp.core.BindingBuilder;
//import org.springframework.amqp.core.Declarables;
//import org.springframework.amqp.core.DirectExchange;
//import org.springframework.amqp.core.Queue;
//import org.springframework.amqp.core.TopicExchange;
//import org.springframework.amqp.rabbit.annotation.EnableRabbit;
//import org.springframework.amqp.rabbit.annotation.RabbitListenerConfigurer;
//import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory;
//import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
//import org.springframework.amqp.rabbit.connection.ConnectionFactory;
//import org.springframework.amqp.rabbit.core.RabbitAdmin;
//import org.springframework.amqp.rabbit.core.RabbitTemplate;
//import org.springframework.amqp.rabbit.listener.RabbitListenerEndpointRegistrar;
//import org.springframework.amqp.rabbit.listener.RabbitListenerEndpointRegistry;
//import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
//import org.springframework.amqp.support.converter.MessageConverter;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.core.env.Environment;
//import org.springframework.messaging.converter.MappingJackson2MessageConverter;
//import org.springframework.messaging.handler.annotation.support.DefaultMessageHandlerMethodFactory;
//
//import com.rabbitmq.client.AMQP.Connection;
//
///**
// * 
// * @author Nguyen Van Hau
// * @since 2023. 2. 27.
// * @version 1
// */
//
//@Configuration
//@EnableRabbit
//public class RabbitMQConfig implements RabbitListenerConfigurer {
//	
//	public static final String QUEUE_NAME = "sample_queue";
//    public static final String TOPIC_EXCHANGE = "sample_topic_exchange";
//    public static final String ROUTING_KEY = "sample_routing_key";
//    
//
//    @Autowired
//    private ConnectionFactory connectionFactory;
//    
//    @Bean
//    public TopicExchange exchange() {
//        return new TopicExchange(TOPIC_EXCHANGE);
//    }
//
//    @Bean
//    public Declarables topicBindings() {
//        Queue deliveryInstanceQueue = new Queue(QUEUE_NAME, true);
//        TopicExchange exchange = exchange();
//        return new Declarables(
//        		deliveryInstanceQueue,
//        		exchange,
//                BindingBuilder.bind(deliveryInstanceQueue).to(exchange).with(ROUTING_KEY)
//        );
//    }
//
//	@Bean
//	public MessageConverter rabbitMessageConverter() {
//		return new Jackson2JsonMessageConverter();
//	}
//	
//	@Bean
//	public MappingJackson2MessageConverter consumerJackson2MessageConverter() {
//	   return new MappingJackson2MessageConverter();
//	}
//
//	@Bean
//	public AmqpTemplate amqpTemplate(ConnectionFactory connectionFactory) {
//		RabbitTemplate template = new RabbitTemplate(connectionFactory);
//		template.setMessageConverter(rabbitMessageConverter());
//		return template;
//	}
//
//	@Bean
//	public RabbitAdmin rabbitAdmin() {
//		return new RabbitAdmin(connectionFactory);
//	}
//
//	@Bean
//	public RabbitListenerEndpointRegistry rabbitListenerEndpointRegistry() {
//		return new RabbitListenerEndpointRegistry();
//	}
//
//	@Bean
//	public DefaultMessageHandlerMethodFactory messageHandlerMethodFactory() {
//		DefaultMessageHandlerMethodFactory factory = new DefaultMessageHandlerMethodFactory();
//		factory.setMessageConverter(consumerJackson2MessageConverter());
//		return factory;
//	}
//
//	@Override
//	public void configureRabbitListeners(final RabbitListenerEndpointRegistrar registrar) {
//		SimpleRabbitListenerContainerFactory factory = new SimpleRabbitListenerContainerFactory();
//		factory.setPrefetchCount(1);
//		factory.setConsecutiveActiveTrigger(1);
//		factory.setConsecutiveIdleTrigger(1);
//		factory.setConnectionFactory(connectionFactory);
//		registrar.setContainerFactory(factory);
//		registrar.setEndpointRegistry(rabbitListenerEndpointRegistry());
//		registrar.setMessageHandlerMethodFactory(messageHandlerMethodFactory());
//	}
//}