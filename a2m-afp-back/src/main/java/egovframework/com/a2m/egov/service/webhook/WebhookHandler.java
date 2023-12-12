package egovframework.com.a2m.egov.service.webhook;

import egovframework.com.a2m.egov.model.UserModel;
import egovframework.com.a2m.egov.model.webhook.WebhookPayload;

public interface WebhookHandler {
    void handle(UserModel payload);
}
