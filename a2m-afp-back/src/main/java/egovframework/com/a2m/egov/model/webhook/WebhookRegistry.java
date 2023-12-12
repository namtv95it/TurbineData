package egovframework.com.a2m.egov.model.webhook;

import java.util.HashMap;
import java.util.Map;

import egovframework.com.a2m.egov.service.webhook.WebhookHandler;

public class WebhookRegistry {
	 private final Map<String, WebhookRegistration> registry;

	    public WebhookRegistry() {
	        registry = new HashMap<String, WebhookRegistration>();
	    }

	    public void addEndpoint(String endpoint, WebhookHandler handler) {
	        registry.put(endpoint, new WebhookRegistration(handler));
	    }

	    public WebhookRegistration getRegistration(String endpoint) {
	        return registry.get(endpoint);
	    }

}
