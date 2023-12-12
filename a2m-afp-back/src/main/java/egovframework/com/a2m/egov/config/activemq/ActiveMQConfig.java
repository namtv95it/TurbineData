//package egovframework.com.a2m.egov.config.activemq;
//
//import javax.jms.Destination;
//import javax.jms.JMSException;
//import javax.jms.Session;
//
//import org.apache.activemq.ActiveMQConnectionFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.core.env.Environment;
//import org.springframework.jms.annotation.EnableJms;
//import org.springframework.jms.core.JmsTemplate;
//import org.springframework.jms.support.converter.MappingJackson2MessageConverter;
//import org.springframework.jms.support.converter.MessageConverter;
//import org.springframework.jms.support.converter.MessageType;
//import org.springframework.jms.support.destination.DynamicDestinationResolver;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.fasterxml.jackson.databind.SerializationFeature;
//import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
//
///**
// * 
// * @author Nguyen Van Hau
// * @since 2023. 2. 27.
// * @version 1
// */
//
//@Configuration
//@EnableJms
//public class ActiveMQConfig {
//    
//    @Autowired
//    private Environment env;
//
//    @Bean
//    public ActiveMQConnectionFactory connectionFactory(){
//        ActiveMQConnectionFactory connectionFactory = new  ActiveMQConnectionFactory();
//        connectionFactory.setTrustAllPackages(true);
//        connectionFactory.setBrokerURL(env.getProperty("spring.activemq.broker-url"));
//        connectionFactory.setPassword(env.getProperty("spring.activemq.user"));
//        connectionFactory.setUserName(env.getProperty("spring.activemq.password"));
//        return connectionFactory;
//    }
//
//    @Bean
//    public MessageConverter activeMQMessageConverter() {
//        MappingJackson2MessageConverter converter = new MappingJackson2MessageConverter();
//        converter.setTargetType(MessageType.TEXT);
//        converter.setObjectMapper(objectMapper());
//        return converter;
//    }
//
//    @Bean
//    public ObjectMapper objectMapper() {
//        ObjectMapper mapper = new ObjectMapper();
//        mapper.registerModule(new JavaTimeModule());
//        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
//        return mapper;
//    }
//
//    @Bean
//    public JmsTemplate jmsTemplate(){
//        JmsTemplate template = new JmsTemplate();
//        template.setConnectionFactory(connectionFactory());
//        template.setMessageConverter(activeMQMessageConverter());
//        template.setPubSubDomain(true);
//        template.setDestinationResolver(destinationResolver());
//        template.setDeliveryPersistent(true);
//        return template;
//    }
//
//    @Bean
//    DynamicDestinationResolver destinationResolver() {
//        return new DynamicDestinationResolver() {
//            @Override
//            public Destination resolveDestinationName(Session session, String destinationName, boolean pubSubDomain) throws JMSException {
//                if(destinationName.endsWith("Topic")) {
//                    pubSubDomain = true;
//                }
//                else {
//                    pubSubDomain = false;
//                }
//                return super.resolveDestinationName(session,destinationName,pubSubDomain);
//            }
//        };
//    }
//}
