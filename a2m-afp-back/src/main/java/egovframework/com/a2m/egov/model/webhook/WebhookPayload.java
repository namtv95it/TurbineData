package egovframework.com.a2m.egov.model.webhook;

import java.io.Serializable;
import java.util.Date;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude;

import egovframework.com.a2m.egov.model.UserModel;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class WebhookPayload implements Serializable{
	
	private static final long serialVersionUID = 1L;
	   
	 private  String body;
	  private  Map<String, String> headers;
}
