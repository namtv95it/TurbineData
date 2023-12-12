package egovframework.com.a2m.egov.model.webhook;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import egovframework.com.a2m.egov.model.UserModel;
import egovframework.com.a2m.egov.service.webhook.WebhookHandler;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class WebhookRegistration implements Serializable{
	 private final WebhookHandler handler;

	    public WebhookRegistration(WebhookHandler handler) {
	        this.handler = handler;
	    }

	    public void handle(UserModel payload) {
	        handler.handle(payload);
	    }
}
