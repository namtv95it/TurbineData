package egovframework.com.a2m.egov.config.webhook;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import egovframework.com.a2m.egov.controllers.webhook.WebhookController;
import egovframework.com.a2m.egov.model.webhook.WebhookRegistry;

@Configuration
public class WebhookConfig {

    @Autowired
    private WebhookController userWebhookController;

    @Bean
    public WebhookRegistry webhookRegistry() {
        WebhookRegistry registry = new WebhookRegistry();
        registry.addEndpoint("api/webhook/user/save.do", userWebhookController::saveDo);
//        registry.addEndpoint("/webhook/products/update", userWebhookController::updateProduct);
//        registry.addEndpoint("/webhook/products/delete", userWebhookController::deleteProduct);
        return registry;
    }

}